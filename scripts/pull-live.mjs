/**
 * Rebuilds src/data/live.json and public/live-poster.webp from the church's
 * most recent COMPLETED YouTube live stream.
 *
 * Run after a Sunday service has finished processing:  npm run live
 *
 * ---------------------------------------------------------------------------
 * WHY THIS DOES NOT DOWNLOAD maxresdefault.jpg
 *
 * The obvious version of this script self-hosts i.ytimg.com/vi/<id>/maxresdefault.jpg.
 * That is wrong here and was rejected twice on evidence:
 *
 *   - imagery-manifest.md tested auto-thumbnails across the 15 most recent
 *     uploads (source SRC-12) and marked them REJECTED: they return in
 *     repeating byte sizes across DIFFERENT videos, which is a reused graphic.
 *   - Measured again 2026-08-26 on the then-newest stream r1f1KsnZdds
 *     ("August 23rd, 2026"): maxresdefault.jpg is 5,680 bytes of PURE BLACK at
 *     1280x720. YouTube samples its default thumbnail near the head of the
 *     video, and every Brookside broadcast opens on black before the camera
 *     cuts in.
 *
 * So the naive version would have shipped a black card, which is the exact
 * thing this card exists to stop being. Note the failure is INTERMITTENT: the
 * three streams before that one return real ~90KB frames. It would have passed
 * a spot check and failed on the week it mattered.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS DOES NOT EXTRACT A FRAME FROM THE VIDEO EITHER
 *
 * imagery-manifest.md documents a yt-dlp + ffmpeg recipe that pulls a short
 * section of a broadcast and takes a frame out of it. That recipe no longer
 * works from this machine, and it is worth writing down exactly why so nobody
 * spends another afternoon on it:
 *
 *   yt-dlp has no JavaScript runtime here (only deno is enabled by default and
 *   deno is not installed), so it falls back to the ANDROID_VR player client.
 *   googlevideo serves that client's URLs with no PO token, and MEASURED
 *   2026-08-26: a bounded Range request at offset 4,000,000 returns 206, and
 *   the same request at offset 20,000,000 and beyond returns 403. Only the
 *   first few MB of any format are readable, which is the head of the video —
 *   the black part. Separately, ffmpeg alone cannot fetch these URLs at all: it
 *   opens with `Range: bytes=0-`, and an open-ended or absent range is 403 on
 *   this host regardless of user agent.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT DOES INSTEAD
 *
 * YouTube generates THREE more auto-frames per video beyond the default, at
 * maxres1/maxres2/maxres3.jpg, sampled from points spread through the video
 * rather than the head. Those are 1280x720 and they are real frames of the room.
 *
 * Measured across the four most recent services (16 images, 2026-08-26):
 *
 *   variant         Aug 23        Aug 16        Aug 9         Aug 2
 *   maxresdefault   BLACK         room          room          room
 *   maxres1         Welcome slide Welcome slide Welcome slide room
 *   maxres2         room          room          room          room
 *   maxres3         room          room          room + lyrics room
 *
 * Hence PREFERENCE below: maxres2 first, maxres3 next, and the two that have
 * actually been observed failing last. maxres1 is the church's standing
 * "Welcome" pre-service slide three weeks in four — identical stats on three
 * different videos (content mean 107.9, stdev 47.9), which is SRC-12's
 * repeating-byte-size finding showing up in the pixels.
 *
 * The gate below is a second line of defence, not the primary mechanism. The
 * preference order is what makes this right; the gate is what stops a bad week
 * from shipping something worse than nothing.
 *
 * ---------------------------------------------------------------------------
 * NETWORK NOTE, because this has cost this project time twice:
 * www.youtube.com IS reachable from this Mac via curl and yt-dlp. The block is
 * browser-level (Screen Time) only. Any doc claiming a network-level block is
 * wrong; check with `curl -o /dev/null -w '%{http_code}' https://www.youtube.com/`
 * before believing it. i.ytimg.com and www.googleapis.com are reachable too.
 */
import { writeFileSync, mkdirSync, rmSync, existsSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_JSON = join(ROOT, 'src', 'data', 'live.json');
const OUT_POSTER = join(ROOT, 'public', 'live-poster.webp');
const WORK = join(ROOT, '.live-frames');

/** The playlist id is the channel id with UC swapped for UU. Derived rather
    than written twice, so the two cannot drift apart. Same rule as watch.astro. */
const CHANNEL = process.env.YT_CHANNEL_ID || 'UCFVvTNQHSyICAekmJdQ47Eg';
const UPLOADS = `UU${CHANNEL.slice(2)}`;
const API = 'https://www.googleapis.com/youtube/v3';

/** Best-first. See the table in the header: this order is measured, not guessed. */
const PREFERENCE = ['maxres2', 'maxres3', 'maxresdefault', 'maxres1'];

/** The gate. MEAN_MIN is the one that earns its keep: it is what the
    5,680-byte black maxresdefault fails (content mean 0.0, stdev 0.0). */
const MEAN_MIN = 25;    // black / near-black
const MEAN_MAX = 220;   // blown out
const STDEV_MIN = 20;   // flat: a title card or a blank slide

/** Poster width. The source is 1280x720, so this is 1:1 with no upscale. */
const POSTER_WIDTH = 1280;

/**
 * The key is optional here. Without it this falls back to the channel RSS plus
 * yt-dlp's own was_live flag, which is enough to IDENTIFY the stream — that
 * path reads metadata only, so the byte-range wall described above never
 * applies. The key is only strictly required at the edge, in functions/api/live.js,
 * where yt-dlp does not exist.
 */
function apiKey() {
	if (process.env.YOUTUBE_API_KEY) return process.env.YOUTUBE_API_KEY;
	const f = join(process.env.HOME, '.config', 'compass', 'youtube.env');
	if (!existsSync(f)) return null;
	const m = readFileSync(f, 'utf8').match(/^YOUTUBE_API_KEY=(.+)$/m);
	return m?.[1]?.trim() || null;
}

/** "PT1H22M40S" -> 4960. Services run 80 to 115 minutes, so the hour slot
    cannot be assumed away. */
function isoDuration(raw) {
	const m = String(raw).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
	if (!m) return 0;
	return Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
}

/**
 * Newest completed live stream, via the Data API. Two calls, ONE QUOTA UNIT
 * EACH. Deliberately not search.list with eventType=completed, which is the
 * answer every tutorial gives and costs 100 units a call — that would make the
 * same question unaffordable to ask at the edge, where it is asked constantly.
 */
async function identifyViaApi(key) {
	const listRes = await fetch(
		`${API}/playlistItems?part=contentDetails&playlistId=${UPLOADS}&maxResults=50&key=${key}`,
	);
	if (!listRes.ok) throw new Error(`playlistItems failed: HTTP ${listRes.status} ${await listRes.text()}`);
	const ids = (await listRes.json()).items.map((i) => i.contentDetails.videoId);
	if (!ids.length) throw new Error('Uploads playlist returned nothing');

	const vidRes = await fetch(
		`${API}/videos?part=snippet,contentDetails,liveStreamingDetails&id=${ids.join(',')}&key=${key}`,
	);
	if (!vidRes.ok) throw new Error(`videos.list failed: HTTP ${vidRes.status} ${await vidRes.text()}`);

	// actualEndTime present IS the definition of "was live, and has finished".
	// A broadcast still running has actualStartTime and no actualEndTime, and
	// must not be picked up here: it has no final frame set yet, and live is the
	// edge's job, not this script's.
	const streams = (await vidRes.json()).items
		.filter((v) => v.liveStreamingDetails?.actualEndTime)
		.sort((a, b) =>
			b.liveStreamingDetails.actualStartTime.localeCompare(a.liveStreamingDetails.actualStartTime));

	if (!streams.length) throw new Error(`No completed live stream in the newest ${ids.length} uploads`);

	const v = streams[0];
	return {
		videoId: v.id,
		title: String(v.snippet.title).trim(),
		// actualStartTime, NOT publishedAt. Measured 2026-08-26: r1f1KsnZdds
		// reports publishedAt 2026-08-24T05:30Z while it actually started
		// 2026-08-23T15:50Z (10:50 AM CST). The card prints this date, so
		// publishedAt would put the wrong Sunday on the church's website.
		startedAt: v.liveStreamingDetails.actualStartTime,
		endedAt: v.liveStreamingDetails.actualEndTime,
		seconds: isoDuration(v.contentDetails.duration),
		via: 'api',
	};
}

/** No key: RSS for the id list, yt-dlp for the live flag the RSS does not carry.
    Metadata only — no video bytes, so the googlevideo range wall is irrelevant. */
async function identifyViaYtdlp() {
	const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL}`);
	if (!res.ok) throw new Error(`Channel RSS failed: HTTP ${res.status}`);
	const ids = [...(await res.text()).matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map((m) => m[1]);
	if (!ids.length) throw new Error('Channel RSS returned no entries');

	for (const id of ids) {
		const raw = execFileSync('yt-dlp', [
			'--print', '%(was_live)s|%(release_timestamp)s|%(duration)s|%(title)s',
			'--no-warnings', '--', `https://www.youtube.com/watch?v=${id}`,
		], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

		const [wasLive, start, seconds, ...rest] = raw.split('|');
		if (wasLive !== 'True') continue;
		return {
			videoId: id,
			title: rest.join('|').trim(),
			startedAt: start && start !== 'NA' ? new Date(Number(start) * 1000).toISOString() : null,
			endedAt: null,
			seconds: Number(seconds) || 0,
			via: 'yt-dlp',
		};
	}
	throw new Error(`No completed live stream in the newest ${ids.length} RSS entries`);
}

/**
 * Height of the solid dark band at the top and bottom of the frame.
 *
 * The broadcast is letterboxed some weeks and not others (Aug 23 and Aug 16 sit
 * in 22px bars, Aug 9 fills the frame), so this is DETECTED rather than taken
 * from the 1920x1012+34 figure in imagery-manifest.md. Baking that in would
 * have cropped 44 real pixels off an unletterboxed week every time.
 *
 * Measured on the darkest pixel in each row rather than the average: a row that
 * averages dark but contains a lit pulpit is picture, not a bar.
 */
async function letterbox(buf) {
	const { data, info } = await sharp(buf).greyscale().raw().toBuffer({ resolveWithObject: true });
	const { width, height } = info;
	const rowMax = (y) => {
		let m = 0;
		for (let x = 0; x < width; x++) m = Math.max(m, data[y * width + x]);
		return m;
	};
	let top = 0;
	let bottom = 0;
	// Capped at a third: past that this has locked onto a dark scene, not a bar.
	while (top < height / 3 && rowMax(top) < 32) top++;
	while (bottom < height / 3 && rowMax(height - 1 - bottom) < 32) bottom++;
	return { top, bottom, width, height };
}

/** Stats are taken on the CONTENT AREA, after the bars come off. Included, the
    bars drag the mean down and inflate the stdev, so a dim frame in thick bars
    can read brighter and more detailed than it is. */
async function inspect(buf) {
	const box = await letterbox(buf);
	const inner = box.height - box.top - box.bottom;
	if (inner < box.height / 3) return { box, mean: 0, stdev: 0, reasons: ['all bars (frame is black)'] };

	const stats = await sharp(buf)
		.extract({ left: 0, top: box.top, width: box.width, height: inner })
		.stats();
	const rgb = stats.channels.slice(0, 3);
	const mean = rgb.reduce((t, c) => t + c.mean, 0) / 3;
	const stdev = rgb.reduce((t, c) => t + c.stdev, 0) / 3;

	const reasons = [];
	if (mean < MEAN_MIN) reasons.push(`too dark (mean ${mean.toFixed(1)})`);
	if (mean > MEAN_MAX) reasons.push(`blown out (mean ${mean.toFixed(1)})`);
	if (stdev < STDEV_MIN) reasons.push(`flat (stdev ${stdev.toFixed(1)})`);
	return { box, mean, stdev, reasons };
}

// ---------------------------------------------------------------- run

const key = apiKey();
const stream = key ? await identifyViaApi(key) : await identifyViaYtdlp();
console.log(`Stream ${stream.videoId} "${stream.title}"`);
console.log(`Started ${stream.startedAt} · ${stream.seconds}s · identified via ${stream.via}`);

rmSync(WORK, { recursive: true, force: true });
mkdirSync(WORK, { recursive: true });

const candidates = [];
for (const variant of PREFERENCE) {
	const res = await fetch(`https://i.ytimg.com/vi/${stream.videoId}/${variant}.jpg`);
	if (!res.ok) {
		console.log(`  ${variant.padEnd(14)} HTTP ${res.status}`);
		continue;
	}
	const buf = Buffer.from(await res.arrayBuffer());
	const seen = await inspect(buf);
	writeFileSync(join(WORK, `${variant}.jpg`), buf);
	candidates.push({ variant, buf, ...seen });
	console.log(
		`  ${variant.padEnd(14)} ${String(buf.length).padStart(6)}B  ` +
		`bars ${String(seen.box.top).padStart(2)}/${String(seen.box.bottom).padStart(2)}  ` +
		`mean ${seen.mean.toFixed(1).padStart(5)}  stdev ${seen.stdev.toFixed(1).padStart(5)}  ` +
		(seen.reasons.length ? `REJECT: ${seen.reasons.join(', ')}` : 'ok'),
	);
}

// First in preference order that clears the gate. Not "highest scoring": the
// preference order already encodes which sample points are reliable, and a
// score would let a vivid Welcome slide outrank a correctly-exposed room.
const pick = candidates.find((c) => !c.reasons.length);

if (!pick) {
	// Refusing to write is the correct outcome, not a failure to handle.
	// watch.astro renders the flat ink card when live.json has no poster, which
	// is exactly how the card looked before this feature existed. A wrong poster
	// on a church's website is worse than no poster.
	throw new Error(
		`All ${candidates.length} candidates failed the gate. Nothing written; ` +
		`the card falls back to the flat ink panel. Frames kept in ${WORK} for inspection.`,
	);
}

const inner = pick.box.height - pick.box.top - pick.box.bottom;
await sharp(pick.buf)
	.extract({ left: 0, top: pick.box.top, width: pick.box.width, height: inner })
	.resize({ width: POSTER_WIDTH, withoutEnlargement: true })
	.webp({ quality: 78 })
	.toFile(OUT_POSTER);

const posterMeta = await sharp(OUT_POSTER).metadata();
const bytes = statSync(OUT_POSTER).size;

writeFileSync(OUT_JSON, `${JSON.stringify({
	videoId: stream.videoId,
	title: stream.title,
	startedAt: stream.startedAt,
	endedAt: stream.endedAt,
	seconds: stream.seconds,
	poster: '/live-poster.webp',
	posterWidth: posterMeta.width,
	posterHeight: posterMeta.height,
	source: pick.variant,
}, null, '\t')}\n`);

// Every candidate stays in .live-frames/ (gitignored). The pick is automatic
// and nobody signs it off before it ships, so the losers on disk are the only
// way a bad poster is ever explicable afterwards.
console.log(`\nPicked ${pick.variant}, cropped ${pick.box.top}/${pick.box.bottom} of letterbox.`);
console.log(`Wrote ${OUT_POSTER} ${posterMeta.width}x${posterMeta.height}, ${(bytes / 1024).toFixed(1)} KB.`);
console.log(`All ${candidates.length} candidates kept in ${WORK}.`);

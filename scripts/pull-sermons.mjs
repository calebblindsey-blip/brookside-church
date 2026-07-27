/**
 * Rebuilds src/data/sermons.json from the podcast feed.
 *
 * Run after a new sermon is published:  node scripts/pull-sermons.mjs
 *
 * The feed moved off Squarespace in July 2026. Two things changed with it and
 * both are baked into this script:
 *
 *   - Enclosures are now anchor.fm URLs, which are stable. That is what makes
 *     the archive rows on /watch playable at all; the old static1.squarespace
 *     URLs died with the account.
 *   - Anchor emits NO itunes:season and NO itunes:episode. The old feed had
 *     them on all 291 items, but the numbering was incoherent (S2 was 2022 and
 *     S3 was 2020) and no new episode will ever carry one. They are gone from
 *     the data on purpose. Do not reintroduce them from the old snapshot.
 *
 * itunes:duration replaces them. Stored as integer seconds rather than the
 * feed's "00:44:12" string so the page can format it, and so the one 1h17m
 * sermon does not need a special case at the template level.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const FEED = 'https://anchor.fm/s/115652ca8/podcast/rss';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'sermons.json');

/** "00:44:12" and "44:12" both appear in the wild. Seconds either way. */
function toSeconds(raw) {
	const parts = String(raw).trim().split(':').map(Number);
	if (parts.some(Number.isNaN)) return 0;
	return parts.reduce((total, part) => total * 60 + part, 0);
}

/**
 * Pulls the preacher out of the episode description.
 *
 * This is not cosmetic. Roughly one Sunday in five is a guest: 51 of the 247
 * episodes that name a speaker are somebody other than Brad Lindsey (Daniel
 * Howard 23 times, plus Sasha Bragari, Cole Lindsey, Melvin Slotnic and
 * others). /watch used to hardcode "Brad Lindsey" on the most-recent sermon,
 * which credited the pastor for other people's preaching about 20% of the time.
 *
 * Descriptions read "A sermon taught by NAME on ...", so the name ends at the
 * first lowercase word. Returns null rather than guessing when there is no
 * match — 44 episodes name nobody, and the page omits the line instead of
 * inventing an attribution.
 */
function toSpeaker(raw) {
	const text = String(raw ?? '');
	const m = text.match(/taught by ([A-Z][\w.'-]*(?: [A-Z][\w.'-]*){0,2})/);
	if (!m) return null;
	const name = m[1]
		// "Brad Lindsey." carries a trailing period on five episodes.
		.replace(/\.$/, '')
		// One episode reads "taught by Pastor Brad Lindsey". Left alone it renders
		// as a different person from the other 200 "Brad Lindsey" entries.
		.replace(/^(Pastor|Pastors|Rev|Rev\.|Reverend|Bro|Bro\.|Brother|Dr|Dr\.)\s+/, '')
		.trim();
	return name || null;
}

/** Feed dates are RFC 2822. We only ever display the calendar day. */
function toISODate(raw) {
	const d = new Date(raw);
	if (Number.isNaN(d.getTime())) throw new Error(`Unparseable pubDate: ${raw}`);
	return d.toISOString().slice(0, 10);
}

const res = await fetch(FEED);
if (!res.ok) throw new Error(`Feed fetch failed: HTTP ${res.status}`);

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
const items = parser.parse(await res.text()).rss.channel.item;
if (!Array.isArray(items) || items.length === 0) throw new Error('Feed returned no items');

const episodes = items
	.map((item) => {
		const url = item.enclosure?.['@_url'];
		// A row with no audio would render as a play button that does nothing,
		// which is worse than the inert rows this replaced. Fail the build first.
		if (!url) throw new Error(`No enclosure on: ${item.title}`);
		return {
			title: String(item.title).trim(),
			date: toISODate(item.pubDate),
			url,
			seconds: toSeconds(item['itunes:duration']),
			speaker: toSpeaker(item.description),
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date));

const missingDuration = episodes.filter((e) => !e.seconds).length;
if (missingDuration) console.warn(`Warning: ${missingDuration} episode(s) have no duration.`);

// Printed rather than warned: an unnamed speaker is normal, but a sudden jump
// means the description wording changed and the pattern above stopped matching.
const named = episodes.filter((e) => e.speaker).length;
console.log(`Speaker parsed on ${named} of ${episodes.length}; newest is ${episodes[0].speaker ?? 'unnamed'}.`);

const data = {
	total: episodes.length,
	oldest: episodes[episodes.length - 1].date,
	newest: episodes[0].date,
	recent: episodes.slice(0, 6),
	dates: episodes.map((e) => e.date),
	episodes,
};

writeFileSync(OUT, `${JSON.stringify(data, null, '\t')}\n`);
console.log(`Wrote ${episodes.length} sermons, ${data.oldest} to ${data.newest}.`);

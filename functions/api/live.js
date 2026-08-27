/**
 * GET /api/live — "is Brookside streaming right now?"
 *
 * The one Cloudflare Pages Function on this site. Everything else is static
 * HTML; see public/_routes.json, which confines the Worker to /api/*.
 *
 * WHY THIS EXISTS AT ALL
 *
 * The site is built ahead of time, so live state cannot be baked in. The
 * alternatives were a hardcoded Sunday 10:45 time window, which is a guess that
 * is wrong for every funeral, revival and cancelled service, or nothing at all.
 *
 * WHY IT IS A FUNCTION AND NOT AN ASTRO ADAPTER
 *
 * An adapter would make all 9 pages server-rendered and end the pure-static
 * property that wrangler.toml exists to protect. A Pages Function is a separate
 * thing bolted beside the static build: the pages stay static files on the edge
 * and only this path runs code.
 *
 * WHY THE PAGE ASKS US INSTEAD OF ASKING YOUTUBE
 *
 * /watch is a click-to-play facade on purpose — no third-party request and no
 * YouTube cookie until a visitor actually asks for one (see the rationale
 * comment in watch.astro). A browser calling googleapis.com directly would
 * break that and expose the API key. This call is same-origin; we do the
 * talking to YouTube server side.
 *
 * QUOTA, WHICH IS THE THING THAT WOULD SILENTLY BREAK THIS
 *
 * The daily allowance is 10,000 units. playlistItems.list and videos.list cost
 * ONE unit each, so an uncached hit here costs 2. search.list with
 * eventType=live is the answer every tutorial gives and costs 100 — it would
 * blow the budget before lunch on a Sunday. Do not "simplify" this into one
 * search call.
 *
 * The multiplier that is easy to miss: caches.default is PER COLO, not global.
 * At 300s that is ~288 misses per colo per day; across the handful of colos a
 * north-Alabama congregation actually reaches, call it 8, that is ~4,600 units.
 * Inside budget with room for the build script. At 60s it would have been
 * ~23,000 units, i.e. quota exhausted every Sunday morning, and the failure
 * mode is the card silently claiming the church is not live during a service.
 */

const API = 'https://www.googleapis.com/youtube/v3';
const DEFAULT_CHANNEL = 'UCFVvTNQHSyICAekmJdQ47Eg';

/** How many of the newest uploads to inspect. A broadcast appears at position 1
    the moment it starts, so 5 is generous; it exists so a scheduled premiere or
    a same-morning upload landing above it cannot hide the live one. */
const WINDOW = 5;

const OK_TTL = 300;   // edge seconds for a real answer
const FAIL_TTL = 600; // edge seconds for a degraded answer, so a broken key or
                      // an exhausted quota cannot turn into a retry storm
const UPSTREAM_TIMEOUT_MS = 4000;

/** Fixed key so query strings cannot fragment the cache into per-visitor
    entries, each of which would be its own quota hit. */
const CACHE_KEY = new Request('https://brookside-church.invalid/api/live');

function json(body, ttl) {
	return new Response(JSON.stringify(body), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			// max-age is what the visitor's own browser honours and is matched to
			// the page's poll interval; s-maxage is what the edge honours and is
			// what the quota maths above depends on.
			'cache-control': `public, max-age=60, s-maxage=${ttl}`,
		},
	});
}

async function askYouTube(key, channel) {
	const uploads = `UU${channel.slice(2)}`;
	const signal = AbortSignal.timeout(UPSTREAM_TIMEOUT_MS);

	const listRes = await fetch(
		`${API}/playlistItems?part=contentDetails&playlistId=${uploads}&maxResults=${WINDOW}&key=${key}`,
		{ signal, cf: { cacheTtl: OK_TTL, cacheEverything: true } },
	);
	if (!listRes.ok) throw new Error(`playlistItems ${listRes.status}`);
	const ids = (await listRes.json()).items.map((i) => i.contentDetails.videoId);
	if (!ids.length) return { live: false };

	const vidRes = await fetch(
		`${API}/videos?part=snippet,liveStreamingDetails&id=${ids.join(',')}&key=${key}`,
		{ signal, cf: { cacheTtl: OK_TTL, cacheEverything: true } },
	);
	if (!vidRes.ok) throw new Error(`videos.list ${vidRes.status}`);

	// Two independent signals, because they disagree at the edges.
	// liveBroadcastContent flips to 'live' promptly; actualStartTime-without-
	// actualEndTime stays true through the whole broadcast and survives the brief
	// window where snippet data is stale. Either one counts.
	const live = (await vidRes.json()).items.find((v) => {
		const d = v.liveStreamingDetails;
		return v.snippet?.liveBroadcastContent === 'live'
			|| Boolean(d?.actualStartTime && !d?.actualEndTime);
	});

	return live
		? { live: true, videoId: live.id, title: live.snippet?.title ?? null }
		: { live: false };
}

export async function onRequestGet({ env, waitUntil }) {
	const cached = await caches.default.match(CACHE_KEY);
	if (cached) return cached;

	let body;
	let ttl = OK_TTL;
	try {
		const key = env.YOUTUBE_API_KEY;
		// A missing binding is a deploy mistake, not a visitor's problem. It
		// degrades to "not live", which is the card's normal state.
		if (!key) throw new Error('YOUTUBE_API_KEY is not bound to this Pages project');
		body = await askYouTube(key, env.YT_CHANNEL_ID || DEFAULT_CHANNEL);
	} catch (err) {
		// NEVER 500 and never throw. The card treats any failure here as "not
		// live" and keeps showing its poster, so a dead function costs a live
		// badge and nothing else. A 500 would put an error in the console of a
		// church website every time somebody opened /watch.
		body = { live: false, degraded: true, reason: String(err?.message ?? err) };
		ttl = FAIL_TTL;
	}

	const res = json(body, ttl);
	waitUntil(caches.default.put(CACHE_KEY, res.clone()));
	return res;
}

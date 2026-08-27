/**
 * One home for the rule that analytics must never be able to break the site.
 *
 * WHY THIS EXISTS RATHER THAN AN INLINE gtag CALL. Anchors are already covered
 * by the delegated listener in SiteLayout.astro, which catches every tel:,
 * mailto:, maps and data-ga-event link that ever exists. Buttons are not
 * anchors, so the sermon players have to call out by hand, and the moment there
 * is more than one hand-written call site the guard below starts getting
 * forgotten at one of them.
 *
 * THE GUARD. window.gtag is absent whenever an extension, a network block or a
 * privacy browser stops googletagmanager.com loading, which is a meaningful
 * share of real visitors. An unguarded call throws, and a throw inside a click
 * handler takes the rest of that handler with it — the sermon would stop playing
 * because the counting failed. Measurement is allowed to fail. Playback is not.
 *
 * window.gtag is assigned in SiteLayout.astro with an explicit assignment rather
 * than a bare `function gtag()` declaration, precisely so this module can find it
 * on window. See the comment there before changing either half.
 */
declare global {
	interface Window {
		gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void;
	}
}

export function track(name: string, params: Record<string, unknown> = {}): void {
	if (typeof window === 'undefined' || !window.gtag) return;
	window.gtag('event', name, params);
}

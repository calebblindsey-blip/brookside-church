/**
 * The church's own facts, in one place.
 *
 * WHY THIS FILE EXISTS. Before it, the phone number was hardcoded in five
 * separate files and the address and service times in two each. That is not a
 * tidiness complaint: the wrong phone number, (205) 674-6969, is currently
 * published on both Facebook and Yelp, and YellowPages and DisciplePair list the
 * church in Graysville rather than Brookside. A fact with five copies is a fact
 * that drifts, and structured data was about to become a sixth copy.
 *
 * SOURCING RULE, inherited from church-facts.md in the Compass repo: everything
 * here is confirmed by someone at the church, and anything not confirmed stays
 * out. An earlier draft of this site asserted an invented 1948 founding year, a
 * borrowed schoolhouse and four building expansions, all of which had to be
 * deleted. Do not add a field here because it would be convenient for schema.org
 * to have one.
 *
 * Deliberately absent, each for a reason:
 *   foundingDate  Nobody at the church knows the year. Better absent than
 *                 invented, and this is the exact field that went wrong before.
 *   geo           Latitude and longitude are not in church-facts.md. They could
 *                 be derived from the address, but a derived coordinate that is
 *                 wrong puts the church on the wrong pin, and no one would
 *                 notice. Add when someone confirms them.
 *
 * (The Wednesday end time was the third of these until 2026-08-24, when Caleb
 * Lindsey confirmed 7:30 PM. He is Worship Pastor, so that is first-party staff
 * confirmation rather than hearsay, and it is recorded in church-facts.md.)
 */

export const CHURCH = {
	name: 'Brookside Church of God',
	/** Apex, not www. Decided 2026-07-28; astro.config.mjs `site` matches. */
	url: 'https://brooksidechurchofgod.com',

	street: '200 Cardiff Street',
	locality: 'Brookside',
	region: 'AL',
	postalCode: '35036',
	country: 'US',
	/** One line, for display. */
	get addressLine(): string {
		return `${this.street}, ${this.locality}, ${this.region} ${this.postalCode}`;
	},

	/** Display form. The Facebook and Yelp listings carry (205) 674-6969, which is wrong. */
	phone: '(205) 675-0703',
	/** E.164, for tel: hrefs and schema.org. */
	phoneHref: 'tel:+12056750703',
	phoneE164: '+1-205-675-0703',

	/** Facebook publishes brooksidecog@gmail.com. This is the one to use. */
	email: 'info@brooksidecog.com',
	get emailHref(): string {
		return `mailto:${this.email}`;
	},

	/**
	 * The church's own names for these, not "Sunday service" and "Bible study".
	 * Morning Worship runs to around 12:15 PM.
	 */
	gatherings: [
		{ day: 'Sunday', name: 'Sunday School', time: '9:45 AM' },
		{ day: 'Sunday', name: 'Morning Worship', time: '10:45 AM' },
		{ day: 'Wednesday', name: 'Wednesday Classes', time: '6:30 PM' },
	],

	/**
	 * Both spans have both ends sourced, which is the bar for appearing here.
	 * Sunday 9:45 AM to around 12:15 PM; Wednesday 6:30 to 7:30 PM (the end time
	 * confirmed by Caleb Lindsey, Worship Pastor, 2026-08-24). Inventing an end
	 * time to make the markup look complete is the failure mode church-facts.md
	 * exists to prevent, so a gathering with an unconfirmed end stays out.
	 */
	openingHours: [
		{ days: ['Sunday'], opens: '09:45', closes: '12:15' },
		{ days: ['Wednesday'], opens: '18:30', closes: '19:30' },
	],

	profiles: [
		'https://facebook.com/BrooksideChurchofGod',
		'https://instagram.com/brooksidechurchofgod',
		'https://www.youtube.com/@brooksidechurchofgod',
	],

	/** The line under the name on the lockup, and the site's one-sentence self-description. */
	tagline: 'Preaching Christ crucified.',

	/** Where the sermon podcast is listed. The feed itself is in sermons.json. */
	applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/id1094539094',
	spotifyUrl: 'https://open.spotify.com/show/6KxGfsUUCpUN6xyVMPEy76',

	mapsUrl:
		'https://www.google.com/maps/search/?api=1&query=200+Cardiff+Street+Brookside+AL+35036',
} as const;

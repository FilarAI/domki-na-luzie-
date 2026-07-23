# Local SEO Audit — domkinaluzie.pl

Business type: brick-and-mortar destination lodging (3 cabins), Spytkowice 103, 34-745 Spytkowice (gmina Spytkowice, powiat nowotarski, Podhale/Beskidy). Vertical: hospitality / short-term rental.

## What works
- NAP text is identical everywhere it appears on-site: name "Domki na Luzie", phone `+48605744722` / displayed `605 744 722` / `+48 605 744 722`, address "Spytkowice 103, 34-745 Spytkowice" — nav (`index.html:3281-3314`), footer (`index.html:5328,5339,5422`), `LodgingBusiness` JSON-LD (`index.html:2882-2891`), `TouristAttraction` JSON-LD (`index.html:3077-3084`). No formatting drift beyond expected `tel:` vs display differences.
- Real Booking.com listing confirmed live and indexed: `https://www.booking.com/hotel/pl/domki-na-luzie.pl.html` — title "DOMKI NA LUZIE w górach PREMIUM, dla dorosłych i młodzieży, Spytkowice".
- Booking.com syndication network (partner ID BG.60490) independently confirms the address as exactly "Spytkowice 103, Spytkowice, Poland" and a 9.6/10 score (checked via `gosciniecsliwkula.pl/noclegi/spytkowice/.../60490`) — matches the site's on-page "9.6/10 Booking.com" claim.
- Real Facebook and Instagram profiles exist and are linked consistently in JSON-LD `sameAs` and footer: `facebook.com/profile.php?id=61550240939110`, `instagram.com/domki_na_luzie/`, `tiktok.com/@domki.na.luzie`.
- Strong geo-intent FAQ content targeting exactly the right long-tail queries: distance to Zakopane, Kraków, ski slope, Termy Gorący Potok (`index.html:2941-3011`), reinforced by 5 dedicated blog posts covering ski slope, thermal spas, Babia Góra hiking, pool/jacuzzi, and romantic-weekend intents — this already IS the "dedicated topic page" strategy that matters more than fake multi-location pages for a single-property business.
- Both winter (ski slope 1 km, heated pool, year-round jacuzzi) and summer (hiking, thermal spas, horse riding) seasonal intents are addressed on-page and in FAQ/schema.

## Critical / High findings

**Title: JSON-LD `GeoCoordinates` and the embedded Google Map point to the wrong village — ~5-8 km off, in a different gmina**
- **Severity:** Critical
- **Evidence:** `index.html:2895-2896` and `index.html:3087-3088` both give `"latitude": "49.6234", "longitude": "19.7183"`; the footer map iframe (`index.html:5413`) uses the same pair (`2d19.7183!3d49.6234`). I geocoded the actual postal address independently via OpenStreetMap Nominatim: `Spytkowice 103, 34-745 Spytkowice` → **49.5728645, 19.8004915** (gmina Spytkowice, powiat nowotarski — matches the 34-745 postcode). Reverse-geocoding the coordinates actually used on the site (49.6234, 19.7183) resolves to an **isolated dwelling near "Podleśna", Sidzina, gmina Bystra-Sidzina, powiat suski, postcode 34-236** — a different village, different commune, different postal code, ~8 km away. Both queries run 2026-07-23 against `nominatim.openstreetmap.org`.
- **Impact:** the on-page map users see (and any AI/LLM or rich-result system that trusts structured `geo` over the address string) shows a pin roughly 8 km from the real cabins. This directly undercuts the "1 km from the ski slope" / "500 m from the riding centre" proximity claims that are the site's strongest local differentiator, and is the kind of error that erodes trust once a guest actually drives there.
- **Recommendation:** get the real coordinates from Google Maps (right-click the actual pin on Spytkowice 103 → copy coordinates, or use Google's own "Share → Embed a map" flow from the verified GBP listing) and replace in both JSON-LD blocks and the iframe `src`. Target 5-decimal precision (~1 m), e.g. `"latitude": "49.57286", "longitude": "19.80049"` (verify against the real pin, don't copy this value blindly — it's a geocoder estimate, not a GPS survey of the building).

**Title: Google Maps embed URL contains a fabricated/placeholder Place ID (CID)**
- **Severity:** High
- **Evidence:** `index.html:5413` — `!1s0x4715e4be7f8b5c0f%3A0x123456789!` The second half of a real Google CID is a 16-hex-digit number; `0x123456789` is a 9-digit round sequence, not a value Google's "Embed a map" UI would ever generate. Combined with the wrong coordinates above, this embed was not produced by pulling a real share link from the business's actual Google Maps listing.
- **Recommendation:** regenerate the embed from Google Maps directly (Maps → search the real listing → Share → Embed a map → copy iframe) so the CID ties to the real, verified GBP place ID, not a hand-typed URL.

**Title: Contradictory travel-time claims for "Termy Gorący Potok" across the same page**
- **Severity:** High
- **Evidence:** Three different figures for the identical destination on one URL: attraction card `index.html:4854` says **"~20 min"**; FAQ schema `index.html:3009` and visible FAQ `index.html:5244` say **"20-25 minut jazdy" / "20 minut jazdy"**; the embedded blog article on the same page, `index.html:5940`, says **"około 45 km, co przekłada się na mniej więcej 40 minut jazdy"** for "Termy Gorący Potok — Szaflary". Given Zakopane itself is stated elsewhere as 40 km / 30-35 min and Szaflary is beyond Zakopane on the same road, the ~40 min/45 km figure is the plausible one; the "20 min" figures elsewhere look understated.
- **Recommendation:** pick one verified time/distance (drive it or check Google Maps directions from the real address) and use it consistently in the attraction card, both FAQ instances, and the blog copy. Conflicting facts on the same page are a specific liability for AI answer engines, which will surface whichever number they crawl first as fact.

**Title: No link to the business's Google Business Profile / "leave a Google review" URL anywhere on-site**
- **Severity:** Medium
- **Evidence:** Site displays a "Google 4.9/5" trust badge in the hero (`index.html:3390`) and pulls Google-attributed review text into the Review JSON-LD (`index.html:3106-3143`, `publisher: "Google"`), but grepping the full `index.html` for `g.page`, `maps.app.goo.gl`, or any Google Maps place link returns nothing — only the (mis-pointed) embed iframe. There is no direct CTA to leave a Google review.
- **Recommendation:** add a short `g.page/r/.../review` link (generated from the real GBP dashboard) in the footer and post-stay confirmation email/thank-you flow. Sterling Sky's "18-day rule" means Google local-pack rankings degrade if no fresh review lands in a ~3-week window — a one-tap review link is the cheapest lever against that cliff, and it can't be produced until the correct GBP listing above is confirmed/fixed.

**Title: Third-party OTA aggregator listing shows a materially different property description and an unrelated phone number**
- **Severity:** Medium
- **Evidence:** `https://meteor-turystyka.pl/naluzie-spytkowice,spytkowice.html` — business name "DOMKI NA LUZIE Luksusowe domki z basenem dla dorosłych", address only "Spytkowice, Rabka-Zdrój, małopolskie" (no street number), and phone **692 147 608** — does not match the site's official `605 744 722`. Separately, `https://hotelcynamon.pl/hotel/domki-na-luzie/` lists the property as "two year-round cottages accommodating up to 8 guests each" with "10/10 based on 57 reviews" — both details conflict with the real property (3 cabins, 2-4 guests each, 9.6/10 on Booking per the site's own claim). I could not confirm whether these are stale scrapes, a different property that shares the name, or third-party data errors — flagging for manual owner verification since a wrong phone number on a public directory actively misdirects callers.
- **Recommendation:** owner should open both listings, verify/claim them, correct the phone number and unit count, or request removal if they in fact describe an unrelated property.

## Medium / Low findings

**Title: No `openingHoursSpecification` or `priceRange` in the `LodgingBusiness` schema**
- **Severity:** Low
- **Evidence:** `grep -n -i "openingHours\|priceRange" index.html` returns no matches. Site does state check-in 15:00 / check-out 11:00 in visible footer text (`index.html:5366-5376`) but this is not in schema form.
- **Recommendation:** for a 3-cabin operation that's open year-round with no fixed "business hours" in the retail sense, `openingHoursSpecification` is low value — skip it. `priceRange` (e.g. `"€€€"` or a PLN band) is worth adding since it's a recognized `LodgingBusiness` property and cheap to add.

**Title: Homepage `<title>` omits the specific place name**
- **Severity:** Low
- **Evidence:** `index.html:17` — `Domki na Luzie - Prywatne domki premium w Beskidach | Basen, Jacuzzi`. Covers the region ("Beskidach") but not "Spytkowice".
- **Recommendation:** low priority — "Beskidy" carries far more search volume than "Spytkowice" for this audience, and FAQ/body copy already carries the exact address for local-pack matching. Not worth burning title-tag space unless local-pack testing shows a gap.

## Citations — Tier 1 / vertical-relevant platforms (checked 2026-07-23, free/public access only)
| Platform | Status | Evidence |
|---|---|---|
| Booking.com | **Present** | `booking.com/hotel/pl/domki-na-luzie.pl.html`, confirmed via search index; page itself blocked direct scraping (bot-challenge, HTTP 202 JS gate) so live score/review count could not be re-verified beyond the syndicated 9.6/10 seen on the affiliate network. |
| Facebook | **Present** | `facebook.com/profile.php?id=61550240939110`, linked from site; page category/rating not verifiable (Facebook blocks unauthenticated fetch of full profile). |
| Instagram | **Present** | `instagram.com/domki_na_luzie/`, linked from site. |
| TikTok | **Present** | `tiktok.com/@domki.na.luzie`, linked from site. |
| Google Business Profile | **Not verifiable, and site gives no direct link to it** | No `g.page`/Maps place link anywhere on-site; can't confirm claimed/verified state, category, or live rating without Google Business Profile API access. The 4.9/5 badge implies a live profile exists but this could not be independently confirmed. |
| TripAdvisor | **Not found in a quick check** | Search attempt did not surface a listing; not conclusive (TripAdvisor's own search is JS-rendered and blocked deeper crawling). Worth the owner checking/claiming directly. |
| noclegi.pl | **Inconclusive** | Search page loaded but result content is JS-rendered; could not confirm presence or absence. |
| Booking-syndicated regional directory network (gosciniecsliwkula.pl, cichydwor.pl, grosik-leba.pl, lunazakopane.pl, sloneczna-osada.com) | **Present, low individual value** | All 5 mirror the same Booking partner feed (ID 60490) with identical copy — this is one syndicated network, not 5 independent citations. Fine as-is, no action needed beyond what Booking already provides. |
| meteor-turystyka.pl, hotelcynamon.pl | **Present but data conflicts with real NAP** | See High/Medium finding above — needs owner verification/correction. |
| Yelp | Not applicable | Yelp has negligible presence/usage in the Polish market; not worth pursuing. |

## Reviews & reputation
- On-page claims: "Booking 9.6/10" and "Google 4.9/5" (hero badge, `index.html:3390,3395`; trust bar `index.html:3421`). Booking 9.6/10 is corroborated by the independent syndicated-network snapshot above. Google 4.9/5 **could not be independently verified** — no Google Maps/GBP link on-site to check against, and Google's Maps/Search pages redirect through a consent wall that blocks automated fetch in this environment.
- 8 Review-schema entries are hardcoded into JSON-LD (`index.html:3102-3184`), attributed to named individuals and platforms (Google/Booking.com), dated 2024-04 through 2025-11. These read as real, specific guest testimonials (not generic filler) — good practice for building topical trust signals, but freshness has a gap: the newest dated review is 2025-11-01, and today is 2026-07-23 — **~8.5 months with no dated review added to the schema**, which is well past the 18-day freshness window Whitespark/Sterling Sky flag as a ranking-risk threshold, at least for what's reflected in code. This doesn't necessarily mean no real reviews have landed on Google/Booking in that window — only that the on-site schema hasn't been refreshed to reflect them.
- No visible on-site mechanism (form, QR code reference, post-stay email copy) for soliciting new reviews — see "no GBP review link" finding above.

## Location page strategy
- Straight answer: **do not build more location pages.** This is a single physical address with 3 cabins on one plot — additional "domki [nearby town]" pages would have no distinct NAP, no distinct offering, and would fail Google's own doorway-page test (same address, same phone, same booking link, different city name in the H1). That's a thin-content/doorway risk, not an opportunity.
- What the site is correctly doing instead is topic/intent pages (5 blog posts covering ski, thermal spas, hiking, romance, pool/jacuzzi buying-guide) tied back to the one real address — this is the right substitute for "dedicated service pages," which Whitespark ranks as the #1 local-organic and #2 AI-visibility factor. Keep investing here, not in fake locations.

## Seasonality
- Winter: covered — dedicated blog post (`blog/stok-narciarski-beskid-spytkowice.html`), FAQ entries on ski slope distance and winter operation, jacuzzi marketed as "całoroczne" (year-round, `index.html:4143`).
- Summer: covered — Babia Góra hiking post, thermal spa post, horse-riding attraction card.
- Gap: the pool is explicitly labeled "Basen sezonowy" (seasonal, `index.html:4123`) while the jacuzzi is "całoroczne" — this distinction is never spelled out for winter searchers ("is the pool open in winter?" isn't in the FAQ, only "is the object open year-round?"). Worth a one-line FAQ addition clarifying pool operating months vs. jacuzzi, since it's exactly the kind of question a winter-intent searcher or AI answer engine would ask.

## Not verified
- Exact current Google Business Profile category, claim/verification status, live review count, and Q&A activity — no API access and Google Search/Maps pages redirect through a consent wall this environment cannot pass.
- Live Booking.com review count/score at time of writing — booking.com blocks automated fetches with a JS bot-challenge (confirmed HTTP 202 challenge page). Only the syndicated-network snapshot (9.6/10, 19 reviews at last partner-feed sync) could be checked, which may lag the live listing.
- TripAdvisor, noclegi.pl, and other Polish noclegi portals (e-turysta.pl, Airbnb, Panorama Firm, targeo.pl) — searches attempted but results were JS-rendered/inconclusive; needs manual login-free browser check or paid citation-tracking tool to confirm presence/absence definitively.
- Facebook/Instagram page category, address, and rating fields — blocked by Meta's unauthenticated-fetch restrictions.

SCORE: 58
The address text (NAP) is clean and consistent everywhere on-site and matches the real Booking.com listing, and the topic-page strategy is the right call for a single-location business — but a wrong geo pin (map + schema, ~8 km off in the wrong commune), a fabricated Maps CID, internally contradictory travel-time claims, no GBP review link, and unverifiable Google/GBP signals are exactly the kind of concrete, fixable defects that cap this well below a passing score.

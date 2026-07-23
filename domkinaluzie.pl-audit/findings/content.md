# Content Quality & E-E-A-T — domkinaluzie.pl

## What works
- Real named owner ("Ewa") with a genuine origin story in the `#about` section (index.html:3921-3946) — founded 2024, philosophy, a direct guest quote naming her. This is a real, if thin, Experience/Trust signal for a 3-cabin business.
- FAQPage schema (index.html:2940-3013) and matching visible FAQ accordion (index.html:5151-5261) are consistent with each other — no schema/visible-content mismatch there.
- The 5 real blog posts (not the hidden ones) are genuinely useful: concrete distances, trail times, price ranges, comparison tables, and FAQ sections that answer real search intent rather than padding word count.
- `domki-z-basenem-jacuzzi-beskidy.html` links directly to `https://www.booking.com/hotel/pl/domki-na-luzie.html` (line 247) — one real, clickable, verifiable rating source. This is the exception; most rating mentions are not linked (see finding below).
- Reviews are attributed to first-and-last-name or first-name+initial real-sounding guests with dates, not generic "J. Kowalski" placeholders (index.html:3108-3183).
- Blog posts carry real `datePublished`/canonical/OG tags and internal breadcrumbs back to the homepage — decent basic hygiene for a 3-cabin operator.

## Findings

**H1 has zero keyword or geo targeting**
Severity: High
Evidence: index.html:3347-3351 — the only H1 on the homepage is: `Miejsce dla par,<br />lub grupy przyjaciół.<br /><span>- domki premium</span>`, rendering as "Miejsce dla par, lub grupy przyjaciół. - domki premium". No mention of "Beskidy", "basen", "jacuzzi", "Spytkowice", or any location/amenity term anywhere in the tag.
Recommendation: Keep the emotional framing but fold in the terms guests actually search: e.g. `Domki premium z basenem i jacuzzi w Beskidach<br /><span>— dla par i grup przyjaciół, Spytkowice</span>`. This single change does more for both classic SEO and AI-citation matching ("domki z basenem Beskidy", "domki na wynajem Spytkowice") than any other on-page fix.

**Hidden crawler-only text block — duplicate content, cloaking risk**
Severity: Critical
Evidence: index.html:5933-6013. A div styled `position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);` with `aria-hidden="true"`, explicitly commented `<!-- GEO: Static blog content for AI crawlers (hidden visually, indexable by bots) -->`, contains five full `itemscope itemtype="https://schema.org/Article"` articles (~1,000+ words total: `static-blog-termy`, `static-blog-babia`, `static-blog1`, `static-blog2`, `static-blog3`). The `static-blog-termy` and `static-blog-babia` articles are near-verbatim duplicates of the real, visible, indexable pages `/blog/termy-spa-okolica-beskidy.html` and `/blog/babia-gora-szlaki-porady.html` (compare index.html:5938-5944 to termy-spa-okolica-beskidy.html:299-353 — same distances, same prices, same sentence structure). The other three (`static-blog1/2/3`) have no real URL at all — their JSON-LD `mainEntityOfPage` (index.html:3221-3249) points to `#static-blog1` etc. on the homepage, not a real page.
Impact: This is visually-hidden-but-crawler-visible content, which is the textbook pattern Google's spam policies define as cloaking/hidden text regardless of stated intent ("for AI crawlers" doesn't exempt it from Googlebot, which reads the same HTML). It also actively muddies what the homepage is "about" for any text extractor (trafilatura, LLM readers, etc.) — content-first extraction of index.html surfaces thermal-spa and Babia Góra trail copy ahead of/alongside the cabin business itself, and duplicates content that already lives on canonical blog URLs.
Recommendation: Delete this entire hidden block. It provides no benefit that isn't already served by the real, visible, indexed blog posts and the FAQ schema. If the goal was giving AI crawlers more structured facts about the property itself, add that as visible, on-page content (e.g., expand `#about`) — not as a hidden duplicate of other pages.

**Ratings displayed without a link to their source (Google, and 3 of 4 Booking mentions)**
Severity: Medium
Evidence: The hero trust badge (index.html:3374-3397) and trust bar (index.html:3410-3423) both display "Google 4.9/5" and "Booking 9.6/10" as plain `<div>`/`<span>` text with no `<a href>`. Footer social links (index.html:5289-5313) go to Facebook/Instagram/TikTok but there is no link to a Google Business Profile or Booking.com listing anywhere in the footer, nav, or trust sections. The Google Maps embed (index.html:5411-5416) uses what appears to be a placeholder CID (`0x123456789`) rather than a real Google Place ID. The one exception is `blog/domki-z-basenem-jacuzzi-beskidy.html:247`, which does link the Booking.com claim to `https://www.booking.com/hotel/pl/domki-na-luzie.html`.
Recommendation: Make the homepage hero badge, trust bar, and footer ratings clickable straight to the live Google Business Profile and the real Booking.com listing URL. This is a one-line `<a href>` wrap per badge and it is the single highest-leverage trust fix on the page — an unlinked "9.6/10" is an assertion; a linked one is evidence.

**Rating/review-count inconsistency across pages**
Severity: Low
Evidence: Homepage `AggregateRating` schema (index.html:2898-2904) states `ratingValue: 9.6`, `ratingCount: 50` (no platform breakdown, so unclear if 50 = Booking.com only or combined). `blog/domki-z-basenem-jacuzzi-beskidy.html:247` states "9.6/10 na Booking.com (63 opinie), 4.9/5 w Google (45 opinii)" — 63+45=108, which doesn't reconcile with the schema's 50.
Recommendation: Pick one true source of numbers (ideally pulled live from Booking/Google, not hand-typed) and make schema and blog copy match. Inconsistent counts are exactly the kind of thing that erodes trust if a reader or an AI system cross-checks two pages.

**Hero subtitle typo still live: "młodziey"**
Severity: Low
Evidence: index.html:3353 — `<p class="hero-subtitle">dla dorosłych i młodziey 12+</p>`. Confirmed still live in the current source; should read "młodzieży".
Recommendation: One-word fix: `młodziey` → `młodzieży`.

**Homepage word count is inflated by boilerplate, not topical prose**
Severity: Info
Evidence: content_quality.py on `index.html` reports 20,853 tokens / 2,559 unique tokens with a `repetitive` flag (repetition_score 35) — driven largely by the repeated package-bullet SVG/text blocks (index.html:3602-3762, four nearly identical package cards) and the hidden static-blog block above. Actual unique running prose on the homepage (hero, trust bar, gallery captions, for-who cards, about section, amenities, FAQ) is a few hundred words of real copy; the rest is UI chrome and the hidden duplicate block.
Recommendation: Not a ranking-minimum problem (homepage clears any reasonable floor once the hidden block is removed) — flagging so the client doesn't mistake raw token count for topical depth. The `#about` section (140 words) is the thinnest genuinely-visible content block on the page and would benefit from expansion (see Content gaps below).

**Content gaps realistic for a 3-cabin operator**
Severity: Medium
Evidence: Site inventory is homepage + 5 blog posts + regulamin + polityka-prywatnosci (per CONTEXT.md). No dedicated pages exist for:
- An individual cabin/room page or gallery-with-floorplan (all 3 cabins are described identically as "40 m², 2-4 osoby" with no per-cabin distinction, photos, or names — a guest can't tell if the 3 units differ).
- A real "O nas" page beyond the 140-word homepage section — no owner photo, no second name, no "why we started this," no local-supplier/sourcing story that would give AI-citation systems something concrete to attribute to a named person.
- A blog index/hub page (confirmed in CONTEXT.md as absent) — the 5 posts exist only as homepage carousel cards and direct URLs; no `/blog/` listing page for crawlability or for a returning reader to browse everything.
- A cancellation/refund-specific FAQ page beyond the one FAQ line about the 30% non-refundable deposit — no clear written cancellation policy page (regulamin.html should be checked separately, but nothing links to it from the FAQ answer itself, index.html:5217-5222).
Recommendation: Given the scale (3 cabins), don't over-build. The two highest-value additions are: (1) per-cabin identity (names/photos/any real differences) so both guests and AI assistants can answer "which cabin should I book," and (2) a slightly expanded `#about` with a second real detail (a photo of Ewa, how the cabins were built, what makes the jacuzzi/pool specifically different) — this directly strengthens Experience and Expertise, the two weakest E-E-A-T legs here.

**Utility pages (regulamin, polityka-prywatnosci) — not evaluated as thin**
Severity: Info
Evidence: Not read in full detail during this pass; per CONTEXT.md they are utility/legal pages, which are exempt from the topical-depth minimums that apply to commercial/blog content. content_quality.py scored them 92/94 with no flags.
Recommendation: No action needed for content-quality purposes; standard legal-page treatment applies (accuracy of terms is a legal/compliance question outside this audit's scope).

## Blog post verdicts (one line each)

- **`babia-gora-szlaki-porady.html`** — Strong, genuinely useful trail guide with real distances/times/difficulty per route and a solid FAQ; best post on the site.
- **`termy-spa-okolica-beskidy.html`** — Strong comparison content (3 spas, tables, prices, distances) that answers real intent, undermined only by being duplicated in the hidden homepage block.
- **`domki-z-basenem-jacuzzi-beskidy.html`** — Good commercial-intent post (private vs shared pool comparison, 7-point checklist) and the only place with a real linked Booking.com citation; slightly self-promotional but factually grounded.
- **`romantyczny-weekend-dla-dwojga-beskidy.html`** — Solid seasonal/itinerary content with real nearby attractions and distances; reads a bit like a template reused across posts (same FAQ cadence, same CTA block) but not thin.
- **`stok-narciarski-beskid-spytkowice.html`** — Useful and concrete (prices, distances table, rental/school info) but the shortest and thinnest of the five; would benefit from one more section (e.g., what to do on a non-ski day, or a specific "beginner day itinerary").

## AI citation readiness — examples

**Works well (self-contained, quotable, factual):**
- "Termy Gorący Potok w Szaflarach to najbliższy duży kompleks termalny od Domków na Luzie — około 45 km, co przekłada się na mniej więcej 40 minut jazdy." (termy-spa-okolica-beskidy.html:301) — distance + time + named place, fully self-contained.
- "Minimalna liczba nocy to 2. W pakiecie SLOW (z dostępnym śniadaniem) pobyt odbywa się od niedzieli do piątku." (FAQPage schema, index.html:3003-3004) — a clean, quotable policy fact.
- "Stok narciarski w Makowie Podhalańskim jest oddalony ok. 1 km od Domków na Luzie" (FAQPage schema, index.html:2998-2999) — concrete, verifiable-style distance claim, repeated consistently across homepage and the ski blog post.

**Needs rewriting (vague, unattributed, or inconsistent):**
- "9.6/10 na Booking.com" and "4.9/5" in the hero/trust bar (index.html:3390-3395) — a number with no link and no review count is not citable as fact by an AI system trying to verify it; needs the `<a href>` fix above plus a consistent count.
- The `static-blog1/2/3` hidden-block claims (index.html:5971-6012) are generic filler ("Beskidy to jeden z najpiękniejszych regionów górskich w Polsce...") with no numbers, names, or verifiable specifics — not citable and should be deleted per the finding above, not rewritten.

## Score
SCORE: 58
Real strengths exist (a named owner, genuinely useful long-form blog content, consistent FAQ schema, one real Booking.com link) but they're undercut by a Critical hidden-text/duplicate-content block, a keyword-blank H1, and ratings asserted without a single verifiable link on the homepage — all high-leverage, low-effort fixes for a small operator.

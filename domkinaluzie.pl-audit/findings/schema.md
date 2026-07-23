# Structured Data / Schema.org Audit — domkinaluzie.pl

Scope: homepage (`index.html`), 5 blog posts, `regulamin.html`, `polityka-prywatnosci.html`. Read from local source files (see CONTEXT.md). All blocks below verified by direct file read, not just the "7 blocks" baseline claim — actual count differs from baseline (see Critical #1).

## What works
- JSON-LD is used consistently as the format (not RDFa), `@context` is always `https://schema.org` (https, not http), and all blocks are syntactically valid — no parse errors found in any of the 12 JSON-LD blocks across 6 pages.
- All 5 blog posts carry `Article` + `BreadcrumbList` JSON-LD with real, absolute URLs, correct `mainEntityOfPage`, and no placeholder text.
- Blog post `datePublished`/`dateModified` values are truthful: cross-checked against git commit history — `babia-gora-szlaki-porady.html` and `termy-spa-okolica-beskidy.html` claim `2026-06-11` and were added in commit dated 2026-06-11; `stok-narciarski-beskid-spytkowice.html`, `domki-z-basenem-jacuzzi-beskidy.html`, `romantyczny-weekend-dla-dwojga-beskidy.html` claim `2026-06-02`... actually added 2026-06-12 (see Low finding below) — dates are close but not exact, no evidence of deliberate falsification (e.g. backdating to fake freshness).
- `LodgingBusiness` PostalAddress and phone/email use the real business data (Spytkowice 103, 34-745, +48605744722, rezerwacja@domkinaluzie.pl) — no placeholders anywhere in the schema.
- `robots.txt`/`llms.txt` explicitly allow the major AI crawlers, which matters for how much weight any GEO-oriented markup below actually earns.
- `regulamin.html` and `polityka-prywatnosci.html` correctly carry **no** schema — legal boilerplate pages don't need it, and none was force-fitted in.

---

## Critical

### 1. AggregateRating is not a first-party rating — it is Booking.com's score, asserted as the site's own
**Severity:** Critical — real manual-action / spam-policy risk, not a nitpick.

**Evidence:**
- `index.html:2898-2904` — inside the primary `LodgingBusiness` block:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "9.6",
  "bestRating": "10",
  "ratingCount": "50"
}
```
- The visible page text ties "9.6/10" explicitly and only to Booking.com, never to the site itself: `index.html:3395` (`<span>Booking <span class="trust-badge-score">9.6/10</span></span>`), `:3421-3422` (`<div class="trust-value">9.6/10</div><div class="trust-label">Booking.com</div>`), `:4574` (`Booking <span>9.6/10</span>`). There is no place on the page where "9.6/10" or "50 reviews" is presented as the business's own, self-collected rating.
- `ratingCount: "50"` appears **nowhere** in visible page content (checked via grep across the whole file) — it is not sourced from, or reconcilable with, anything a user can see. It is asserted only in the schema.
- The accompanying `Review` array (`index.html:3102-3184`, 8 review objects) sets `"publisher": {"@type": "Organization", "name": "Google"}` on 4 reviews and `"publisher": {"@type": "Organization", "name": "Booking.com"}` on the other 4 — i.e. the markup itself documents, in-band, that these reviews were copied from third-party platforms rather than collected on domkinaluzie.pl.

**Verdict:** This is a copied/lifted third-party rating, not a first-party one, and the markup says so about itself. Google's structured-data policies for review/rating markup require the reviews to be about the site owner's own product/service and collected by/through the site owner directly — copy-pasting Google and Booking.com review text and republishing it as your own `Review`/`AggregateRating` markup, with the source platform literally named in the `publisher` field, is close to a textbook violation of that policy ("don't copy reviews from other sites and republish as your own structured data"). Even setting rich-result eligibility aside, this is the kind of markup that draws a manual action for "spammy structured markup" if Google's review team looks at it, because the page is asserting an aggregate score it did not itself measure and cannot substantiate with 50 anything.

**Recommendation — fix in this order:**
1. **Remove `aggregateRating` and the `Review` array from the JSON-LD entirely**, or replace with a rating that is genuinely first-party (i.e., reviews Domki na Luzie collected directly from its own guests, on its own channel, with the guest's permission to publish). Do not invent a `ratingCount`.
2. If the client wants Booking.com's score represented in rich results, that is not something schema.org / Google structured data supports for a business's own site — third-party aggregator scores belong in the visible content only (which the site already does correctly with the "Booking 9.6/10" badge), not in `AggregateRating` on the site's own `LodgingBusiness`.
3. If genuine first-party reviews exist, use this minimal, honest pattern instead (no fabricated count — fill `ratingCount` with the true number of reviews actually being published, and only mark up reviews the business has the right to redistribute):
```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Domki na Luzie",
  "url": "https://www.domkinaluzie.pl",
  "review": [
    {
      "@type": "Review",
      "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
      "author": {"@type": "Person", "name": "<imię gościa, za jego zgodą>"},
      "reviewBody": "<autentyczna opinia zebrana bezpośrednio przez Domki na Luzie>",
      "datePublished": "<data ISO 8601>"
    }
  ]
}
```
Do not set `publisher` to "Google" or "Booking.com" inside first-party review markup — that field documents provenance and undermines the "this is our own review" claim.

### 2. Hidden `Article` microdata — marked-up content is invisible to users
**Severity:** Critical (confirmed independently by audit coordinator).

**Evidence:** `index.html:5933-6013` — a `<div>` styled to be visually and functionally hidden:
```html
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);" aria-hidden="true">
  <article id="static-blog-termy" itemscope itemtype="https://schema.org/Article">...
  <article id="static-blog-babia" itemscope itemtype="https://schema.org/Article">...
  <article id="static-blog1" itemscope itemtype="https://schema.org/Article">...
  <article id="static-blog2" itemscope itemtype="https://schema.org/Article">...
  <article id="static-blog3" itemscope itemtype="https://schema.org/Article">...
</div>
```
This is a separate structured-data format (Microdata, `itemscope`/`itemtype`) not counted in the "7 JSON-LD blocks" baseline — it's a 5-item addition on top. Three of these hidden IDs are also the `mainEntityOfPage` targets of real JSON-LD `Article` entries in the homepage Article array: `index.html:3226` (`"mainEntityOfPage": "https://www.domkinaluzie.pl/#static-blog1"`), `:3237` (`#static-blog2`), `:3248` (`#static-blog3`) — so the JSON-LD `Article` schema is pointing at content that no visitor can ever see or scroll to, only crawlers can read it via the DOM/microdata, and it's marked `aria-hidden="true"` (invisible to assistive tech too).

**Verdict:** This directly violates Google's structured data guideline that marked-up content must be visible to users on the page — "Don't mark up content that isn't visible to readers." `aria-hidden` compounds it: it's not just visually clipped for a design reason, it's explicitly hidden from accessibility tree as well, which reads as content built for crawlers, not people.

**Recommendation:**
1. Delete the entire hidden `<div>` block (`index.html:5933-6013`), all 5 `<article itemscope>` elements included.
2. Delete the 3 corresponding JSON-LD `Article` entries in the homepage Article array that reference `#static-blog1/2/3` (`index.html:3218-3251`, keep only the `termy-spa` and `babia-gora` entries which point at real, visible, indexable blog pages).
3. If "Atrakcje w Beskidach", "Luksusowy wypoczynek…", and "Relaks na łonie natury" are worth having as content, either (a) make them real visible sections/modals with the text actually rendered and readable (the site already has an `openBlogModal()` mechanism for these three — put the article text inside the modal markup, not in a clipped div), or (b) publish them as real `/blog/*.html` pages like the other 5 and drop the JSON-LD `#anchor` pattern in favor of a proper canonical URL per article.

---

## High

### 3. Two `LodgingBusiness` declarations for the same entity, no `@id` anywhere in the graph
**Severity:** High.

**Evidence:** `index.html:2875-2923` declares `"@type": "LodgingBusiness", "name": "Domki na Luzie"` with the full address/geo/amenities/aggregateRating. A second, separate block at `index.html:3016-3062` declares `"@type": "LodgingBusiness", "name": "Domki na Luzie", "url": "https://www.domkinaluzie.pl"` again, this time carrying `hasOfferCatalog`. Neither has an `@id`. There is also no `Organization` or `WebSite` entity on the page at all (confirmed via grep — zero matches for `"@type": "Organization"` or `"@type": "WebSite"` anywhere in `index.html` or the blog files), and `Person` (`index.html:2926-2938`) references `worksFor` by name/url string only, not by `@id`.

**Why it matters:** Without `@id` wiring, Google's knowledge graph parser has to guess these two `LodgingBusiness` blocks are the same entity rather than being told explicitly. It usually works out for simple cases, but it's fragile and it's the reason multi-block sites drift into duplicate/conflicting entity data over time (exactly what's starting to happen here: rating in block 1, offers in block 2, TouristAttraction as a third near-duplicate entity at `index.html:3065-3099` with its own separate `address`/`geo` copy-pasted rather than referenced).

**Recommendation:** Consolidate into one `LodgingBusiness` with a stable `@id`, and reference it everywhere else instead of repeating name/url:
```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://www.domkinaluzie.pl/#business",
  "name": "Domki na Luzie",
  "description": "Prywatne domki premium z basenem i jacuzzi w sercu Beskidów. 1 km od stoku narciarskiego. Między Krakowem a Zakopanem.",
  "url": "https://www.domkinaluzie.pl",
  "telephone": "+48605744722",
  "email": "rezerwacja@domkinaluzie.pl",
  "image": "https://us-ms.gr-cdn.com/getresponse-IqzZc/photos/318c9337-3c12-4a4c-b41f-07b01eb79e8f.jpg",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Spytkowice 103",
    "addressLocality": "Spytkowice",
    "postalCode": "34-745",
    "addressCountry": "PL",
    "addressRegion": "Małopolska"
  },
  "geo": {"@type": "GeoCoordinates", "latitude": "49.6234", "longitude": "19.7183"},
  "checkinTime": "T15:00",
  "checkoutTime": "T11:00",
  "numberOfRooms": "3",
  "petsAllowed": true,
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Basen", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Jacuzzi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Klimatyzacja", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "WiFi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Bezpłatny parking", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Prywatny taras z grilem", "value": true}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pakiety pobytowe",
    "itemListElement": [ /* keep the 4 existing Offer entries from index.html:3026-3058 here */ ]
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61550240939110",
    "https://www.instagram.com/domki_na_luzie/",
    "https://www.tiktok.com/@domki.na.luzie"
  ]
}
```
Then have `Person` (Ewa) reference `"worksFor": {"@id": "https://www.domkinaluzie.pl/#business"}` instead of repeating name/url, and drop the separate `TouristAttraction` block's duplicated address/geo in favor of `"@id"` reference too (or drop `TouristAttraction` — see Medium #6).

Note: `sameAs` URLs were not independently verified live (no network fetch performed in this audit) — they are well-formed, real-looking profile URLs, not placeholders, so no action needed unless the client confirms any of the three accounts no longer exists.

---

## Medium

### 4. Review count mismatch — 13 reviews shown on page, only 8 marked up
**Severity:** Medium.

**Evidence:** The visible review carousel has 13 review cards (`index.html` comments `<!-- Review 1: Kasia B. (Google) -->` through `<!-- Review 13: Carpediem (Booking) -->`, lines 4197-4530). The JSON-LD `Review` array (`index.html:3102-3184`) contains only 8: Kasia B., Agata Anna Majewska, Aneta Świszcz, Łukasz Banaś, Daniel, Gosia, Hanna, Anna. Missing from markup: Tajemnicza Etna, Vlada, Justyna Rusnak, Arek Kulejewski, Carpediem.

**Recommendation:** This is secondary to fixing Critical #1 (whether `Review` markup should exist at all in its current copied-from-third-party form). If the client moves to genuine first-party review collection, keep the markup and the visible carousel in exact 1:1 sync going forward — every review in the carousel should have a matching `Review` object, and vice versa, so the count is auditable.

### 5. Voucher gift card has no structured data
**Severity:** Medium — real, purchasable product with its own hotres checkout, currently invisible to product-aware crawlers/AI answer engines.

**Evidence:** `index.html:3768-3781` — `#voucher` section, "Bon podarunkowy na pobyt", CTA `Kup voucher →` opens the hotres widget (`data-action="vouchers"`, `data-oid="4151"`). No fixed price is displayed anywhere in the section (the voucher is redeemable against "dowolny pobyt" — any stay), so a fabricated price cannot be added truthfully.

**Recommendation:** Add the voucher as an `Offer` inside the existing `hasOfferCatalog` (see #3) rather than a standalone `Product`, since `Product`/`Offer` rich results require a `price`, which doesn't exist here as a fixed value:
```json
{
  "@type": "Offer",
  "name": "Bon podarunkowy na pobyt",
  "description": "Bon podarunkowy do wykorzystania na dowolny pobyt w Domkach na Luzie, z basenem i jacuzzi w cenie. Idealny prezent dla bliskich.",
  "availability": "https://schema.org/InStock",
  "url": "https://www.domkinaluzie.pl/#voucher",
  "category": "Gift Card"
}
```
If the client sets a fixed minimum voucher value (e.g. "od 500 zł"), upgrade this to a full `Product` with `offers.price`/`priceCurrency: "PLN"` at that point — do not add a price now.

### 6. `TouristAttraction` block is a near-duplicate of `LodgingBusiness`, adds ambiguity without a clear benefit
**Severity:** Medium.

**Evidence:** `index.html:3065-3099` declares the business itself as `TouristAttraction` ("Domki na Luzie — Baza Turystyczna w Beskidach") with its own copy of `address`/`geo`. `TouristAttraction` is meant for a *place people visit* (a landmark, museum, viewpoint) — a private cabin rental is lodging, not a tourist attraction in Google's eligibility sense, and there's no distinct rich-result surface this unlocks beyond what `LodgingBusiness` already covers.

**Recommendation:** Drop this block, or if the intent is to signal "we're a base for regional tourism" for AI/GEO purposes, fold that into the `LodgingBusiness.description` in prose instead of a second competing entity declaration. Not worth the entity-graph confusion for a 3-cabin business.

### 7. No `Organization` / `WebSite` entity, no `BreadcrumbList` on the homepage
**Severity:** Medium.

**Evidence:** Confirmed via grep — no `"@type": "Organization"`, no `"@type": "WebSite"`, no `"@type": "BreadcrumbList"` anywhere in `index.html`. All 5 blog posts have `BreadcrumbList`; the homepage (the root of that breadcrumb trail) has none.

**Recommendation:** `WebSite` without `SearchAction` (there is no real on-site search — do not add `potentialAction`/`SearchAction`, it would be false):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.domkinaluzie.pl/#website",
  "url": "https://www.domkinaluzie.pl",
  "name": "Domki na Luzie",
  "inLanguage": "pl",
  "publisher": {"@id": "https://www.domkinaluzie.pl/#business"}
}
```
Homepage `BreadcrumbList` (single-level, matches the pattern already used on blog pages):
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://www.domkinaluzie.pl/"}
  ]
}
```

---

## Low

### 8. `Article` schema (homepage + all 5 blog posts) has no `publisher.logo`
**Severity:** Low.

**Evidence:** Every `publisher` object across `index.html:3199/3213/3225/3236/3247` and all 5 blog post files sets only `{"@type": "Organization", "name": "Domki na Luzie", "url": "https://www.domkinaluzie.pl"}` — no `logo`. `logo` is a recommended (not strictly required) property for `Article`/`Organization` publisher branding.

**Recommendation:** Add once a canonical logo URL is confirmed (repo has `logotyp domki na luzie.png` at root — needs to be hosted at an absolute HTTPS URL to be usable in schema):
```json
"publisher": {
  "@type": "Organization",
  "name": "Domki na Luzie",
  "url": "https://www.domkinaluzie.pl",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.domkinaluzie.pl/logotyp%20domki%20na%20luzie.png"
  }
}
```
Note the filename has spaces — URL-encode it or rename the file server-side before using it in an absolute URL.

### 9. Three blog posts' `datePublished` is slightly off from actual git add date
**Severity:** Low — not evidence of manipulation, just an inaccuracy worth tightening.

**Evidence:** `stok-narciarski-beskid-spytkowice.html`, `domki-z-basenem-jacuzzi-beskidy.html`, `romantyczny-weekend-dla-dwojga-beskidy.html` all declare `"datePublished": "2026-06-02"` / `"dateModified": "2026-06-02"`, but git shows they were added in the commit dated 2026-06-12 ("feat: GEO audit nr 2 (61/100) — O Nas, FAQ, external links, cookie consent, report"). A 10-day gap.

**Recommendation:** Align `datePublished` to the true publish date (2026-06-12, unless the content genuinely existed elsewhere before that and this is a re-platform date — confirm with client) so the declared date is defensible if ever checked.

### 10. `Person` (Ewa) schema is thin
**Severity:** Low.

**Evidence:** `index.html:2926-2938` — `Person` has only `name`, `jobTitle`, `worksFor`. No `image`, no `sameAs`, no `@id`.

**Recommendation:** Low priority for a 3-cabin business; only worth enriching if Ewa has a public-facing profile (e.g. featured in an "O nas" section with photo) worth linking. Otherwise leave as-is or fold into `LodgingBusiness.founder`.

---

## Info

### 11. FAQPage — keep the content, understand it earns nothing in Google Search now
**Severity:** Info (per current policy: Google retired FAQ rich results for all sites as of May 7, 2026 — this postdates and supersedes the Aug 2023 gov/health-only restriction).

**Evidence:** `FAQPage` markup exists in 3 places: homepage (`index.html:2941-3012`, 13 Q&As), `blog/babia-gora-szlaki-porady.html:53+`, `blog/termy-spa-okolica-beskidy.html:53+`. All three are well-formed, and the Q&A content is genuine (matches real visible on-page FAQ content, not spam) — this is not a quality problem, it's a ROI problem.

**Verdict:** No Google SERP benefit exists for this markup today. Any benefit to AI answer engines (ChatGPT, Perplexity, Gemini, etc. citing structured Q&A) is unconfirmed and unmeasured — there is no evidence either way that `FAQPage` JSON-LD specifically (as opposed to the same content simply being present as readable HTML) changes AI-citation behavior.

**Recommendation:** Not urgent to remove — the markup is harmless and costs nothing to leave in place. Do not invest further effort adding `FAQPage` to more pages expecting a Google Search payoff, because there isn't one. If the client wants to reduce page weight/complexity, this is a safe thing to cut with zero rich-result downside on Google.

---

## Score

SCORE: 42

Justification: the mechanics are clean (valid JSON-LD, real addresses, truthful blog dates, no deprecated types beyond the ROI-dead FAQPage), but the two Critical findings are not cosmetic — the `AggregateRating`/`Review` block is copied third-party rating data self-declared as the business's own with an unsourced review count, and there is JSON-LD `Article` markup pointing at content deliberately hidden from users (`aria-hidden`, clipped to 1px). Both are exactly the class of issue Google's spam/structured-data policy teams act on, and both need fixing before this markup should be considered a net positive rather than a liability. Once those two are resolved and the entity graph is wired with `@id`, this jumps into the 75-85 range easily — the underlying content and business data are solid.

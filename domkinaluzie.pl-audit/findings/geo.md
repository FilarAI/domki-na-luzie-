# GEO / AI Search Readiness — domkinaluzie.pl
**Audytor:** FILAR AI · **Data:** 2026-07-23 · **Poprzednie audyty:** GEO-AUDIT-NR1 (02.06, 27/100), GEO-AUDIT-NR2 (12.06, 61/100)

This is a technical/content re-check of the current live site, not a re-run of the prior audit methodology. Scores below are my own assessment against the 6 scope items requested, not directly comparable point-for-point to NR1/NR2's category weights — but I flag overlap explicitly below.

---

## What works

- **Zero edge/bot blocking.** Tested live with GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, OAI-SearchBot, Google-Extended, a bare `python-requests` UA, and no UA at all — every one gets HTTP 200 with byte-identical HTML to a browser UA (`curl -A "<UA>" https://www.domkinaluzie.pl/` → 200, `content-length: 239671` in all cases). No Vercel/CDN-level silent 403. This is the thing that most commonly kills AI visibility silently, and it's clean here.
- **robots.txt is correct and live** — 200, explicit `Allow: /` for GPTBot, ClaudeBot, PerplexityBot, Googlebot, anthropic-ai, ChatGPT-User, Google-Extended, sitemap declared. (Missing OAI-SearchBot as an explicit block, but it's covered by the wildcard `User-agent: * / Allow: /` anyway — cosmetic gap only.)
- **Fully server-rendered, no JS-gating.** Static HTML, no SPA shell, no client-side rendering dependency. Confirmed via raw fetch vs rendered fetch — identical. This is the single biggest technical advantage this site has over JS-framework competitors for AI crawling.
- **7 JSON-LD blocks validate and are substantive**, not boilerplate: LodgingBusiness (address, geo, checkin/out, amenities, aggregateRating, sameAs), Person (owner), FAQPage (13 Q&As), OfferCatalog (4 packages), TouristAttraction, Review×8, Article×5. This is genuinely above-average structured-data coverage for a 3-cabin rental site.
- **llms.txt exists, is well-formed, and is honest** — real check-in/out times, real prices-adjacent info, real distances, real contact channels. Not a stub, not keyword-stuffed.
- **13 FAQ answers are specific and self-contained** (distances in km/minutes, exact deposit %, exact pet weight limit) — this is close to ideal AI-citation shape when it's the visible, non-hidden version.

---

## Prior-audit recommendations: done vs still open

Cross-checked against GEO-AUDIT-NR2 (12.06) "Następne Kroki":

| Recommendation | Status now |
|---|---|
| PriceRange in LodgingBusiness schema | **Still open.** No `priceRange` field in the LodgingBusiness block (`index.html:2875-2922`). Prices exist in visible HTML packages section but not in schema. |
| dateModified on all Article schema | **Partially done.** `termy-spa-okolica-beskidy` and `babia-gora-szlaki-porady` Article blocks have `datePublished`/`dateModified` (both `2026-06-11`, i.e. never actually updated since — see MED finding below). The 3 modal-only "articles" (`static-blog1/2/3`) have neither field at all. |
| Google Business Profile verification | Cannot verify from code/repo — external action, no evidence either way in this pass. Flag to confirm with client directly. |
| TripAdvisor listing | Not linked anywhere in `sameAs`, footer, or content. No evidence it exists. |
| noclegi.pl / nocowanko.pl / e-turystyka.pl | Not referenced anywhere on-site. No evidence of registration. |
| YouTube channel/Short | No YouTube link in `sameAs`, footer, or nav. **Still the single highest-correlation brand signal (~0.737) that's completely absent.** |
| First-person perspective in blog posts | Not evaluated deeply in this pass (out of time budget) — spot-checked "O Nas" section, still third-person/brand-voice, not owner-voice.

**Bottom line: the external/off-site work flagged as the growth blocker in NR2 is still 0% done.** All movement since NR2 has been on-site technical (voucher popup, nav changes per git log) — none of it touches the categories that were already scored weakest (Brand Authority 32/100, Platform Optimization 25/100 in NR2). Do not expect the overall GEO score to have moved much since 12.06 without off-site action.

---

## Findings

### CRITICAL-1: Hidden CSS-clipped "GEO" content block is a genuine hidden-text policy violation — and it is actively sabotaging the page's own AI summarization

**Severity:** Critical

**Evidence:**
`index.html` line ~5934: a `<div>` wrapping 5 `<article>` elements, styled:
```html
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);" aria-hidden="true">
```
preceded by the comment `<!-- GEO: Static blog content for AI crawlers (hidden visually, indexable by bots) -->`. Contains ~1,028 words across 5 articles (`static-blog-termy`, `static-blog-babia`, `static-blog1`, `static-blog2`, `static-blog3`), each marked up with `itemscope itemtype="https://schema.org/Article"`. Confirmed present in the live-served HTML (not just the local repo copy) via `curl`.

Two distinct problems, not one:

1. **This is not user-agent cloaking** — I verified the raw HTML byte count is identical for GPTBot, ClaudeBot, PerplexityBot, and a browser UA (`content-length: 239671` for all). Every visitor, human or bot, receives the same bytes. So this does **not** trip crawler-cloaking detection.
2. **It is textbook hidden text**, a different and still-live Google spam policy: content present in the DOM, clipped to 1×1px, and `aria-hidden="true"` (meaning it's hidden from screen readers too — it serves literally no user, sighted or assistive). Google's spam policies explicitly name "hidden text and links" as a manipulative pattern regardless of whether the UA-serving is identical. This is a real, current, named policy — not GEO folklore.

3. **Measured harm, not theoretical:** I ran the homepage HTML through a boilerplate-stripping text extractor (trafilatura, the same class of tool used in many AI-ingestion/RAG pipelines) to see what an LLM summarizer would treat as "the main content" of the homepage. Result: it returned the *hidden* `static-blog-termy` block — "Termy i SPA w okolicy Beskidów — gdzie się zrelaksować..." — as the page's leading extracted text, and ignored the real hero section, pricing, amenities, and FAQ entirely. In other words: the extraction heuristic reads the hidden thermal-baths blog snippet as the homepage's identity, not "premium cabins with pool and jacuzzi in the Beskidy Mountains." **The block was added to help AI understand and cite the site; it is measurably doing the opposite** — it makes a generic-content-extraction pass conclude the homepage is a spa/thermal-baths article, not a lodging business.

4. **Duplicate content, not new content:** `static-blog-termy` and `static-blog-babia` substantially duplicate text already published at `/blog/termy-spa-okolica-beskidy.html` and `/blog/babia-gora-szlaki-porady.html` (9 of ~17 long sentences match near-verbatim in the termy case). `static-blog1/2/3` ("Atrakcje w Beskidach", "Luksusowy wypoczynek", "Relaks na łonie natury") have **no dedicated URL at all** — they only render inside a JS `onclick` modal on the homepage, so even a human or a crawler that does execute JS can't get a citable, linkable URL for them. Their Article JSON-LD (`index.html:3218-3251`) declares `mainEntityOfPage` as `https://www.domkinaluzie.pl/#static-blog1` etc. — an anchor fragment on the homepage is not a real, independently indexable page, so this schema is asserting something that isn't true.

**Recommendation:** Delete the entire hidden `<div>` block (lines ~5934–6013 in the current file) and the 3 duplicate/orphan Article JSON-LD entries that point at `#static-blog1/2/3` fragments. The intent behind the original addition was sound — "give crawlers substantive text to cite" — the implementation was wrong. The legitimate way to achieve that intent, which this site already has the infrastructure for:
- The 2 real blog posts (termy, babia-gora) already carry this content on their own indexable URLs with their own Article schema — that's the correct, non-duplicated home for it. No action needed there beyond what already exists.
- For `static-blog1/2/3` ("Atrakcje w Beskidach", luksusowy basen/jacuzzi angle, natura/detoks angle): either (a) publish them as real `/blog/*.html` pages the same way the other 5 were done, and add them to `sitemap.xml`, or (b) if the content isn't strong enough to stand alone, fold the useful facts (Zamek Suski, Skansen Zubrzyca Górna, shinrin-yoku framing) into the visible homepage sections as normal, un-hidden paragraphs. Either path makes the content visible-and-real, which is what both users and AI crawlers need — hidden-but-present serves neither.

---

### HIGH-1: Homepage's real content is structurally hard to extract as clean citable passages

**Severity:** High

**Evidence:** Once the hidden block above is removed, the trafilatura extraction test needs re-running against what remains — but based on direct reading of `index.html`, the visible homepage is built as many short, highly-styled marketing fragments (hero tagline, badge spans, card excerpts) rather than paragraph-form prose. The FAQ section itself is the strongest citable content on the page (13 short, direct Q&A pairs), but the hero/value-prop/amenities sections read as fragments: e.g. `blog-excerpt` teaser text is 1-2 sentences by design, meant to entice a click-through, not to be a self-contained citable answer.

**Recommendation:** This is fine for a human-facing marketing homepage — do not "de-marketing" it. But add (not replace) 2-3 paragraph-form blocks of 130-170 words each directly in visible HTML, near the top of the page, that directly answer "what is this place, where is it, what's included, how much" in plain declarative sentences — the kind of passage a model can lift whole. The FAQ block already does this well at Q&A granularity; the gap is a citable *summary* paragraph, which llms.txt has but the visible page itself does not.

---

### HIGH-2: Off-site entity/brand signals — the category still stuck at NR2's 25-32/100, unchanged

**Severity:** High

**Evidence:** `sameAs` in the LodgingBusiness schema (`index.html:2917-2921`) lists only Facebook, Instagram, TikTok. No Google Business Profile URL, no TripAdvisor, no Wikipedia (expected — too small an entity), no YouTube, no Booking.com URL in `sameAs` despite Booking.com reviews being cited *inside* the Review JSON-LD as a source. That's an internal inconsistency worth fixing regardless of new registrations: if you're going to cite Booking.com as a review publisher, link to the actual Booking.com listing in `sameAs`.

Per the brand-mention correlation data in this audit's own scope: YouTube (~0.737 correlation with AI citation) and Reddit are the strongest external signals, Domain Rating is the weakest (~0.266) — meaning backlink-building is a comparatively low-leverage investment here vs. getting onto the platforms LLMs actually pull from for Polish lodging queries (Booking.com — already present; TripAdvisor — absent; Google Business Profile — unverified).

**Recommendation, in priority order given the 0.737 vs 0.266 correlation gap:**
1. Add existing Booking.com listing URL to `sameAs` (5-minute code fix, zero new registration needed — do this regardless of everything else).
2. One YouTube Short (60-90s, cabin/pool/jacuzzi walkthrough) uploaded even to a personal/business channel with the site link in the description. This is the highest-correlation, lowest-effort external signal on the list and has been open since NR1 (02.06) — 7+ weeks with no action.
3. TripAdvisor listing — still absent, still the platform ChatGPT/Perplexity lean on most for "domki/noclegi" style queries per NR2's own findings.
4. Confirm Google Business Profile verification status directly with the client — cannot verify this from code.

---

### MEDIUM-1: Article `dateModified` is stale/fake freshness on the 2 blog posts that do have it

**Severity:** Medium

**Evidence:** `index.html:3196-3197` — both `datePublished` and `dateModified` for "Termy i SPA" are `2026-06-11`, identical values, unchanged since the NR2 audit (12.06). If nothing on that page has actually changed since publish, that's honest and fine — but if this field is meant to signal freshness to AI Overviews / ChatGPT (which weight recency for time-sensitive queries like seasonal opening hours or prices), an unchanging `dateModified` provides no freshness signal. The 3 orphan articles (`static-blog1/2/3`) have neither field — moot if CRITICAL-1 is actioned and they're removed or turned into real pages.

**Recommendation:** Only update `dateModified` when content is genuinely revised (e.g., prices, opening dates) — do not fake-bump it just to look fresh; a model or platform that later finds the "updated" content unchanged is a worse trust signal than an old date. When the pricing/packages section is revised (it should be — see MED-2), bump `dateModified` on the relevant Article and add `priceRange`/date to LodgingBusiness at the same time.

---

### MEDIUM-2: No `priceRange` in LodgingBusiness schema despite prices being visible in HTML

**Severity:** Medium (carried over from NR2, still open)

**Evidence:** `index.html:2875-2922` LodgingBusiness block has no `priceRange` property. Visible HTML pricing section states "od 1 200 zł do 2 000 zł za 2 noce" per NR2's own notes (not independently re-verified in this pass — confirm current figures before adding).

**Recommendation:**
```json
"priceRange": "1200-2000 PLN"
```
added to the existing LodgingBusiness block. Low effort, closes a schema/visible-content gap that Google AI Overviews specifically prefers to pull price signals from structured data over prose.

---

### MEDIUM-3: Question-shaped content coverage — mostly good, two real gaps

**Severity:** Medium

**Evidence:** Checked the 13 visible/schema FAQ entries against the question set requested in scope (check-in/out, pet policy, distance to Zakopane/Kraków/stok, what's included, price, capacity, min stay):

| Question | Covered? |
|---|---|
| Check-in/out times | ✅ In LodgingBusiness schema (`checkinTime`/`checkoutTime`) — not as a visible/FAQ Q&A on-page in the text I reviewed. |
| Pet policy | ✅ FAQ: "Małe psy do 4-5 kg" |
| Distance to Zakopane | ✅ FAQ: ~40km / 30-35 min |
| Distance to Kraków | ✅ FAQ: ~60km / 50-60 min |
| Distance to stok | ✅ FAQ: ~1km |
| What's included (pool/jacuzzi no extra charge) | ✅ FAQ |
| Price | ⚠️ Visible in packages section per NR2, absent from FAQ and from schema (see MED-2) |
| Capacity | ✅ FAQ: "3 domki, 40 m², 2-4 osoby" |
| Min stay | ✅ FAQ: "2 noce minimum" |

**Gap:** check-in/out time is in schema but I did not find it as a plain-text visible FAQ answer — for a model doing text-only extraction (not schema parsing) this is invisible. **Recommendation:** add "O której godzinie jest zameldowanie i wymeldowanie?" as FAQ #14, answer "Zameldowanie od 15:00, wymeldowanie do 11:00." — 2-minute fix, closes the last real question-coverage gap.

---

### LOW-1: `numberOfRooms: "3"` in LodgingBusiness is a schema.org type mismatch

**Severity:** Low

**Evidence:** `index.html:2907` — `numberOfRooms` on `LodgingBusiness` expects a room count for something like a hotel; for 3 free-standing 40m² cabins, `Accommodation`/`House`-style modeling (or at minimum `containsPlace` with 3 `House`/`Apartment` sub-entities) is more accurate schema.org usage. Not likely to cause a validation error, but it's semantically describing 3 independent cabins as "3 rooms" of one lodging unit, which understates what's actually being offered (an AI parsing this literally could infer "one building, 3 bedrooms" rather than "3 separate private cabins").

**Recommendation:** Low priority — most AI systems will resolve this correctly from the surrounding prose regardless. If revisiting the schema anyway (e.g. when adding `priceRange`), consider modeling as 3 nested `Accommodation` entities each with their own `floorSize` (40 m²) and `occupancy` (2-4), but this is a nice-to-have, not urgent.

---

### INFO-1: llms.txt quality assessment — solid, but be honest about its actual weight

**Severity:** Info

**Evidence:** `llms.txt` (root, 200 live) — well-structured against the emerging convention: H1 + blockquote summary, then clean H2 sections (Obiekt, Lokalizacja, Pakiety, Najczęstsze pytania, Kontakt i rezerwacja). Facts are specific and match the FAQ schema (distances, prices-adjacent, pet weight, deposit %). No RSL 1.0 licensing block present — not currently a widely-adopted convention, low priority to add.

**Reality check for the client:** llms.txt is **not** consumed by Google Search or Google AI Overviews, and there is no confirmed evidence OpenAI or Anthropic's production crawlers/ChatGPT/Claude actually fetch or prioritize it at query time today — it functions more as a hand-authored, crawler-friendly summary of intent than a mechanism with proven ranking/citation effect. It's cheap to maintain and doesn't hurt, and it's genuinely well-written here, but do not report it to the client as a lever that moves AI Overview or ChatGPT citation rates — the JSON-LD schema and the real page content do that work. Keep it, don't over-invest further in it.

**Recommendation:** No urgent changes. Optional: add a one-line `Cennik:` note mirroring whatever price range ends up in the schema fix above, so llms.txt, FAQ, and JSON-LD all state the same number (currently price appears only in visible HTML packages section per NR2, not corroborated in llms.txt or schema — a 3-way consistency pass is cheap since all three should already agree).

---

## Citability rewrites (before/after)

**1. Hero/value-prop — currently fragmented across styled spans, no single citable sentence.**
Before (paraphrased from fragmented markup): tagline + separate badge + separate CTA, no full sentence stating what/where/for whom in one place.
After (add as a visible paragraph near the top of the page, 140ish words):
> "Domki na Luzie to 3 prywatne domki premium (40 m² każdy, dla 2-4 osób) w Spytkowicach w Beskidach, między Krakowem (60 km) a Zakopanem (40 km), 1 km od stoku narciarskiego w Makowie Podhalańskim. Każdy domek ma własny basen i podgrzewane jacuzzi wliczone w cenę, prywatny taras z grilem, klimatyzację i bezpłatny parking. Zameldowanie od 15:00, wymeldowanie do 11:00, minimalny pobyt 2 noce. Obiekt ma ocenę 9.6/10 na Booking.com i 4.9/5 w Google, na podstawie ok. 50 opinii. Akceptowane są małe psy do 5 kg, obiekt jest przeznaczony dla gości od 12. roku życia."

This is a single self-contained, liftable passage — exactly what's currently only living in llms.txt, not in visible on-page prose.

**2. `static-blog2` hidden "Dlaczego warto wybrać domki premium?" — currently pure marketing fluff, unlifted by design.**
Before: *"Zapewniamy przestrzeń, w której możesz odetchnąć pełną piersią i skupić się wyłącznie na sobie i swoich bliskich."*
After (if this content is turned into a real page per CRITICAL-1's recommendation): replace the closing fluff sentence with a fact-anchored close: *"W przeciwieństwie do hotelu, w Domkach na Luzie basen i jacuzzi są prywatne i dostępne bez ograniczeń godzinowych przez cały pobyt, bez dodatkowych opłat i bez rezerwacji terminu."* — same message, but now a specific, attributable claim a model can quote instead of a mood sentence.

**3. FAQ "Jaka jest minimalna liczba nocy?" — good, but buries a second fact.**
Before: *"Minimalna liczba nocy to 2. W pakiecie SLOW (z dostępnym śniadaniem) pobyt odbywa się od niedzieli do piątku."*
This one is already close to ideal — short, direct, factual. No change needed; flagging as a positive example for the other rewrites to match.

**4. `static-blog3` "Wpływ natury na zdrowie" — generic wellness claims without attribution.**
Before: *"Badania dowodzą, że kąpiele leśne (shinrin-yoku) obniżają poziom stresu, regulują ciśnienie krwi i poprawiają jakość snu."*
This asserts "badania dowodzą" (studies prove) with zero citation — exactly the kind of unattributed claim a citation-conscious AI system is trained to be skeptical of quoting.
After: *"Japońskie badania nad shinrin-yoku (kąpielami leśnymi) publikowane m.in. w Environmental Health and Preventive Medicine wskazują na obniżenie poziomu kortyzolu i ciśnienia krwi po ekspozycji na środowisko leśne."* — or, if no source will actually be checked/linked, cut the claim entirely rather than leave it unattributed; an unsourced health claim is a Trustworthiness liability, not just a citability one.

---

## Platform-specific readiness (brief, since Brand Authority is the real bottleneck for all four)

- **Google AI Overviews:** Rewards schema-backed facts (price, rating, address) and Google Business Profile signals most. Site has the schema; GBP verification status is unconfirmed and needs a direct answer from the client — this is likely the single highest-leverage unresolved item for this platform specifically.
- **ChatGPT search / OAI-SearchBot:** Crawls freely (verified), leans on Bing index + its own web index; TripAdvisor and Booking.com presence matter more here than schema depth. TripAdvisor absence (still open since NR1) is the clearest gap.
- **Perplexity:** Similarly favors third-party aggregator presence over on-site schema; same TripAdvisor/portal gap applies.
- **Bing Copilot:** Runs on Bing's index — has the site been submitted to Bing Webmaster Tools? Not verifiable from this pass; worth a direct check since it's a 5-minute action with no dependency on anything else in this report.

---

## Score

Scoring the 6 in-scope items on a straight average, weighted toward what materially affects AI visibility over what's cosmetic:

- AI crawler access: 95/100 (clean, verified live, only the OAI-SearchBot-not-explicitly-named nit)
- llms.txt: 75/100 (well-written, but capped because the format's real-world impact is unproven — scoring the artifact, not the hype)
- Passage-level citability: 45/100 (FAQ and llms.txt are strong; visible homepage prose is fragmented; and the hidden-text block is actively working against the site's own extractability, which is a real regression, not just a missed opportunity)
- Entity/brand signals: 30/100 (unchanged from NR2's 25-32/100 range — sameAs incomplete even for existing accounts like Booking.com, all 7 external actions from NR1/NR2 still open)
- Platform-specific readiness: 30/100 (technically crawlable everywhere; substantively absent from the third-party sources that most drive citation on 3 of 4 platforms)
- Question-shaped content: 80/100 (13 FAQs cover almost every real guest question; one visible gap on check-in/out text, price not yet in FAQ or schema)

SCORE: 51
Technical AI-crawler access and structured data are genuinely strong (carried over from the NR1→NR2 sprint), but this pass surfaces one real regression — the hidden-text block that's measurably confusing content extraction about what the homepage even is — and confirms the external/off-site brand-authority gap flagged in NR2 is still completely unaddressed seven weeks later; those two issues, not new technical debt, are what's holding the score at roughly NR2's level rather than above it.

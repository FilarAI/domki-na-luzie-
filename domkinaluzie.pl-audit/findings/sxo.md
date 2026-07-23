# SXO Audit — domkinaluzie.pl (homepage)

**Method note / limitation up front:** SERP checks below were run via the WebSearch tool (Google-backed web search + AI summary), not a raw Google SERP scrape. I could see which domains/page types rank, but I could **not** verify PAA boxes, ad density, local pack presence, or whether an AI Overview cites the site — those are marked "unverified" throughout and should not be treated as confirmed. Page fetch was done live via `render_page.py --mode auto` (status 200, non-SPA, raw fetch) and `parse_html.py` (Title, meta, H1 count, word count = 2662, 35 images, 8 internal links, 18 schema blocks) against `https://www.domkinaluzie.pl/`, cross-checked against local `index.html`.

## What works

- Every primary CTA on the page (nav "Zarezerwuj →", hero "Sprawdź wolne terminy", all 4 package cards, sticky CTA, FAQ CTA) points to the same `panel.hotres.pl/v4_step1?oid=4151` URL — **one click** from any CTA to the booking engine. Structurally low friction once a visitor decides.
- The "book direct = zero commission" argument does exist on-page (packages subtitle, booking-section benefit list, form footnote) — it's not absent, just badly placed (see funnel section below).
- The site already defines its own 3 guest personas explicitly in `#for-who` (Pary, Grupa Znajomych, Turyści i Narciarze) — a usable foundation for persona-specific pages/content.
- An 8-question on-page FAQ pre-answers real pre-booking objections (pets, 12+ policy, deposit %, distance to Zakopane/Termy Gorący Potok, winter operation) — this is genuinely useful objection-handling content most OTA listings don't carry.
- `robots.txt`/`llms.txt` explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended etc. — structurally ready to be an AI-answer source, which is a channel a 3-cabin site can realistically win against OTA aggregators (organic head terms, it cannot — see below).
- The voucher/gift-card section (`#voucher`) captures a distinct commercial intent (gift buyers) that Booking.com/aggregator listings for this property do not serve at all.

---

## 1. SERP verdict per target query

All 7 target queries were checked live. None returned `domkinaluzie.pl` anywhere in results.

| Query | Dominant page type in results | Individual-property sites present? | Verdict |
|---|---|---|---|
| **domki z basenem beskidy** | OTA/marketplace aggregators (Slowhop, Interhome, Meteor-turystyka, E‑WCZASY, NoclegiTanie.net) | 2 of 8 (domkizagajka.pl, dombeskidy.pl — different micro-region, Żywiec area) | Aggregator-owned head term. Individual sites only break through with an exact-match/keyword domain. |
| **domki z jacuzzi w górach** | 100% aggregator/marketplace (Slowhop, Infoturystyka, TatryTOP, Alohacamp, Oto‑Domki) | 0 of 5 | Fully aggregator-owned. An individual 3-cabin site is not eligible to compete here. |
| **domki na wynajem spytkowice** | Long-term real-estate rental portals (Domiporta, Nieruchomosci‑online, Nestoria, Mitula), only 2 of 6 are holiday-let sites (fajnewczasy.pl, nocowanie.pl) | 0 | **Intent mismatch, not just competition.** "na wynajem" in Polish search behaviour pulls a long-term-rental (apartment/house lease) SERP, not a short-stay accommodation SERP. This query should not be targeted at all — see redirect below. |
| **noclegi beskidy z basenem** | Aggregators (nocowanie.pl, Meteor-turystyka, E‑WCZASY, otonoclegi.pl) | 1 of 5 (DW Beskidy, Wisła) | Aggregator-owned, one individual guesthouse breaks through. |
| **romantyczny weekend we dwoje w górach** | Split: gift/experience-voucher marketplaces (superprezenty.pl, Alohacamp, weekend‑we‑dwoje.pl, RomantycznyWeekend.eu) **and** individual hotel/palace package pages (Pałac Pakoszów, Hotel Czarny Potok, Zamek Księża Góra, Cottonina) | 4 of 8 | **Most winnable of the tested head terms for an individual property** — but what ranks is a dedicated **package/offer page with price + CTA**, not a blog article. Domki na Luzie's own content for this exact phrase is `blog/romantyczny-weekend-dla-dwojga-beskidy.html` — a blog post, which is the wrong page type for what this SERP actually rewards. |
| **domki blisko stoku narciarskiego małopolska** | Mixed: Wierchomla, otonoclegi.pl, Booking.com (×2), zakopanedomki.com, e‑turysta.com | 3 of 9 — notably **domkinastoku24.pl** and **domkiprzystoku.pl**, both exact-match domain names for the query pattern | Winnable long-tail, but the individual sites that rank correlate with keyword-in-domain naming, which domkinaluzie.pl doesn't have. Has to win on-page/content instead of via domain match. |
| **domki na weekend beskidy** | Aggregator-dominated (nocowanie.pl, e‑nocleg.pl, Slowhop, e‑turysta.com, Infoturystyka, Alohacamp, Booking.com region page); 1 borderline curated-boutique site (stylowebeskidy.pl) | ~1 of 8 | Aggregator-owned head term. |

**Additional check — brand query "domki na luzie spytkowice opinie":** result set was Trivago, BedroomVillas, PlanetOfHotels, Booking.com's own listing, and a **suspicious scraper/clone domain** (`domki-na-luzie-spytkowice-nowy-targ.booked.com.pl`) republishing the property under a near-identical name. `domkinaluzie.pl` appeared only via a **blog post URL**, not the homepage. Even the branded query is not cleanly owned by the brand's own homepage — this is the single easiest and highest-severity fix in this whole audit (see below).

**Severity: Critical (SERP verdict, systemic)**
**Evidence:** 7/7 target head terms + 1 brand query checked via WebSearch; `domkinaluzie.pl` homepage did not appear in any of the 8 result sets.
**Recommendation:** Stop treating generic head terms ("domki z basenem beskidy", "domki z jacuzzi w górach", "domki na weekend beskidy") as winnable organic targets — they are structurally owned by OTA/marketplace aggregators with domain authority a single-property site cannot match. Redirect SEO effort per section 2 below. Separately, investigate the `booked.com.pl` clone listing — verify whether it's an authorized syndication partner or an unauthorized scrape; if unauthorized, this is actively stealing branded-query visibility that should belong to the homepage.

---

## 2. Where to compete instead

Given the above, here is where a 3-cabin site can realistically win:

- **Long-tail exact-phrase queries**, not head terms: "domki z basenem i jacuzzi Spytkowice", "domki 1 km od stoku Spytkowice", "domek dla 2 osób z jacuzzi Beskidy 12+" — none of these were tested live (out of the 7 assigned queries) but they combine attributes (location + amenity + audience restriction) that generic aggregator listing pages don't title-match as precisely as a dedicated property page can.
- **Brand SERP cleanup first** — before chasing new terms, the branded query itself isn't clean (see clone-domain finding above). This is the cheapest win available: it doesn't require new content, just resolving the clone/duplicate listing and strengthening internal signals (homepage matching the exact brand string in title/H1) so Google prefers the homepage over the blog post for brand queries.
- **Local pack (Google Business Profile)** — the page carries full NAP + GeoCoordinates + LocationFeatureSpecification schema, which is the right structural input for local pack eligibility, but local pack ranking itself was **not verified** (WebSearch does not expose map-pack results). Recommend a dedicated `/seo local` pass to confirm actual GBP standing — do not assume the schema alone secures a local-pack placement.
- **AI answer surfaces (ChatGPT/Perplexity/Google AI Overview)** — `robots.txt` and `llms.txt` already permit the relevant crawlers, which is a necessary but not sufficient condition. Whether the site is actually being cited by any AI answer engine was **not verified** in this audit (no tool access to AI Overview output) — flag for a follow-up citation check rather than assuming success.
- **Package-page format for the "romantyczny weekend" vertical** — since that SERP is won by dedicated package/offer pages (price + CTA), not blog posts, the existing blog article at `blog/romantyczny-weekend-dla-dwojga-beskidy.html` should be paired with (or the query intent redirected to) the homepage's existing "Pakiet dla Dwojga" package card, which already has the right page-type shape (price range, CTA) but currently has no dedicated URL of its own to rank independently — it only exists as one card among four inside `#packages` on the homepage.
- **Do not target "na wynajem" phrasing** — confirmed intent mismatch (real-estate SERP, not accommodation SERP). Use "nocleg", "pobyt", "domki na weekend" instead in any future content/title work targeting Spytkowice.

---

## 3. Direct-booking funnel friction

**Click count, landing → booking engine: 1.** Every CTA (`nav-cta`, `hero-cta-main`, 4× `package-cta`, `faq-cta`, sticky CTA) is a direct `<a target="_blank">` to `https://panel.hotres.pl/v4_step1?oid=4151&lang=pl` — no intermediate step, no modal, no date picker gate on the homepage itself. Structurally this is about as low-friction as it gets. (What happens inside the hotres.pl panel — how many steps to a confirmed booking — is on a third-party domain and was **not fetched/verified** in this audit.)

One inconsistency: the **voucher** CTA (`#voucher`, "Kup voucher →") does not use the same plain link — it triggers a JS-built iframe popup (`showHotres` → `hotresWrap`/`hotresIframe`, `index.html:6042-6131`) loading `booking.hotres.pl/v4_vouchers`. So the page has two different booking UX patterns (external tab vs. in-page iframe modal) for what is conceptually the same action. Minor, but worth normalizing.

**The core problem is not click count — it's argument placement.** The entire commercial premise of the site (book direct, skip Booking.com's 15-18% commission) is real and present in three places:
1. `#packages` subtitle, small gray text: "Rezerwujesz bezpośrednio - zero prowizji." (`index.html:3582`)
2. `#booking` section benefit list, icon + bold: "Gwarancja najniższej ceny - **bez prowizji**" (`index.html:4615`)
3. Below the contact form, tiny text with lock icon: "Rezerwujesz bezpośrednio u właściciela. Zero prowizji dla portali." (`index.html:4759`)

**Severity: High**
**Evidence:** None of the three occurrences above appear in the hero (`index.html:3325-3407`) or next to the nav/hero/package CTAs where the actual click decision happens. The `#booking` section (where occurrences 2 and 3 live) is the **7th section** on the page — reached only after Gallery, Packages, For-Who, About, Amenities, and Reviews. A visitor who clicks "Zarezerwuj →" from the nav bar or the hero never scrolls past those sections and never sees the pitch at all before leaving for hotres.pl.
**Compounding issue:** the hero's own trust badges (`index.html:3401-3407`, "Hero Trust Badge") lead with **Google 4.9/5** and **Booking.com 9.6/10** — i.e., the first trust signal a visitor sees actively names and vouches for the competitor the site is trying to disintermediate, before the site has made its own "skip Booking.com" case.
**Recommendation:** Move a short, direct version of the pitch ("Rezerwuj tutaj = 0% prowizji, ta sama cena co nigdy na Booking") into the hero, directly under or beside the primary CTA, and/or as a fifth trust-bar item next to the Google/Booking badges. Do not remove the Booking.com/Google ratings (they're legitimate trust signals) — but they need to be framed with the direct-booking argument in the same breath, not left to imply "go compare us on Booking.com" unchallenged.

---

## 4. Personas + where each gets stuck

Derived from the site's own `#for-who` section plus the on-page "zero prowizji" messaging (which implies a 4th persona the site is clearly trying to address but under-serves).

**Para (couple, romantic getaway)** — Goal: private jacuzzi weekend for two.
- Served by: H1 ("Miejsce dla par..."), `#for-who` "Dla Par" card, "Pakiet dla Dwojga" package with dinner voucher.
- Stuck point: no price is visible until the `#packages` section (3rd section down); the hero CTA "Sprawdź wolne terminy" sends this persona straight to an external booking panel with zero price anchor set on-page first. Minor but real: hero subtitle has a typo — "dla dorosłych i młodziey 12+" (`index.html:3358`, should be "młodzieży") — a small credibility ding for a persona evaluating a premium/romantic positioning.

**Grupa Znajomych (group of friends)** — Goal: book 2-3 cabins together for a group trip.
- Served by: `#for-who` "Grupa Znajomych" card explicitly names this use case ("Dwa lub trzy domki blisko siebie... zachowując własną przestrzeń", `index.html:3882-3897`).
- Stuck point: the use case is named but never operationalized — no package, CTA, or FAQ entry explains *how* a group actually books multiple cabins together (one combined reservation vs. three separate ones, group discount, etc.). This is the widest gap between "persona acknowledged" and "persona served" on the page.

**Turysta/Narciarz (skier, hiker, active tourist)** — Goal: confirm ski/trail proximity and winter viability before booking.
- Served reasonably well: trust bar "1 km od stoku", FAQ Q8 directly answers "Czy obiekt jest czynny zimą?" with a concrete answer (heated pool, jacuzzi available year-round, `index.html:5254-5260` area).
- Stuck point (unverified, flagging rather than asserting): the `#attractions` card for "Stok narciarski Kompleks Beskid" (`index.html:4819`) is a static card — whether it links out to lift prices/hours/live conditions was not checked in this pass. No mention on-page of ski storage/drying facilities in the cabins.

**Comparison shopper (already found the listing on Booking.com, deciding whether to book direct instead)** — Goal: confirm booking direct is legitimate, safe, and actually cheaper before leaving Booking.com's buyer protection.
- This is the persona the "zero prowizji" messaging exists for, and it is the worst-served: as noted in section 3, the hero leads with the Booking.com badge before the site makes its own direct-booking case, and the actual pitch is buried in section 7. This persona is the most likely to bounce back to Booking.com precisely because the page structure defaults to reinforcing Booking.com's credibility first and the site's alternative second.

---

SCORE: 46

The homepage executes its single-page format competently (fast CTA path, real FAQ, real personas named) but fails at the two things that actually move revenue: it is not competing for any winnable SERP position (0/8 test queries returned the domain, including brand), and it buries its own core economic pitch — book direct, zero commission — below the fold and behind a hero that spotlights the competitor it's trying to disintermediate.

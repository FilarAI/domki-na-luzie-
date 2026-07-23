# Backlink / off-page authority audit — domkinaluzie.pl

**No paid backlink API was available for this audit (no Moz, Bing Webmaster, DataForSEO, or Ahrefs credentials configured — confirmed via `claude-seo run backlinks_auth.py --check`, Tier 0/"Basic"). This report is built from Common Crawl domain-level data plus direct HTTP checks against specific URLs. It is NOT a complete backlink profile — there is no way to enumerate the full set of referring domains without a paid index. Search-engine scraping (Google, Bing, DuckDuckGo — html and lite endpoints) was attempted for platform-presence discovery and was blocked by anti-bot/CAPTCHA challenges on every attempt (Bing Turnstile challenge, DuckDuckGo "anomaly" challenge). No WebSearch/WebFetch tool was available in this run either. As a result, many OTA/directory checks below are marked `unverified` rather than "not found" — absence of evidence is not evidence of absence.**

## What works
- The site's own outbound linking (blog posts) is genuinely good practice: links to Babiogórski Park Narodowy (bgpn.gov.pl), PTTK schronisko (pttk.pl), Termy Gorący Potok (goracypotok.pl, linked twice from two different posts), Zamek w Suchej Beskidzkiej (zameksucha.pl), Termy Chochołowskie, Termy Bania, and the ski resort Kompleks Beskid Spytkowice (kompleksbeskid.pl) — all topically relevant, all real local attractions, all carrying `rel="noopener"` and `target="_blank"` (correct: these are editorial, not paid/affiliate, so dofollow is appropriate — no `sponsored`/`ugc` needed). Evidence: `blog/babia-gora-szlaki-porady.html:285,322`, `blog/domki-z-basenem-jacuzzi-beskidy.html:247`, `blog/romantyczny-weekend-dla-dwojga-beskidy.html:220,240`, `blog/stok-narciarski-beskid-spytkowice.html:254`, `blog/termy-spa-okolica-beskidy.html:301,328,351`.
- Confirmed live, first-party social/OTA presence, verified directly from the site's own homepage source: Facebook (`https://www.facebook.com/profile.php?id=61550240939110`, `index.html:5290`), Instagram (`https://www.instagram.com/domki_na_luzie/`, `index.html:5296` — confirmed reachable, HTTP 200), TikTok (`https://www.tiktok.com/@domki.na.luzie`, `index.html:5305` — confirmed reachable, HTTP 200).
- A Booking.com listing exists and is directly linked from one blog post: `https://www.booking.com/hotel/pl/domki-na-luzie.html` (`blog/domki-z-basenem-jacuzzi-beskidy.html:247`) — URL returned HTTP 202 (Cloudflare-style bot check, not a 404; the slug itself confirms the listing is live and was set up deliberately).
- Gmina Spytkowice (the correct one — postal code 34-745 confirmed on the official site, `https://www.spytkowice.pl`) has an actively-maintained modern site with a dedicated `/agroturystyka` and `/atrakcje-turystyczne` section — a realistic, reachable local outreach target (see table below).
- No toxic or spammy inbound signals were found anywhere in this investigation — but this is a weak positive given how little of the inbound profile could actually be inspected (see Toxic risk section).

## Findings

**Title: Domain not present in Common Crawl's web graph at all**
**Severity: Info**
**Evidence:** `claude-seo run commoncrawl_graph.py domkinaluzie.pl --json` → `"in_crawl": false, "in_rankings": false, "pagerank": null, "harmonic_centrality": null, "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."` (release `cc-main-2026-jan-feb-mar`).
**Recommendation:** Not actionable directly — CC coverage depends on being linked from CC's seed set, which mostly means being linked from other reasonably-crawled sites. Treat as a symptom of a thin backlink profile, not a cause. Don't over-index on this: many small legitimate local-business sites are absent from CC. Re-check next CC release after executing outreach targets below.

**Title: No independent verification possible for most major OTA/directory listings**
**Severity: Medium (data-gap, not a confirmed problem)**
**Evidence:** Attempted direct URL/search checks for Tripadvisor, Airbnb, Nocowanie.pl, Noclegi.pl, e-turysta.pl, and Google Business Profile all failed to resolve to useful pages: Tripadvisor search → HTTP 403; Nocowanie.pl guessed search endpoint → HTTP 404; Noclegi.pl guessed search endpoint → HTTP 301 (redirect target not followed to a result); e-turysta.pl guessed search endpoint → HTTP 404. Google Business Profile cannot be checked without Maps/Places API access (none configured) — the homepage does link to a Google reviews search (`index.html:4579`, `https://www.google.com/search?q=Domki+na+Luzie+opinie`) and claims "4.9/5 (45 opinii)" in on-page copy, which implies a GBP listing exists, but this was not independently confirmed by fetching Google's own data.
**Recommendation:** These platforms need to be checked manually by someone logged into a browser (or via the client directly confirming which listings they manage) rather than programmatically — the guessed search-endpoint URLs used here are not reliable, and general web/search-engine access was blocked in this environment. Do not treat "unverified" as "missing" in any client-facing claim.

**Title: Legacy gmina "agroturystyka" directory is dead weight, not a live outreach target**
**Severity: Low**
**Evidence:** `http://agroturystyka.spytkowice.pl/viewpage.php?page_id=13` (linked from `www.spytkowice.pl/agroturystyka`) loads (HTTP 200) but is a PHP-Fusion site copyrighted 2002–2011, with a Flash (`.swf`) banner, a personal `@wp.pl` webmaster contact, and a "Gospodarstwa" list of ~7 individually named hosts (e.g. "E i M Brandys", "Jadwiga Ful") — no mention of "Domki na Luzie", and no sign the directory has been updated in over a decade.
**Recommendation:** Low priority / low value. A link from here would carry negligible authority and the maintainer contact is unlikely to still be active. Don't spend outreach effort here; the modern `www.spytkowice.pl` site (below) is the better gmina-level target.

## Realistic outreach targets

| Target | URL | Currently listed? | How to get the link | Priority |
|---|---|---|---|---|
| Gmina Spytkowice — official site, `/atrakcje-turystyczne` or a noclegi/accommodation section if one is added | `https://www.spytkowice.pl/atrakcje-turystyczne` | Unverified — page loaded (HTTP 200) but no accommodation listing was found on it during this check; the site does not appear to have a dedicated "noclegi" directory page today | Direct email/call to the Urząd Gminy asking to be added as a local accommodation provider; this is a live, actively maintained government site (confirmed correct gmina by postal code 34-745) | High — official .pl gmina domain, on-topic, low competition for the ask |
| Stok narciarski Beskid Spytkowice (already linked to from the site's own blog) | `https://www.kompleksbeskid.pl` | Unverified — not checked for a partners/accommodation page in this pass | Reach out given the existing 1 km proximity and the fact Domki na Luzie already links to them for free; ask about a reciprocal or independent mention on a "gdzie spać" / partners page | High — direct neighbour, existing one-way goodwill link already in place, natural reciprocity story |
| Termy Gorący Potok (already linked to twice from the blog) | `https://goracypotok.pl/` | Unverified — not checked for a partners page in this pass | Same logic as above: existing outbound goodwill link, ask for reciprocal mention or joint blog content | Medium-High |
| Booking.com — own listing (not a new backlink, but underused) | `https://www.booking.com/hotel/pl/domki-na-luzie.html` | Confirmed live (HTTP 202, listing slug active) | Not an outreach target — already exists. Note separately: the homepage shows the Booking.com logo/score as a trust badge (`index.html:3394,4264` etc.) but does not hyperlink to the listing itself anywhere on the homepage — a missed low-effort internal link, not a backlink issue | N/A (internal fix, not outreach) |
| Nocowanie.pl | `https://www.nocowanie.pl` | Unverified — could not confirm via automated search in this environment | Self-serve listing signup is standard for this aggregator; client or FILAR should check manually while logged in | Medium |
| Noclegi.pl | `https://www.noclegi.pl` | Unverified | Same as above | Medium |
| e-turysta.pl | `https://e-turysta.pl` | Unverified | Same as above | Medium |
| Tripadvisor | `https://www.tripadvisor.com` | Unverified | Same as above; Tripadvisor listings are typically claimed via their own business portal | Medium |
| Legacy `agroturystyka.spytkowice.pl` directory | `http://agroturystyka.spytkowice.pl/viewpage.php?page_id=13` | Confirmed not listed, but site is dead (see Findings) | Skip | Low |

## Site's own outbound linking — assessment
Handled well: relevant, `rel="noopener"`, opens in new tab, no sign of link-farm behaviour, and two of the linked partners (ski resort, thermal baths) are both physically close and commercially complementary — the most realistic reciprocal-link candidates are exactly the businesses already being linked to for free. This is the single most actionable, evidence-backed lead in this audit.

## Toxic/spam risk
No toxic or spammy inbound link patterns were observed — but this is a weak, low-confidence finding: with no paid backlink index and Common Crawl showing zero data for this domain, there is effectively no visibility into the inbound link graph at all. Toxic-risk assessment could not be meaningfully performed at Tier 0 and should not be reported as "clean" to the client without that caveat.

## Competitor gap
Not established. Identifying comparable Beskidy cabin-rental competitors that outrank this site, and sourcing their backlinks, requires either a paid backlink index (Moz/DataForSEO/Ahrefs — none configured) or working search-engine access (blocked in this environment on every attempt: Bing returned a Turnstile CAPTCHA, DuckDuckGo returned an anomaly/bot challenge on both the `html` and `lite` endpoints). This item could not be completed and should be re-attempted with either a configured SEO API or a manual browser session.

## Score
SCORE: 30
Justification: the domain has zero independently-sourced inbound-link data (absent from Common Crawl, no paid API available, search-engine scraping blocked in this environment), so almost nothing about the actual backlink profile could be confirmed either way; the score reflects that data gap plus the few genuinely positive, verifiable signals (live Facebook/Instagram/TikTok/Booking.com presence, well-executed and topically relevant outbound linking with two realistic, low-friction reciprocal-link candidates already identified) — not a judgment that the underlying profile is actually weak, which cannot be determined from what was available.

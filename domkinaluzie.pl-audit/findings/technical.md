# Technical SEO Audit — domkinaluzie.pl

Scope: all 8 sitemap URLs. Live checks via curl against `https://www.domkinaluzie.pl/`; source checks against local repo files (confirmed byte-identical to live via matching `content-length`/etag on the pages spot-checked). PageSpeed Insights API was rate-limited at test time (`PSI rate limit exceeded (240 QPM / 25,000 QPD)`) — no Lighthouse/CrUX field data available; CWV findings below are lab/source-inspection only, not measured field data.

## What works

- Sitemap validates cleanly: `sitemap_discovery.py` confirms `https://www.domkinaluzie.pl/sitemap.xml` returns HTTP 200, valid `urlset`, correctly declared in `robots.txt`, all 8 URLs present with `lastmod`.
- Canonicals are correct and consistent on all 8 pages — every page self-canonicalizes to its own `https://www.domkinaluzie.pl/...` URL (verified by grep on all 8 files), including `/index.html` (which is separately reachable and returns 200, but correctly canonicalizes to `/`).
- No SPA dependency: `render_page.py --mode auto` used raw fetch (`mode_used: "raw"`, `is_spa: false`) — full content, title, meta, and all 7 JSON-LD blocks are present in the raw server-delivered HTML with no client-side rendering required.
- HTTPS is enforced site-wide with HSTS (`strict-transport-security: max-age=63072000`) on every response checked, including redirects.
- Google Maps iframe and all gallery `<img>` tags carry `loading="lazy"` correctly (verified: 14/24 `<img>` tags, plus the iframe).
- Swiper 11 (CSS+JS) is loaded from jsdelivr with correct SRI `integrity` hashes — a real (if minor) security/supply-chain positive that's easy to skip.

---

## Findings

### 1. Hidden cloaked-text block with schema markup duplicates real blog content — spam-policy risk
**Severity:** Critical
**Evidence:** `index.html:5933-5934` (live-confirmed, byte-identical to repo):
```html
<!-- GEO: Static blog content for AI crawlers (hidden visually, indexable by bots) -->
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);" aria-hidden="true">
  <article id="static-blog-termy" itemscope itemtype="https://schema.org/Article">
```
This div contains 5 `<article itemscope itemtype="https://schema.org/Article">` blocks (~1,028 words total) that are visually hidden from users (clip-rect technique, `aria-hidden="true"`) but present in the raw HTML served to crawlers. The first article's body text (`Termy Gorący Potok w Szaflarach...`, `Termy Chochołowskie...`, `Termy Bania...`) is verbatim identical to the visible content already published at `/blog/termy-spa-okolica-beskidy.html` — confirmed by direct comparison of the two passages in the repo.
This is textbook cloaked/hidden text: (a) it violates Google's spam policies on hidden text (content shown to crawlers but not users), (b) `aria-hidden="true"` combined with `Article` microdata is also an accessibility/structured-data misuse — Google's structured data guidelines require markup to describe content visible on the page, and (c) it creates internal near-duplicate content between the hidden block and the real, visible, already-indexed blog post.
**Recommendation:** Delete the entire hidden block (`index.html` lines ~5933 to its closing `</div>`). The content already exists on real, visible, indexable, correctly-canonicalized blog pages (`/blog/termy-spa-okolica-beskidy.html` etc.) — this block adds zero incremental crawlable value and only adds risk. If the intent was "give AI crawlers more context on the homepage," the fix is internal linking to the real blog posts (already present via `/#blog`), not a duplicate hidden copy.

### 2. Apex→www redirect is 307 (temporary), not 301/308 (permanent)
**Severity:** High
**Evidence:** `curl -sI https://domkinaluzie.pl/` → `HTTP/2 307` with `location: https://www.domkinaluzie.pl/`. (The earlier `http://domkinaluzie.pl/` → `https://domkinaluzie.pl/` hop is a separate, correctly-permanent `308`.) This is Vercel's default apex-to-primary-domain redirect behavior when no explicit redirect is configured.
**Recommendation:** Add an explicit permanent redirect in `vercel.json` (which doesn't exist yet — see finding #3) so the canonicalization is unambiguous to crawlers:
```json
{
  "redirects": [
    { "source": "/:path*", "has": [{ "type": "host", "value": "domkinaluzie.pl" }], "destination": "https://www.domkinaluzie.pl/:path*", "permanent": true }
  ]
}
```
`"permanent": true` emits a 308. Low urgency practically (Google treats repeated 307s to the same target as de facto permanent after a while, and canonical tags already reinforce www as preferred), but it's a one-line config fix that removes any ambiguity for crawlers/tools that respect HTTP semantics strictly.

### 3. No security headers except HSTS — and the two "security meta tags" present give zero actual protection
**Severity:** High
**Evidence:** Full response header dump for `/` (`curl -sD -`) contains only `strict-transport-security`. No `content-security-policy`, `x-frame-options`, `x-content-type-options`, `referrer-policy`, or `permissions-policy` HTTP headers on any of the 8 URLs checked.
Separately, `index.html:32-34` contains:
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
```
`X-Content-Type-Options` and `X-Frame-Options` are **not honored by browsers as `<meta http-equiv>` tags** — both are HTTP-header-only directives per spec (Chrome/Firefox silently ignore them in `<meta>` form). Only the third one, `<meta name="referrer">`, is actually respected by browsers. So the site currently has no working clickjacking protection and no working MIME-sniffing protection, despite the markup suggesting otherwise.
There's no `vercel.json` in the repo root (`ls vercel.json` → not found), so there's currently no mechanism to add response headers at all — Vercel's static file serving doesn't let you inject headers without one.
**Recommendation:** Add `vercel.json` with a `headers` block:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), camera=(), microphone=()" },
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'self'" }
      ]
    }
  ]
}
```
A full `script-src`/`img-src` CSP is more work given the external hosts in use (GTM/gtag, jsdelivr, GetResponse CDN, Google Maps, hotres) — at minimum ship `frame-ancestors 'self'` (real clickjacking protection, unlike the current meta tag) and the other headers above; expand to a full CSP as a follow-up. Remove the two non-functional meta tags or leave them (harmless but misleading — recommend removing once real headers are live, to avoid a false sense of coverage in future audits).

### 4. Tailwind Play CDN shipped to production, fully unused, render-blocking — ~400KB of dead weight
**Severity:** High (Core Web Vitals)
**Evidence:** `index.html:45`: `<script src="https://cdn.tailwindcss.com"></script>` — no `async`/`defer`, positioned in `<head>` *before* the site's real inline `<style>` block (`index.html:71-2860`, 2,790 lines of hand-written CSS). Live fetch of that script returns 407,279 bytes of JS (`curl -sL https://cdn.tailwindcss.com` → 407279 bytes). Grepping all 565 `class="..."` attributes in `index.html` shows exclusively custom class names (`trust-grid`, `gallery-grid`, `package-grid`, etc.) — no Tailwind utility classes (`flex`, `p-4`, `bg-red-500` etc.) appear anywhere in the body. The comment at `index.html:44` even says `"Tailwind CDN — Play CDN is dynamic and does not support SRI; used for prototyping only"` — but it's live in production.
This is a synchronous, render-blocking, 400KB script that does nothing (the Play CDN's job is to scan the DOM and JIT-generate CSS from Tailwind class names at runtime — since there are none, it does real work for zero output) sitting in front of the real CSS in `<head>`, delaying First Contentful Paint and LCP on every page load.
**Recommendation:** Delete `index.html:45-70` (the Tailwind CDN `<script>` tag and its `tailwind.config` block). This is a pure deletion with no functional impact — confirmed unused.

### 5. LCP element is a CSS background-image on a 3rd-party CDN with no preconnect and no priority hint; 4 full-size hero images loaded eagerly
**Severity:** High (Core Web Vitals)
**Evidence:** `index.html:3327-3340` — the hero section (`#hero`, `min-height: 100vh`, `index.html:380-386`) renders its background via 4 stacked `<div class="hero-slide" style="background-image: url('https://us-ms.gr-cdn.com/...')">` elements, all present in the initial HTML (not lazy — CSS `background-image` has no native lazy-loading mechanism), only one visible (`.hero-slide.active`) via a JS/CSS crossfade.
Live `HEAD` requests on the 4 slide images:
- `ac90ca2f-...jpeg` (active/first slide): 172,161 bytes
- `c8138b6a-...jpg`: 217,578 bytes
- `74b7135d-...jpeg`: 180,264 bytes
- `def6fce9-...jpeg`: **941,621 bytes**
All 4 (≈1.47MB total, all plain JPEG, no WebP/AVIF, no responsive variants — `srcset`/`sizes` count in `index.html` is 0) are requested on every page load regardless of viewport.
No `<link rel="preconnect">` exists for `us-ms.gr-cdn.com` or `us-wbe-img2.gr-cdn.com` (only `fonts.googleapis.com`/`fonts.gstatic.com` are preconnected — `index.html:25-26`) — the browser pays a fresh DNS+TLS handshake to the image CDN with zero head start.
Because it's a CSS `background-image` rather than an `<img>`, the browser's preload scanner cannot discover it early — it's only discovered after CSSOM construction, and `fetchpriority="high"` (which would help) isn't applicable to CSS backgrounds at all. Combined with finding #4 (400KB blocking script ahead of the real `<style>` block) and the render-blocking Swiper JS (154,597 bytes, no `async`/`defer` — `index.html:40-42`) sitting in the same `<head>`, the actual LCP image is discovered and requested very late in the load sequence.
**Recommendation:**
1. Convert the active/first hero slide to a real `<img fetchpriority="high">` (or at minimum add `<link rel="preload" as="image" href="...ac90ca2f...jpeg">` in `<head>`) so the preload scanner finds it immediately.
2. Add `<link rel="preconnect" href="https://us-ms.gr-cdn.com" crossorigin>`.
3. Don't eager-load all 4 slides' background images — only load the active one on first paint; lazy-init the other 3 after `load`/idle, or via `srcset`-driven `<img>` per slide with `loading="lazy"` on the non-active ones.
4. Compress/resize the 941KB slide (down to the 170-220KB range of its siblings — likely just missed the same export/compression pass) and serve WebP/AVIF with a JPEG fallback.

### 6. Only 5 of 24 `<img>` tags have explicit `width`/`height` — CLS risk
**Severity:** Medium (Core Web Vitals)
**Evidence:** `grep -o '<img[^>]*>' index.html | wc -l` → 24; `grep -c 'width='` on the same set → 5. The remaining 19, including the gallery images from `us-ms.gr-cdn.com` (`index.html:3480` onward), have no intrinsic size hints, so the browser can't reserve layout space before the image loads.
**Recommendation:** Add explicit `width`/`height` (or `aspect-ratio` via CSS) to every `<img>`, especially the gallery grid images, to eliminate layout shift as they load in.

### 7. No internal cross-linking between blog posts; no blog index/hub page
**Severity:** Medium
**Evidence:** All 5 blog posts link back to the homepage (`href="/"` and `href="/#blog"` — confirmed in all 5 files) but grepping each blog file for links to other `blog/*.html` files returns nothing — zero blog-to-blog links. The only path to any blog post is the homepage's `#blog` section (`index.html:4915-5091`, 5 links present in raw HTML, so posts aren't orphaned), and there is no `/blog/` index page (confirmed absent from the sitemap and the repo's file list).
**Recommendation:** Add 2-3 contextual "related article" links between blog posts (e.g., the ski-slope post ↔ the couples-weekend post ↔ the thermal-baths post — natural topical overlap already exists in the content). Optional: a simple `/blog/index.html` hub costs one file and gives crawlers/users a canonical listing page instead of relying solely on a homepage anchor section.

### 8. Asset folder name (`atrakcje zdjęcia/`) contains a literal space and non-ASCII character in raw HTML `src` attributes
**Severity:** Low
**Evidence:** `index.html:4815` etc.: `<img src="atrakcje zdjęcia/spytkowice.png" ...>` — the literal (unencoded) space and `ę` are in the raw HTML source. Live-tested: the percent-encoded form (`https://www.domkinaluzie.pl/atrakcje%20zdj%C4%99cia/spytkowice.png`) returns `200`. Browsers auto-encode this correctly per the URL spec when parsing `src`, so images currently render fine for real users — not a live breakage.
**Recommendation:** Not urgent, but fragile: rename the folder to `atrakcje-zdjecia/` (hyphenated, ASCII-only) and update the 5 references. Removes any risk from crawlers, scripts, log analysis tools, or future copy-paste of these URLs (e.g., into `og:image`, sitemap `<image:image>` extensions, or a CDN) that don't auto-encode non-ASCII/space characters the way browsers do.

### 9. IndexNow protocol not implemented
**Severity:** Low
**Evidence:** No IndexNow key file found (`https://www.domkinaluzie.pl/indexnow.txt` and the conventional `<key>.txt` pattern were not checked exhaustively beyond the generic path, but no key file, no submission code, and no reference to IndexNow anywhere in the repo's HTML/JS was found).
**Recommendation:** Worth adding given Vercel hosting and the low-traffic/low-update-frequency profile of this site (occasional blog posts, regulamin/policy edits) — IndexNow submission to Bing/Yandex is a single POST per changed URL and is cheap to wire into a post-deploy step (e.g., a GitHub Action or Vercel deploy hook that POSTs the changed sitemap URLs to `https://api.indexnow.org/indexnow`). Not critical: Bing/Yandex traffic share for this business is almost certainly small relative to Google, and Google doesn't consume IndexNow.

### 10. `/index.html` is independently reachable (200, not redirected to `/`)
**Severity:** Info
**Evidence:** `curl -sI https://www.domkinaluzie.pl/index.html` → `200`, identical `content-length: 239671` and `etag` to `/`. Not a duplicate-content risk in practice because `index.html`'s own `<link rel="canonical">` (`index.html:2863`) points to `https://www.domkinaluzie.pl/` — correct self-correction via canonical, verified.
**Recommendation:** No action required; canonical tag already handles this correctly. Optionally add a redirect for hygiene, but low priority since the canonical already neutralizes the risk.

### 11. "GTM" in prior notes is actually gtag.js (GA4), not a Tag Manager container — correction, not a finding
**Severity:** Info
**Evidence:** `index.html:6`: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-FN5HR9399W">` plus inline `gtag('config', 'G-FN5HR9399W')`. Grepped for `GTM-` (the classic container-ID pattern) — zero matches anywhere in `index.html`. This is GA4 loaded directly via gtag.js, not Google Tag Manager. Already correctly `async`, so it's not a render-blocking concern.
**Recommendation:** None needed technically; flagging only so the term is used correctly in the client-facing report.

---

## Verified but not flagged (no issue found)

- **Meta robots / noindex:** all 8 pages carry `index, follow` (homepage additionally has `max-image-preview:large, max-snippet:-1, max-video-preview:-1`) — no `noindex` anywhere, verified by grep on all 8 files.
- **Trailing-slash / case handling:** `blog/....html/` (trailing slash appended) still resolves 200 rather than 404 — Vercel serves it without normalizing; not causing duplicate indexing risk since canonical tags are present and self-referencing, but worth knowing extra URL variants technically resolve.
- **404 handling:** a nonexistent path returns a real `404` status (verified: `/nonexistent-page-xyz` → 404), and uppercase filename variants (`/Regulamin.html`) also correctly 404 (case-sensitive static serving) — no soft-404 issue.
- **robots.txt:** does not block `/atrakcje zdjęcia/`, `/blog/`, or any content path — only `/.well-known/` and `/serve.mjs`, both correctly non-content paths.
- **Structured data delivery (technical only):** all 7 JSON-LD blocks on the homepage parse as valid JSON and are inline (not externally hosted/JS-injected) — confirmed via `render_page.py`'s `structured_data` block (`block_count: 7, processed_count: 7`, all `valid: true`). Semantic/schema-type correctness is out of scope for this report per the audit's division of labor.
- **PageSpeed Insights / CrUX field data:** not available — `pagespeed_check.py` returned `"PSI rate limit exceeded (240 QPM / 25,000 QPD)"` for both mobile and desktop strategies. All CWV findings above are source-inspection/lab-reasoning based, not measured Lighthouse scores or real-user CrUX data. Flagging explicitly as a limitation rather than presenting estimates as measurements.

---

## SCORE: 54

Solid crawlability/indexability fundamentals (valid sitemap, correct self-referencing canonicals on all 8 pages, no noindex, real SSR content, working HTTPS/HSTS) are undercut by one Critical hidden-text/duplicate-content block that carries real manual-action risk, a missing security-headers layer, and a `<head>` that ships ~550KB of unused/render-blocking JS (Tailwind CDN + non-deferred Swiper) directly ahead of the actual LCP image on a 100vh hero — a combination that plausibly pushes mobile LCP into "Needs Improvement" or "Poor" territory even though this wasn't lab-measured today.

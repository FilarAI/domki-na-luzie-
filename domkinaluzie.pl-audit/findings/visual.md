# Visual / Mobile Rendering — domkinaluzie.pl

## Method
Captured by the audit coordinator in a live Chromium browser pane against production
(`https://www.domkinaluzie.pl/`) at **375×812 (mobile)**. Three above-the-fold captures were taken
across different hero-slideshow frames, plus one mid-page capture at scroll ≈4,970 px.

The cookie banner was hidden via DOM inspection for the mid-page capture — **no consent was given
or recorded**; the banner's effect on the first viewport is reported from the captures where it was
still present.

Scope limitation, stated honestly: **desktop (1440×900), the hamburger-open state, and the blog-post
mobile view were not captured** — the browser pane became unresponsive before those runs. They are
listed under *Not verified*. Nothing below is asserted that was not directly observed.

## What works
- Trust badges (**Google 4.9/5**, **Booking 9.6/10**) sit above the fold on mobile in a clear pill — strong, immediate credibility signal.
- Primary CTA **"Sprawdź wolne terminy"** is above the fold, full-width, high-contrast gold on dark, comfortably above the 44 px tap-target minimum.
- Typography is genuinely distinctive (Playfair Display + DM Sans) — the site does not look templated, and the gold/dark palette is applied consistently.
- No horizontal overflow or text clipping observed at 375 px.
- The mobile menu overflow bug fixed in commit `ed4a7db` holds — menu items no longer collide with the logo (verified earlier in this session at 375×812 and 375×667).

## Findings

**Live typo in the first viewport**
- **Severity:** High (trust/credibility, not ranking)
- **Evidence:** `index.html:3353`, confirmed live in all three mobile captures — hero subtitle reads **"dla dorosłych i młodziey 12+"**. Correct Polish is **"młodzieży"**. It sits directly under the H1, in the first screenful, on the highest-traffic page.
- **Recommendation:** Change to `dla dorosłych i młodzieży 12+`. One-character-class fix, highest visibility-per-effort item on the site.

**Cookie banner consumes ~28% of the mobile first viewport**
- **Severity:** Medium
- **Evidence:** At 375×812, the banner occupies roughly the bottom 230 px and fully covers the secondary CTA "Poznaj ofertę" (visible partially clipped in capture 3). It renders on every first visit, so effectively every new mobile visitor sees a quarter of their first screen taken by consent UI.
- **Recommendation:** Reduce to a single-line bar with the two buttons inline, or anchor it as a compact bottom-sheet ~90 px tall. Keep both "Tylko niezbędne" and "Akceptuj wszystkie" equally prominent (required for valid consent under GDPR/RODO — do not make rejection harder).

**Hero text contrast is slide-dependent and fails on some frames**
- **Severity:** Medium
- **Evidence:** The hero auto-rotates every 5 s across at least three photographs. Captures show the same white/cream H1 rendered over: (a) a dark cabin facade — good contrast; (b) a bright near-white sky with a red foreground object — poor; (c) a pool with a pale inflatable float directly behind the words "Miejsce dla par," — poor. The gradient overlay is not strong enough to normalise across all slides. The gold logo and hamburger icon in the transparent navbar sit over the bright sky region in frame (b) with visibly low separation.
- **Recommendation:** Strengthen and standardise the scrim — e.g. a fixed `linear-gradient(to right, rgba(0,0,0,.65), rgba(0,0,0,.25))` over the whole hero regardless of slide, rather than relying on each photo. Re-check the logo/hamburger against the brightest slide specifically.

**No price signal above the fold**
- **Severity:** Medium
- **Evidence:** The mobile first viewport shows brand, ratings, positioning headline, age policy, and the availability CTA — but no price or price range. Pricing ("od 1 200 zł do 2 000 zł za 2 noce") appears only much further down in the packages section.
- **Recommendation:** Add a compact "od 1 200 zł / 2 noce — basen i jacuzzi w cenie" line adjacent to the primary CTA. For a direct-booking site competing against OTA listings that always show a price, withholding it above the fold costs qualified clicks.

**Headline spends the most valuable text on positioning, not on what is being sold**
- **Severity:** Medium (reinforces the On-Page H1 finding)
- **Evidence:** The H1 renders as "Miejsce dla par, lub grupy przyjaciół. **- domki premium**". Visually, the leading hyphen in "- domki premium" reads as a stray dash rather than intentional typography. Neither "Beskidy", "basen", nor "jacuzzi" appears in the H1, though all three are the actual differentiators and all appear in the `<title>`.
- **Recommendation:** See `content.md` / on-page section for the rewrite. Visually, drop the leading hyphen or replace it with an em-dash on its own line.

## Not verified
- Desktop 1440×900 rendering
- Hamburger-menu-open state at 390×844 (the 375×812 and 375×667 states were verified earlier this session)
- `#voucher` section framing on desktop — on mobile it was observed earlier this session and rendered correctly, but note the image used (`voucher grafika.jpg`) is the company logo on a brown field, not a gift-card visual
- Blog-post mobile rendering
- Numeric colour-contrast ratios (reported above qualitatively from captures, not measured with a contrast tool)
- Focus-visible states on interactive elements
- Sticky bottom CTA overlap behaviour at the very end of the page

SCORE: 62
Solid, distinctive design with the fundamentals right (tap targets, no overflow, trust badges above fold); marked down for a live typo in the first viewport, slide-dependent hero contrast, a heavy consent banner, and a hero that sells positioning instead of the pool/jacuzzi/price that actually convert.

# GEO-SEO Plan — domkinaluzie.pl
**Cel: 27/100 → 90+/100**
**Data startu:** 2026-06-02
**Ostatni audyt:** GEO-AUDIT-REPORT.md

---

## Stan aktualny (po Quick Wins z 2026-06-02)

| Kategoria | Przed | Po QW | Cel |
|---|---|---|---|
| AI Citability | 25/100 | ~40/100 | 80/100 |
| Brand Authority | 30/100 | 30/100 | 75/100 |
| Content E-E-A-T | 30/100 | 30/100 | 75/100 |
| Technical GEO | 40/100 | 65/100 | 85/100 |
| Schema & Structured Data | 5/100 | 42/100 | 85/100 |
| Platform Optimization | 20/100 | 25/100 | 75/100 |
| **OVERALL** | **27/100** | **~39/100** | **90+/100** |

### Co już jest zrobione ✅
- [x] LodgingBusiness JSON-LD schema
- [x] FAQPage JSON-LD schema (5 pytań)
- [x] Open Graph meta tagi
- [x] Canonical URL
- [x] sitemap.xml
- [x] llms.txt

---

## FAZA 1 — Treść Widoczna dla Crawlerów
**Priorytet:** Krytyczny | **Czas:** ~3-4h | **Wpływ na score:** +15 pkt

### 1.1 Blog: JavaScript → Static HTML

**Problem:** Treść 3 artykułów jest w obiekcie JavaScript `blogData` (linie ~4863–4908 w index.html). Żaden bot AI jej nie widzi.

**Rozwiązanie A (szybkie, bez nowych plików):**
Dodaj ukryte sekcje `<article>` z pełną treścią jako statyczny HTML, widoczne dla botów ale ukryte wizualnie. Modals JS zostawiamy jak są.

```html
<!-- Dodaj przed </body>, po sekcji #blog -->
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);" aria-hidden="true">
  <article id="static-blog1">
    <h2>Atrakcje w Beskidach koło Makowa Podhalańskiego</h2>
    <p>Beskidy to jeden z najpiękniejszych regionów...</p>
    <!-- pełna treść z blogData.blog1.content -->
  </article>
  <!-- blog2, blog3 analogicznie -->
</div>
```

**Rozwiązanie B (lepsze długoterminowo):**
Utwórz osobne podstrony: `/blog/atrakcje-beskidy.html`, `/blog/basen-jacuzzi.html`, `/blog/relaks-natura.html`
- Dodaj `Article` JSON-LD na każdej
- Dodaj wpisy do `sitemap.xml`
- Linki w sekcji blog kierują na te strony zamiast otwierać modal

### 1.2 Opinie jako Static HTML (nie tylko Swiper)

**Problem:** Karty opinii są w Swiper.js carousel — boty mogą nie indeksować wszystkich.

**Rozwiązanie:** Dodaj `Review` + `AggregateRating` JSON-LD dla wybranych opinii:

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {"@type": "LodgingBusiness", "name": "Domki na Luzie"},
  "author": {"@type": "Person", "name": "Anna K."},
  "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
  "reviewBody": "Treść opinii...",
  "datePublished": "2024-08-15"
}
```

Zbierz 5-8 prawdziwych opinii z Google/Booking i dodaj je jako JSON-LD.

---

## FAZA 2 — Schema Rozszerzenie
**Priorytet:** Wysoki | **Czas:** ~2h | **Wpływ na score:** +10 pkt

### 2.1 Offer Schema dla Pakietów

Każdy pakiet powinien mieć `Offer` schema. Dodaj do LodgingBusiness:

```json
"hasOfferCatalog": {
  "@type": "OfferCatalog",
  "name": "Pakiety pobytowe",
  "itemListElement": [
    {
      "@type": "Offer",
      "name": "Domki PREMIUM z basenem",
      "description": "Klasyczny pobyt z pełnym dostępem do basenu i jacuzzi.",
      "availability": "https://schema.org/InStock",
      "minimumPurchaseQuantity": 2,
      "eligibleQuantity": {"@type": "QuantitativeValue", "minValue": 2, "maxValue": 4, "unitText": "osoby"}
    },
    {
      "@type": "Offer",
      "name": "Pakiet dla Dwojga",
      "description": "Romantyczny pobyt dla 2 osób z voucherem na kolację.",
      "eligibleQuantity": {"@type": "QuantitativeValue", "maxValue": 2, "unitText": "osoby"}
    }
  ]
}
```

### 2.2 TouristAttraction Schema dla Atrakcji w Okolicy

Dodaj `TouristAttraction` schema dla kluczowych atrakcji (pomaga AI odpowiadać na "co zobaczyć koło X"):

```json
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Domki na Luzie - Baza Turystyczna",
  "description": "Baza noclegowa z dostępem do Babiej Góry, Term Gorący Potok i stoków narciarskich.",
  "touristType": ["Pary", "Grupy znajomych", "Narciarze", "Turyści pieszej"],
  "availableLanguage": "Polish"
}
```

### 2.3 Rozszerzone FAQ (10+ pytań)

Dodaj do FAQPage schema minimum 5 nowych pytań. Propozycje:

```json
{"name": "Jak daleko do Zakopanego?", "text": "Zakopane jest oddalone ok. 40 km (~30 min jazdy samochodem)."},
{"name": "Jak daleko do Krakowa?", "text": "Kraków jest oddalony ok. 60 km (~50 min jazdy)."},
{"name": "Czy jest możliwość grillowania?", "text": "Tak, każdy domek posiada prywatny taras z grilem."},
{"name": "Ile domków jest na terenie obiektu?", "text": "Na terenie znajdują się 3 domki premium, każdy o powierzchni 40 m²."},
{"name": "Czy obiekt jest czynny zimą?", "text": "Tak, obiekt działa przez cały rok. Zimą 1 km od stoku narciarskiego."},
{"name": "Jak blisko jest stok narciarski?", "text": "Stok narciarski w Makowie Podhalańskim jest oddalony ok. 1 km od obiektu."},
{"name": "Jaka jest minimalna liczba nocy?", "text": "Minimalna liczba nocy to 2 (w pakiecie SLOW od niedzieli do piątku)."}
```

---

## FAZA 3 — E-E-A-T i Autentyczność
**Priorytet:** Wysoki | **Czas:** ~2h pisanie + 30 min kod | **Wpływ na score:** +12 pkt

### 3.1 Sekcja "O Nas" / Historia Obiektu

**Dodaj do index.html nową sekcję** między `#for-who` a `#amenities`:

Treść powinna zawierać:
- Imię właściciela/właścicieli
- Rok otwarcia obiektu
- Dlaczego powstał ("wymarzyliśmy sobie miejsce gdzie...")
- 2-3 zdania o filozofii obiektu (prywatność, luksus, Beskidy)

Przykład struktury HTML:
```html
<section id="about" aria-label="O obiekcie">
  <div class="section-wrapper">
    <h2>Nasza Historia</h2>
    <p>[Imię] otworzył/a Domki na Luzie w [roku]...</p>
  </div>
</section>
```

Dodaj `Person` schema dla właściciela:
```json
{
  "@type": "Person",
  "name": "[Imię Właściciela]",
  "jobTitle": "Właściciel",
  "worksFor": {"@type": "LodgingBusiness", "name": "Domki na Luzie"}
}
```

### 3.2 Cennik w HTML (nie tylko na Hotres)

AI nie może odczytać cen z zewnętrznej platformy rezerwacyjnej. Dodaj orientacyjny cennik w HTML:

```html
<section id="pricing">
  <h2>Orientacyjne Ceny</h2>
  <p>Ceny zaczynają się od [X] zł / noc za domek. Pełna dostępność i aktualne ceny na hotres.</p>
</section>
```

Nawet jeden akapit z przedziałem cenowym (np. "od X zł/noc") znacząco podnosi citability.

### 3.3 Regulamin i Polityka Prywatności — z Google Drive na własną domenę

**Problem:** Dokumenty w Google Drive są słabym sygnałem zaufania.

**Rozwiązanie:**
- Utwórz `regulamin.html` w katalogu projektu
- Utwórz `polityka-prywatnosci.html`
- Zmień linki w footerze z `drive.google.com` na `/regulamin.html`

---

## FAZA 4 — Brand Authority (Zewnętrzne Platformy)
**Priorytet:** Wysoki | **Czas:** ~3-5h jednorazowo | **Wpływ na score:** +18 pkt

To są działania poza stroną — wymagają rejestracji/edycji na zewnętrznych platformach.

### 4.1 TripAdvisor — Dodaj Obiekt
- URL: tripadvisor.com → "List your property"
- To jedna z głównych platform którą AI (szczególnie ChatGPT) cytuje przy pytaniach o noclegi
- Dodaj wszystkie zdjęcia, opis, odpowiedz na opinie
- **Cel:** 20+ opinii w ciągu 3 miesięcy

### 4.2 Portale Turystyczne — Wpisy
Zarejestruj/uzupełnij profil na:
- [ ] noclegi.pl
- [ ] nocowanko.pl
- [ ] e-turystyka.pl
- [ ] wakacje.pl
- [ ] turystyka.wp.pl
- [ ] r2.pl (baza noclegów)

AI cytuje te portale gdy ktoś pyta "domki z jacuzzi Beskidy" — Twoja strona musi tam być.

### 4.3 Google Business Profile — Optymalizacja
- Sprawdź czy profil jest zweryfikowany
- Dodaj `sameAs` link do GBP w JSON-LD (dodaj URL do LodgingBusiness schema)
- Uzupełnij wszystkie kategorie: "Domek letniskowy", "Wynajem wakacyjny"
- Załaduj minimum 20 zdjęć
- Odpowiedz na WSZYSTKIE recenzje (sygnał aktywności dla AI)

### 4.4 YouTube — Kanał / Shorts
- Nagraj krótki film (60 sek) pokazujący domki, basen, widoki
- Wrzuć jako YouTube Short z opisem i linkiem do strony
- Dodaj link do kanału w footer i schema `sameAs`
- YouTube to platforma którą AI (szczególnie Gemini) najczęściej cytuje

---

## FAZA 5 — Technical Dopieszczenie
**Priorytet:** Średni | **Czas:** ~2h | **Wpływ na score:** +6 pkt

### 5.1 Hreflang (jeśli planujesz wersję EN/DE)
```html
<link rel="alternate" hreflang="pl" href="https://www.domkinaluzie.pl/" />
<link rel="alternate" hreflang="en" href="https://www.domkinaluzie.pl/en/" />
```

### 5.2 Robots.txt — Dodaj Explicit AI Crawlers
Zaktualizuj robots.txt żeby explicite zapraszać AI:
```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /
```

### 5.3 Meta Robots i Crawl Hints
Dodaj do `<head>`:
```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
```

`max-snippet:-1` = Google może użyć dowolnej długości fragmentu w AI Overviews. Bez tego Google może skracać cytaty.

### 5.4 Sitemap Rozszerzony (po dodaniu podstron bloga)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.domkinaluzie.pl/</loc>
    <lastmod>2026-06-02</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.domkinaluzie.pl/blog/atrakcje-beskidy</loc>
    <lastmod>2026-06-02</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.domkinaluzie.pl/blog/basen-jacuzzi</loc>
    <lastmod>2026-06-02</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.domkinaluzie.pl/blog/relaks-natura</loc>
    <lastmod>2026-06-02</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.domkinaluzie.pl/regulamin</loc>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## FAZA 6 — Content Marketing (Długoterminowy)
**Priorytet:** Niski-Średni | **Czas:** ~1-2h/artykuł | **Wpływ na score:** +8 pkt w czasie

### 6.1 Nowe Artykuły Blogowe (tematy pod AI citability)
Tematy które AI często cytuje przy zapytaniach turystycznych:

| Tytuł | Słowa kluczowe | Format |
|---|---|---|
| "Co zabrać na zimowy wyjazd w Beskidy?" | zimowy wyjazd beskidy | Lista + FAQ |
| "Domki z jacuzzi Polska — jak wybrać?" | domki z jacuzzi polska | Poradnik |
| "Weekend spa w górach dla par — gdzie jechać?" | spa góry para weekend | Zestawienie |
| "Beskidy z dziećmi 12+ — co warto zobaczyć?" | beskidy dzieci atrakcje | Przewodnik |
| "Stok narciarski Maków Podhalański — informacje" | stok narciarski maków | Info lokalne |

Format który AI najbardziej cytuje: **listy z nagłówkami H2/H3, FAQ na końcu, konkretne liczby/daty/odległości**.

### 6.2 Linkbuilding z Local Sources
- Poproś lokalne portale turystyczne o wzmiankę / link
- Wpis w Wikipedia w artykule o Spytkowicach lub Makowie Podhalańskim (jeśli możliwe)
- Współpraca z blogerami turystycznymi (micro-influencers Beskidy)

---

## Roadmap — Szacowany Postęp

```
Start (teraz):     27/100 ████░░░░░░░░░░░░░░░░
Po Quick Wins:     39/100 ████████░░░░░░░░░░░░
Po Fazie 1:        52/100 ██████████░░░░░░░░░░
Po Fazie 2:        62/100 ████████████░░░░░░░░
Po Fazie 3:        72/100 ██████████████░░░░░░
Po Fazie 4:        82/100 ████████████████░░░░
Po Fazie 5:        87/100 █████████████████░░░
Po Fazie 6:        93/100 ██████████████████░░
```

---

## Priorytety dla Ciebie (w kolejności)

### Zrób SAM (nie wymaga kodu):
1. **Google Business Profile** — zweryfikuj, uzupełnij, załaduj zdjęcia, odpowiedz na recenzje
2. **TripAdvisor** — dodaj obiekt
3. **Portale turystyczne** — noclegi.pl, nocowanko.pl (rejestracja)
4. **YouTube Short** — 60-sekundowy film z domkami

### Poproś Claude (wymaga kodu):
1. **Faza 1** — Blog jako static HTML (największy bang for buck)
2. **Faza 2** — Rozszerzone FAQ + Offer schema + Review JSON-LD
3. **Faza 3** — Sekcja "O Nas" + regulamin na własnej domenie
4. **Faza 5** — Robots.txt + meta robots + sitemap update

---

## Weryfikacja Postępu

Po każdej fazie sprawdź:
- **Google Rich Results Test:** search.google.com/test/rich-results
- **Schema Validator:** validator.schema.org
- **PageSpeed Insights:** pagespeed.web.dev (Core Web Vitals)
- **Google Search Console** — czy sitemap zaindeksowany, czy nie ma błędów schema

Raz na miesiąc: uruchom `/geo audit https://www.domkinaluzie.pl` żeby zobaczyć postęp w scorze.

---

*Plan wygenerowany na podstawie GEO-AUDIT-REPORT.md — domkinaluzie.pl — 2026-06-02*

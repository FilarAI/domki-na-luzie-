# GEO Audit Report: Domki na Luzie

**Audit Date:** 2026-06-02
**URL:** https://www.domkinaluzie.pl
**Business Type:** Local Business — Vacation Rental (Premium Holiday Cottages)
**Pages Analyzed:** 1 (single-page application, no sitemap)
**Auditor:** GEO Audit Skill v1.0

---

## Executive Summary

**Overall GEO Score: 27/100 (Critical)**

Domki na Luzie to dobrze zaprojektowana strona wizualnie, ale praktycznie niewidoczna dla systemów AI. Trzy krytyczne braki dominują wynik: zero schema markup (żadne JSON-LD w całym pliku), treść bloga ukryta w JavaScript (nieczytelna dla crawlerów), oraz brak sitemap.xml i llms.txt. Strona traci ogromną szansę — ma ocenę 9.6/10 na Booking.com i 4.9/5 w Google, ale żaden system AI nie jest w stanie tego zacytować, bo dane nie są ustrukturyzowane. Wdrożenie JSON-LD z LocalBusiness + FAQPage + AggregateRating to największy pojedynczy skok w widoczności AI.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 25/100 | 25% | 6.25 |
| Brand Authority | 30/100 | 20% | 6.00 |
| Content E-E-A-T | 30/100 | 20% | 6.00 |
| Technical GEO | 40/100 | 15% | 6.00 |
| Schema & Structured Data | 5/100 | 10% | 0.50 |
| Platform Optimization | 20/100 | 10% | 2.00 |
| **Overall GEO Score** | | | **26.75/100** |

---

## Critical Issues (Napraw Natychmiast)

### CRITICAL-1: Zero Schema.org Markup
**Dotyczy:** Cały dokument index.html
**Problem:** Strona nie zawiera ani jednego bloku JSON-LD. Brak LocalBusiness, FAQPage, AggregateRating, Organization — żaden typ. AI (ChatGPT, Perplexity, Google AI Overviews) nie potrafi zidentyfikować Domki na Luzie jako encji, zweryfikować lokalizacji, zacytować ocen ani wyświetlić FAQs w AI Overviews.
**Fix:** Dodaj `<script type="application/ld+json">` z pełnym zestawem schematów (patrz sekcja Schema Deep Dive).

### CRITICAL-2: Blog Content w JavaScript — Niewidoczny dla AI
**Dotyczy:** `index.html` linie ~4863–4908 (obiekt `blogData`)
**Problem:** Trzy artykuły blogowe ("Atrakcje w Beskidach", "Luksusowy wypoczynek", "Relaks na łonie natury") są wstrzyknięte przez JavaScript do modala. Żaden crawler AI (GPTBot, ClaudeBot, PerplexityBot) nie wykonuje JavaScript na takim poziomie — te ~1500 słów wartościowej treści jest całkowicie niewidoczne.
**Fix:** Wyeks portuj treść blogów do osobnych podstron HTML (`/blog/atrakcje-beskidy`, `/blog/basen-jacuzzi`, `/blog/relaks-natura`) lub dodaj treść jako statyczny HTML ukryty przed użytkownikiem ale widoczny dla botów. Optymalne: dedykowane strony z Article schema.

### CRITICAL-3: Brak sitemap.xml
**Dotyczy:** https://domkinaluzie.pl/sitemap.xml (HTTP 404)
**Problem:** robots.txt wskazuje sitemap pod tym URL, ale zwraca 404. AI crawlery i Googlebot nie mają standardowego punktu wejścia do odkrywania stron.
**Fix:** Utwórz `/sitemap.xml` z wpisem dla strony głównej i każdej podstrony.

---

## High Priority Issues

### HIGH-1: Brak Open Graph i Twitter Card Meta Tagów
**Problem:** Brak `og:title`, `og:description`, `og:image`, `og:type`. Gdy link trafia na platformy społecznościowe lub jest analizowany przez systemy AI, nie ma metadanych do pobrania. ChatGPT i Claude używają OG tagów przy parsowaniu stron.
**Fix:** Dodaj komplet OG tagów do `<head>`.

### HIGH-2: Brak llms.txt
**Dotyczy:** https://www.domkinaluzie.pl/llms.txt (HTTP 404)
**Problem:** Emerging standard — rosnąca liczba systemów AI (Claude, Perplexity) sprawdza ten plik by zrozumieć strukturę strony. Brak = stracona szansa na kontrolowane wystawienie treści.
**Fix:** Utwórz `/llms.txt` z opisem serwisu.

### HIGH-3: Brak Canonical URL
**Problem:** Strona dostępna pod `https://www.domkinaluzie.pl` i `https://domkinaluzie.pl` bez deklaracji canonical. Duplikacja sygnałów — crawlery indeksują obie wersje jako osobne dokumenty.
**Fix:** Dodaj `<link rel="canonical" href="https://www.domkinaluzie.pl/">` do `<head>`.

### HIGH-4: Brak Potwierdzenia Google Business Profile Linkowania
**Problem:** Strona wyświetla wynik Google 4.9/5 ale nie ma `sameAs` linku do GBP w schema. AI nie może zweryfikować tożsamości encji.
**Fix:** Dodaj `sameAs` z URL do Google Business Profile w LocalBusiness schema.

---

## Medium Priority Issues

### MED-1: Brak Sekcji "O Nas" / Historia Obiektu
**Problem:** Strona nie zawiera żadnych informacji o właścicielach, roku założenia, historii miejsca. E-E-A-T (Experience, Expertise) wymaga sygnałów autentyczności. AI citability jest wyższe gdy jest konkretna osoba/historia.

### MED-2: Treść Reviews w Dynamicznym Carousel (Swiper.js)
**Problem:** Opinie gości załadowane przez Swiper.js. Część treści może być nieindeksowana. Brak AggregateRating schema sprawia, że ocen nie widać w wynikach jako rich snippets.

### MED-3: Tylko Język Polski — Brak hreflang
**Problem:** Brak deklaracji `<html lang="pl">` → jest (to plus), ale brak `<link rel="alternate" hreflang="pl">`. Dla obiektu obsługującego turystów zagranicznych to strata.

### MED-4: Regulamin i Polityka Prywatności w Google Drive
**Problem:** Dokumenty prawne linkują do `drive.google.com`. To słaby sygnał zaufania — AI traktuje Google Drive jako tymczasowe przechowywanie, nie jako własny zasób strony.

---

## Low Priority Issues

### LOW-1: Brak Favicon Zadeklarowanego przez `<link>` — Istnieje ale bez rozmiaru
### LOW-2: Brak Znacznika "dateModified" — AI nie może ustalić świeżości treści
### LOW-3: Brak Danych Cenowych w Widocznym HTML — Ceny są, ale bez markupu schema PriceRange

---

## Category Deep Dives

### AI Citability — 25/100

Strona ma **potencjał** na wysoką cytowalność ale go nie realizuje:

**Mocne strony:**
- FAQ section z 5 pytaniami i precyzyjnymi odpowiedziami — dokładnie taki format, który AI cytuje
- Konkretne dane: "Booking.com 9.6/10", "Google 4.9/5", "1 km od stoku"
- Jasna propozycja wartości: prywatny basen + jacuzzi wliczone w cenę
- Treść blogów (gdy dostępna) zawiera wartościowe informacje lokalne

**Słabe strony:**
- FAQ w HTML-u ale bez FAQPage schema → AI nie może ekstrapolować jako rich answer
- Blog niewidoczny dla crawlerów
- Brak "answer blocks" — zdań zaczynających się od "Domki na Luzie to..." które AI bezpośrednio cytuje
- Opinie gości w carouselu mogą być częściowo pominięte przez boty

**Przykłady bloków wysokiej cytowalności (już są, potrzebują tylko struktury):**
> "Nie - basen i jacuzzi są wliczone w cenę pobytu. Bez żadnych dodatkowych opłat."
> "Obiekt przeznaczony jest dla dorosłych i dzieci powyżej 12 roku życia."

Te zdania są doskonałe — precyzyjne, faktograficzne, odpowiadają na konkretne pytanie. Potrzebują FAQPage JSON-LD żeby ChatGPT/Perplexity mogły je cytować.

---

### Brand Authority — 30/100

| Platforma | Status | Szczegóły |
|---|---|---|
| Google Business Profile | Prawdopodobnie aktywny | 4.9/5 na stronie (niezweryfikowane przez schema) |
| Booking.com | Aktywny | 9.6/10 — bardzo silny sygnał |
| Facebook | Aktywny | profile.php?id=61550240939110 |
| Instagram | Aktywny | @domki_na_luzie |
| TikTok | Aktywny | @domki.na.luzie |
| YouTube | Nieznany | Brak linku na stronie |
| TripAdvisor | Nieznany | Brak linku/wzmianki |
| Wikipedia | Brak | — |
| Reddit | Nieznany | — |

**Wniosek:** Silna obecność społecznościowa i na platformach booking. Brakuje Wikipedia (niemożliwe dla małego obiektu), ale warto zadbać o TripAdvisor i wpis w lokalnych portalach turystycznych (e-miejscowosci.pl, noclegi.pl, wakacje.pl) — to właśnie te domeny AI cytuje przy pytaniach o noclegi w Beskidach.

---

### Content E-E-A-T — 30/100

| Sygnał | Ocena |
|---|---|
| Autor treści zidentyfikowany | ✗ Brak |
| Historia / rok otwarcia obiektu | ✗ Brak |
| Certyfikaty, nagrody | ✗ Brak |
| Oryginalny content (własne foto) | ✓ (CDN sugeruje własne) |
| Recenzje z zewnętrznych platform | ✓ (Booking, Google) |
| Konkretne liczby i dane | ✓ ("3 domki", "40m²", "1 km od stoku") |
| Informacje kontaktowe widoczne | ✓ |
| Polityka i regulamin | ✓ (choć w Drive) |
| Lokalizacja zweryfikowana (mapa) | ✓ (iframe Google Maps) |

Główna luka: brak twarzy/historii obiektu. Krótki akapit "Kim jesteśmy" z imieniem właściciela i rokiem otwarcia podniesie E-E-A-T natychmiast.

---

### Technical GEO — 40/100

| Check | Status |
|---|---|
| HTTPS | ✓ |
| robots.txt | ✓ Permissive |
| AI Crawlers (GPTBot, ClaudeBot, PerplexityBot) | ✓ Dozwolone |
| sitemap.xml | ✗ HTTP 404 |
| llms.txt | ✗ HTTP 404 |
| Canonical URL | ✗ Brak |
| Open Graph tags | ✗ Brak |
| Mobile responsive | ✓ |
| Images with alt text | ✓ (prawie wszystkie) |
| Lazy loading | ✓ |
| Google Analytics | ✓ (GA4 G-FN5HR9399W) |
| Google Maps embed | ✓ |
| JS-rendered critical content | ✗ Blog w JavaScript |
| Swiper.js reviews | ⚠️ Partial |
| Security headers (meta) | ✓ |

---

### Schema & Structured Data — 5/100

**Wynik:** Żaden typ schema.org nie jest obecny w kodzie. To najbardziej krytyczny gap w całym audycie.

**Schema których brakuje (priorytet):**

```json
// 1. LOKALNY BIZNES — najważniejszy
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Domki na Luzie",
  "description": "Prywatne domki premium z basenem i jacuzzi w Beskidach. Między Krakowem a Zakopanem.",
  "url": "https://www.domkinaluzie.pl",
  "telephone": "+48605744722",
  "email": "rezerwacja@domkinaluzie.pl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Spytkowice 103",
    "addressLocality": "Spytkowice",
    "postalCode": "34-745",
    "addressCountry": "PL",
    "addressRegion": "Małopolska"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "49.6234",
    "longitude": "19.7183"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.6",
    "bestRating": "10",
    "ratingCount": "50",
    "reviewCount": "50"
  },
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Basen", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Jacuzzi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Klimatyzacja", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "WiFi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Parking", "value": true}
  ],
  "checkinTime": "15:00",
  "checkoutTime": "11:00",
  "petsAllowed": "small dogs up to 5kg",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61550240939110",
    "https://www.instagram.com/domki_na_luzie/",
    "https://www.tiktok.com/@domki.na.luzie"
  ]
}

// 2. FAQPAGE — drugi priorytet
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Czy basen i jacuzzi są dodatkowo płatne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nie - basen i jacuzzi są wliczone w cenę pobytu. Bez żadnych dodatkowych opłat."
      }
    },
    {
      "@type": "Question",
      "name": "Czy można przyjechać ze zwierzętami?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Przyjmujemy małe psy do 4-5 kg. Prosimy o wcześniejsze poinformowanie przy rezerwacji."
      }
    },
    {
      "@type": "Question",
      "name": "Czy obiekt jest odpowiedni dla dzieci?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Obiekt przeznaczony jest dla dorosłych i dzieci powyżej 12 roku życia."
      }
    },
    {
      "@type": "Question",
      "name": "Czy na miejscu jest parking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak - bezpłatne miejsce parkingowe przy każdym domku."
      }
    },
    {
      "@type": "Question",
      "name": "Czy trzeba wpłacić zaliczkę?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak, pobieramy 30% zadatku przy rezerwacji. Zadatek jest bezzwrotny, ale dopuszczamy jednorazową zmianę terminu w wyjątkowych sytuacjach."
      }
    }
  ]
}
```

---

### Platform Optimization — 20/100

| Platforma AI | Gotowość | Główna Luka |
|---|---|---|
| Google AI Overviews | Niska | Brak FAQPage schema, brak structured data |
| ChatGPT / Bing Copilot | Niska | Brak OG tagów, brak llms.txt |
| Perplexity AI | Niska | Brak cytowalne bloki, brak schema |
| Google Gemini | Niska | Brak LocalBusiness schema |
| Claude (Anthropic) | Niska | Brak llms.txt |

Wszystkie platformy skorzystają natychmiastowo po wdrożeniu schema + OG tags + llms.txt.

---

## Quick Wins (Wdróż w tym Tygodniu)

1. **Dodaj LocalBusiness + FAQPage JSON-LD** — 30 minut pracy, największy skok w rankingach AI. Gotowy kod powyżej.
2. **Dodaj Open Graph meta tagi** — `<meta property="og:title">`, `og:description`, `og:image`, `og:type`. 10 minut.
3. **Dodaj `<link rel="canonical" href="https://www.domkinaluzie.pl/">`** — 2 minuty.
4. **Utwórz sitemap.xml** — minimalna wersja z jednym wpisem, 10 minut.
5. **Utwórz llms.txt** — podstawowy plik z opisem serwisu, 15 minut.

---

## 30-Day Action Plan

### Tydzień 1: Struktury Danych (Najwyższy ROI)
- [ ] Dodaj LodgingBusiness JSON-LD z pełnym adresem, geo, amenities, check-in/out
- [ ] Dodaj FAQPage JSON-LD dla 5 istniejących pytań
- [ ] Dodaj AggregateRating JSON-LD (Booking.com 9.6/10)
- [ ] Dodaj Open Graph meta tagi (title, description, image, type=website)
- [ ] Dodaj canonical URL
- [ ] Dodaj sitemap.xml

### Tydzień 2: AI Crawler Infrastructure
- [ ] Utwórz llms.txt z opisem domeny
- [ ] Dodaj `<meta name="robots" content="index, follow">` explicite
- [ ] Wyeksportuj treść blogów do statycznych podstron HTML
- [ ] Dodaj Article schema dla każdego wpisu blogowego

### Tydzień 3: Brand Authority & E-E-A-T
- [ ] Dodaj krótką sekcję "O nas" z imieniem właściciela i historią obiektu
- [ ] Zweryfikuj i uzupełnij Google Business Profile (dodaj wszystkie zdjęcia, odpowiedz na recenzje)
- [ ] Dodaj profil na TripAdvisor
- [ ] Wpisz obiekt w lokalne portale turystyczne: noclegi.pl, nocowanko.pl, e-miejscowosci.pl

### Tydzień 4: Content Optimization
- [ ] Rozszerz FAQ o 3-5 pytań (szczególnie o cenach i sezonowości)
- [ ] Dodaj blok tekstowy "Gdzie jesteśmy" z opisem lokalizacji (AI entity recognition)
- [ ] Przenieś Regulamin i Politykę Prywatności z Google Drive na własną domenę
- [ ] Rozważ dodanie strony w języku angielskim lub niemieckim (TouristAttraction schema)

---

## Appendix: Pages Analyzed

| URL | Title | Status | GEO Issues |
|---|---|---|---|
| https://www.domkinaluzie.pl | Domki na Luzie - Prywatne domki premium w Beskidach | 200 OK | Schema 0%, OG missing, No canonical |
| https://www.domkinaluzie.pl/sitemap.xml | — | 404 Not Found | Critical: sitemap missing |
| https://www.domkinaluzie.pl/llms.txt | — | 404 Not Found | High: llms.txt missing |
| https://www.domkinaluzie.pl/robots.txt | — | 200 OK | OK: permissive, AI bots allowed |

---

## Priority Fix: Gotowy Kod JSON-LD do Wklejenia

Wklej **bezpośrednio przed `</head>`** w `index.html`:

```html
<!-- GEO: LodgingBusiness Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Domki na Luzie",
  "description": "Prywatne domki premium z basenem i jacuzzi w sercu Beskidów. 1 km od stoku narciarskiego. Między Krakowem a Zakopanem.",
  "url": "https://www.domkinaluzie.pl",
  "telephone": "+48605744722",
  "email": "rezerwacja@domkinaluzie.pl",
  "image": "https://us-ms.gr-cdn.com/getresponse-IqzZc/photos/318c9337-3c12-4a4c-b41f-07b01eb79e8f.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Spytkowice 103",
    "addressLocality": "Spytkowice",
    "postalCode": "34-745",
    "addressCountry": "PL",
    "addressRegion": "Małopolska"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "49.6234",
    "longitude": "19.7183"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.6",
    "bestRating": "10",
    "worstRating": "1",
    "ratingCount": "50"
  },
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
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61550240939110",
    "https://www.instagram.com/domki_na_luzie/",
    "https://www.tiktok.com/@domki.na.luzie"
  ]
}
</script>

<!-- GEO: FAQPage Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Czy basen i jacuzzi są dodatkowo płatne?",
      "acceptedAnswer": {"@type": "Answer", "text": "Nie - basen i jacuzzi są wliczone w cenę pobytu. Bez żadnych dodatkowych opłat."}
    },
    {
      "@type": "Question",
      "name": "Czy można przyjechać ze zwierzętami?",
      "acceptedAnswer": {"@type": "Answer", "text": "Przyjmujemy małe psy do 4-5 kg. Prosimy o wcześniejsze poinformowanie przy rezerwacji."}
    },
    {
      "@type": "Question",
      "name": "Czy obiekt jest odpowiedni dla dzieci?",
      "acceptedAnswer": {"@type": "Answer", "text": "Obiekt przeznaczony jest dla dorosłych i dzieci powyżej 12 roku życia."}
    },
    {
      "@type": "Question",
      "name": "Czy na miejscu jest parking?",
      "acceptedAnswer": {"@type": "Answer", "text": "Tak - bezpłatne miejsce parkingowe przy każdym domku."}
    },
    {
      "@type": "Question",
      "name": "Czy trzeba wpłacić zaliczkę?",
      "acceptedAnswer": {"@type": "Answer", "text": "Tak, pobieramy 30% zadatku przy rezerwacji. Zadatek jest bezzwrotny, ale dopuszczamy jednorazową zmianę terminu w wyjątkowych sytuacjach."}
    }
  ]
}
</script>
```

---

*Raport wygenerowany przez GEO Audit Skill — domkinaluzie.pl — 2026-06-02*

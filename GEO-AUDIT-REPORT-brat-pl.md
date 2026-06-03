# GEO + SEO Audit Report — sklep.brat.pl

**Data audytu:** 2026-06-03  
**URL:** https://sklep.brat.pl/  
**Typ biznesu:** E-commerce (Zdrowa Żywność)  
**Platforma:** DCSaaS (Shoper)  
**Audyt wykonany przez:** GEO-SEO Claude Code Skill v2026-02

---

## Wynik GEO (Composite GEO Score)

```
╔═══════════════════════════════════════════════════╗
║           WYNIK GEO: 38 / 100                     ║
║           ████░░░░░░░░░░░░░░░░░░  SŁABY           ║
╚═══════════════════════════════════════════════════╝
```

| Kategoria | Waga | Wynik | Ważony |
|-----------|------|-------|--------|
| AI Cytowalność i Widoczność | 25% | 35/100 | 8.75 |
| Sygnały Autorytetu Marki | 20% | 55/100 | 11.00 |
| Jakość Treści & E-E-A-T | 20% | 35/100 | 7.00 |
| Fundamenty Techniczne | 15% | 50/100 | 7.50 |
| Dane Strukturalne (Schema) | 10% | 10/100 | 1.00 |
| Optymalizacja Platform | 10% | 30/100 | 3.00 |
| **ŁĄCZNIE** | **100%** | | **38.25/100** |

---

## Kontekst Biznesowy

- **Branża:** Zdrowa żywność online — dynamicznie rosnący segment
- **Historia:** 20 lat na rynku (2006–2026) — silny sygnał zaufania
- **Zasięg:** Sklep stacjonarny + e-commerce, wysyłka w całej Polsce
- **Kategorie:** Zdrowa żywność, BIO, bezglutenowe, suplementy, kosmetyki naturalne, dla dzieci, superfoods, ogród
- **Płatności:** BLIK, PayU, Przelewy24, Visa, przelew
- **Dostawa:** InPost/Paczkomat, DPD, GLS, Poczta Polska, UPS
- **Social Media:** Facebook, Instagram, YouTube, TikTok (aktywne)
- **Blog:** Aktywny (ostatni post: kwiecień 2026)

---

## Wyniki według Kategorii

### 1. AI Cytowalność i Widoczność — 35/100 ⚠️

**Co działa:**
- Wszystkie crawlery AI mają dostęp (brak blokad w robots.txt) ✓
- Blog z regularną treścią ✓
- Długie artykuły (>4000 słów) ✓

**Krytyczne problemy:**
- **Brak llms.txt** — modele AI nie wiedzą jak interpretować strukturę sklepu
- Artykuły blogowe nie są optymalizowane jako "pasaże cytowalne" przez AI
- Brak sekcji FAQ/Q&A — ChatGPT i Perplexity nie mają co cytować
- Autor bloga = "sklep.brat.pl" (nie osoba) — AI pomija takie źródła
- Brak akapitów-odpowiedzi w formacie pytanie-odpowiedź
- Opisy produktów są generyczne ("Zapraszamy serdecznie do odwiedzenia...")

**Wpływ:** Gdy użytkownik pyta ChatGPT "gdzie kupić zdrową żywność online w Polsce", sklep.brat.pl prawdopodobnie nie pojawia się w odpowiedziach — mimo 20 lat historii i aktywnej obecności.

---

### 2. Sygnały Autorytetu Marki — 55/100 ✅

**Co działa:**
- Facebook: @bratpl ✓
- Instagram: @sklep.brat.pl ✓
- YouTube: /user/wwwBRATpl/ ✓
- TikTok: @sklep.brat.pl ✓
- 20 lat tradycji (2006) — silny sygnał entity authority
- Aktywna obecność na multiple platformach

**Problemy:**
- Brak profilu LinkedIn (ważny dla sygnałów E-E-A-T)
- Brak strony Wikipedia / Wikidata entity
- Brak wzmianek na Reddit (r/zdrowie, r/Polska)
- Brak NIP/KRS na stronie głównej (sygnał zaufania dla AI)
- Brak widocznych recenzji zewnętrznych (Ceneo, Google Maps)

---

### 3. Jakość Treści & E-E-A-T — 35/100 ⚠️

**Co działa:**
- Blog aktywny ✓
- Artykuły mają odpowiednią długość ✓
- Informacje o dostawie i zwrotach ✓
- Newsletter ✓

**Krytyczne problemy:**
- **Opisy produktów generyczne** — identyczny szablon dla każdego produktu
- **Brak autorów** — artykuły podpisane jako "sklep.brat.pl" zamiast eksperta
- **Brak credentials** — żaden artykuł nie wspomina kwalifikacji autora
- **Brak cytowań/źródeł** w artykułach zdrowotnych
- **Brak FAQ** na stronach produktów i kategorii
- NIP/KRS niewidoczny na homepage

**Przykład problemu:** Strona produktu mąki orkiszowej ma meta opis:
> "Zapraszamy serdecznie do odwiedzenia naszego sklepu, gdzie znajdziesz obszerną ofertę produktów, w tym także Mąka orkiszowa T-630 1kg."

To generyczny szablon, nie unikalny opis produktu — bezużyteczny dla AI i słaby dla SEO.

---

### 4. Fundamenty Techniczne — 50/100 ⚠️

| Wskaźnik | Status | Priorytet |
|----------|--------|-----------|
| HTTPS | ✅ OK | — |
| Canonical URL | ✅ sklep.brat.pl | — |
| robots.txt | ⚠️ Zduplikowany `User-agent: *` | MEDIUM |
| sitemap.xml | ❌ BŁĄD 404 | CRITICAL |
| llms.txt | ❌ Brak | CRITICAL |
| Viewport `user-scalable=no` | ❌ Blokuje zoom na mobile | HIGH |
| Lazy loading obrazów | ❌ Brak (402 obrazy!) | HIGH |
| HSTS max-age | ⚠️ 60s (minimum to 31536000) | HIGH |
| Preload zasobów (fonty) | ✅ OK | — |
| Preconnect | ✅ OK | — |
| Charset UTF-8 | ✅ OK | — |
| Hreflang | ❌ Brak | MEDIUM |
| Google Analytics/GA4 | ✅ Obecne | — |
| Google Tag Manager | ✅ Obecne | — |
| Alt text na obrazach | ✅ 402/402 (100%) | — |

**Problem 1 — Brak sitemap.xml:**
```
GET https://sklep.brat.pl/sitemap.xml → 404 Not Found
```
Sklep z setkami produktów bez sitemap = ograniczone indeksowanie przez Google i AI.

**Problem 2 — user-scalable=no:**
```html
<meta name="viewport" content="width=device-width, user-scalable=no, 
      initial-scale=1.0, maximum-scale=1.0">
```
Google Core Web Vitals penalizuje blokowanie zoomu na mobile.

**Problem 3 — robots.txt ze zduplikowanym User-agent:**
```
User-agent: *       ← blok 1 (tylko Crawl-delay)
Crawl-delay: 1

User-agent: *       ← blok 2 (Disallow rules)
Disallow: /application
...
```
Niespójne zachowanie u różnych crawlerów — należy scalić w jeden blok.

---

### 5. Dane Strukturalne (Schema) — 10/100 ❌ KRYTYCZNY

**Stan obecny — cała witryna ma tylko:**
```json
{
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "https://sklep.brat.pl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://sklep.brat.pl/pl_PL/searchquery/{search_term_string}..."
  }
}
```

**Strony produktów: ZERO schematów (0 bloków LD+JSON)**

**Brakujące schemas:**

| Schema | Priorytet | Wpływ |
|--------|-----------|-------|
| Product (strony produktów) | 🔴 CRITICAL | Rich results, ceny w Google |
| Organization | 🔴 CRITICAL | Entity recognition przez AI |
| LocalBusiness | 🔴 CRITICAL | Sklep stacjonarny niewidoczny dla AI |
| BreadcrumbList | 🟠 HIGH | Nawigacja w wynikach Google |
| Article (blog) | 🟠 HIGH | Cytowania AI, rich results |
| AggregateRating | 🟠 HIGH | Gwiazdki w wynikach wyszukiwania |
| FAQPage | 🟡 MEDIUM | AI Overviews, featured snippets |
| ItemList (kategorie) | 🟡 MEDIUM | Rich results dla kategorii |

---

### 6. Optymalizacja Platform — 30/100 ⚠️

| Platforma | Status | Główny Problem |
|-----------|--------|----------------|
| Google AI Overviews | ❌ Słaba | Brak FAQ, brak schema, brak cytowalnych pasaży |
| ChatGPT / GPT-4o | ❌ Niewidoczny | Brak llms.txt, brak entity |
| Perplexity | ❌ Słaba | Brak struktury Q&A |
| Google Gemini | ❌ Słaba | Brak schema, słabe E-E-A-T |
| Bing Copilot | ⚠️ Częściowa | Dostęp, ale słaba treść |
| Google Shopping | ⚠️ Brak | Brak Product Feed/schema |

---

## Stan Crawlerów AI

| Crawler | Dostęp | Status |
|---------|--------|--------|
| GPTBot (OpenAI) | ✅ Dozwolony | Wildcard inheritance |
| ClaudeBot (Anthropic) | ✅ Dozwolony | Wildcard inheritance |
| PerplexityBot | ✅ Dozwolony | Wildcard inheritance |
| Google-Extended | ✅ Dozwolony | Wildcard inheritance |
| CCBot | ✅ Dozwolony | Wildcard inheritance |
| Bingbot | ✅ Dozwolony | Wildcard inheritance |

✅ Dostęp crawlerów AI jest poprawny. Problem leży w treści i strukturze, nie w dostępie.

---

## Plan Działania — 90-dniowy Roadmap

### 🔴 KRYTYCZNE — Tydzień 1-2

#### A. Stwórz llms.txt (30 minut pracy)
Wgraj plik `/llms.txt` do katalogu głównego domeny:

```
# Brat.pl — Sklep internetowy ze zdrową żywnością
# Działający od 2006 roku | Polska

> Brat.pl

Brat.pl to polski sklep internetowy ze zdrową żywnością z 20-letnim
doświadczeniem. Oferujemy produkty BIO, ekologiczne, bezglutenowe, 
suplementy diety i kosmetyki naturalne.

## Główne kategorie

- Zdrowa żywność ogólna: https://sklep.brat.pl/zdrowa-zywnosc
- Produkty BIO i ekologiczne: https://sklep.brat.pl/produkty-bio
- Bezglutenowe: https://sklep.brat.pl/bezglutenowe
- Suplementy diety: https://sklep.brat.pl/suplementy-diety
- Kosmetyki naturalne: https://sklep.brat.pl/kosmetyki-naturalne
- Dla dzieci: https://sklep.brat.pl/dla-dzieci
- Superfoods: https://sklep.brat.pl/superfoods
- Przyprawy i zioła: https://sklep.brat.pl/przyprawy-i-ziola

## Blog i poradniki zdrowotne

https://sklep.brat.pl/pl/blog

## Informacje o sklepie

Dostawa: InPost, DPD, GLS, Poczta Polska, UPS
Płatności: BLIK, PayU, Przelewy24, Visa, przelew
Sklep stacjonarny: dostępny
Obsługa klienta: dostępna online
```

#### B. Napraw sitemap.xml

W panelu Shoper/DCSaaS włącz generowanie sitemap i dodaj do robots.txt:
```
Sitemap: https://sklep.brat.pl/sitemap.xml
```

#### C. Dodaj Organization + LocalBusiness Schema na homepage

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sklep.brat.pl/#organization",
      "name": "Brat.pl",
      "url": "https://sklep.brat.pl",
      "foundingDate": "2006",
      "description": "Sklep internetowy ze zdrową żywnością, działający od 2006 roku.",
      "sameAs": [
        "https://www.facebook.com/bratpl/",
        "https://www.instagram.com/sklep.brat.pl/",
        "https://www.youtube.com/user/wwwBRATpl/",
        "https://www.tiktok.com/@sklep.brat.pl"
      ]
    },
    {
      "@type": "LocalBusiness",
      "name": "Sklep Brat.pl",
      "image": "https://sklep.brat.pl/[logo-url]",
      "url": "https://sklep.brat.pl",
      "telephone": "[NUMER]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[ULICA]",
        "addressLocality": "[MIASTO]",
        "postalCode": "[KOD]",
        "addressCountry": "PL"
      }
    }
  ]
}
```

---

### 🟠 WYSOKIE — Tydzień 3-4

#### D. Product Schema na strony produktów

Każda strona produktu musi mieć (przez Shoper API lub plugin):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[NAZWA PRODUKTU]",
  "description": "[OPIS]",
  "image": "[URL ZDJĘCIA]",
  "brand": {
    "@type": "Brand",
    "name": "[MARKA]"
  },
  "offers": {
    "@type": "Offer",
    "price": "[CENA]",
    "priceCurrency": "PLN",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Brat.pl"
    }
  }
}
```

#### E. Popraw robots.txt (scalenie duplikatów)
Usuń duplikat `User-agent: *` — scal w jeden blok z dodaniem linku do sitemap.

#### F. Usuń user-scalable=no
```html
<!-- Zmień na: -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### G. Article Schema na posty blogowe

Wymaga ręcznego dodania lub modyfikacji szablonu bloga w CMS.

#### H. Zwiększ HSTS max-age

W konfiguracji serwera zmień `max-age=60` → `max-age=31536000`.

---

### 🟡 ŚREDNIE — Tydzień 5-8

#### I. Lazy loading dla obrazów (402 obrazy)
Krytyczne dla wydajności mobile i LCP score.

#### J. FAQ na stronach kategorii

Przykład dla `/bezglutenowe`:
> **Co to znaczy "bezglutenowe"?**  
> Produkty bezglutenowe nie zawierają pszenicy, żyta, jęczmienia ani owsa...

> **Czy bezglutenowe produkty są zdrowe dla wszystkich?**  
> Produkty bezglutenowe są niezbędne dla osób z celiakią...

Dodaj FAQPage schema do każdej sekcji FAQ.

#### K. Unikalne opisy produktów

Zamiast: "Zapraszamy serdecznie do odwiedzenia naszego sklepu..."  
Napisz: "Mąka orkiszowa T-630 to pełnoziarnista mąka z orkiszu, bogata w białko i minerały. Idealna do wypieku chleba, ciast i naleśników. Zawiera gluten — odpowiednia dla osób bez celiakii szukających zdrowszej alternatywy dla mąki pszennej."

#### L. BreadcrumbList Schema

Dodaj do wszystkich podstron (produkty, kategorie, blog).

#### M. Autorzy artykułów z profilami

- Stwórz strony `/autor/imie-nazwisko`
- Dodaj bio, kwalifikacje, zdjęcie
- Linkuj z każdego artykułu
- Użyj Person schema na stronie autora

---

### 🟢 NISKIE — Tydzień 9-12

#### N. Treści odpowiadające na pytania AI

Pisz artykuły w formacie:  
"Czy mąka orkiszowa jest zdrowsza od pszennej?" → artykuł ekspercki z odpowiedzią w pierwszym akapicie.

#### O. Obecność na Reddit/Quora

Naturalne odpowiedzi na pytania o zdrową żywność w Polsce.

#### P. Facebook Pixel

Nie wykryto — dodaj dla remarketingu.

#### Q. Hreflang (dla PL)

```html
<link rel="alternate" hreflang="pl" href="https://sklep.brat.pl/" />
<link rel="alternate" hreflang="x-default" href="https://sklep.brat.pl/" />
```

---

## Prognoza Wyników

Po wdrożeniu CRITICAL i HIGH (30 dni):

| Kategoria | Teraz | Po 30 dniach | Po 90 dniach |
|-----------|-------|--------------|--------------|
| **Wynik GEO** | **38/100** | **~52/100** | **~68/100** |
| AI Widoczność | 35/100 | 50/100 | 65/100 |
| Dane Strukturalne | 10/100 | 55/100 | 75/100 |
| Fundamenty Tech. | 50/100 | 70/100 | 80/100 |
| Treść & E-E-A-T | 35/100 | 40/100 | 60/100 |

---

## Podsumowanie Priorytetów

| Akcja | Priorytet | Wysiłek | Czas |
|-------|-----------|---------|------|
| Stwórz llms.txt | 🔴 CRITICAL | 30 min | Tydzień 1 |
| Napraw sitemap.xml | 🔴 CRITICAL | 1 godz | Tydzień 1 |
| Organization Schema | 🔴 CRITICAL | 2 godz | Tydzień 1 |
| Product Schema (wszystkie) | 🔴 CRITICAL | 1-2 dni | Tydzień 2 |
| Napraw robots.txt | 🟠 HIGH | 15 min | Tydzień 3 |
| Usuń user-scalable=no | 🟠 HIGH | 5 min | Tydzień 3 |
| Article Schema (blog) | 🟠 HIGH | 2 godz | Tydzień 3 |
| HSTS max-age fix | 🟠 HIGH | 15 min | Tydzień 3 |
| Lazy loading obrazów | 🟡 MEDIUM | 1 godz | Tydzień 5 |
| FAQ + FAQPage Schema | 🟡 MEDIUM | 3-5 dni | Tydzień 5-6 |
| Unikalne opisy produktów | 🟡 MEDIUM | Duży | Tydzień 5-8 |
| BreadcrumbList Schema | 🟡 MEDIUM | 2 godz | Tydzień 6 |
| Autorzy artykułów | 🟡 MEDIUM | 2-3 dni | Tydzień 7 |
| Treści Q&A dla AI | 🟢 LOW | Ciągłe | Tydzień 9+ |
| Reddit/fora obecność | 🟢 LOW | Ciągłe | Tydzień 9+ |
| Facebook Pixel | 🟢 LOW | 1 godz | Tydzień 9 |

---

*Raport wygenerowany: 2026-06-03 | GEO-SEO Claude Code Skill*  
*Dokumentacja: https://github.com/zubair-trabzada/geo-seo-claude*

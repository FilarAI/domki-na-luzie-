# Audyt GEO Nr 2 (zaktualizowany) — domkinaluzie.pl

**Data audytu:** 2026-06-12
**Wersja:** 2.1 (zaktualizowana po wdrożeniu zmian on-site)
**Poprzedni audyt:** 2026-06-02 (GEO-AUDIT-NR1.md)
**URL:** https://www.domkinaluzie.pl
**Typ biznesu:** Wynajem premium domków wakacyjnych (Beskidy)
**Przeanalizowane strony:** 8 (strona główna + 5 blogów + regulamin + polityka prywatności)
**Audytor:** FILAR AI

---

## Podsumowanie Wykonawcze

**Ogólny Wynik GEO: 61/100 (Słaby → Umiarkowany)**

Od pierwszego audytu (02.06) strona domkinaluzie.pl podniosła wynik z **27/100** do **61/100** — skok o **+34 punkty** w 10 dni. Największe postępy: Schema & Structured Data (+77 pkt), Technical GEO (+43 pkt), AI Citability (+44 pkt). Na stronie wdrożono kompletną infrastrukturę GEO: 7 bloków JSON-LD, 5 artykułów blogowych z 9 linkami zewnętrznymi, sekcję "O Nas" z Person schema, rozbudowane FAQ (8 widocznych / 13 w schema), cookie consent i llms.txt.

**Głównym hamulcem wzrostu** pozostają kategorie zależne od działań zewnętrznych: **Brand Authority (32/100)** i **Platform Optimization (25/100)**. Klientka nie wykonała jeszcze żadnych z 7 zaplanowanych działań zewnętrznych (Google Business Profile, TripAdvisor, portale turystyczne, YouTube).

### Rozbicie Wyników

| Kategoria | Wynik | Waga | Wynik Ważony |
|---|---|---|---|
| AI Citability | 69/100 | 25% | 17.25 |
| Brand Authority | 32/100 | 20% | 6.40 |
| Content E-E-A-T | 68/100 | 20% | 13.60 |
| Technical GEO | 83/100 | 15% | 12.45 |
| Schema & Structured Data | 82/100 | 10% | 8.20 |
| Platform Optimization | 25/100 | 10% | 2.50 |
| **Ogólny Wynik GEO** | | | **60.4 → 61/100** |

### Porównanie z Audytem Nr 1 i Nr 2 (wersja przed zmianami)

| Kategoria | Audyt 1 (02.06) | Audyt 2 v1 (12.06) | Audyt 2 v2 (po zmianach) | Łączna zmiana |
|---|---|---|---|---|
| AI Citability | 25/100 | 62/100 | **69/100** | **+44** ▲ |
| Brand Authority | 30/100 | 32/100 | 32/100 | +2 ▲ |
| Content E-E-A-T | 30/100 | 58/100 | **68/100** | **+38** ▲ |
| Technical GEO | 40/100 | 78/100 | **83/100** | **+43** ▲ |
| Schema & Structured Data | 5/100 | 75/100 | **82/100** | **+77** ▲ |
| Platform Optimization | 20/100 | 25/100 | 25/100 | +5 ▲ |
| **OGÓLNY** | **27/100** | **55/100** | **61/100** | **+34** ▲ |

---

## Co Zostało Zrobione od Audytu Nr 1 (02.06 → 12.06)

### Sprint 1: Infrastruktura techniczna (02.06 → 08.06)
- [x] **7 bloków JSON-LD** na stronie głównej: LodgingBusiness, FAQPage (13 pytań), OfferCatalog (4 pakiety), TouristAttraction, Article (×5), Review (×8), **Person (właścicielka)**
- [x] **5 artykułów blogowych** na osobnych podstronach HTML (~11 500 słów łącznie)
- [x] **Article + BreadcrumbList + FAQPage schema** na każdym artykule blogowym
- [x] **robots.txt** z regułami dla 7 AI crawlerów
- [x] **llms.txt** z pełnym opisem obiektu
- [x] **sitemap.xml** z 8 URL-ami
- [x] **Open Graph meta tagi** na wszystkich stronach
- [x] **Canonical URL** + meta robots z max-snippet:-1 na każdej stronie
- [x] **regulamin.html** i **polityka-prywatnosci.html** na własnej domenie

### Sprint 2: Content & UX (08.06 → 12.06)
- [x] **Sekcja "O Nas"** z historią obiektu, imieniem właścicielki (Ewa), rokiem otwarcia (2024), cytatem z recenzji
- [x] **Person JSON-LD schema** — właścicielka Ewa z jobTitle i worksFor
- [x] **FAQ rozszerzony do 8 pytań widocznych** w HTML (z 5). Pytania dodane: Zakopane (30 min), Termy Gorący Potok (20 min), Obiekt czynny zimą (1 km od stoku)
- [x] **9 linków zewnętrznych** w 5 artykułach blogowych do oficjalnych stron atrakcji:
  - Termy: goracypotok.pl, chocholowskietermy.pl, termabania.pl
  - Natura: bgpn.gov.pl, pttk.pl
  - Sport: kompleksbeskid.pl
  - Kultura: zameksucha.pl
  - Booking: booking.com/domki-na-luzie
  - Termy (blog 2): goracypotok.pl
- [x] **Cookie consent widget** — banner z "Tylko niezbędne" / "Akceptuj wszystkie", localStorage
- [x] **Data w stopce** — 2025 → 2026

### Działania Zewnętrzne (NIE wykonane przez klientkę — 0/7)
- [ ] Google Business Profile — weryfikacja i optymalizacja
- [ ] TripAdvisor — dodanie obiektu
- [ ] noclegi.pl — rejestracja
- [ ] nocowanko.pl — rejestracja
- [ ] e-turystyka.pl — rejestracja
- [ ] YouTube — kanał / Short z domkami
- [ ] Aktywne zbieranie opinii od gości

---

## Problemy Krytyczne

### CRITICAL-1: Brak obecności na TripAdvisor
**Wpływ:** Brand Authority (-15 pkt), Platform Optimization (-10 pkt)
**Problem:** TripAdvisor to platforma najczęściej cytowana przez ChatGPT, Perplexity i Gemini przy pytaniach o noclegi w Polsce. Bez profilu obiekt jest niewidoczny dla AI przy zapytaniach typu "najlepsze domki w Beskidach".
**Rozwiązanie:** tripadvisor.com → "List your property". Dodać 10+ zdjęć, pełen opis. Zachęcić 5 pierwszych gości do recenzji.
**Oczekiwany wpływ na wynik:** Brand Authority +10, Platform +8

### CRITICAL-2: Brak na polskich portalach noclegowych
**Wpływ:** Brand Authority (-10 pkt), Platform Optimization (-10 pkt)
**Problem:** Domki na Luzie nie istnieją na noclegi.pl, nocowanko.pl, e-turystyka.pl, wakacje.pl. Przy zapytaniach AI typu "domki z jacuzzi Beskidy" te portale są cytowane najczęściej — strona tam nie istnieje.
**Rozwiązanie:** Rejestracja na min. 3 portalach (priorytet: noclegi.pl, nocowanko.pl).
**Oczekiwany wpływ na wynik:** Brand Authority +10, Platform +10

### CRITICAL-3: Google Business Profile — niezoptymalizowany
**Wpływ:** Brand Authority (-15 pkt), AI Citability (-5 pkt)
**Problem:** Profil prawdopodobnie istnieje (dane w agregatorach Google Hotels, Trivago, Agoda), ale brak bezpośredniego, zoptymalizowanego wyniku Google Maps. Brak odpowiedzi na recenzje = brak sygnału aktywności dla AI.
**Rozwiązanie:** Zweryfikować profil, załadować 20+ zdjęć, odpowiedzieć na WSZYSTKIE recenzje, uzupełnić kategorie.
**Oczekiwany wpływ na wynik:** Brand Authority +15, AI Citability +5

---

## Problemy Wysokiego Priorytetu

### HIGH-1: Brak widoczności na kluczowe zapytania
**Wpływ:** Platform Optimization
**Problem:** Strona pojawia się na 1/5 testowanych zapytań ("domki premium Beskidy basen" — #1). Na frazy generyczne jest niewidoczna. Dominują agregatory: Slowhop, Booking, OLX.
**Rozwiązanie:** Obecność w agregatorach + budowanie linków + nowe artykuły na frazy long-tail.

### HIGH-2: Brak kanału YouTube
**Wpływ:** Brand Authority, Platform Optimization
**Problem:** YouTube to platforma najczęściej cytowana przez Google Gemini. Domki premium z basenem — idealny content wizualny.
**Rozwiązanie:** YouTube Short 60s: przejście po domkach → basen → jacuzzi → widoki. Link do domkinaluzie.pl w opisie.
**Oczekiwany wpływ:** Brand Authority +8, Platform +5

---

## Problemy Średniego Priorytetu

### MED-1: Brak dateModified na starszych artykułach
**Problem:** Starsze artykuły (stok, domki-z-basenem, romantyczny) nie mają dateModified w Article schema. AI nie może ustalić świeżości.

### MED-2: Brak PriceRange w LodgingBusiness schema
**Problem:** Ceny są widoczne w HTML, ale brak PriceRange w JSON-LD. Google AI Overviews preferuje dane z schema.

### MED-3: Blog bez perspektywy pierwszoosobowej
**Problem:** Artykuły są informacyjne, ale bezosobowe. "Jako gospodarz polecam..." buduje Experience w E-E-A-T.

### MED-4: Wszystkie recenzje 5-gwiazdkowe (8/8)
**Problem:** Brak zróżnicowania ocen. 100% pozytywnych = mniej wiarygodne w oczach AI.

---

## Problemy Niskiego Priorytetu

### LOW-1: Brak ImageObject z caption w schema
### LOW-2: Brak Event schema dla sezonowych pakietów
### LOW-3: Brak Organization schema z NIP/REGON
### LOW-4: Brak hreflang (ok dla single-language)

---

## Szczegółowa Analiza Kategorii

### AI Citability — 69/100 (+44 od Audytu 1)

**Mocne strony:**
- 13 FAQ z precyzyjnymi odpowiedziami — idealny format cytowania AI
- 8 pytań widocznych w HTML, 13 w schema (pełne pokrycie)
- 5 artykułów blogowych (~11 500 słów) z FAQ sekcjami
- 9 linków zewnętrznych do oficjalnych stron atrakcji (termy, parki, stoki)
- Sekcja "O Nas" z narratywem o właścicielce i historii obiektu
- Konkretne dane liczbowe: "Booking.com 9.6/10", "Google 4.9/5", "1 km od stoku", "40 m²"
- Ceny widoczne: "od 1 200 zł do 2 000 zł za 2 noce"
- llms.txt z pełnym opisem obiektu
- Statyczne bloki article widoczne dla crawlerów

**Braki:**
- Blog bez perspektywy pierwszoosobowej (brak "Experience" signal)
- Brak cytowań ekspertów zewnętrznych w artykułach
- Brak porównań z konkurencją (listy "Top 5 domków w Beskidach")

---

### Brand Authority — 32/100 (+2 od Audytu 1)

| Platforma | Status | Szczegóły |
|---|---|---|
| Strona własna | ✅ Aktywna | domkinaluzie.pl z pełnym GEO |
| Booking.com | ✅ Aktywna | 9.6/10, ~10 opinii |
| Facebook | ✅ Aktywna | Profil firmowy |
| Instagram | ✅ Aktywna | @domki_na_luzie |
| TikTok | ✅ Aktywna | @domki.na.luzie |
| Google Hotels | ✅ Aktywna | Widoczny w wyszukiwarce |
| Trivago | ✅ Aktywna | Syndykacja Booking |
| Agoda | ✅ Aktywna | Syndykacja Booking |
| Google Business Profile | ⚠️ Niezweryfikowany | Dane w agregatorach, brak Maps |
| TripAdvisor | ❌ Brak | Nie znaleziono |
| noclegi.pl | ❌ Brak | Nie znaleziono |
| nocowanko.pl | ❌ Brak | Nie znaleziono |
| e-turystyka.pl | ❌ Brak | Nie znaleziono |
| YouTube | ❌ Brak | Brak kanału |

**Wniosek:** Syndykacja Booking daje obecność na ~8 agregatorach, ale brakuje niezależnych wzmianek na platformach polskich. To jedyna kategoria która nie poprawiła się znacząco — wymaga działań klientki.

---

### Content E-E-A-T — 68/100 (+38 od Audytu 1)

| Sygnał | Ocena | Szczegóły |
|---|---|---|
| Experience | 17/25 | Sekcja "O Nas" z imieniem Ewy, cytat gościa, rok otwarcia 2024. Brak perspektywy 1-osobowej w blogu |
| Expertise | 18/25 | 5 artykułów blogowych, 13 FAQ, Article schema, rozbudowane opisy atrakcji |
| Authoritativeness | 16/25 | Social media aktywne, 9 linków do oficjalnych stron, ale brak certyfikatów i wzmianek w mediach |
| Trustworthiness | 17/25 | Przejrzyste ceny, Person schema z właścicielką, regulamin na domenie, cookie consent. Brak NIP/REGON |

**Poprawa od Audytu 2 v1:** +10 pkt dzięki sekcji "O Nas" (Experience +5), Person schema (Authority +2), linkom zewnętrznym (Trustworthiness +2), cookie consent (Trust +1)

---

### Technical GEO — 83/100 (+43 od Audytu 1)

| Element | Status |
|---|---|
| HTTPS | ✅ |
| robots.txt z AI crawlerami | ✅ 7 reguł |
| llms.txt | ✅ Pełny opis |
| sitemap.xml | ✅ 8 URL-i |
| Canonical URL | ✅ Na każdej stronie |
| Open Graph tags | ✅ Pełny zestaw |
| Meta robots | ✅ max-snippet:-1, max-image-preview:large |
| html lang="pl" | ✅ |
| Security headers | ✅ nosniff, SAMEORIGIN |
| Mobile responsive | ✅ |
| Cookie consent | ✅ Z localStorage |
| Statyczny HTML blog | ✅ 5 artykułów |
| Google Analytics | ✅ GA4 |
| Google Maps embed | ✅ |
| Poprawna data w stopce | ✅ 2026 |
| dateModified | ⚠️ Tylko na 2/5 artykułów |
| hreflang | ❌ Brak (OK — single-language) |

**Poprawa od Audytu 2 v1:** +5 pkt dzięki cookie consent (+2), poprawna data w stopce (+1), ogólna dojrzałość techniczna (+2)

---

### Schema & Structured Data — 82/100 (+77 od Audytu 1)

**Obecne typy schema (strona główna — 7 bloków JSON-LD):**
- ✅ LodgingBusiness (adres, geo, amenities, check-in/out, sameAs)
- ✅ **Person** — właścicielka Ewa z jobTitle i worksFor
- ✅ FAQPage (13 pytań)
- ✅ OfferCatalog (4 pakiety)
- ✅ TouristAttraction
- ✅ Article (×5)
- ✅ Review (×8 + AggregateRating 9.6/10)

**Blog pages:**
- ✅ Article + BreadcrumbList + Organization (publisher)
- ✅ FAQPage (na artykułach Termy + Babia Góra)

**Brakujące:**
- ❌ PriceRange w LodgingBusiness
- ❌ dateModified w starszych Article
- ❌ Event schema (pakiety sezonowe)
- ❌ ImageObject z caption
- ❌ Organization z NIP/REGON

**Poprawa od Audytu 2 v1:** +7 pkt dzięki Person schema (+5) i ogólnej kompletności bloków (+2)

---

### Platform Optimization — 25/100 (+5 od Audytu 1)

| Zapytanie testowe | Widoczność | Pozycja |
|---|---|---|
| "domki z jacuzzi Beskidy" | ❌ | — |
| "domki z basenem Małopolska" | ❌ | — |
| "nocleg Spytkowice Beskidy" | ❌ | — |
| "domki premium Beskidy basen" | ✅ | **#1** |
| "weekend dla dwojga Beskidy z jacuzzi" | ❌ | — |

**Wynik: 1/5 zapytań.** Bez obecności na portalach turystycznych i TripAdvisor, widoczność w AI na generyczne frazy jest niemożliwa.

---

## Następne Kroki — Priorytety

### Natychmiast (Klientka — działania zewnętrzne)
1. **Google Business Profile** — zweryfikować, 20+ zdjęć, odpowiedzieć na recenzje
2. **TripAdvisor** — dodać obiekt
3. **noclegi.pl + nocowanko.pl** — zarejestrować
4. **YouTube Short** — 60-sekundowy film z domkami

### Następny Sprint Techniczny (FILAR AI)
1. PriceRange w LodgingBusiness schema
2. dateModified we wszystkich Article schema
3. 2-4 nowe artykuły blogowe na frazy long-tail
4. Perspektywa pierwszoosobowa w istniejących artykułach
5. Event schema dla sezonowych pakietów

---

## Następny Audyt

Audyt GEO Nr 3 zaplanowany na **~12 lipca 2026** po wykonaniu działań zewnętrznych przez klientkę i następnego sprintu technicznego.

---

*Audyt GEO nr 2 (v2.1) — domkinaluzie.pl — 2026-06-12 — FILAR AI*

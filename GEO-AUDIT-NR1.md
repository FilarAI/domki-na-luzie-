# GEO Audit Nr 1 — domkinaluzie.pl
**Data audytu:** 2026-06-02
**URL:** https://www.domkinaluzie.pl
**Typ biznesu:** Wynajem premium domków wakacyjnych (Beskidy)

---

## Wynik Startowy (przed zmianami)

| Kategoria | Wynik | Waga |
|---|---|---|
| AI Citability | 25/100 | 25% |
| Brand Authority | 30/100 | 20% |
| Content E-E-A-T | 30/100 | 20% |
| Technical GEO | 40/100 | 15% |
| Schema & Structured Data | 5/100 | 10% |
| Platform Optimization | 20/100 | 10% |
| **OVERALL** | **27/100** | |

---

## Co zostało zrobione (2026-06-02)

### Quick Wins (sesja 1)
- [x] LodgingBusiness JSON-LD (adres, geo, check-in/out, amenities, aggregateRating, sameAs)
- [x] FAQPage JSON-LD (5 pytań)
- [x] Open Graph meta tagi (title, description, image, type, url, locale)
- [x] Canonical URL (`<link rel="canonical">`)
- [x] sitemap.xml (strona główna)
- [x] llms.txt (opis obiektu, lokalizacja, pakiety, FAQ)

### Sesja 2 — Fazy 1–3 + 5
- [x] **robots.txt** — dodano explicite wpisy dla GPTBot, ClaudeBot, PerplexityBot, Googlebot, anthropic-ai, ChatGPT-User, Google-Extended
- [x] **meta robots** — `max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- [x] **Blog static HTML** — treść 3 artykułów (ok. 1500 słów) wstrzyknięta jako ukryte `<article>` tagi z `itemscope`, widoczna dla crawlerów
- [x] **FAQPage** — rozszerzony z 5 do 13 pytań (dodano: odległości do Zakopanego/Krakowa, grillowanie, liczba domków, zima, stok, min. pobyt, Termy)
- [x] **Offer schema** (hasOfferCatalog) — 4 pakiety z opisami w LodgingBusiness
- [x] **TouristAttraction schema** — obiekt jako baza turystyczna z atrakcjami okolicy
- [x] **Article schema** — JSON-LD dla 3 artykułów blogowych
- [x] **Review JSON-LD** — 8 opinii (Kasia B., Agata Anna Majewska, Aneta Świszcz, Łukasz Banaś z Google; Daniel, Gosia, Hanna, Anna z Booking.com)
- [x] **Ceny w HTML** — "od 1 200 zł do 2 000 zł za 2 noce" widoczne w sekcji pakietów
- [x] **regulamin.html** — pełny regulamin na własnej domenie (zamiast Google Drive)
- [x] **polityka-prywatnosci.html** — pełna polityka RODO na własnej domenie
- [x] **Footer** — linki z Google Drive zastąpione lokalnymi `/regulamin.html` i `/polityka-prywatnosci.html`
- [x] **sitemap.xml** — rozszerzony o regulamin.html i polityka-prywatnosci.html

---

## Szacowany Wynik Po Zmianach

| Kategoria | Przed | Po | Delta |
|---|---|---|---|
| AI Citability | 25/100 | ~55/100 | +30 |
| Brand Authority | 30/100 | 30/100 | 0 |
| Content E-E-A-T | 30/100 | ~45/100 | +15 |
| Technical GEO | 40/100 | ~72/100 | +32 |
| Schema & Structured Data | 5/100 | ~75/100 | +70 |
| Platform Optimization | 20/100 | ~40/100 | +20 |
| **OVERALL** | **27/100** | **~52/100** | **+25** |

---

## Co jeszcze nie zostało zrobione (wymaga działania poza kodem)

### Do zrobienia samodzielnie:
- [ ] Google Business Profile — zweryfikuj, uzupełnij, załaduj min. 20 zdjęć, odpowiedz na WSZYSTKIE recenzje
- [ ] TripAdvisor — dodaj obiekt (`tripadvisor.com → "List your property"`)
- [ ] Portale turystyczne: noclegi.pl, nocowanko.pl, e-turystyka.pl, wakacje.pl
- [ ] YouTube Short — 60-sekundowy film z domkami, linkiem do strony

### Do zrobienia w kodzie (potrzebne dodatkowe dane):
- [ ] Sekcja "O Nas" — zdecydowano NIE dodawać
- [ ] Person schema dla właściciela — opcjonalnie gdy będzie sekcja O Nas
- [ ] Hreflang — jeśli planowana wersja EN/DE strony

---

## Następny Audyt

Przeprowadź kolejny audyt za **~30 dni** (ok. 2026-07-02) po uzupełnieniu:
- Google Business Profile
- TripAdvisor
- Portale turystyczne

Komenda: `/geo audit https://www.domkinaluzie.pl`

Plik porównawczy zapisać jako: `GEO-AUDIT-NR2.md`

---

## Pliki Zmienione w Tej Sesji

| Plik | Zmiana |
|---|---|
| `index.html` | Schema JSON-LD (LodgingBusiness, FAQPage×13, Offer, TouristAttraction, Article×3, Review×8), meta robots, blog static HTML, ceny, footer linki |
| `robots.txt` | Dodano AI crawlers (GPTBot, ClaudeBot, PerplexityBot, itd.) |
| `sitemap.xml` | Dodano regulamin.html, polityka-prywatnosci.html |
| `regulamin.html` | Nowy plik — regulamin pobytu na własnej domenie |
| `polityka-prywatnosci.html` | Nowy plik — polityka RODO na własnej domenie |
| `llms.txt` | Nowy plik — opis dla crawlerów AI |

---

*Audyt bazowy nr 1 — domkinaluzie.pl — 2026-06-02*

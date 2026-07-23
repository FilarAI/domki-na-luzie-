# Audyt GEO + SEO — domkinaluzie.pl

**Przygotował:** FILAR AI
**Data:** 23 lipca 2026
**Zakres:** 8 podstron, 9 obszarów analizy, weryfikacja na wersji produkcyjnej

---

## Podsumowanie zarządcze

### Wynik ogólny: **52/100**

| Obszar | Waga | Wynik |
|---|---|---|
| Jakość treści (E-E-A-T) | 23% | 58 |
| SEO techniczne | 22% | 54 |
| SEO on-page | 20% | 55 |
| Dane strukturalne | 10% | 42 |
| Wydajność (CWV) | 10% | 47 |
| Gotowość na wyszukiwanie AI | 10% | 51 |
| Obrazy | 5% | 45 |

**Obszary uzupełniające** (poza punktacją główną): SEO lokalne **58**, doświadczenie wyszukiwania (SXO) **46**, warstwa wizualna **62**, profil linków **30** *(niski wynik odzwierciedla brak danych, nie potwierdzoną słabość)*.

> Wynik nie jest porównywalny wprost z audytem GEO nr 2 (61/100) — tamten mierzył wyłącznie
> gotowość GEO, ten obejmuje pełne SEO techniczne, wydajność i dane strukturalne.

### Najważniejszy wniosek

Serwis jest **dobrze zbudowany od strony treści i designu**, ale zawiera **trzy problemy
regulaminowe**, które trzeba usunąć zanim jakiekolwiek działania pozycjonujące mają sens.
Wszystkie trzy pochodzą z wcześniejszych optymalizacji — nie z zaniedbania — i wszystkie
naprawia się w niecałe 1,5 godziny.

### 5 najpoważniejszych problemów

1. **Ukryty tekst dla robotów** — 1028 słów przyciętych CSS-em do 1×1 px, z mikrodanymi `Article`. Naruszenie zasad Google. *Krytyczny*
2. **Cudze opinie w danych strukturalnych** — `aggregateRating 9.6/50` to ocena Booking.com; wszystkie znaczniki `Review` mają `publisher: Google` lub `Booking.com`. *Krytyczny*
3. **Błędne współrzędne** — pineska w JSON-LD wskazuje punkt ~8 km od obiektu, w innej gminie; mapa używa fikcyjnego ID `0x123456789`. *Krytyczny*
4. **LCP 14,0 s na mobile** (próg: 2,5 s) — przy 5,94 MB obrazów i 126 KB nieużywanego frameworka. *Wysoki*
5. **H1 bez żadnej frazy kluczowej** — „Miejsce dla par, lub grupy przyjaciół" nie zawiera ani lokalizacji, ani basenu/jacuzzi. *Wysoki*

### 5 najszybszych zysków

| Działanie | Czas | Efekt |
|---|---|---|
| Usunąć `<script src="cdn.tailwindcss.com">` | 5 min | −126 KB, −773 ms blokowania |
| Poprawić literówkę „młodziey" → „młodzieży" | 1 min | Wiarygodność, pierwszy ekran |
| Usunąć ukryty blok tekstu | 15 min | Usuwa ryzyko kary |
| Poprawić współrzędne w JSON-LD | 20 min | Spójność sygnałów lokalnych |
| Przepisać H1 | 15 min | Odblokowuje frazy komercyjne |

---

## Co działa dobrze

Warto to odnotować, bo fundamenty są solidne:

- **Infrastruktura.** Vercel, TTFB **103 ms**, aktywne Brotli (234 KB HTML → 44,5 KB transferu), poprawny HTTPS + HSTS.
- **`robots.txt` wzorowy dla AI.** Jawnie dopuszcza GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, ChatGPT-User, Google-Extended. Zweryfikowano: **brak blokowania botów na brzegu CDN** — roboty AI dostają identyczną treść co przeglądarka.
- **Treść bloga jest realnie użyteczna.** 5 wpisów z konkretami: odległości, ceny biletów, czasy przejścia. To materiał, który modele AI mogą cytować.
- **Kompletne `alt`.** 100% obrazów ma opisy alternatywne — rzadkość.
- **Poprawne kanoniczne i unikalne meta.** Każda z 8 podstron ma własny `title`, `description` i `canonical`; brak przypadkowego `noindex`.
- **Brak zależności od JavaScriptu.** Treść jest w surowym HTML — idealne dla robotów i modeli AI.
- **Design ma charakter.** Playfair Display + DM Sans, spójna paleta — serwis nie wygląda szablonowo.

---

## 1. Problemy regulaminowe (krytyczne)

### 1.1 Ukryty tekst przeznaczony dla robotów

W `index.html` (ok. linia 5934) znajduje się:

```html
<!-- GEO: Static blog content for AI crawlers (hidden visually, indexable by bots) -->
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);"
     aria-hidden="true">
```

Wewnątrz: **5 elementów `<article>`, 1028 słów**, z mikrodanymi `schema.org/Article`.
Potwierdzone na produkcji.

**Trzy odrębne naruszenia:**

| Naruszenie | Na czym polega |
|---|---|
| Ukryty tekst | Google wymienia tekst przycięty CSS-em / poza ekranem wprost jako spam |
| Dane strukturalne na niewidocznej treści | Oznaczana treść musi być widoczna dla użytkownika |
| Duplikacja wewnętrzna | **9 z 17** długich zdań to dosłowna kopia `/blog/termy-spa-okolica-beskidy.html` |

Dodatkowo 3 z 5 „artykułów" nie mają w ogóle własnego adresu URL — ich `mainEntityOfPage`
wskazuje na kotwice na stronie głównej (`#static-blog1`).

**Blok działa odwrotnie niż zamierzono.** Uruchomienie ekstraktora treści na stronie głównej
zwraca ukryty tekst o termach jako **wiodącą treść strony**, zamiast informacji o domkach.
Element dodany, by pomóc modelom AI, w praktyce zaburza to, jak opisują one ofertę.

**Zalecenie.** Usunąć `<div>` (ok. linie 5933–6013) oraz 3 bloki JSON-LD wskazujące na jego
kotwice (ok. linie 3226 / 3237 / 3248). Treść pozostaje dostępna na prawdziwych stronach bloga.

---

### 1.2 Cudze opinie republikowane jako własne dane strukturalne

```json
"aggregateRating": { "ratingValue": "9.6", "bestRating": "10", "ratingCount": "50" }
```

To ocena **Booking.com** — widoczna treść strony sama wiąże „9.6/10" z Booking.com w trzech
miejscach i nigdzie nie przedstawia jej jako oceny własnej. `ratingCount: 50` nie występuje
w widocznej treści w ogóle.

Każdy z 8 znaczników `Review` zawiera:

```json
"publisher": { "@type": "Organization", "name": "Google" }        // ×4
"publisher": { "@type": "Organization", "name": "Booking.com" }   // ×4
```

Kod strony **sam dokumentuje**, że są to cudze opinie. Google zabrania agregowania ocen
z zewnętrznych serwisów we własnych danych strukturalnych.

**Zalecenie.** Usunąć `aggregateRating` i tablicę `Review` z JSON-LD. Opinie mogą pozostać
widoczne na stronie z podaniem źródła i linkiem — to jest prawidłowe i buduje zaufanie.
Znacznikami oznaczać wyłącznie opinie zebrane bezpośrednio przez obiekt.

---

### 1.3 Współrzędne wskazują punkt ~8 km od obiektu

| Źródło | Szerokość | Długość |
|---|---|---|
| JSON-LD na stronie (linie 2895, 3087) | 49.6234 | 19.7183 |
| Geolokalizacja adresu (OSM Nominatim) | **49.5729** | **19.8005** |

Adres **Spytkowice 103, 34-745** rozwiązuje się do gminy Spytkowice w powiecie nowotarskim.
Punkt podany w danych strukturalnych leży ok. **8 km** dalej, w innej gminie.

Osadzona mapa Google zawiera identyfikator `0x123456789` — sekwencyjny ciąg cyfr, czyli
placeholder, nie prawdziwy CID.

Dla obiektu, którego przewagą jest lokalizacja („1 km od stoku"), rozbieżność między adresem
a współrzędnymi osłabia spójność sygnałów lokalnych.

---

## 2. Wydajność

Pomiary Lighthouse (lab) oraz bezpośrednie pomiary HTTP:

| Metryka | Wartość | Ocena |
|---|---|---|
| TTFB | 103 ms | ✅ Bardzo dobrze |
| Transfer HTML (brotli) | 44,5 KB | ✅ Dobrze |
| **LCP (mobile)** | **14,0 s** | ❌ Próg: 2,5 s |
| CLS (blog) | 0,150 | ⚠️ Próg: 0,1 |
| Obrazy na stronie głównej | **5,94 MB** | ❌ |

**Główne przyczyny:**

1. **Tailwind CDN — 126 KB, w 100% nieużywany.** Przeanalizowano wszystkie **167 nazw klas**
   w serwowanym `<body>`: **żadna nie jest klasą Tailwinda**. Strona ma własny CSS.
   To wersja „Play", więc uruchamia dodatkowo kompilator JIT w przeglądarce.
   Lighthouse: **773 ms blokowania renderowania**. Usunięcie = jedna linia.

2. **Pojedynczy PNG waży 2,36 MB** przy wyświetlaniu w slocie **316×237 px**. CDN GetResponse
   nie negocjuje formatów — mimo nagłówka `Accept: image/avif,image/webp` zwraca PNG.
   Fotografia zapisana bezstratnie to źródło problemu.

3. **32 z 37 obrazów bez `width`/`height`** — brak rezerwacji miejsca, bezpośrednia przyczyna CLS.

4. **Brak `preconnect`** do `us-ms.gr-cdn.com`, mimo że stamtąd pochodzi element LCP.

> *Uwaga:* brak danych polowych (CrUX/GSC) — nie skonfigurowano kluczy API Google. Powyższe
> to pomiary laboratoryjne; rzeczywiste wartości u użytkowników mogą się różnić.

---

## 3. SEO on-page

| Podstrona | Tytuł | Opis | H1 |
|---|---|---|---|
| `/` | 68 zn. ⚠️ | 161 zn. ⚠️ | 1 ✅ |
| `/blog/babia-gora…` | 75 zn. ⚠️ | 162 zn. ⚠️ | 1 ✅ |
| `/blog/domki-z-basenem…` | 77 zn. ⚠️ | 166 zn. ⚠️ | 1 ✅ |
| `/blog/romantyczny-weekend…` | 79 zn. ⚠️ | 152 zn. ✅ | 1 ✅ |
| `/blog/stok-narciarski…` | 80 zn. ⚠️ | 145 zn. ✅ | 1 ✅ |
| `/blog/termy-spa…` | 72 zn. ⚠️ | 175 zn. ⚠️ | 1 ✅ |

**Wszystkie 8 tytułów przekracza bezpieczny próg ~60 znaków** — każdy jest ucinany w wynikach.

**H1 strony głównej nie zawiera żadnej frazy komercyjnej:**
> „Miejsce dla par, lub grupy przyjaciół. - domki premium"

Brak słów *Beskidy*, *basen*, *jacuzzi*, brak lokalizacji — mimo że wszystkie trzy są
w `<title>` i stanowią realną przewagę obiektu.
**Propozycja:** „Domki premium z basenem i jacuzzi w Beskidach — dla par i grup przyjaciół".

### Linkowanie wewnętrzne — zerowe między wpisami bloga

| Podstrona | Linki przychodzące |
|---|---|
| `/` | 7 |
| `regulamin.html` | 7 |
| `polityka-prywatnosci.html` | 7 |
| **każdy z 5 wpisów bloga** | **1** (tylko strona główna) |

**Żaden wpis nie linkuje do żadnego innego wpisu.** Wpisy są powiązane tematycznie
(termy ↔ romantyczny weekend, stok ↔ Babia Góra) i tracą na tym zarówno moc linkową,
jak i zaangażowanie czytelnika. Brakuje też strony-huba `/blog/`.

---

## 4. Gotowość na wyszukiwanie AI (GEO)

**Co jest zrobione dobrze:** `robots.txt` jawnie dopuszcza wszystkie kluczowe roboty AI,
`llms.txt` istnieje, treść jest w surowym HTML, blog zawiera konkretne liczby i fakty.
Zweryfikowano prawdziwymi nagłówkami User-Agent botów AI: **brak blokowania na brzegu**.

**Co blokuje postęp:**

- Ukryty blok tekstu (pkt 1.1) aktywnie zaburza ekstrakcję treści.
- **Wszystkie 7 działań zewnętrznych** z audytów GEO nr 1 i nr 2 (TripAdvisor, wizytówka Google,
  portale branżowe, YouTube) pozostaje **niezrealizowanych 7 tygodni później**. To dziś główne
  ograniczenie: modele AI budują rozpoznanie marki na źródłach trzecich, nie na samej stronie.
- Sprzeczne dane w treści — trzy różne czasy dojazdu do Term Gorący Potok na jednej stronie
  (~20 min, 20–25 min, 45 km/~40 min). Modele cytują konkretne liczby.

> *Uwaga do `llms.txt`:* standard jest wciąż nieformalny i **nie jest wykorzystywany przez
> wyszukiwarkę Google**. Warto go mieć, ale nie należy przeceniać jego wpływu.

---

## 5. SEO lokalne

**Mocne strony:** spójny zapis NAP w treści, potwierdzona aktywna oferta na Booking.com,
strategia jednej lokalizacji jest słuszna (dodawanie sztucznych stron miejscowości byłoby
ryzykiem cienkiej treści).

**Do naprawy:**
- Błędne współrzędne i fikcyjny CID mapy (pkt 1.3).
- Brak linku do wizytówki Google mimo eksponowania oceny „Google 4.9/5" — nie ma też żadnego
  mechanizmu proszenia gości o opinię.
- `meteor-turystyka.pl` podaje **inny numer telefonu** (692 147 608 zamiast 605 744 722);
  `hotelcynamon.pl` — niezgodny opis obiektu. Do weryfikacji przez właściciela.

---

## 6. Realia wyszukiwania (SXO)

Sprawdzono 7 fraz komercyjnych — **serwis nie pojawił się na żadnej**.

- **5 z 7 fraz głównych** jest zdominowanych przez agregatory (Slowhop, nocowanie.pl, Booking.com). Walka o nie wprost jest nieopłacalna dla obiektu z 3 domkami.
- **„domki na wynajem spytkowice"** to niedopasowanie intencji — Google zwraca oferty nieruchomości na sprzedaż, nie noclegi.
- **„romantyczny weekend we dwoje w górach"** to jedyna realnie zdobywalna fraza — ale wymaga
  **dedykowanej strony pakietu**, nie wpisu blogowego, którym jest obecnie obsługiwana.
- Na zapytaniu brandowym pojawia się `booked.com.pl` — wygląda na klon/scraper oferty. Do sprawdzenia.

**Argument „rezerwuj bezpośrednio — zero prowizji" pojawia się dopiero w 7. sekcji strony**,
a baner zaufania w nagłówku eksponuje Booking.com. Główny argument ekonomiczny obiektu jest
osłabiany, zanim zostanie przedstawiony.

---

## 7. Treść i E-E-A-T

**Mocne strony:** realna właścicielka wskazana z imienia, autentyczne opinie z atrybucją,
5 wpisów blogowych z konkretną wiedzą lokalną, poprawne `FAQPage`.

**Do poprawy:**
- Oceny „Google 4.9/5" i „Booking 9.6/10" podane **bez klikalnego źródła**.
- Niespójność liczby opinii: dane strukturalne mówią o 50, wpis blogowy o 63+45.
- Literówka **„młodziey"** (→ „młodzieży") w pierwszym ekranie strony głównej.
- Brak osobnych stron poszczególnych domków — przy 3 obiektach to realna szansa na frazy
  długiego ogona bez ryzyka cienkiej treści.

---

## Ograniczenia audytu

W trosce o rzetelność — czego **nie** udało się potwierdzić:

- **Brak danych polowych.** Nie skonfigurowano Google Search Console ani klucza PageSpeed API — brak rzeczywistych CWV użytkowników, danych o indeksacji i pozycjach.
- **Profil linków zbadany częściowo.** Brak płatnego API (Ahrefs/Moz/DataForSEO); domena nie występuje w Common Crawl; część zapytań do wyszukiwarek została zablokowana. Wynik 30/100 odzwierciedla **brak danych**, nie potwierdzoną słabość profilu.
- **Wizytówka Google** — stanu profilu nie dało się zweryfikować bez dostępu do API.
- **Warstwa wizualna** — potwierdzono widok mobilny (375 px); widok desktop i mobilny bloga nie zostały zarejestrowane.
- Dane SERP pochodzą z wyszukiwania, nie ze zrzutu surowego SERP-a — obecność w Local Pack i AI Overviews pozostaje niezweryfikowana.

---

## Materiały szczegółowe

Pełne ustalenia z dowodami (`plik:linia`, zmierzone wartości) znajdują się w katalogu `findings/`:
`technical.md`, `content.md`, `schema.md`, `geo.md`, `local.md`, `sxo.md`, `performance.md`,
`visual.md`, `backlinks.md`.

Kolejność wdrożenia: **`ACTION-PLAN.md`**.

---

*Raport przygotowany przez **FILAR AI**. Wszystkie ustalenia zweryfikowane bezpośrednio na wersji
produkcyjnej serwisu 23 lipca 2026.*

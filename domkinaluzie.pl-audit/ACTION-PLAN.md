# Plan działania — domkinaluzie.pl

**Przygotował:** FILAR AI
**Data:** 23 lipca 2026
**Audyt:** GEO + SEO, pełny (8 podstron, 9 obszarów analizy)
**Wynik ogólny:** **52/100**

---

## Jak czytać ten plan

Zadania są uszeregowane wg stosunku **efektu do nakładu pracy**, nie wg wielkości.
Pierwsze cztery pozycje to łącznie ok. 1 dnia pracy i odpowiadają za większość możliwej poprawy.

| Priorytet | Znaczenie | Termin |
|---|---|---|
| 🔴 Krytyczny | Ryzyko kary od Google lub aktywna szkoda | Natychmiast |
| 🟠 Wysoki | Wyraźnie ogranicza pozycje i konwersję | Do 7 dni |
| 🟡 Średni | Realna poprawa, bez pilności | Do 30 dni |
| ⚪ Niski | Do backlogu | Kwartał |

---

## FAZA 1 — Krytyczne (tydzień 1)

### 🔴 1.1 Usunąć ukryty tekst dla robotów
**Problem.** W `index.html` (ok. linia 5934) znajduje się blok:

```html
<!-- GEO: Static blog content for AI crawlers (hidden visually, indexable by bots) -->
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);" aria-hidden="true">
```

Zawiera **5 artykułów, 1028 słów**, opatrzonych mikrodanymi `schema.org/Article`. Treść jest
niewidoczna dla użytkownika, ale serwowana robotom.

**Dlaczego to poważne — trzy niezależne naruszenia:**
1. **Ukryty tekst** — Google wprost wymienia tekst pozycjonowany poza ekranem / przycięty CSS-em jako spam. Ryzyko ręcznej kary.
2. **Dane strukturalne na niewidocznej treści** — narusza wymóg Google, by oznaczana treść była widoczna dla użytkownika.
3. **Duplikacja wewnętrzna** — **9 z 17** długich zdań w jednym z tych artykułów to dosłowna kopia `/blog/termy-spa-okolica-beskidy.html`. Strona konkuruje sama ze sobą.

**Co gorsza — to działa odwrotnie niż zamierzono.** Uruchomienie ekstraktora treści na stronie
głównej zwraca ten ukryty tekst o termach jako **wiodącą treść strony** — zamiast informacji
o domkach. Blok dodany po to, by pomóc AI, w praktyce psuje to, jak modele opisują ofertę.

**Rozwiązanie.** Usunąć cały `<div>` (linie ok. 5933–6013) oraz **3 bloki JSON-LD**, które na niego
wskazują (`"mainEntityOfPage": ".../#static-blog1"` itd., linie ok. 3226 / 3237 / 3248).
Nic nie tracimy — ta treść już istnieje na prawdziwych, widocznych stronach bloga.

**Nakład:** 15 minut. **Ryzyko zaniechania:** wysokie.

---

### 🔴 1.2 Naprawić dane strukturalne ocen (`aggregateRating` + `Review`)
**Problem.** Strona deklaruje w JSON-LD własną ocenę zbiorczą:

```json
"aggregateRating": { "ratingValue": "9.6", "bestRating": "10", "ratingCount": "50" }
```

To jest **ocena z Booking.com**, nie ocena własna obiektu. Widoczna treść strony w trzech miejscach
sama wiąże „9.6/10" z Booking.com. Dodatkowo każda z 8 opinii w znaczniku `Review` ma pole:

```json
"publisher": { "@type": "Organization", "name": "Google" }   // lub "Booking.com"
```

Czyli **własny kod strony dokumentuje, że to cudze opinie republikowane jako dane obiektu**.
Wartość `ratingCount: 50` nie występuje nigdzie w widocznej treści.

Google zabrania agregowania ocen z innych serwisów we własnych danych strukturalnych. To jedno
z częściej egzekwowanych naruszeń w branży noclegowej.

**Rozwiązanie.** Usunąć `aggregateRating` i tablicę `Review` z JSON-LD. Opinie mogą **nadal być
widoczne na stronie** wraz z podaniem źródła i linkiem — to jest w porządku i buduje zaufanie.
Znacznikiem oznaczać wyłącznie opinie zebrane bezpośrednio przez obiekt.

**Nakład:** 30 minut.

---

### 🔴 1.3 Poprawić współrzędne geograficzne — pineska jest ~8 km od obiektu
**Problem.** JSON-LD (linie 2895–2896 i 3087–3088) podaje:

```
"latitude": "49.6234",  "longitude": "19.7183"
```

Niezależna geolokalizacja adresu **Spytkowice 103, 34-745** (OpenStreetMap Nominatim) zwraca:

```
lat = 49.5729,  lon = 19.8005   → Spytkowice, gmina Spytkowice, powiat nowotarski
```

Różnica to **ok. 8 km** — wskazany punkt leży w innej gminie. Dla firmy, której cała wartość opiera
się na lokalizacji („1 km od stoku"), błędna pineska w danych strukturalnych podważa spójność
sygnałów lokalnych.

Dodatkowo osadzona mapa Google zawiera **fikcyjny identyfikator miejsca**: `0x123456789` — to
oczywisty placeholder, nie realny CID wygenerowany przez Google.

**Rozwiązanie.** Wstawić `49.5729 / 19.8005` (lub dokładne współrzędne odczytane z pineski obiektu
w Mapach Google) w obu blokach JSON-LD. Osadzenie mapy wygenerować od nowa przez „Udostępnij →
Umieść mapę" na prawdziwej wizytówce Google, zamiast ręcznie sklejonego URL-a.

**Nakład:** 20 minut.

---

## FAZA 2 — Wysokie (tydzień 2)

### 🟠 2.1 Usunąć Tailwind CDN — najlepszy stosunek efektu do pracy w całym audycie
Strona ładuje `https://cdn.tailwindcss.com` — **126 KB** transferu. Przeanalizowaliśmy wszystkie
**167 nazw klas** w serwowanym `<body>`: **0 z nich to klasy Tailwinda**. Strona jest w całości
stylowana własnym CSS-em. To wersja „Play", więc dodatkowo uruchamia **kompilator JIT w przeglądarce**
w momencie krytycznym dla LCP. Pomiar Lighthouse: **773 ms blokowania renderowania**.

**Rozwiązanie.** Usunąć jeden `<script>`. Bez zmian wizualnych.
**Nakład: ~5 minut.**

### 🟠 2.2 Zoptymalizować obrazy — 5,94 MB na stronie głównej
Jeden plik PNG w galerii waży **2,36 MB** i jest wyświetlany w slocie **316×237 px**. CDN
(GetResponse) **nie negocjuje formatów** — mimo nagłówka `Accept: image/avif,image/webp` zwraca PNG.
Fotografia zapisana jako PNG to źródło problemu.

**Rozwiązanie.** Przekodować zdjęcia do WebP (jakość ~80) i wgrać ponownie; wspomniany plik powinien
zejść do ok. 150–250 KB (**~90% mniej**). Do odzyskania łącznie do ~4,1 MB.
**Nakład:** pół dnia.

### 🟠 2.3 Naprawić Core Web Vitals na mobile
Zmierzony Lighthouse: **LCP 14,0 s (mobile)** — próg „dobry" to 2,5 s. Blog: **CLS 0,150**
(reflow przy podmianie fontu). Przyczyny to pozycje 2.1, 2.2 oraz blokujące `<head>` zasoby Swipera.

**Rozwiązanie.** Po 2.1 i 2.2: dodać `defer` do Swipera, `preconnect` do `us-ms.gr-cdn.com`,
`preload` **wyłącznie** pierwszego slajdu, `loading="lazy"` na pozostałych, oraz `width`/`height`
do obrazów (**32 z 37** `<img>` ich nie ma).

### 🟠 2.4 Przepisać H1 strony głównej
Obecnie: **„Miejsce dla par, lub grupy przyjaciół. - domki premium"** — brak słowa *Beskidy*,
*basen*, *jacuzzi* i jakiejkolwiek lokalizacji. H1 to najsilniejszy sygnał on-page na stronie
i obecnie nie niesie żadnej frazy, na którą ktokolwiek szuka.

**Propozycja:** „Domki premium z basenem i jacuzzi w Beskidach — dla par i grup przyjaciół".
Zachowuje pozycjonowanie, dokłada frazy.

### 🟠 2.5 Poprawić literówkę w pierwszym ekranie
`index.html:3353` — **„dla dorosłych i młodziey 12+"** → **„młodzieży"**.
Widoczna od razu, na najważniejszej stronie. Poprawka: kilka sekund.

---

## FAZA 3 — Średnie (miesiąc 2)

### 🟡 3.1 Linkowanie wewnętrzne bloga — obecnie zerowe
Żaden z 5 wpisów nie linkuje do żadnego innego wpisu. Każdy ma **dokładnie 1 link przychodzący**
(ze strony głównej). Tematycznie aż się proszą o powiązanie (termy ↔ romantyczny weekend,
stok ↔ Babia Góra).
**Rozwiązanie.** 2–3 linki kontekstowe w treści każdego wpisu + sekcja „Zobacz też".

### 🟡 3.2 Utworzyć stronę-hub bloga (`/blog/`)
Nie istnieje strona indeksowa bloga — wpisy są dostępne wyłącznie z sekcji na stronie głównej.
Hub zbiera moc linkową, daje miejsce na frazy tematyczne i ułatwia indeksację.

### 🟡 3.3 Skrócić tytuły — wszystkie 8 przekracza limit
Zmierzone długości: 68–80 znaków (bezpieczny próg ok. 60). Wszystkie są ucinane w wynikach.
Dwa opisy meta przekraczają 160 znaków.

### 🟡 3.4 Nagłówki HTTP bezpieczeństwa
Strona ma `<meta http-equiv="X-Frame-Options">` i `X-Content-Type-Options` — **przeglądarki
ignorują te dyrektywy w postaci meta**, działają wyłącznie jako prawdziwe nagłówki HTTP.
Brak `vercel.json`.
**Rozwiązanie.** Dodać `vercel.json` z `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`.

### 🟡 3.5 Przekierowanie apex → www zmienić z 307 na 301
`domkinaluzie.pl` → `www.domkinaluzie.pl` zwraca **307 (tymczasowe)**. Powinno być **301 (trwałe)**,
by przekazywać moc linkową jednoznacznie.

### 🟡 3.6 Uporządkować sprzeczne informacje o odległościach
Trzy różne czasy dojazdu do Term Gorący Potok na tej samej stronie: ~20 min, 20–25 min oraz
45 km / ~40 min. Modele AI cytują konkretne liczby — sprzeczność obniża wiarygodność.

---

## FAZA 4 — Widoczność i autorytet (ciągłe)

### ⚪ 4.1 Sprawdzić podejrzany klon marki w wynikach
Na zapytanie brandowe pojawia się `booked.com.pl` — wygląda na scraper/klon oferty.
Warto zweryfikować i ewentualnie zgłosić.

### ⚪ 4.2 Linki lokalne — najłatwiejsze do zdobycia
Strona **już linkuje** do Kompleksu Beskid (stok) i Term Gorący Potok — bezpłatnie. To naturalna
podstawa do prośby o link zwrotny. Dodatkowo: oficjalna strona **Gminy Spytkowice**
(`www.spytkowice.pl`, potwierdzona jako właściwa gmina, 34-745).
*Uwaga:* profil linków nie jest w pełni zbadany — brak płatnego API; domena nie występuje
w Common Crawl.

### ⚪ 4.3 Zweryfikować dane w cudzych katalogach
`meteor-turystyka.pl` podaje **inny numer telefonu** (692 147 608 zamiast 605 744 722),
a `hotelcynamon.pl` — niezgodny opis obiektu. Wymaga weryfikacji przez właściciela.

### ⚪ 4.4 Otwarte rekomendacje z audytów GEO nr 1 i nr 2
Wszystkie **7 działań zewnętrznych** (TripAdvisor, wizytówka Google, portale, YouTube) pozostaje
niezrealizowanych 7 tygodni później. To dziś główny hamulec widoczności w AI — modele opierają
rozpoznanie marki na źródłach trzecich, nie na samej stronie.

### ⚪ 4.5 Monitoring
Podpiąć Google Search Console i klucz PageSpeed API — audyt nie miał dostępu do danych
polowych (CrUX/GSC), więc obraz pozycji i realnych CWV użytkowników pozostaje nieznany.

---

## Podsumowanie nakładów

| Faza | Czas | Efekt |
|---|---|---|
| 1 — Krytyczna | ~1,5 h | Usuwa ryzyko kary |
| 2 — Wysoka | ~1 dzień | Główna poprawa wydajności i pozycji |
| 3 — Średnia | ~2 dni | Porządkuje strukturę |
| 4 — Ciągła | stałe | Autorytet i widoczność w AI |

**Faza 1 + pozycje 2.1, 2.4 i 2.5 to łącznie ok. 2,5 godziny pracy** i odpowiadają za usunięcie
całego ryzyka regulaminowego oraz największy pojedynczy zysk wydajnościowy.

---

*Raport przygotowany przez **FILAR AI**. Wszystkie ustalenia zweryfikowane bezpośrednio na wersji
produkcyjnej serwisu 23.07.2026. Elementy, których nie udało się potwierdzić, są w raporcie
szczegółowym oznaczone jako niezweryfikowane.*



## Prekopanie štruktúry podstránok

### Nové URL a názvy v navigácii

```text
Aktuálne                    →  Nové
/real-estate                →  /nehnutelnosti
/private-equity             →  /akvizicie
/private-credit             →  /uvery
/pre-investorov             →  /pre-investorov (bez zmeny)
```

Navigácia (Header):
```text
Domov | Nehnuteľnosti | Akvizície | Úvery | Pre investorov
```

### Cieľ každej podstránky

1. **Nehnuteľnosti** (`/nehnutelnosti`) -- informačná stránka "čo robíme". Cieľ: budovať dôveru a poslať na `/pre-investorov`.
2. **Akvizície** (`/akvizicie`) -- informačná + duálne CTA: investori → `/pre-investorov`, majitelia firiem → kontakt.
3. **Úvery** (`/uvery`) -- stránka pre dlžníkov. CTA: "Požiadať o financovanie" (vlastný kontaktný formulár alebo mailto).
4. **Pre investorov** -- konverzný hub. Bez zmien v obsahu.

### Zmeny po súboroch

**1. `src/components/layout/Header.tsx`** (riadky 7-11)
- Premenovať labels a href na slovenské URL

**2. `src/App.tsx`** (riadky 37, 45, 53)
- Zmeniť route paths: `/real-estate` → `/nehnutelnosti`, `/private-equity` → `/akvizicie`, `/private-credit` → `/uvery`

**3. `src/pages/Index.tsx`** (riadky 160, 166, 172)
- Aktualizovať href v VerticalCard komponentoch na nové URL

**4. `src/pages/RealEstate.tsx`**
- Celé prepísanie obsahu so zameraním na "čo robíme":
  - Hero: label "Náš sektor", title "Nehnuteľnosti", accent "a realitný flipping"
  - About: popis obchodného modelu
  - Sekcia "Ako funguje flipping" (proces v 4 krokoch) -- existujúce kroky sú dobré
  - Štatistiky o marži a cykloch -- existujúce sú dobré
  - CTA na `/pre-investorov` -- existujúce je dobré
  - Odstráni sa investorský jazyk z About (nahradí sa opisom čomu sa venujeme)

**5. `src/pages/PrivateEquity.tsx`**
- Obsah zostáva v poriadku, len sa pridá druhé CTA pre majiteľov firiem ("Predávate firmu?")
- CTA blok na konci rozšíriť o duálne tlačidlá

**6. `src/pages/PrivateCredit.tsx`** (riadky 184-188)
- CTA link zmeniť z `/pre-investorov#kontakt` na `mailto:` alebo vlastnú sekciu s kontaktným formulárom pre dlžníkov
- Odstrániť akýkoľvek investorský jazyk

**7. `src/components/layout/Footer.tsx`**
- Žiadne zmeny potrebné (linky sú na `/pre-investorov`)

### Súhrn
- 6 súborov sa upraví
- Žiadne nové súbory
- Všetky interné linky sa aktualizujú na slovenské URL
- Obsah podstránok sa doladí podľa cieľa každej stránky


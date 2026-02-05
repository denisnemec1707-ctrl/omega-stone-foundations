
# Reštrukturalizácia ASSETRA investments na multi-page web

## Prehľad zmien

Aktuálna landing page sa stane podstránkou **Real Estate** a vytvoríme novú architektúru s hlavnou stránkou a troma investičnými vertikálami.

## Nová štruktúra stránok

```text
/                    -> Hlavná stránka (nová)
/real-estate         -> Real Estate (aktuálny obsah)
/private-equity      -> Private Equity (nová)
/private-credit      -> Private Credit (nová)
```

## 1. Nová hlavná stránka (Index)

Vytvorím novú hlavnú stránku s obsahom:

**Hero sekcia:**
- Názov firmy ASSETRA investments
- Tagline: "Súkromná investičná spoločnosť"
- Krátky popis troch vertikál

**Tri karty/sekcie pre vertikály:**
- **Real Estate** - Realitný flipping, nákup pod trhovú hodnotu, problémové nehnuteľnosti
- **Private Equity** - Akvizície fungujúcich firiem na SK/CZ trhu
- **Private Credit** - Zabezpečené úvery pre právnické osoby a realitné projekty

**Kontaktná sekcia** - jednotný kontaktný formulár

## 2. Real Estate podstránka

- Presuniem aktuálny `Index.tsx` na `/real-estate`
- Aktuálne sekcie (Hero, WhyInvest, HowItWorks, Calculator, FAQ, Contact) zostanú
- Upravím navigáciu pre túto podstránku

## 3. Private Equity podstránka (nová)

Vytvorím novú stránku s obsahom:
- **Hero:** Akvizície zabehnutých firiem
- **Kritériá:** Aké firmy hľadáme (obrat, ziskovosť, trh SK/CZ)
- **Proces:** Ako prebieha akvizícia
- **FAQ:** Otázky pre predávajúcich firiem
- **Kontakt:** Formulár pre záujemcov

## 4. Private Credit podstránka (nová)

Vytvorím novú stránku s obsahom:
- **Hero:** Zabezpečené úvery
- **Typy financovania:** Pre firmy, realitné projekty
- **Podmienky:** Parametre úverov
- **Proces:** Ako funguje schvaľovanie
- **FAQ:** Otázky o financovaní
- **Kontakt:** Formulár pre žiadosti

## 5. Aktualizácia navigácie

**Nový Header** s hlavnou navigáciou:
- Logo (odkaz na /)
- Real Estate
- Private Equity
- Private Credit
- Kontakt

Desktop aj mobilné menu budú aktualizované.

---

## Technické detaily

### Nové súbory

```text
src/pages/
├── Index.tsx           (prepísaná hlavná stránka)
├── RealEstate.tsx      (nová - presunutý obsah)
├── PrivateEquity.tsx   (nová)
├── PrivateCredit.tsx   (nová)
└── NotFound.tsx        (existujúca)

src/components/
├── layout/
│   ├── Header.tsx      (upravená navigácia)
│   ├── MainHeader.tsx  (nový pre hlavnú stránku)
│   └── Footer.tsx      (existujúca)
└── sections/
    └── ... (existujúce + nové pre každú podstránku)
```

### Routing (App.tsx)

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/real-estate" element={<RealEstate />} />
  <Route path="/private-equity" element={<PrivateEquity />} />
  <Route path="/private-credit" element={<PrivateCredit />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Zdieľané komponenty

- Contact formulár bude znovupoužiteľný na všetkých stránkach
- Footer zostane rovnaký
- Header bude mať varianty pre hlavnú stránku vs. podstránky

---

## Dizajnové princípy

- Zachovám dark luxury estetiku (čierna, biela, zlaté akcenty)
- Playfair Display pre nadpisy
- Konzistentný spacing a typografia
- Bez obrázkov ľudí - len architektonické/kamenné textúry
- Slovenský jazyk na celom webe

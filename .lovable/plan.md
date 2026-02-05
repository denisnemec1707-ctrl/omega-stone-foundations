
# Finálne doladenie farebného dizajnu

## Zistené problémy

### 1. Contact.tsx (Real Estate stránka) - KRITICKÉ
Kontaktný formulár používa `bg-charcoal` na **svetlom pozadí** sekcie - to je nekonzistentné s novým dizajnom kde tmavé prvky sú len na tmavých celoplošných sekciách.

**Aktuálne:** Tmavý formulár na bielom pozadí
**Má byť:** Biely formulár s orámovaním (ako na Private Equity/Credit)

### 2. Calculator.tsx - výsledková karta
Podobný problém - `bg-charcoal` box na svetlej sekcii. Toto je menej kritické, ale pre konzistenciu by sa mal zmeniť.

### 3. Chybný email v Contact.tsx
Email "omegacapital.sk" je starý - má byť "assetra.sk"

### 4. Responsive padding v Contact.tsx
Chýba konzistentný responsive padding ako v ostatných sekciách.

---

## Plán opráv

### Súbor: src/components/sections/Contact.tsx

| Riadok | Zmena |
|--------|-------|
| 77 | `py-20 md:py-32` → `py-12 sm:py-20 md:py-32` |
| 78 | `px-6 md:px-8` → `px-5 sm:px-6 md:px-8` |
| 80-81 | Pridať responsive varianty pre text |
| 94 | `bg-charcoal` → `bg-card border border-border shadow-sm` |
| 199 | `omegacapital.sk` → `assetra.sk` |
| 209 | Aktualizovať telefón alebo odstrániť ak je placeholder |

### Súbor: src/components/sections/Calculator.tsx

| Riadok | Zmena |
|--------|-------|
| 104 | `bg-charcoal` → `bg-card border border-border shadow-sm` |
| 105 | Pridať text-foreground pre lepší kontrast na bielom pozadí |
| 112 | Zmeniť farby výnosových čísel pre kontrast na svetlom pozadí |

---

## Vizuálny výsledok

```text
PRED ZMENOU:
┌─────────────────────────────────────────┐
│  BIELA SEKCIA                           │
│  ┌───────────────┐  ┌─────────────┐     │
│  │ TMAVÝ         │  │ Svetlý      │     │
│  │ formulár     │  │ text        │     │
│  └───────────────┘  └─────────────┘     │
└─────────────────────────────────────────┘

PO ZMENE:
┌─────────────────────────────────────────┐
│  BIELA SEKCIA                           │
│  ┌───────────────┐  ┌─────────────┐     │
│  │ BIELY         │  │ Tmavý       │     │
│  │ formulár     │  │ text        │     │
│  │ s orámovaním │  └─────────────┘     │
│  └───────────────┘                      │
└─────────────────────────────────────────┘
```

---

## Technické detaily

### Contact.tsx zmeny:

```tsx
// Riadok 77-78 - responsive padding
<section id="kontakt" className="py-12 sm:py-20 md:py-32 lg:py-48">
  <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-16">

// Riadok 80-81 - responsive text
<div className="text-center mb-8 sm:mb-12 md:mb-16">
  <p className="text-[10px] sm:text-xs md:text-sm tracking-ultra-wide...">

// Riadok 94 - formulár karta
<div className="bg-card p-6 md:p-8 lg:p-10 border border-border shadow-sm">

// Riadok 199 - email
invest@assetra.sk
```

### Calculator.tsx zmeny:

```tsx
// Riadok 104 - výsledková karta
<div className="bg-card p-5 sm:p-6 md:p-8 lg:p-12 border border-border shadow-sm">

// Riadok 105 - nadpis
<h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 text-center text-foreground">
```

---

## Súhrn zmien

| Súbor | Typ zmeny |
|-------|-----------|
| `src/components/sections/Contact.tsx` | bg-charcoal → bg-card, email oprava, responsive padding |
| `src/components/sections/Calculator.tsx` | bg-charcoal → bg-card pre výsledkovú kartu |

Tieto zmeny zabezpečia, že:
- Tmavé pozadia (`bg-charcoal`) sa používajú LEN pre celé sekcie
- Karty a formuláre na svetlom pozadí majú biely štýl s orámovaním
- Konzistentný responsive dizajn naprieč všetkými sekciami
- Správny kontaktný email spoločnosti

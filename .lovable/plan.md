
# Vylepšenie použitia charcoal farby

## Analýza problému

Charcoal farba sa momentálne používa na dvoch miestach:
1. **Celé tmavé sekcie** - About, Trust, kontaktná CTA sekcia
2. **Karty na bielom pozadí** - tri vertikály (Real Estate, Private Equity, Private Credit)

Problém je v bode 2 - tmavé karty na bielom pozadí vyzerajú ťažko a nekonzistentne so štýlom Tatra banky.

---

## Navrhované riešenie

### Karty na svetlom pozadí
Nahradím `bg-charcoal` za biely/svetlý štýl s jemným orámovaním:
- Biele pozadie (`bg-white` alebo `bg-card`)
- Jemný border (`border border-border`)
- Hover efekt - orámovanie zmení farbu na modrú

### Tmavé sekcie
Ponechám charcoal pre celé sekcie ktoré majú byť tmavé - tu to funguje dobre.

---

## Zmeny v súboroch

### src/pages/Index.tsx

**Tri piliere - karty (riadky 62, 80, 98)**
```
Pred:  bg-charcoal p-6 sm:p-8 lg:p-10 border border-border
Po:    bg-white p-6 sm:p-8 lg:p-10 border border-border shadow-sm
```

**CTA banner (riadok 117)** - ponechám `bg-charcoal`

**Kontaktná sekcia (riadok 185)** - ponechám `bg-charcoal`

### src/pages/PrivateEquity.tsx a PrivateCredit.tsx

Karty a formuláre na svetlom pozadí zmením na biely štýl, tmavé sekcie ponechám.

### src/components/sections/About.tsx, Trust.tsx

Ponechám bez zmien - celé tmavé sekcie fungujú dobre.

---

## Vizuálny výsledok

```
┌─────────────────────────────────────────────────────────┐
│  SVETLÉ POZADIE (biela)                                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │ BIELA   │  │ BIELA   │  │ BIELA   │  ← karty       │
│  │ karta   │  │ karta   │  │ karta   │    s tieňom    │
│  └─────────┘  └─────────┘  └─────────┘                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  TMAVÉ POZADIE (charcoal) - celá sekcia               │
│  Fixný výnos 10% ročne                                 │
│  [Začať investovať]                                    │
└─────────────────────────────────────────────────────────┘
```

---

## Technické detaily

Upravím nasledovné súbory:
- `src/pages/Index.tsx` - karty v sekcii "Tri piliere"
- `src/pages/PrivateEquity.tsx` - karty kritérií a FAQ
- `src/pages/PrivateCredit.tsx` - karty kritérií a FAQ

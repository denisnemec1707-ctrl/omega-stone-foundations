

## Navrhovaná štruktúra podstránok

### Problém

Aktuálne majú všetky sektorové stránky (Real Estate, Private Equity, Private Credit) rovnakú šablónu vrátane FAQ, Trust sekcie a investorského CTA. To spôsobuje duplicitu s `/pre-investorov` a zmätok -- Private Credit je produkt pre dlžníkov, nie investorov.

### Navrhovaná štruktúra

```text
/                        Homepage
│
├── /real-estate         Čo robíme: Real Estate
│   Hero → About → Proces (4 kroky) → Štatistiky → CTA → /pre-investorov
│   ✗ Bez FAQ, bez Trust sekcie
│
├── /private-equity      Čo robíme: Private Equity
│   Hero → About → Kritériá → Proces → CTA → /pre-investorov
│   ✗ Bez FAQ
│
├── /private-credit      Čo robíme: Zabezpečené úvery
│   Hero → About → Typy financovania → Proces → FAQ (pre dlžníkov)
│   CTA → "Požiadať o financovanie" (nie investovať!)
│   ✗ Iná cieľovka ako investori
│
└── /pre-investorov      Konverzná stránka (investori)
    Hero → Value prop → Štatistiky → Kalkulačka → Trust
    → Testimonials → FAQ (kompletné) → Kontaktný formulár
```

### Konkrétne zmeny

**1. `RealEstate.tsx`** -- odstrániť FAQ sekciu (riadky ~150-180) a Trust sekciu (~120-145). Ponechať Hero, About, Stats, Process, CTA.

**2. `PrivateEquity.tsx`** -- odstrániť FAQ sekciu. Ponechať Hero, About, Kritériá, Process, CTA.

**3. `PrivateCredit.tsx`** -- zmeniť CTA text z "Chcem investovať" / link na `/pre-investorov` na "Požiadať o financovanie". FAQ ponechať (sú relevantné pre dlžníkov). Prípadne pridať jednoduchý kontaktný formulár priamo na stránku.

**4. `ForInvestors.tsx`** -- rozšíriť FAQ o relevantné otázky z Real Estate a Private Equity (zabezpečenie, riziká, horizont), ktoré boli odstránené z tých stránok. Väčšina už tam je, doplnia sa chýbajúce.

Žiadne nové súbory. Len zjednodušenie existujúcich stránok a presun obsahu.


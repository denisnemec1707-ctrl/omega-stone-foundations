

## Zmena výnosovej sadzby z 10% na 12% p.a.

Jednoduchá zmena textu a výpočtov naprieč celým projektom. Žiadne nové súbory, žiadne štrukturálne zmeny.

### Súbory a zmeny

**1. `src/components/sections/Hero.tsx`** (riadok 38)
- `10% ročný výnos` → `12% ročný výnos`

**2. `src/components/sections/WhyInvest.tsx`** (riadok 24)
- `AnimatedCounter value={10}` → `value={12}`

**3. `src/components/sections/Calculator.tsx`**
- Riadok 11: `annualRate = 0.10` → `0.12`
- Riadok 47: text `10%` → `12%`
- Riadok 106: text `10% fixne` → `12% fixne`

**4. `src/components/sections/FAQ.tsx`** (riadok 11-12)
- FAQ otázka a odpoveď: `10%` → `12%`

**5. `src/components/sections/Contact.tsx`** (riadok 248)
- `AnimatedCounter value={10}` → `value={12}`

**6. `src/pages/ForInvestors.tsx`**
- Riadok 27: FAQ text `10%` → `12%`
- Riadok 75: výpočet `0.10` → `0.12`
- Riadok 115: PageMeta description `10%` → `12%`
- Riadok 123: SubpageHero description `10%` → `12%`
- Riadok 143: stats value `"10%"` → `"12%"`
- Riadok 408: `AnimatedCounter value={10}` → `value={12}`

**7. `src/pages/Index.tsx`** (riadok 186)
- CTA text `10%` → `12%`

**8. `src/pages/RealEstate.tsx`**
- Riadok 17: FAQ text `10%` → `12%`
- Riadok 30: PageMeta description `10%` → `12%`

Celkovo cca 15 zmien v 8 súboroch -- všetko textové/číselné nahradenie.


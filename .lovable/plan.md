
# Návrh animácií pre ASSETRA investments

## Prehľad navrhovaných animácií

### 1. Scroll-triggered animácie (Animácie pri scrollovaní)
Elementy sa objavia s animáciou keď ich používateľ pri scrollovaní uvidí:
- Sekcie sa plynulo objavia zdola nahor
- Karty sa objavia postupne jedna za druhou (staggered effect)
- Nadpisy a texty sa objavia s oneskorením

**Príklad efektu:**
- Používateľ scrolluje nadol
- Keď sekcia "Tri piliere rastu" vojde do obrazovky, najprv sa objaví nadpis
- Potom sa postupne objavia karty Real Estate, Private Equity, Private Credit

### 2. Animované čísla (Counter animation)
Štatistické čísla sa "napočítajú" nahor keď sú viditeľné:
- "10%" sa animuje od 0 do 10
- "12-36" mesiacov
- Hodnoty v kalkulačke pri zmene slidera

### 3. Vylepšené hover efekty na kartách
- Jemný "lift" efekt (karta sa zdvihne a zväčší tieň)
- Ikony sa jemne zväčšia alebo zmenia farbu
- Šípka sa posunie doprava pri hover

### 4. Animovaná línia v sekcii "Ako to funguje"
- Vertikálna línia spájajúca kroky 1-4 sa postupne "dokreslí"
- Kruhy s číslami sa postupne rozsvietia

### 5. Kalkulačka - plynulé prechody hodnôt
- Čísla sa plynulo menia pri posúvaní slidera
- Jemný "pulse" efekt na výsledkoch pri zmene

### 6. Micro-interakcie
- Tlačidlá majú jemný "press" efekt
- Input polia majú animovaný border pri focus
- Toast notifikácie s animáciou

---

## Technická implementácia

### Nové závislosti
Bude potrebné nainštalovať knižnicu pre sledovanie elementov:
- `framer-motion` - populárna knižnica pre React animácie

### Nové súbory a komponenty

**1. Custom hook pre scroll animácie**
Vytvoríme `src/hooks/useScrollAnimation.tsx`:
- Využíva Intersection Observer API
- Spúšťa animácie keď element vojde do viewport-u
- Konfigurovateľný threshold a oneskorenie

**2. Animovaný wrapper komponent**
Vytvoríme `src/components/AnimatedSection.tsx`:
- Obalí sekcie a pridá im fade-in-up animáciu
- Podporuje staggered animácie pre deti

**3. Counter komponent**
Vytvoríme `src/components/AnimatedCounter.tsx`:
- Animuje čísla od 0 po cieľovú hodnotu
- Podporuje formátovanie (%, €, mesiace)

### Úpravy existujúcich súborov

**Index.tsx:**
- Obalenie sekcií do AnimatedSection
- Staggered animácie na karty s vertikálami

**WhyInvest.tsx:**
- AnimatedCounter pre všetky štatistiky
- Staggered animácie na grid items

**HowItWorks.tsx:**
- Animovaná progress línia
- Postupné zobrazenie krokov

**Calculator.tsx:**
- Plynulé prechody hodnôt s framer-motion
- Animácie pri zmene slidera

**Tailwind konfigurácia:**
- Rozšírenie keyframes o nové animácie
- Utility triedy pre hover efekty

---

## Vizuálny príklad sekvencií

```text
Scroll animácie na hlavnej stránke:
+------------------------------------------+
|  [Header - vždy viditeľný]               |
+------------------------------------------+
|                                          |
|  "Tri piliere rastu"                     |
|  [fade-in, 0ms delay]                    |
|                                          |
|  +----------+  +----------+  +----------+|
|  |Real Estate| |Priv.Equity| |Priv.Credit|
|  |[300ms]   | |[450ms]    | |[600ms]   ||
|  +----------+  +----------+  +----------+|
|                                          |
+------------------------------------------+
|                                          |
|  "10% ročne"                             |
|  [counter: 0 -> 10, 1.5s]                |
|                                          |
+------------------------------------------+
```

---

## Očakávaný výsledok

Po implementácii bude stránka:
- Pôsobiť dynamickejšie a modernejšie
- Upútavať pozornosť na kľúčové štatistiky
- Poskytovať lepší používateľský zážitok
- Zachovávať profesionálny a elegantný vzhľad

Všetky animácie budú:
- Jemné a nenápadné (nie rušivé)
- Rýchle (200-600ms)
- Respektujúce `prefers-reduced-motion` pre accessibility

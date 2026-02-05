# Návrh animácií pre ASSETRA investments

## ✅ IMPLEMENTOVANÉ

### 1. Scroll-triggered animácie (Animácie pri scrollovaní)
Elementy sa objavia s animáciou keď ich používateľ pri scrollovaní uvidí:
- ✅ Sekcie sa plynulo objavia zdola nahor
- ✅ Karty sa objavia postupne jedna za druhou (staggered effect)
- ✅ Nadpisy a texty sa objavia s oneskorením

### 2. Animované čísla (Counter animation)
- ✅ "10%" sa animuje od 0 do 10
- ✅ "20%+" marže animované
- ✅ Hodnoty v kalkulačke pri zmene slidera - plynulé prechody

### 3. Vylepšené hover efekty na kartách
- ✅ Jemný "lift" efekt (karta sa zdvihne)
- ✅ Ikony sa jemne zväčšia pri hover
- ✅ Šípka sa posunie doprava pri hover

### 4. Animovaná línia v sekcii "Ako to funguje"
- ✅ Vertikálna línia spájajúca kroky 1-4 sa postupne "dokreslí"
- ✅ Kruhy s číslami majú hover animácie

### 5. Kalkulačka - plynulé prechody hodnôt
- ✅ Čísla sa plynulo menia pri posúvaní slidera (AnimatedValue)
- ✅ Jemný "pulse" efekt na výsledkoch pri zmene

### 6. Micro-interakcie
- ✅ Tlačidlá majú jemný scale efekt pri hover/active
- ✅ Input polia majú animovaný border pri focus
- ✅ Formulárový box má shadow animáciu pri hover

---

## Technická implementácia

### Nové závislosti
- ✅ `framer-motion` - nainštalovaná

### Nové súbory a komponenty
- ✅ `src/hooks/useScrollAnimation.tsx` - Intersection Observer hook
- ✅ `src/components/AnimatedSection.tsx` - AnimatedSection, StaggerContainer, StaggerItem
- ✅ `src/components/AnimatedCounter.tsx` - AnimatedCounter, AnimatedValue

### Aktualizované súbory
- ✅ `src/pages/Index.tsx` - scroll animácie na hlavnej stránke
- ✅ `src/components/sections/Hero.tsx` - framer-motion animácie
- ✅ `src/components/sections/WhyInvest.tsx` - AnimatedCounter a stagger
- ✅ `src/components/sections/About.tsx` - AnimatedSection
- ✅ `src/components/sections/HowItWorks.tsx` - animovaná progress línia
- ✅ `src/components/sections/Trust.tsx` - stagger animácie
- ✅ `src/components/sections/Calculator.tsx` - AnimatedValue pre plynulé prechody
- ✅ `src/components/sections/FAQ.tsx` - stagger animácie na accordion
- ✅ `src/components/sections/Contact.tsx` - animácie formulára a kontaktov

---

## Výsledok

Stránka teraz:
- ✅ Pôsobí dynamickejšie a modernejšie
- ✅ Upútava pozornosť na kľúčové štatistiky
- ✅ Poskytuje lepší používateľský zážitok
- ✅ Zachováva profesionálny a elegantný vzhľad

Všetky animácie:
- ✅ Jemné a nenápadné (nie rušivé)
- ✅ Rýchle (200-600ms)
- ✅ Respektujú `prefers-reduced-motion` pre accessibility

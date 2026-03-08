
# Top 3 Animácie - Page Transitions, Scroll Progress, Header Animation ✅ DOKONČENÉ

## Prehľad

Implementujeme tri pokročilé animácie, ktoré výrazne zlepšia používateľský zážitok:

1. **Page Transitions** - plynulé prechody medzi stránkami
2. **Scroll Progress Indicator** - tenká zlatá línia ukazujúca progres scrollovania
3. **Header Animation** - dynamický header reagujúci na scroll

---

## 1. Page Transitions (Prechody medzi stránkami)

### Čo to urobí:
- Pri prechode na novú stránku sa aktuálna stránka plynulo "odchádza" (fade-out)
- Nová stránka sa plynulo "objaví" (fade-in)
- Stránka pôsobí ako jedna súvislá aplikácia

### Technická implementácia:

**Nový súbor `src/components/PageTransition.tsx`:**
```text
- Wrapper komponent využívajúci AnimatePresence z framer-motion
- Fade + jemný posun nahor pri vstupe
- Fade + jemný posun nadol pri odchode
- Trvanie: 300ms
```

**Úprava `src/App.tsx`:**
```text
- Import PageTransition komponentu
- Obalenie Routes do AnimatePresence
- Každá Route dostane PageTransition wrapper
- Použitie location.key pre správne animácie
```

---

## 2. Scroll Progress Indicator

### Čo to urobí:
- Tenká zlatá línia priamo pod headerom
- Začína na 0% šírky, končí na 100% šírky
- Vizuálne ukazuje koľko stránky používateľ prešiel

### Technická implementácia:

**Nový súbor `src/components/ScrollProgress.tsx`:**
```text
- Použitie framer-motion useScroll hook
- Sticky pozícia pod headerom (top: výška headeru)
- Zlatá farba (bg-gold)
- Výška: 2px
- scaleX transformácia podľa scrollYProgress
- transformOrigin: left
```

**Úprava `src/App.tsx`:**
```text
- Import ScrollProgress komponentu
- Umiestnenie pod BrowserRouter, pred Routes
```

---

## 3. Header Animation

### Čo to urobí:
- Pri scrollovaní nadol sa header zmenší (padding sa zredukuje)
- Zvýši sa backdrop blur a priehľadnosť pozadia
- Logo sa jemne zmenší
- Pri scrollovaní nahor na začiatok sa vráti do pôvodného stavu
- Hover efekt na logo (zlatá farba)

### Technická implementácia:

**Úprava `src/components/layout/Header.tsx`:**
```text
- Nový custom hook pre sledovanie scroll pozície
- Dynamické CSS triedy podľa scroll pozície (threshold: 50px)
- Animácie:
  - Výška: h-20 → h-16 (desktop), h-16 → h-14 (mobile)
  - Background: bg-background/80 → bg-background/95
  - Backdrop blur: backdrop-blur-sm → backdrop-blur-md
  - Logo: text-xl → text-lg s transition
- Hover efekt na logo pomocou framer-motion
```

---

## Vizuálny príklad

```text
+----------------------------------------------------------+
|  ASSETRA investments    RE  PE  PC    [Header - normal]  |
|=========================================================|← Scroll Progress (0%)
|                                                          |
|            Súkromná investičná spoločnosť                |
|                                                          |
+----------------------------------------------------------+

        ↓ Po scrollovaní 50px+ ↓

+----------------------------------------------------------+
| ASSETRA investments   RE  PE  PC      [Header - compact] |
|===========================|← Scroll Progress (50%)       |
|                                                          |
```

---

## Súbory na vytvorenie

| Súbor | Účel |
|-------|------|
| `src/components/PageTransition.tsx` | Wrapper pre page transition animácie |
| `src/components/ScrollProgress.tsx` | Scroll progress indicator komponent |
| `src/hooks/useScrollPosition.tsx` | Custom hook pre sledovanie scroll pozície |

## Súbory na úpravu

| Súbor | Zmeny |
|-------|-------|
| `src/App.tsx` | AnimatePresence, PageTransition, ScrollProgress |
| `src/components/layout/Header.tsx` | Dynamické štýly, hover efekty, useScrollPosition |

---

## Očakávaný výsledok

Po implementácii:
- Stránka bude pôsobiť ako profesionálna single-page aplikácia
- Používateľ bude mať vizuálnu spätnú väzbu o svojom progrese na stránke
- Header bude reagovať na interakciu a pôsobiť dynamicky
- Všetky animácie budú rýchle (200-400ms) a nenápadné
- Accessibility: Animácie budú rešpektovať `prefers-reduced-motion`

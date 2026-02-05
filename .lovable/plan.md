# Animácie pre podstránky Private Equity a Private Credit ✅ HOTOVO

## Prehľad
Podstránky Private Equity a Private Credit majú vlastné sekcie, ktoré momentálne nemajú žiadne animácie. Využijeme už vytvorené animačné komponenty (`AnimatedSection`, `StaggerContainer`, `StaggerItem`, `AnimatedCounter`) pre konzistentný vzhľad s hlavnou stránkou.

---

## Navrhované animácie

### Hero sekcie (obe podstránky)
- Link "Späť na hlavnú" - fade-in zľava
- Label (Private Equity/Private Credit) - fade-in zhora
- Hlavný nadpis - fade-in zdola s oneskorením
- Popisný text - fade-in zdola s väčším oneskorením

### Sekcie s kartami
**Private Credit - Typy financovania:**
- Nadpis sekcie - fade-in
- Karty "Realitné projekty" a "Podnikateľské úvery" - staggered animácia (jedna za druhou)
- Ikony na kartách - hover efekt (zväčšenie)

**Private Equity - Investičné kritériá:**
- Nadpis sekcie - fade-in
- 4 karty kritérií - staggered animácia
- Ikony - hover efekt

### Sekcie Benefits/Výhody (Private Credit)
- 4 ikony s textom - staggered animácia od stredu
- Hover efekt na ikony

### Sekcie Process/Proces (obe podstránky)
- Animované čísla krokov 01-04
- Kroky sa objavia postupne s oneskorením
- Čísla krokov majú jemný "count-up" efekt

### FAQ sekcie (obe podstránky)
- Nadpis - fade-in
- Accordion položky - staggered animácia zhora nadol
- Plynulé otvorenie/zatvorenie (už má z Radix UI)

### Kontaktné sekcie (obe podstránky)
- Formulár - slide-in zľava
- Kontaktné informácie - slide-in sprava
- Tlačidlo - hover/active efekty (scale)
- Input polia - animated border pri focus

---

## Technická implementácia

### Zmeny v súboroch

**src/pages/PrivateCredit.tsx:**
- Import animačných komponentov
- Obalenie Hero obsahu do `AnimatedSection` s rôznymi delay hodnotami
- Financovanie karty - `StaggerContainer` + `StaggerItem`
- Benefits grid - `StaggerContainer` + `StaggerItem`
- Process kroky - `StaggerContainer` + `StaggerItem` s animovanými číslami
- FAQ - `StaggerContainer` pre accordion items
- Kontakt formulár - `AnimatedSection` s `motion.div` pre hover efekty

**src/pages/PrivateEquity.tsx:**
- Rovnaká štruktúra ako Private Credit
- Import animačných komponentov
- Hero animácie s delay
- Criteria karty - staggered
- Process kroky - staggered s animovanými číslami
- FAQ - staggered accordion
- Kontakt - animovaný formulár

### Príklad kódu pre Hero sekciu:

```text
+------------------------------------------+
|  <- Späť na hlavnú  [fade-in, 0ms]       |
|                                          |
|  PRIVATE EQUITY     [fade-in, 100ms]     |
|                                          |
|  Akvizície          [fade-in, 200ms]     |
|  zabehnutých firiem                      |
|                                          |
|  Popisný text...    [fade-in, 300ms]     |
+------------------------------------------+
```

### Príklad kódu pre Process sekciu:

```text
+--------+  +--------+  +--------+  +--------+
|   01   |  |   02   |  |   03   |  |   04   |
| Žiadosť|  |Analýza |  | Ponuka |  |Čerpanie|
| [0ms]  |  | [100ms]|  | [200ms]|  | [300ms]|
+--------+  +--------+  +--------+  +--------+
```

---

## Očakávaný výsledok

Po implementácii budú podstránky:
- Vizuálne konzistentné s hlavnou stránkou
- Dynamické a profesionálne
- Upozorňovať na kľúčové informácie (kroky procesu, výhody)
- Zachovávať plynulý používateľský zážitok

Všetky animácie budú:
- Rýchle (200-600ms)
- Nenápadné a elegantné
- Respektujúce `prefers-reduced-motion` pre accessibility

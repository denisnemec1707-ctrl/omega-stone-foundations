---
description: Začať prácu na paid-traffic landing page pre investorov
---

Začíname s **investor landing page** — paid traffic landing pre Meta + Google
ads, audience: ľudia, ktorí chcú investovať s ASSETRA.

**Predtým než napíšeš akýkoľvek kód:**

1. Prečítaj `CLAUDE.md`, najmä sekciu **"Pending — Investor landing"** dolu.
2. Postupne sa ma spýtaj všetkých 6 otázok ktoré sú tam uvedené (typ
   investora, produkt, výnos + doba, min/max, regulácia, URL preference).
   Daj otázky **v jednom bloku**, ja odpoviem v jednej správe.
3. Po mojich odpovediach **diskutuj 3 architektúrne rozhodnutia:**
   - Extract `LandingLayout` komponent (stripped header + minimal footer)
     zdieľaný medzi všetkými paid landings? Default: áno.
   - DB: nová tabuľka `investor_inquiries_paid` (alebo upraviť existujúcu
     `investor_inquiries`) vs jednotná `landing_inquiries` s `landing_type`
     enum? Default: per-landing tabuľka.
   - Variant copy (3 alternatívy headline + sub) pred implementáciou alebo
     iterovať po prvom drafte?
4. Po schválení implementuj na vetve `claude-code`, deploy na Vercel
   pre review.

**Pripomienky:**
- Komunikuj so mnou po slovensky.
- Žiadne fake credibility claims (žiadne vymyslené "X investorov", "Y rokov
  experience"). Trust signals z transparentného procesu, regulácie ak je,
  CEO transparentnosti.
- Existujúca `/pre-investorov` je brand SEO verzia — nová paid landing
  musí mať INÚ cestu (`/investovat`, `/investicie`, alebo iné — odpovieš mi
  v otázkach).
- Pridaj nový route do `FAST_LOAD_ROUTES` v `App.tsx` (skip Preloader +
  PageTransition pre fast LCP).
- Conventional Commits v angličtine.

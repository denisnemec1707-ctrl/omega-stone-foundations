---
description: Začať prácu na paid-traffic landing page pre realitných flipperov a maklérov (financovanie flipov)
---

Začíname s **flipper-financing landing page** — paid traffic landing pre
realitných maklérov a flipperov, ktorí potrebujú krátkodobé financovanie
(bridge loan / mostový úver) na realitné flipy.

**Predtým než napíšeš akýkoľvek kód:**

1. Prečítaj `CLAUDE.md`, najmä sekciu **"Pending — Flipper financing landing"**.
2. Postupne sa ma spýtaj všetkých 6 otázok (špec produktu — bridge loan
   parametre, audience, geo + property typ, rýchlosť, diferenciátor voči
   bankám, URL preference). Daj otázky **v jednom bloku**, ja odpoviem
   v jednej správe.
3. Po mojich odpovediach **diskutuj architektúru:**
   - Reuse / extract `LandingLayout` komponent (default: extract teraz,
     keďže to bude tretia paid landing).
   - DB: nová tabuľka `flip_financing_inquiries` (s polami špecifickými
     pre flippera — adresa nehnuteľnosti, kúpna cena, plánovaný predaj,
     rozpočet renovácie, atď.) vs jednotná `landing_inquiries`?
     Default: per-landing tabuľka.
   - Calculator widget (LTV → max úver, mesačná splátka) — chce user mať
     interaktívny kalkulačku v landing-u alebo len statické info?
4. Po schválení implementuj na vetve `claude-code`, deploy na Vercel
   pre review.

**Pripomienky:**
- Komunikuj po slovensky.
- Žiadne fake credibility (žiadne "už sme financovali 100 flipov" ak to
  nie je pravda).
- Trust signals z procesu: rýchlosť schválenia, transparentné fees,
  reálne LTV/úrok podmienky.
- Pridaj nový route do `FAST_LOAD_ROUTES` v `App.tsx`.
- Conventional Commits v angličtine.

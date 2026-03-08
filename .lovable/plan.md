

## Plan: Footer s navigáciou, právne podstránky, kontaktné formuláre

### 1. Vylepšený Footer s navigáciou

**`src/components/layout/Footer.tsx`** -- pridať navigačné linky medzi ASSETRA logo a CTA sekciu:
- Sektory: Nehnuteľnosti, Akvizície, Úvery
- Pre investorov
- Ochrana osobných údajov, Obchodné podmienky
- Kontaktný email

### 2. Právne podstránky

Nové súbory:
- **`src/pages/PrivacyPolicy.tsx`** -- Ochrana osobných údajov (GDPR-kompatibilný obsah pre ASSETRA investments s.r.o.)
- **`src/pages/Terms.tsx`** -- Obchodné podmienky

**`src/App.tsx`** -- pridať routes `/ochrana-udajov` a `/obchodne-podmienky`

**`src/components/CookieBanner.tsx`** -- pridať link na Ochranu osobných údajov

### 3. Kontaktné formuláre na Úvery a Akvizície

**Databáza** -- nová tabuľka `contact_inquiries` s poľami:
- name, email, phone, message, inquiry_type (enum: 'financing', 'company_sale'), company_name, loan_amount, project_type
- RLS: verejný INSERT (anon), žiadny SELECT

**`src/pages/PrivateCredit.tsx`** -- nahradiť mailto CTA formulárom "Požiadať o financovanie" s poľami: meno, email, telefón, typ projektu (select), požadovaná výška úveru, správa

**`src/pages/PrivateEquity.tsx`** -- nahradiť mailto CTA pre predajcov firiem formulárom "Predaj firmy" s poľami: meno, email, telefón, názov firmy, ročný obrat (select), správa

Oba formuláre budú v dark charcoal štýle konzistentnom s formulárom na `/pre-investorov`.

### Súhrn zmien
- 2 nové stránky (právne)
- 1 nová DB tabuľka
- 4 upravené súbory (Footer, App.tsx, PrivateCredit, PrivateEquity)
- 1 menšia úprava (CookieBanner)


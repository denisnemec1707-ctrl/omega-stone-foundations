## Plán: Landing page pre nábor asistenta/ky CEO

### Stratégia
Samostatná landing page na `/kariera/asistent-ceo` (executive pozícia = vlastná stránka, vhodné na cielenú reklamu) + karta na `/kariera` ktorá tam vedie. Existujúce karty (Obchodný zástupca, Projektový manažér) zostávajú.

### 1. Nová stránka `src/pages/AssistantCEO.tsx`
Dark/charcoal estetika konzistentná so zvyškom webu.

**Sekcie:**
- **Hero** (SubpageHero): label „Kariéra · Executive", title „Asistent/ka", titleAccent „CEO"
- **O úlohe** — pracuješ priamo s CEO, koordinácia portfólia (Ensola, Woodsteel, EUROSCAFF, History Caffe), správa kalendára, príprava podkladov, komunikácia s partnermi
- **Koho hľadáme** — profil: spoľahlivosť, diskrétnosť, výborná SK/EN komunikácia, organizačné zručnosti, samostatnosť, vodičák B
- **Čo ponúkame** — práca priamo s CEO, vhľad do investičnej skupiny, flexibilná forma (úväzok/miesto doladíme podľa kandidáta), priestor na rast
- **Formulár prihlášky** (dark charcoal karta, react-hook-form + zod):
  - Meno a priezvisko *
  - Email *
  - Telefón *
  - Mesto / región *
  - Motivácia — prečo táto pozícia (textarea) *
  - Očakávaná hrubá mzda (text/select rozsahy) *
  - Najskorší možný nástup *
  - **CV upload** (PDF/DOC/DOCX, max 5 MB) *
  - Súhlas so spracovaním osobných údajov (checkbox, link na `/ochrana-osobnych-udajov`) *
  - Submit → upload do storage → insert do DB → invoke edge function → toast „Ďakujeme, ozveme sa"

### 2. Backend (Lovable Cloud)

**Storage bucket** `cv-uploads` (private):
- RLS: anon môže `INSERT`, nikto nemôže `SELECT`/`DELETE` cez klienta
- CV cesta: `assistant-ceo/{uuid}-{sanitized-filename}.pdf`

**Nová tabuľka** `assistant_applications`:
- `id` uuid PK, `created_at` timestamptz
- `full_name`, `email`, `phone`, `city`, `motivation`, `expected_salary`, `earliest_start` text
- `cv_path` text (cesta v storage bucket)
- `consent_given` boolean
- RLS: `anon + authenticated` môžu len `INSERT`, žiadne SELECT/UPDATE/DELETE pre klienta

### 3. Email notifikácia s prílohou

Keďže chceš email s **prílohou (CV)** na zadanú adresu, potrebujeme:

a) **Email infra setup**: 
- Skontrolovať / nastaviť email doménu (`email_domain--check_email_domain_status`)
- Ak nie je nastavená, ukázať dialóg na setup email domény
- Spustiť `setup_email_infra` + `scaffold_transactional_email`

b) **Edge function** `notify-assistant-application`:
- Prijme `applicationId`
- Načíta záznam z `assistant_applications`
- Stiahne CV zo storage cez service role
- Pošle email s prílohou cez Resend API (Lovable transactional email **nepodporuje prílohy** — pre prílohy treba Resend connector). 
- **Alternatíva** ak nechceš Resend: pošleme cez Lovable transactional email s **download linkom** na CV (signed URL platná 7 dní) namiesto prílohy.

### Otázka pred implementáciou
Lovable email systém **nepodporuje prílohy**. Pre prílohu CV priamo v emaile potrebujeme **Resend connector** (free tier 3 000 emailov/mes, stačí pripojiť cez konektor). Alternatívou je poslať email cez Lovable s **download linkom** na CV (klikneš → stiahneš). Funkčne identické, len jeden klik navyše.

→ **Odporúčam download link cez Lovable** (jednoduchšie, žiadne ďalšie účty). Pred implementáciou sa ťa však pre istotu opýtam, ktorú možnosť chceš.

### 4. Ďalšie zmeny
- **`src/pages/Careers.tsx`** — pridať tretiu kartu „Asistent/ka CEO" s odznakom „Hľadáme teraz" ktorá linkuje na `/kariera/asistent-ceo`
- **`src/App.tsx`** — route `/kariera/asistent-ceo`
- **`src/components/layout/Footer.tsx`** — voliteľne pridať link pod sekciu Kariéra
- **Email príjemcu** — defaultne `kariera@assetra.sk`, potvrdím s tebou alebo poviem inú adresu

### Súhrn
- 1 nová stránka, 1 nová route
- 1 nová DB tabuľka + 1 storage bucket s RLS
- 1 nová edge function pre email notifikáciu
- Email infra setup (ak ešte nie je)
- Aktualizácia Careers stránky (nová karta)

Po schválení sa ťa najprv opýtam na preferenciu **príloha vs download link** a na **email adresu pre notifikácie**, potom všetko zrealizujem.
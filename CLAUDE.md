# ASSETRA Investments — internal web

Súkromná investičná spoločnosť. Web je prezentácia + lead-gen pre 3 sektory
(nehnuteľnosti, akvizície zabehnutých firiem, zabezpečené úvery) a niekoľko
paid-traffic landing pages.

## Komunikácia s userom

- **Hovor s ním po slovensky.** Aj v explanations, aj v UX textoch.
- **Commit messages píš v angličtine, Conventional Commits**: `feat:`, `fix:`,
  `chore:`, `refactor:`, `docs:`. Multiline body pre netriviálne zmeny.
- **User je CEO.** Neformálny tón v reči, ale forms a copy na webe používajú
  formálne "Vy".
- **User explicitly opted out of fake credibility claims** — žiadne vymyslené
  "X firiem v portfóliu", "Y rokov skúseností" v copy. Trust signals sa stavajú
  na transparentnom procese, NDA, priamej investorskej pozícii (žiadne provízie),
  a osobnej identite CEO. Portfólio firiem (Ensola, Woodsteel, EUROSCAFF, History
  Caffe) sú jeho vlastné spoločnosti, ktoré budoval — nie firmy, ktoré kúpil.

## Stack

Vite 5 + React 18 + TypeScript + Tailwind + shadcn/ui + react-router-dom +
framer-motion + react-hook-form + zod + tanstack/react-query + Supabase
(`@supabase/supabase-js`).

`@/` alias → `src/`. Cesty v importe používaj `@/...` formu.

## Branches

- **`lovable`** — pôvodne `main`. Lovable's branch, snapshot pred Claude Code
  prácou. Slúži ako záloha "keby sme niečo pokazili". Sem nepushuj nič nové.
- **`claude-code`** — pôvodne `dev`. **Aktívna pracovná vetva pre Claude
  Code + Denisa.** Sem commituj všetky zmeny.

Workflow: vždy pracuj na `claude-code`. PR `claude-code → lovable` len keď
user explicitne požiada o merge do zálohy. Inak `lovable` necháme tak.

## Deployment

- Vercel projekt: `assetra-web` (team `denis-nemecs-projects`,
  `team_8p2TYUHYPxYtNtY8YkJ8yYSl`).
- Live URL: https://assetra-web.vercel.app
- Plánovaná custom doména: `assetrainvestments.com` (user už vlastní, point
  later when site is final).
- **Zatiaľ NIE JE Git integrácia.** Deploy = manuálne cez
  `cd ~/assetra-web && NPM_CONFIG_CACHE=/tmp/npm-cache-assetra npx --yes vercel@latest deploy --prod --yes`
  (cache override kvôli root-owned súborom v `~/.npm/_cacache` z minulých
  `sudo npm` — neriešiť, alebo `sudo chown -R 501:20 ~/.npm` ak chceš
  natrvalo).
- `vercel.json` má SPA rewrite — všetky paths fall back na `/index.html`,
  okrem statiky (`/assets/`, `favicon.*`, `robots.txt`, etc.).
- Vercel CLI je auth-nuté ako `denisnemec1707-ctrl` cez MCP server.

## Supabase

- Project ref: `wlplikkaotffpjmknxoe`
- Env vars (set v Production + Development environments na Vercele):
  `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
  Preview env-y NIE SÚ nastavené (CLI bug s `vercel env add preview --yes`).
- Tabuľky:
  - `assistant_applications` — formulár z `/kariera/asistent-ceo`
  - `contact_inquiries` — formulár z `/akvizicie` (typ `company_sale`/`financing`)
  - `investor_inquiries` — z `/pre-investorov`
  - `company_sale_inquiries` — formulár z `/predam-firmu` (paid traffic landing).
    **DÔLEŽITÉ:** migrácia `20260428100000_create_company_sale_inquiries.sql`
    bola commitnutá ale **ešte nie je aplikovaná na live Supabase** —
    formulár momentálne fail-uje pri submit. Pri ďalšej úprave sa user opýtaj,
    či ju mám aplikovať (môže ju ručne paste-núť do Supabase dashboard SQL
    editora, alebo nastavíme Supabase CLI).
- Storage bucket: `cv-uploads` (privátny, anon môže insert do priečinku
  `assistant-ceo/`).
- Typy v `src/integrations/supabase/types.ts` sa **musia ručne držať** v sync
  s migráciami — Supabase CLI gen ešte nie je nakonfigurované.

## Existing pages (route → file)

| Route | Komponent | Účel |
|---|---|---|
| `/` | `Index.tsx` | Brand homepage |
| `/nehnutelnosti` | `RealEstate.tsx` | Sektor — real estate |
| `/akvizicie` | `PrivateEquity.tsx` | Sektor — akvizície (brand SEO; iný účel ako `/predam-firmu`) |
| `/uvery` | `PrivateCredit.tsx` | Sektor — úvery |
| `/projekty` | `Portfolio.tsx` | Brand portfólio |
| `/pre-investorov` | `ForInvestors.tsx` | Brand investor page |
| `/kariera` | `Careers.tsx` | Kariéra hub |
| `/kariera/asistent-ceo` | `AssistantCEO.tsx` | Lovable-built role landing s CV uploadom |
| `/predam-firmu` ⭐ | `PredamFirmu.tsx` | **Paid-traffic landing** pre majiteľov firiem (Meta+Google ads, ~100 €/mes test rozpočet). Stripped header, lead form 10-poľný, UTM capture do `landing_page` + `utm_*` stĺpcov v DB. |
| `/ochrana-udajov`, `/obchodne-podmienky` | … | Legal |

**`FAST_LOAD_ROUTES` v `App.tsx`** — paths v tomto array bypassujú Preloader
+ PageTransition (rýchly LCP pre paid traffic). Aktuálne: `["/predam-firmu"]`.
Budúce paid landings (investor, flipper) sem pridaj.

## Brand & kontakt

- **Plné meno:** ASSETRA Investments • **Skratka:** ASSETRA
- **Email:** info@assetrainvestments.com
- **Telefón:** +421 911 860 788
- **Sídlo / IČO:** ⚠️ chýba na minimal footri `/predam-firmu` — user ešte
  nedoplnil
- **Brand voice:** formálne "Vy" v UX textoch, žiadne fake credibility,
  diskrétnosť + transparentný proces ako trust drivers

## Convention pre paid-traffic landings

Aktuálne má `/predam-firmu` vlastný stripped header + minimal footer
**inline v komponente.** Ak budeme stavať ďalšie landing (investor, flipper),
**rozhodni sa s userom**:
- (a) **Extract `LandingLayout` komponent** so stripped header + minimal
  footer, share medzi všetkými paid landings. Cleaner, ale extra súbor.
- (b) **Inline copy-paste** v každej landing page. Faster initial dev, viac
  diff-u keď chceš zmeniť headerov ASSETRA logo / phone naprieč všetkými.

Default pre druhú a tretiu landing: rovno **(a) extract**, lebo už máme 3
landingy → jasná winuje DRY.

Dáta podobne — buď:
- (i) **Per-landing tabuľky** ako teraz (`company_sale_inquiries`,
  `assistant_applications`, …) — čistá separácia
- (ii) **Jedna `landing_inquiries` tabuľka s `landing_type` enum** + JSON
  `payload` stĺpec pre per-landing fields — DRY, ale slabšia type safety

User prefer (i) zatiaľ.

## Permissions / Claude Code setup

`.claude/settings.json` má allowlist pre čisto read-only MCP toolov (preview
screenshots, console logs, Vercel domain checks, Chrome tabs reads). Mutating
operácie (Bash mutácie, Vercel deploy, Edit/Write na súbory) **stále vyžadujú
confirm** — to je zámerné.

User testoval option `--dangerously-skip-permissions` ale rozhodol sa pre
narrow allowlist namiesto tej dynamitu.

---

# Pending — k vyriešeniu v nasledujúcom session

## ⚠️ Na začiatku ďalšieho session

Ak prvá user message naznačuje, že chce stavať **investor** alebo
**flipper-financing** landing page, **predtým než napíšeš akýkoľvek kód
spýtaj sa userovho** týchto otázok (zoskupené aby sa to dalo odpovedať
v jednej správe):

### Investor landing
1. **Aký typ investora?** Retail (10–50k €), HNW (100k+ €), inštitucionálni?
2. **Aký produkt im ponúkaš?** Pôžička s úrokom % p.a., equity v projekte,
   dlhopis, alebo spoluinvestícia do konkrétneho realitného/firemného projektu?
3. **Očakávaný výnos % p.a.** a **doba viazanosti**?
4. **Min/max investícia?**
5. **Regulácia** — je produkt regulovaný NBS (alebo equiv.)? Ak áno, pridať
   povinné disclaimers ("kapitálové investície zahŕňajú riziko straty atď.").
6. **URL preference?** `/investovat` (action), `/investicie` (entity), iný?
   `/pre-investorov` už existuje ako brand verzia — paid landing musí mať
   inú cestu.

### Flipper financing landing
1. **Špecifikácia produktu:**
   - Bridge loan / krátkodobý úver — koľko mesiacov (6 / 12 / 18)?
   - Maximálne LTV (loan-to-value)?
   - Úroková sadzba % p.a. + fee štruktúra (origination fee, exit fee)?
   - Maximálna výška jedného úveru?
2. **Audience:** skúsení flipperi (X+ flipov/rok)? Realitní makléri robia
   občasné flipy? Začiatočníci s 1. flipom?
3. **Geo + property typ:** len Bratislava + okolie? Celá SK? Byty, rodinné
   domy, komerčné, pozemky?
4. **Rýchlosť schválenia** (USP voči bankám)?
5. **Diferenciátor voči bankovým bridge produktom** (napr. ŠLSP)?
6. **URL preference?** `/financovanie-flipov`, `/uver-na-flip`, `/bridge-loan`,
   iný?

### Po odpovediach diskutuj s userom o
- **Shared `LandingLayout`** komponent extract pred implementáciou (default:
  áno, rozšír)
- **DB design** — pokračovať v per-landing tabuľkách alebo zjednotiť?
  (default: per-landing)
- Či má zmysel **predefinovať reklamné copy** (headline + sub) v pár
  variantoch ešte pred implementáciou, aby user vedel rovno odštartovať
  Meta/Google kampaň po deploye

## Prvá akcia v novom session (ak je dev práca)

```bash
git pull origin claude-code  # najnovšie zmeny
```

Ak Lovable medzitým niečo pushol na `lovable`, opýtaj sa userovho či to chce
zlúčiť do `claude-code` (`git merge lovable` alebo `git rebase lovable`).

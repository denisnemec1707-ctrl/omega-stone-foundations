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
| `/predam-firmu` ⭐ | `PredamFirmu.tsx` | **Paid-traffic landing** pre majiteľov firiem (Meta ads). Hero (image + obrovský H1 "Odkúpime Vašu firmu.") + 4 key-point karty + lead form (10 polí) → `company_sale_inquiries` v Supabase s UTM capture. |
| `/investovat` ⭐ | `Investovat.tsx` | **Paid-traffic landing** pre súkromných investorov (Meta ads). Hero (image + obrovský H1 "9 – 12 % ročne") + 4 key-point karty + lead form (8 polí) → `investment_inquiries` v Supabase s UTM capture. |
| `/ochrana-udajov`, `/obchodne-podmienky` | … | Legal |

**`FAST_LOAD_ROUTES` v `App.tsx`** — paths v tomto array bypassujú Preloader
+ PageTransition (rýchly LCP pre paid traffic). Aktuálne:
`["/predam-firmu", "/investovat"]`. Budúcu flipper landing sem pridaj.

## Brand & kontakt

- **Plné meno:** ASSETRA Investments • **Skratka:** ASSETRA
- **Email:** info@assetrainvestments.com
- **Telefón:** +421 911 860 788
- **Sídlo / IČO:** ⚠️ chýba na minimal footri `/predam-firmu` — user ešte
  nedoplnil
- **Brand voice:** formálne "Vy" v UX textoch, žiadne fake credibility,
  diskrétnosť + transparentný proces ako trust drivers

## Convention pre paid-traffic landings

**Shared `LandingLayout`** komponent v
[src/components/landing/LandingLayout.tsx](src/components/landing/LandingLayout.tsx)
— stripped sticky header (clickable ASSETRA logo → `/`, tel CTA) +
minimal footer. Exportuje aj konstanty `PHONE_DISPLAY`, `PHONE_TEL`,
`EMAIL`. Každý nový paid landing ho používa.

**Štandardná štruktúra paid landing** (drží sa `/predam-firmu` aj
`/investovat`):
1. Hero: `<img heroMountains>` + 2-vrstvový gradient (`from-black/85 via-black/60 to-black/30` zľava + `from-black/50 via-transparent to-transparent` zhora) + obrovský serif H1 (text-6xl → 9xl) + krátky sub (text-2xl → 5xl serif) + 2 CTA (primary biele s tmavým textom + tel outline).
2. 4 key-point karty (`bg-secondary/50` cards, neutrálne `bg-foreground/5` icon container, `text-foreground` icon).
3. Lead form na `bg-charcoal` paneli — UTM capture do dedikovanej
   tabuľky, 24h response message.

**Žiadne** FAQ, "Pre koho", "Ako to funguje" proces, "Prečo cez nás",
risk reversal, "Mechanizmus výnosu" sekcie — user explicitne preferuje
minimalist flow (hero → 4 karty → form). Tieto sekcie boli skúšané
v `feat(investovat): rewrite copy for higher conversion` (commit
`2ebc4bf`) a stiahnuté späť — ak ich chceš znovu, pozri tam.

**Žiadne modré accenty.** Brand má `--primary: 212 100% 47%` (modrá),
ale paid landings to neuznávajú — primary CTA je `bg-primary-foreground
text-charcoal` (biele tlačítko + tmavý text), accenty sú
`text-primary-foreground`/`text-foreground` neutrálne. To bolo zmenené
v commite `f76b52d` (Investovat) a `28fba62` (PredamFirmu).

**Dáta**: per-landing tabuľky (`company_sale_inquiries`,
`investment_inquiries`, …) — čistá separácia, žiadny enum/JSON pool.

## Permissions / Claude Code setup

`.claude/settings.json` má allowlist pre čisto read-only MCP toolov (preview
screenshots, console logs, Vercel domain checks, Chrome tabs reads).

**Od session 2026-04-28** user prešiel na `claude
--dangerously-skip-permissions` v termináli — žiadne potvrdenia. Z toho
vyplýva: pred deštruktívnymi operáciami (rm, force-push, sudo, git reset
--hard) explicitne pomenuj v texte čo ideš robiť a počkaj jeden krok;
defaultne **nepushuj** na origin a **nedeployuj** bez explicitného user
príkazu.

---

# Pending — k vyriešeniu v nasledujúcom session

## ⚠️ Na začiatku ďalšieho session

**Investor landing `/investovat` je hotová** (commit `fc0afa3` … `28fba62`,
2026-04-28). Parametre produktu pre referenciu:
- Pôžička s fixným úrokom **9 – 12 % p.a.**, zabezpečená záložným právom
  na konkrétnu slovenskú nehnuteľnosť.
- Mesačná renta + bonus pri vrátení istiny. Doba viazanosti 3 – 5 rokov.
- Min. 50 000 € (so záložným právom). Výnimočne od 10 000 € bez
  záložného práva. Od 300 000 € možnosť spoluinvestičnej spolupráce
  (deal-by-deal partnership).
- Regulácia: user ju má vyriešenú samostatne — neovlplyvňuje copy.
- Tabuľka `investment_inquiries` (migrácia
  `20260428120000_create_investment_inquiries.sql` ⚠️ na
  aplikovanie do live Supabase).

Ak prvá user message naznačuje **flipper-financing landing**, predtým
než napíšeš akýkoľvek kód spýtaj sa týchto otázok (zoskupené aby sa to
dalo odpovedať v jednej správe):

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

### Po odpovediach
- **Použi `LandingLayout`** + **drž sa štandardnej štruktúry** (hero image
  + obrovský H1 + krátky sub + 2 CTA + 4 karty + form). User
  explicitne preferuje minimalist flow — žiadne extra sekcie.
- **DB**: nová per-landing tabuľka (mirror schémy
  `company_sale_inquiries` / `investment_inquiries`).
- **Farby**: žiadne modré accenty (viď "Convention pre paid-traffic
  landings" vyššie).

## Prvá akcia v novom session (ak je dev práca)

```bash
git pull origin claude-code  # najnovšie zmeny
```

Ak Lovable medzitým niečo pushol na `lovable`, opýtaj sa userovho či to chce
zlúčiť do `claude-code` (`git merge lovable` alebo `git rebase lovable`).

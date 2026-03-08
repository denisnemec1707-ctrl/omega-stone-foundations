

## Plan: Portfólio a Kariéra podstránky

### 1. Stránka Naše portfólio (`/projekty`)

**Nový súbor `src/pages/Portfolio.tsx`**:
- SubpageHero s nadpisom "Naše portfólio"
- Sekcia s kartami spoločností (logo + popis):
  - **Ensola** -- predaj a montáž tepelných čerpadiel, smart home riešení a fotovoltiky (logo z uploadu)
  - **Woodsteel** -- výroba zasklení, pergol a zimných záhrad, pôsobí v SK, CZ, AT (logo z uploadu)
  - **History Caffe & Bakery** -- lokálna kaviareň s pekárňou (logo z uploadu)
  - **EUROSCAFF** -- stavebná spoločnosť / personálna agentúra v stavebníctve na nemeckom trhu
- Sekcia **Realitný projekt Nové Šútovce 1** -- fotky pozemkov z uploadu, popis parciel, spolupráca s BAK spol. s.r.o.
- Sekcia **Crossrock Capital** -- zmienka o minulej spolupráci, logo z uploadu, text o desiatky zobchodovaných nehnuteľností
- Info banner o prebiehajúcej akvizícii spoločnosti zameranej na obchod s hútnickým materiálom

### 2. Stránka Kariéra (`/kariera`)

**Nový súbor `src/pages/Careers.tsx`**:
- SubpageHero s nadpisom "Kariéra"
- Popis: hľadáme obchodných zástupcov a projektových manažérov pre naše firmy
- Karty s pozíciami (Obchodný zástupca, Projektový manažér) s popisom a požiadavkami
- Kontaktný formulár alebo CTA s emailom pre záujemcov

### 3. Zmeny v existujúcich súboroch

- **`src/App.tsx`** -- pridať routes `/projekty` a `/kariera`
- **`src/components/layout/Header.tsx`** -- pridať "Portfólio" a "Kariéra" do navigácie
- **`src/components/layout/Footer.tsx`** -- pridať linky na nové stránky
- **Assets** -- skopírovať uploadnuté obrázky (logá firiem, fotky Šútovce, Crossrock) do `src/assets/`

### Súhrn
- 2 nové stránky
- 7 obrázkov skopírovaných do assets
- 3 upravené súbory (App, Header, Footer)


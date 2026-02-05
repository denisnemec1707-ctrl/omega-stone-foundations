
# Pridanie formulárov a CTA tlačidiel

## Prehľad zmien

Implementujem kontaktné formuláre na podstránky Private Equity a Private Credit, upravím tlačidlá na hlavnej stránke a pridám CTA sekcie po celej hlavnej stránke.

---

## 1. Formuláre na Private Equity a Private Credit

Nahradím jednoduché emailové kontakty plnohodnotnými formulármi podobnými tomu na Real Estate stránke.

**Private Equity formulár:**
- Meno a priezvisko
- Email
- Telefón
- Názov firmy (špecifické pole)
- Obrat firmy (výberové pole)
- Správa

**Private Credit formulár:**
- Meno a priezvisko
- Email
- Telefón
- Názov spoločnosti
- Požadovaná suma financovania
- Typ projektu (realitný/podnikateľský)
- Správa

---

## 2. Úprava tlačidiel v Hero sekcii hlavnej stránky

Zmením texty a odkazy tlačidiel:

**Hlavné tlačidlo (zlaté):**
- Text: "Investovať do nehnuteľností"
- Odkaz: `/real-estate`

**Sekundárne tlačidlo (outline):**
- Text: "Zistiť viac o investíciách"
- Odkaz: `/real-estate#preco-investovat`

---

## 3. CTA sekcie po celej hlavnej stránke

Pridám CTA tlačidlá do existujúcich sekcií:

**Po sekcii "Tri piliere rastu":**
- CTA banner s textom o zabezpečených investíciách
- Tlačidlo: "Začať investovať" → `/real-estate`

**Po sekcii "O spoločnosti":**
- Pridám tlačidlo pod text
- Text: "Preskúmať investičné možnosti" → `/real-estate`

**Kontaktná sekcia:**
- Upravím text na zameranie na investície
- Pridám tlačidlo: "Chcem investovať" → `/real-estate`

---

## Nová CTA sekcia (Investment Banner)

Pridám novú sekciu medzi "Tri piliere" a "O spoločnosti":

```text
┌─────────────────────────────────────────────────────────┐
│  Zabezpečené investície do nehnuteľností               │
│                                                         │
│  Fixný výnos 10% ročne • Mesačné vyplácanie            │
│  Investícia zabezpečená reálnymi aktívami              │
│                                                         │
│  [Začať investovať]  [Vypočítať výnos]                 │
└─────────────────────────────────────────────────────────┘
```

---

## Technické detaily

### Súbory na úpravu

```text
src/pages/Index.tsx
├── Hero tlačidlá - nové texty a odkazy
├── Nová CTA sekcia po "Tri piliere"
├── CTA tlačidlo v "O spoločnosti"
└── Úprava kontaktnej sekcie

src/pages/PrivateEquity.tsx
└── Nahradenie emailu kontaktným formulárom

src/pages/PrivateCredit.tsx
└── Nahradenie emailu kontaktným formulárom
```

### Štýly tlačidiel

- Primárne CTA: zlaté pozadie, tmavý text
- Sekundárne CTA: outline štýl s hover efektom na zlatú
- Konzistentná veľkosť a spacing na mobile aj desktope

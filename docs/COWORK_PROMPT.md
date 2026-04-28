# Cowork prompt — set up Zapier + Google Sheets for ASSETRA web forms

**Skopíruj celý tento dokument do Claude Cowork** (alebo inej Claude inštancie s Computer Use). Cowork použije môj Zapier účet (paid plan) a Google účet `denis.nemec1707@gmail.com`.

---

## Goal

Postaviť backend pre 7 webových formulárov ASSETRA (https://assetra-web.vercel.app):

1. Vytvoriť Google Spreadsheet `ASSETRA Webstránka – Leady` s **7 hárkami** (jeden per formulár)
2. Vytvoriť **7 Zapov** v Zapier — každý Zap má:
   - Trigger: **Webhooks by Zapier → Catch Hook** (vygeneruje unikátnu URL)
   - Action 1: **Google Sheets → Create Spreadsheet Row** (v príslušnom hárku)
   - Action 2 (len Zap č. 5): **Google Drive → Upload File** (CV uploady)
3. Vrátiť mi **zoznam 7 webhook URL** v presnom formáte uvedenom dole

---

## Step 1 — Create Google Spreadsheet

Spreadsheet name: **`ASSETRA Webstránka – Leady`**
Folder: koreň Drive (alebo do `/ASSETRA/`).

**7 hárkov** (mená presne ako uvedené, vrátane medzier a háčkov):

1. `Predaj firmy`
2. `Investovať`
3. `Financovanie nehnuteľností`
4. `ASSETRA Klub`
5. `Asistent CEO`
6. `Pre investorov (brand)`
7. `Brand kontakt (akvizície/úvery)`

**Pre každý hárok** vytvor v prvom riadku stĺpcové hlavičky podľa schém v Step 2 nižšie. Hlavičky musia byť v **presne tom poradí** ako v schémach (Zapier Sheets action mapuje podľa stĺpcov).

---

## Step 2 — Create 7 Zaps

Pre každý Zap nižšie:
- Pomenuj Zap presne podľa "Zap name"
- Trigger: **Webhooks by Zapier → Catch Hook** (žiadny Child Key)
- Po vygenerovaní webhook URL ju ulož — vrátiš mi ich na konci
- Action: **Google Sheets → Create Spreadsheet Row** v `ASSETRA Webstránka – Leady`, v príslušnom hárku
- Mapovanie polí: každé pole z Catch Hook payloadu mapuj na rovnomenný stĺpec v Sheete

### Zap 1 — Predaj firmy
- **Zap name:** `ASSETRA — Predaj firmy`
- **Sheet:** `Predaj firmy`
- **Columns / payload fields (in order):**
  ```
  submitted_at | form_source | full_name | email | phone | company_name |
  industry | annual_turnover | annual_ebitda | sale_reason | message |
  consent_given | utm_source | utm_medium | utm_campaign | utm_content |
  utm_term | referrer | user_agent | landing_page
  ```

### Zap 2 — Investovať
- **Zap name:** `ASSETRA — Investovať`
- **Sheet:** `Investovať`
- **Columns:**
  ```
  submitted_at | form_source | full_name | email | phone | investment_amount |
  investment_horizon | contact_preference | message | consent_given |
  utm_source | utm_medium | utm_campaign | utm_content | utm_term |
  referrer | user_agent | landing_page
  ```

### Zap 3 — Financovanie nehnuteľností
- **Zap name:** `ASSETRA — Financovanie nehnuteľností`
- **Sheet:** `Financovanie nehnuteľností`
- **Columns:**
  ```
  submitted_at | form_source | full_name | email | phone | situation_type |
  financing_amount | contact_preference | message | consent_given |
  utm_source | utm_medium | utm_campaign | utm_content | utm_term |
  referrer | user_agent | landing_page
  ```

### Zap 4 — ASSETRA Klub
- **Zap name:** `ASSETRA — Klub`
- **Sheet:** `ASSETRA Klub`
- **Columns:**
  ```
  submitted_at | form_source | full_name | email | phone | categories |
  investment_range | time_horizon | consent_given |
  utm_source | utm_medium | utm_campaign | utm_content | utm_term |
  referrer | user_agent | landing_page
  ```
- Pole `categories` príde ako čiarkou oddelený string (napr. `"real_estate, private_equity"`)

### Zap 5 — Asistent CEO ⚠️ multipart with file
- **Zap name:** `ASSETRA — Asistent CEO`
- **Sheet:** `Asistent CEO`
- **Columns:**
  ```
  submitted_at | form_source | full_name | email | phone | city |
  motivation | earliest_start | cv_filename | cv_size_bytes | cv_mime_type |
  consent_given | user_agent | landing_page | cv_drive_url
  ```
- **DODATOČNÁ Action 2:** `Google Drive → Upload File`
  - Folder: vytvor v Drive `/ASSETRA Webstránka – CV/`
  - File: zo `cv` field z Catch Hook payloadu (multipart attachment)
  - File Name: použi `cv_filename` z payloadu
  - **Po Drive upload akcii** v Sheets action mapuj `cv_drive_url` na "Web Content Link" alebo "Web View Link" output Drive akcie
- ⚠️ V Zapier Catch Hook nastav **"Pick off a Child Key" = (nechaj prázdne)** a Webhook musí byť konfigurovaný tak aby prijal multipart/form-data

### Zap 6 — Pre investorov (brand)
- **Zap name:** `ASSETRA — Pre investorov`
- **Sheet:** `Pre investorov (brand)`
- **Columns:**
  ```
  submitted_at | form_source | name | email | phone |
  investment_amount | investment_interest | message |
  user_agent | landing_page
  ```

### Zap 7 — Brand kontakt (akvizície + úvery)
- **Zap name:** `ASSETRA — Brand kontakt`
- **Sheet:** `Brand kontakt (akvizície/úvery)`
- **Columns:**
  ```
  submitted_at | form_source | inquiry_type | name | email | phone |
  message | company_name | annual_turnover | project_type | loan_amount |
  user_agent | landing_page
  ```
- Tento Zap obsluhuje **2 stránky súčasne**:
  - `/akvizicie`: pošle `inquiry_type=company_sale`, vyplnené `company_name` + `annual_turnover`
  - `/uvery`: pošle `inquiry_type=financing`, vyplnené `project_type` + `loan_amount`
  - Obe pošlú do toho istého Sheetu, prázdne polia ostanú prázdne

---

## Step 3 — Optional notifications (odporúčané)

Pre Zapy 1–5 (paid landingy) pridaj **3rd Action: Email by Zapier** (alebo Gmail) na adresu `info@assetrainvestments.com` so subjectom:
```
[ASSETRA] Nový lead z {form_source} — {full_name}
```
Body: stručné zhrnutie polí. Účel: instant notifikácia že prišiel hot lead.

---

## Step 4 — Deliver back

Vráť mi v presne tomto formáte (pripravené na skopírovanie do `.env`):

```
VITE_WEBHOOK_PREDAM_FIRMU=https://hooks.zapier.com/hooks/catch/.../...
VITE_WEBHOOK_INVESTOVAT=https://hooks.zapier.com/hooks/catch/.../...
VITE_WEBHOOK_FINANCOVANIE=https://hooks.zapier.com/hooks/catch/.../...
VITE_WEBHOOK_KLUB=https://hooks.zapier.com/hooks/catch/.../...
VITE_WEBHOOK_ASISTENT_CEO=https://hooks.zapier.com/hooks/catch/.../...
VITE_WEBHOOK_INVESTOR_INQUIRY=https://hooks.zapier.com/hooks/catch/.../...
VITE_WEBHOOK_BRAND_CONTACT=https://hooks.zapier.com/hooks/catch/.../...
```

A link na vytvorený Spreadsheet.

---

## Testing tip

Po vytvorení Zap-u Zapier ti dovolí pred publikovaním poslať test request. Stačí cURL:

```bash
curl -X POST <WEBHOOK_URL> \
  -H "Content-Type: application/json" \
  -d '{"form_source":"test","full_name":"Test User","email":"test@test.sk"}'
```

Skontroluj, že riadok pribudol v Sheete a Zap je **Published** (turn ON).

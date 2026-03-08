

## Implementation Plan

Based on your approvals, here's what we'll build:

---

### 1. Homepage CTA Section Before Footer
Add a full-width dark section before the footer on `Index.tsx` with "Začnite investovať s ASSETRA" heading and a CTA button linking to `/pre-investorov#kontakt`. Same style as existing charcoal blocks.

### 2. Subtle Hover Animations
- Add gentle `scale` and `translateY` hover effects to the VerticalCard components (already has `whileHover` on button, extend to card)
- Add hover lift effect on FAQ accordion items
- Add subtle hover transitions on footer links and CTA buttons (scale, opacity shifts)
- All via framer-motion `whileHover` or Tailwind `hover:` classes

### 3. Backend Integration (Supabase)
- Connect Supabase to the project
- Create an `investor_inquiries` table with columns: `id`, `name`, `email`, `phone`, `investment_amount`, `investment_interest`, `message`, `created_at`
- Replace the `setTimeout` mock in `ForInvestors.tsx` with a real Supabase insert
- Add proper error handling with toast notifications

### 4. SEO Meta Tags Per Route
- Create a reusable `<PageMeta>` component using `document.title` and meta tag updates via `useEffect`
- Add unique title + description for each route: Index, RealEstate, PrivateEquity, PrivateCredit, ForInvestors
- Update `index.html` with sensible defaults

### 5. GDPR Cookie Banner
- Create a `CookieBanner` component that appears at the bottom of the screen
- Store consent in `localStorage`
- Minimal design matching the Bedrox aesthetic (charcoal background, white text, simple accept/reject buttons)
- Render in `App.tsx`

### 6. Social Proof Section
- Add a "Partneri a investori" or testimonial section on the `ForInvestors.tsx` page
- Anonymous or placeholder quotes from investors in the same editorial style (charcoal block with border-left quotes)
- Could also add to homepage before the CTA section

---

### Files to Create
- `src/components/PageMeta.tsx` - SEO meta component
- `src/components/CookieBanner.tsx` - GDPR cookie consent
- `src/integrations/supabase/` - Supabase client setup (if not already present)

### Files to Modify
- `src/pages/Index.tsx` - Add CTA section + hover animations + PageMeta
- `src/pages/ForInvestors.tsx` - Supabase integration + social proof + PageMeta
- `src/pages/RealEstate.tsx`, `PrivateEquity.tsx`, `PrivateCredit.tsx` - PageMeta
- `src/App.tsx` - Add CookieBanner
- `src/components/AnimatedSection.tsx` - Optional hover utilities


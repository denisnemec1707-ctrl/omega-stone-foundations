-- Table for company sale leads from /predam-firmu paid traffic landing
CREATE TABLE public.company_sale_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  annual_turnover TEXT NOT NULL,
  annual_ebitda TEXT NOT NULL,
  sale_reason TEXT NOT NULL,
  message TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  -- Paid traffic attribution
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,
  user_agent TEXT,
  landing_page TEXT
);

ALTER TABLE public.company_sale_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (public form). No SELECT/UPDATE/DELETE policies => blocked for clients.
CREATE POLICY "Anyone can submit company sale inquiry"
  ON public.company_sale_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Index for sorting in admin dashboard
CREATE INDEX idx_company_sale_inquiries_created_at
  ON public.company_sale_inquiries (created_at DESC);

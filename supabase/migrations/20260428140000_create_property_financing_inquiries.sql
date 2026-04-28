-- Table for property financing leads from /financovanie-nehnutelnosti paid traffic landing
CREATE TABLE public.property_financing_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  situation_type TEXT NOT NULL,
  financing_amount TEXT NOT NULL,
  contact_preference TEXT NOT NULL,
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

ALTER TABLE public.property_financing_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (public form). No SELECT/UPDATE/DELETE policies => blocked for clients.
CREATE POLICY "Anyone can submit property financing inquiry"
  ON public.property_financing_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Index for sorting in admin dashboard
CREATE INDEX idx_property_financing_inquiries_created_at
  ON public.property_financing_inquiries (created_at DESC);

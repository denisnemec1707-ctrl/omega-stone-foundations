-- Table for ASSETRA Klub investor subscribers — passive lead capture for future opportunities
CREATE TABLE public.investor_club_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  -- Identity
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,

  -- Preferences (codes: real_estate, private_equity, secured_loans, co_investment)
  categories TEXT[] NOT NULL,
  investment_range TEXT NOT NULL,
  time_horizon TEXT NOT NULL,

  -- Operational
  status TEXT NOT NULL DEFAULT 'active',
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid(),
  last_contacted_at TIMESTAMP WITH TIME ZONE,

  -- Compliance
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

ALTER TABLE public.investor_club_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (public form). No SELECT/UPDATE/DELETE policies => blocked for clients.
CREATE POLICY "Anyone can subscribe to investor club"
  ON public.investor_club_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow upsert on email conflict (resubmit with same email updates preferences)
CREATE POLICY "Anyone can update own subscription via upsert"
  ON public.investor_club_subscribers
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_investor_club_subscribers_created_at
  ON public.investor_club_subscribers (created_at DESC);

CREATE INDEX idx_investor_club_subscribers_categories
  ON public.investor_club_subscribers USING GIN (categories);

CREATE INDEX idx_investor_club_subscribers_status
  ON public.investor_club_subscribers (status);

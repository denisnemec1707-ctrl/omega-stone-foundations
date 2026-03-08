-- Create investor_inquiries table for contact form submissions
CREATE TABLE public.investor_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  investment_amount TEXT,
  investment_interest TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.investor_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form, no auth required)
CREATE POLICY "Anyone can submit an inquiry"
  ON public.investor_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
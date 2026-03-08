CREATE TYPE public.inquiry_type AS ENUM ('financing', 'company_sale');

CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  inquiry_type inquiry_type NOT NULL,
  company_name text,
  loan_amount text,
  project_type text,
  annual_turnover text
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact inquiry"
  ON public.contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
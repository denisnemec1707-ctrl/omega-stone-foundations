-- Table for assistant CEO applications
CREATE TABLE public.assistant_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  motivation TEXT NOT NULL,
  expected_salary TEXT NOT NULL,
  earliest_start TEXT NOT NULL,
  cv_path TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.assistant_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public application form). No SELECT/UPDATE/DELETE policies => blocked for clients.
CREATE POLICY "Anyone can submit assistant application"
  ON public.assistant_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Private storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv-uploads', 'cv-uploads', false);

-- Allow anyone to upload into the assistant-ceo/ folder, but no public reads
CREATE POLICY "Anyone can upload CV to assistant-ceo folder"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'cv-uploads'
    AND (storage.foldername(name))[1] = 'assistant-ceo'
  );

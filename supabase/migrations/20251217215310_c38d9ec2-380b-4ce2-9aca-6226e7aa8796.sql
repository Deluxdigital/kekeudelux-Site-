-- Table to store external contact links (Behance, WhatsApp etc.)
CREATE TABLE IF NOT EXISTS public.contact_links (
  key text PRIMARY KEY,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Publicly readable, since são apenas links de contato
ALTER TABLE public.contact_links ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_links'
      AND policyname = 'Contact links are viewable by everyone'
  ) THEN
    CREATE POLICY "Contact links are viewable by everyone"
      ON public.contact_links
      FOR SELECT
      USING (true);
  END IF;
END $$;

-- Seed/update Behance and WhatsApp links
INSERT INTO public.contact_links (key, url)
VALUES
  ('behance', 'https://www.behance.net/kekeudeluux'),
  ('whatsapp', 'https://wa.me/message/OPI7P6PY42BVI1')
ON CONFLICT (key) DO UPDATE SET url = EXCLUDED.url;
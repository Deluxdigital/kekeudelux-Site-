-- Create portfolio_items table to store portfolio metadata
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_path text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS but keep portfolio publicly readable
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'portfolio_items'
      AND policyname = 'Portfolio items are viewable by everyone'
  ) THEN
    CREATE POLICY "Portfolio items are viewable by everyone"
      ON public.portfolio_items
      FOR SELECT
      USING (true);
  END IF;
END $$;

-- Seed initial data matching current desired portfolio (paths will be wired in code)
INSERT INTO public.portfolio_items (title, image_path, sort_order)
VALUES
  ('Neutrogena - Quando a originalidade pede licença', '/src/assets/CAPA.png', 1),
  ('Neutrogena - Resultados que inspiram', '/src/assets/RESULTAADOS-QUE-INSPIRAM.png', 2),
  ('Neutrogena - Influência é sobre conexão', '/src/assets/ENCERRAMENTO.png', 3),
  ('Neutrogena - O evento', '/src/assets/O-EVENTO.png', 4),
  ('Ambos Marcam - Quando o jogo acaba o impacto continua', '/src/assets/CAPA_CARROSSEL_AMBOS.png', 5),
  ('Ambos Marcam - Saúde mental não é pauta secundária', '/src/assets/CARD_CARROSSEL_AMBOS_2.png', 6),
  ('Ambos Marcam - A gincana não é só entretenimento', '/src/assets/CARD_CARROSSEL_AMBOS_4.png', 7),
  ('Ambos Marcam - Identidade visual', '/src/assets/CARD_FINAL.png', 8),
  ('Z4 Store - Artes de lançamento de produtos', '/src/assets/artes.png', 9)
ON CONFLICT DO NOTHING;
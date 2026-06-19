-- =============================================
-- Güldeste Altay Haber Blog — Supabase Migration
-- =============================================

-- Articles table — mirrors the data.js structure exactly
CREATE TABLE IF NOT EXISTS articles (
  id             serial PRIMARY KEY,
  title          text NOT NULL,
  title_en       text,
  slug           text UNIQUE NOT NULL,
  date           timestamptz DEFAULT now(),
  url            text,
  category       text NOT NULL DEFAULT 'Genel',
  category_en    text,
  paragraphs     jsonb NOT NULL DEFAULT '[]'::jsonb,
  paragraphs_en  jsonb DEFAULT '[]'::jsonb,
  images         jsonb DEFAULT '[]'::jsonb,
  videos         jsonb DEFAULT '[]'::jsonb,
  featured_image text,
  author         text DEFAULT 'Güldeste Altay',
  author_en      text DEFAULT 'Güldeste Altay',
  source_name    text,
  source_name_en text,
  is_published   boolean DEFAULT true,
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_articles_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_articles_updated_at();

-- Full-text search index (Turkish)
CREATE INDEX IF NOT EXISTS articles_fts ON articles
  USING gin(to_tsvector('turkish', coalesce(title, '') || ' ' || coalesce(title_en, '')));

-- =============================================
-- Row Level Security
-- =============================================

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public read: anyone can read published articles (for the public blog)
CREATE POLICY articles_public_read ON articles
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Authenticated full access: admin can do everything
CREATE POLICY articles_auth_insert ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY articles_auth_update ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY articles_auth_delete ON articles
  FOR DELETE
  TO authenticated
  USING (true);

-- Also allow authenticated to read unpublished (drafts) in admin
CREATE POLICY articles_auth_read_all ON articles
  FOR SELECT
  TO authenticated
  USING (true);

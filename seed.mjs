/**
 * seed.mjs — Migrate data.js → Supabase articles table
 *
 * Usage:
 *   node seed.mjs
 *
 * Requires:
 *   SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables
 *   (or edit the constants below)
 *
 * npm install @supabase/supabase-js   (run once)
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Supabase config ──────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fhgvzltjthqaglupquwg.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  SUPABASE_SERVICE_ROLE_KEY is required.');
  console.error('   Set it as an environment variable or paste it into this file.');
  console.error('   Find it at: Supabase Dashboard → Settings → API → service_role key');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ── Parse data.js ────────────────────────────────────────────
function parseDataJs() {
  const raw = readFileSync(join(__dirname, 'data.js'), 'utf-8');

  // data.js assigns: const ARTICLES_DATA = [ ... ];
  // We extract the JSON array from it.
  const match = raw.match(/const\s+ARTICLES_DATA\s*=\s*(\[[\s\S]*\])\s*;?\s*$/);
  if (!match) {
    throw new Error('Could not parse ARTICLES_DATA from data.js');
  }

  // The array uses JS object literal syntax which is valid JSON
  // (all keys are already quoted strings in this file)
  const articles = JSON.parse(match[1]);
  return articles;
}

// ── Seed ─────────────────────────────────────────────────────
async function seed() {
  console.log('📖  Reading data.js ...');
  const articles = parseDataJs();
  console.log(`   Found ${articles.length} articles.\n`);

  let success = 0;
  let errors = 0;

  for (const art of articles) {
    const row = {
      id: art.id,
      title: art.title,
      title_en: art.title_en || null,
      slug: art.slug,
      date: art.date || null,
      url: art.url || null,
      category: art.category,
      category_en: art.category_en || null,
      paragraphs: art.paragraphs || [],
      paragraphs_en: art.paragraphs_en || [],
      images: art.images || [],
      videos: art.videos || [],
      featured_image: art.featured_image || null,
      author: art.author || 'Güldeste Altay',
      author_en: art.author_en || 'Güldeste Altay',
      source_name: art.source_name || null,
      source_name_en: art.source_name_en || null,
      is_published: true,
    };

    const { error } = await supabase
      .from('articles')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌  ID ${art.id}: ${error.message}`);
      errors++;
    } else {
      console.log(`   ✅  ID ${art.id}: ${art.title.substring(0, 60)}...`);
      success++;
    }
  }

  // Reset the serial sequence to max(id) + 1 so new inserts get the right ID
  const { error: seqError } = await supabase.rpc('query', {
    sql: `SELECT setval('articles_id_seq', (SELECT COALESCE(MAX(id), 0) FROM articles) + 1, false);`
  }).maybeSingle();

  // This RPC might not exist — fallback is manual or it auto-adjusts on next insert
  if (seqError) {
    console.log('\n⚠️  Could not reset serial sequence (non-critical). Next manual insert may need ID adjustment.');
  }

  console.log(`\n🎉  Seed complete: ${success} success, ${errors} errors.`);
}

seed().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

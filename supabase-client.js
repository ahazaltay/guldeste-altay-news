/**
 * supabase-client.js
 * Fetches articles from Supabase and populates the global ARTICLES_DATA array
 * that app.js depends on. Replaces the static data.js file.
 */

const SUPABASE_URL = 'https://fhgvzltjthqaglupquwg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IWH0xGE9O10_FDby5n6oOA_Fv1RLofu';

// Global variable that app.js reads. Keep existing if loaded from data.js.
if (typeof ARTICLES_DATA === 'undefined') {
  var ARTICLES_DATA = [];
}


// Fetch articles from Supabase REST API (no SDK needed for simple reads)
async function fetchArticlesFromSupabase() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?is_published=eq.true&order=date.desc`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase fetch failed: ${response.status} ${response.statusText}`);
    }

    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('[supabase-client] Failed to fetch articles:', error);
    return [];
  }
}

// Initialize: fetch data and signal readiness
async function initArticlesData() {
  const fetchedArticles = await fetchArticlesFromSupabase();

  if (fetchedArticles && fetchedArticles.length > 0) {
    ARTICLES_DATA = fetchedArticles;
    console.log(`[supabase-client] Loaded ${ARTICLES_DATA.length} articles from Supabase.`);
  } else {
    console.warn('[supabase-client] No articles loaded from Supabase. Falling back to local data.js.');
  }

  // Dispatch a custom event so app.js knows data is ready
  window.dispatchEvent(new CustomEvent('articlesDataReady'));
}

// Start fetching immediately
initArticlesData();

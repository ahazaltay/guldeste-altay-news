import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fhgvzltjthqaglupquwg.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_IWH0xGE9O10_FDby5n6oOA_Fv1RLofu'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

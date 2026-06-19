import { supabase } from './supabase'

export interface Article {
  id?: number
  title: string
  title_en: string | null
  slug: string
  date: string | null
  url: string | null
  category: string
  category_en: string | null
  paragraphs: string[]
  paragraphs_en: string[] | null
  images: string[] | null
  videos: string[] | null
  featured_image: string | null
  author: string | null
  author_en: string | null
  source_name: string | null
  source_name_en: string | null
  is_published: boolean
  created_at?: string
  updated_at?: string
}

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getArticle(id: number): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .insert([article])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateArticle(id: number, updates: Partial<Article>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteArticle(id: number): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function uploadImage(file: File): Promise<string> {
  // Upload image to Supabase Storage bucket 'article-images'
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
  const filePath = `images/${fileName}`

  // Check if bucket exists, if not we try to upload (user should create the bucket 'article-images' as public)
  const { error: uploadError } = await supabase.storage
    .from('article-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('article-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getArticle, createArticle, updateArticle, uploadImage, type Article } from '../lib/articles'
import { TiptapEditor } from '../components/TiptapEditor'
import { Save, ArrowLeft, Upload, Loader, AlertTriangle } from 'lucide-react'

// Turkish slug helper
const slugify = (text: string) => {
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u'
  }
  return text
    .toString()
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (match) => trMap[match] || match)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function ArticleEditorPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = id === 'new'
  const navigate = useNavigate()

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  // Editor tabs: 'tr' or 'en'
  const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr')

  // Form states
  const [title, setTitle] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [slug, setSlug] = useState('')
  const [date, setDate] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('Genel')
  const [categoryEn, setCategoryEn] = useState('General')
  const [paragraphs, setParagraphs] = useState<string[]>([])
  const [paragraphsEn, setParagraphsEn] = useState<string[]>([])
  const [featuredImage, setFeaturedImage] = useState('')
  const [author, setAuthor] = useState('Güldeste Altay')
  const [authorEn, setAuthorEn] = useState('Güldeste Altay')
  const [sourceName, setSourceName] = useState('')
  const [sourceNameEn, setSourceNameEn] = useState('')
  const [isPublished, setIsPublished] = useState(true)

  // Upload state
  const [uploading, setUploading] = useState(false)

  // Fetch article if editing
  useEffect(() => {
    if (isNew) {
      // Set default date to now in local time formatted for datetime-local input
      const now = new Date()
      const tzOffset = now.getTimezoneOffset() * 60000
      const localISOTime = new Date(now.getTime() - tzOffset).toISOString().slice(0, 16)
      setDate(localISOTime)
      return
    }

    const fetchArticle = async () => {
      try {
        const art = await getArticle(Number(id))
        setTitle(art.title)
        setTitleEn(art.title_en || '')
        setSlug(art.slug)
        setCategory(art.category)
        setCategoryEn(art.category_en || '')
        setParagraphs(art.paragraphs || [])
        setParagraphsEn(art.paragraphs_en || [])
        setFeaturedImage(art.featured_image || '')
        setAuthor(art.author || 'Güldeste Altay')
        setAuthorEn(art.author_en || 'Güldeste Altay')
        setSourceName(art.source_name || '')
        setSourceNameEn(art.source_name_en || '')
        setIsPublished(art.is_published)
        setUrl(art.url || '')

        if (art.date) {
          // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
          const dateObj = new Date(art.date)
          const tzOffset = dateObj.getTimezoneOffset() * 60000
          const localISOTime = new Date(dateObj.getTime() - tzOffset).toISOString().slice(0, 16)
          setDate(localISOTime)
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Makale yüklenirken bir hata oluştu.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id, isNew])

  // Handle title changes to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    if (isNew) {
      setSlug(slugify(value))
    }
  }

  // Handle file uploads
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setErrorMsg(null)

    try {
      const publicUrl = await uploadImage(file)
      setFeaturedImage(publicUrl)
    } catch (err: any) {
      setErrorMsg(`Resim yüklenirken hata oluştu: ${err.message}. Lütfen Supabase'de 'article-images' depolama (storage) alanını public olarak açtığınızdan emin olun.`)
    } finally {
      setUploading(false)
    }
  }

  // Save changes
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrorMsg(null)

    if (!title.trim()) {
      setErrorMsg('Başlık alanı zorunludur.')
      setSaving(false)
      return
    }

    if (!slug.trim()) {
      setErrorMsg('Slug/URL alanı zorunludur.')
      setSaving(false)
      return
    }

    const payload: Omit<Article, 'id' | 'created_at' | 'updated_at'> = {
      title,
      title_en: titleEn.trim() || null,
      slug: slug.trim(),
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      url: url.trim() || null,
      category,
      category_en: categoryEn.trim() || null,
      paragraphs,
      paragraphs_en: paragraphsEn.length > 0 ? paragraphsEn : null,
      images: [featuredImage].filter(Boolean),
      videos: [],
      featured_image: featuredImage.trim() || null,
      author: author.trim() || null,
      author_en: authorEn.trim() || null,
      source_name: sourceName.trim() || null,
      source_name_en: sourceNameEn.trim() || null,
      is_published: isPublished
    }

    try {
      if (isNew) {
        await createArticle(payload)
      } else {
        await updateArticle(Number(id), payload)
      }
      navigate('/')
    } catch (err: any) {
      setErrorMsg(err.message || 'Kaydetme işlemi sırasında hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <Loader className="animate-spin" size={36} style={{ margin: '0 auto 16px auto', animation: 'spin 1.5s linear infinite' }} />
        <p style={{ color: 'var(--text)' }}>Makale detayları yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="admin-container">
      {/* Top navbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <Link to="/" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Geri Dön
        </Link>
        <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
          {saving ? (
            <>
              <Loader size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Kaydediliyor...
            </>
          ) : (
            <>
              <Save size={16} /> {isNew ? 'Yayınla / Kaydet' : 'Değişiklikleri Kaydet'}
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          color: 'rgb(239, 68, 68)',
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          marginBottom: '32px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="editor-layout">
        {/* Main Editor Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Title input card */}
          <div className="sidebar-panel">
            <div className="form-group">
              <label className="form-label" htmlFor="title-tr">Başlık (Türkçe)</label>
              <input
                id="title-tr"
                type="text"
                className="form-input"
                style={{ fontSize: '20px', fontWeight: 600 }}
                placeholder="Makale başlığı girin..."
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="title-en">Başlık (İngilizce - İsteğe Bağlı)</label>
              <input
                id="title-en"
                type="text"
                className="form-input"
                placeholder="Enter english title..."
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>
          </div>

          {/* Tiptap content editors */}
          <div className="editor-main">
            <div className="editor-tabs">
              <button
                type="button"
                className={`editor-tab ${activeTab === 'tr' ? 'active' : ''}`}
                onClick={() => setActiveTab('tr')}
              >
                Türkçe İçerik ({paragraphs.length} Paragraf)
              </button>
              <button
                type="button"
                className={`editor-tab ${activeTab === 'en' ? 'active' : ''}`}
                onClick={() => setActiveTab('en')}
              >
                İngilizce İçerik ({paragraphsEn.length} Paragraf)
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {activeTab === 'tr' ? (
                <TiptapEditor
                  paragraphs={paragraphs}
                  onChange={setParagraphs}
                  placeholder="Türkçe makale içeriğinizi buraya yazın..."
                />
              ) : (
                <TiptapEditor
                  paragraphs={paragraphsEn}
                  onChange={setParagraphsEn}
                  placeholder="Write english article content here..."
                />
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Settings Panel */}
        <div className="editor-sidebar">
          {/* Publishing state */}
          <div className="sidebar-panel">
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-h)' }}>Yayınlama</h3>
            <div className="switch-container">
              <span style={{ fontSize: '14px', color: 'var(--text-h)' }}>Yayınla</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="slug">Slug / URL</label>
              <input
                id="slug"
                type="text"
                className="form-input"
                placeholder="makale-slug-adresi"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="date">Yayın Tarihi</label>
              <input
                id="date"
                type="datetime-local"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Categorization & Author */}
          <div className="sidebar-panel">
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-h)' }}>Kategoriler ve Yazar</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="category">Kategori (TR)</label>
                <input
                  id="category"
                  type="text"
                  className="form-input"
                  placeholder="Sağlık"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="category-en">Kategori (EN)</label>
                <input
                  id="category-en"
                  type="text"
                  className="form-input"
                  placeholder="Health"
                  value={categoryEn}
                  onChange={(e) => setCategoryEn(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="author">Yazar (TR)</label>
                <input
                  id="author"
                  type="text"
                  className="form-input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author-en">Yazar (EN)</label>
                <input
                  id="author-en"
                  type="text"
                  className="form-input"
                  value={authorEn}
                  onChange={(e) => setAuthorEn(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="sidebar-panel">
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-h)' }}>Öne Çıkan Görsel</h3>
            
            {featuredImage ? (
              <div className="preview-container">
                <img src={featuredImage} alt="Öne çıkan görsel" className="image-preview" />
                <button
                  type="button"
                  className="btn-remove-preview"
                  onClick={() => setFeaturedImage('')}
                  title="Resmi kaldır"
                >
                  &times;
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="image-upload-zone">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Loader className="animate-spin" size={20} style={{ animation: 'spin 1.5s linear infinite' }} />
                      <span style={{ fontSize: '13px', color: 'var(--text)' }}>Yükleniyor...</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Upload size={20} style={{ color: 'var(--text)' }} />
                      <span style={{ fontSize: '13px', color: 'var(--text)' }}>Görsel Yüklemek İçin Tıklayın</span>
                    </div>
                  )}
                </label>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="img-url">Veya Görsel URL'si</label>
              <input
                id="img-url"
                type="text"
                className="form-input"
                placeholder="https://..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
              />
            </div>
          </div>

          {/* Sources and external links */}
          <div className="sidebar-panel">
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-h)' }}>Dış Bağlantılar</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="ext-url">Yönlendirme URL'si (İsteğe Bağlı)</label>
              <input
                id="ext-url"
                type="text"
                className="form-input"
                placeholder="https://original-source-link.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="source">Kaynak Adı (TR)</label>
                <input
                  id="source"
                  type="text"
                  className="form-input"
                  placeholder="BBC Türkçe"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="source-en">Kaynak Adı (EN)</label>
                <input
                  id="source-en"
                  type="text"
                  className="form-input"
                  placeholder="BBC English"
                  value={sourceNameEn}
                  onChange={(e) => setSourceNameEn(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Keyframe animation for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getArticles, deleteArticle, updateArticle, type Article } from '../lib/articles'
import { Search, Plus, Trash2, Edit, ExternalLink, RefreshCw } from 'lucide-react'

export function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const fetchArticlesList = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const data = await getArticles()
      setArticles(data)
    } catch (err: any) {
      setErrorMsg(err.message || 'Makaleler yüklenirken hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticlesList()
  }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`"${title}" başlıklı makaleyi silmek istediğinize emin misiniz?`)) {
      return
    }

    try {
      await deleteArticle(id)
      setArticles(articles.filter(a => a.id !== id))
    } catch (err: any) {
      alert(err.message || 'Makale silinirken hata oluştu.')
    }
  }

  const handleTogglePublish = async (article: Article) => {
    if (!article.id) return
    const originalStatus = article.is_published

    // Optimistically update
    setArticles(articles.map(a => a.id === article.id ? { ...a, is_published: !originalStatus } : a))

    try {
      await updateArticle(article.id, { is_published: !originalStatus })
    } catch (err: any) {
      // Revert if error
      setArticles(articles.map(a => a.id === article.id ? { ...a, is_published: originalStatus } : a))
      alert(err.message || 'Yayın durumu güncellenirken hata oluştu.')
    }
  }

  // Get unique list of categories for filtering
  const categories = ['All', ...new Set(articles.map(a => a.category).filter(Boolean))]

  const filteredArticles = articles.filter(art => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.title_en && art.title_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === 'All' || art.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="admin-container">
      <div className="articles-header">
        <div>
          <h1 style={{ fontSize: '32px', margin: 0, fontWeight: '700', color: 'var(--text-h)' }}>İçerik Yönetimi</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text)' }}>Blog makalelerini ekleyin, düzenleyin ve yayınlayın.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={fetchArticlesList} className="btn btn-secondary" style={{ padding: '12px' }} title="Yenile">
            <RefreshCw size={18} />
          </button>
          <Link to="/edit/new" className="btn btn-primary">
            <Plus size={18} /> Yeni Makale Ekle
          </Link>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="glass-panel" style={{
        padding: '20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        marginBottom: '24px',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '44px' }}
            placeholder="Makale başlığı, kategori veya kısa url ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-h)' }}>Kategori:</span>
          <select
            className="form-input"
            style={{ width: 'auto', padding: '8px 16px', height: '42px' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'Tümü' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      {errorMsg && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          color: 'rgb(239, 68, 68)',
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          marginBottom: '24px'
        }}>
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text)' }}>
          <RefreshCw className="animate-spin" size={32} style={{ margin: '0 auto 16px auto', animation: 'spin 1.5s linear infinite' }} />
          <span>Yükleniyor...</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 24px',
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)'
        }}>
          <p style={{ color: 'var(--text)', fontSize: '16px', margin: 0 }}>
            {searchQuery || categoryFilter !== 'All' ? 'Aradığınız kriterlere uygun makale bulunamadı.' : 'Henüz makale eklenmemiş.'}
          </p>
        </div>
      ) : (
        <div className="articles-grid">
          {filteredArticles.map(art => (
            <div key={art.id} className="article-card">
              <div className="article-info">
                <div className="article-title-row">
                  <Link to={`/edit/${art.id}`} className="article-title">
                    {art.title}
                  </Link>
                  {art.title_en && (
                    <span style={{ fontSize: '13px', color: 'var(--text)', fontStyle: 'italic' }}>
                      ({art.title_en})
                    </span>
                  )}
                  <span className="badge badge-category">{art.category}</span>
                  <span className={`badge ${art.is_published ? 'badge-published' : 'badge-draft'}`}>
                    {art.is_published ? 'Yayında' : 'Taslak'}
                  </span>
                </div>
                
                <div className="article-meta">
                  <span>ID: {art.id}</span>
                  <span>•</span>
                  <span>Tarih: {formatDate(art.date)}</span>
                  {art.author && (
                    <>
                      <span>•</span>
                      <span>Yazar: {art.author}</span>
                    </>
                  )}
                  {art.slug && (
                    <>
                      <span>•</span>
                      <span>Slug: <code>{art.slug}</code></span>
                    </>
                  )}
                </div>
              </div>

              <div className="article-actions">
                <button
                  onClick={() => handleTogglePublish(art)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  title={art.is_published ? 'Taslağa Çek' : 'Yayınla'}
                >
                  {art.is_published ? 'Taslağa Al' : 'Yayınla'}
                </button>

                <Link
                  to={`/edit/${art.id}`}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px' }}
                  title="Düzenle"
                >
                  <Edit size={16} />
                </Link>

                {/* Direct link to public site */}
                <a
                  href={`/#/article/${art.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px' }}
                  title="Sitede Görüntüle"
                >
                  <ExternalLink size={16} />
                </a>

                <button
                  onClick={() => art.id && handleDelete(art.id, art.title)}
                  className="btn btn-danger"
                  style={{ padding: '8px 12px' }}
                  title="Sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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

import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { LoginPage } from './pages/LoginPage'
import { ArticleListPage } from './pages/ArticleListPage'
import { ArticleEditorPage } from './pages/ArticleEditorPage'
import { LogOut, BookOpen, Loader } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setCheckingAuth(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setCheckingAuth(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    if (window.confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      await supabase.auth.signOut()
    }
  }

  if (checkingAuth) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', color: 'var(--text)' }}>
          <Loader size={36} className="animate-spin" style={{ margin: '0 auto 16px auto', animation: 'spin 1.5s linear infinite' }} />
          <p>Yönetici oturumu kontrol ediliyor...</p>
        </div>
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

  if (!session) {
    return <LoginPage onLoginSuccess={() => supabase.auth.getSession().then(({ data: { session } }) => setSession(session))} />
  }

  return (
    <HashRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
        {/* Navbar */}
        <nav className="admin-navbar">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              <BookOpen size={20} style={{ color: 'var(--accent)' }} />
              <span>Güldeste Altay Blog Panel</span>
            </Link>
            
            <div className="navbar-user">
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>{session.user.email}</span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <LogOut size={14} /> Çıkış Yap
              </button>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<ArticleListPage />} />
            <Route path="/edit/:id" element={<ArticleEditorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App

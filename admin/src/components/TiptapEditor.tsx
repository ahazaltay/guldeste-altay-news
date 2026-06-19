import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useRef } from 'react'
import {
  Bold, Italic, Link as LinkIcon, Image as ImageIcon,
  Heading1, Heading2, List, ListOrdered, Undo, Redo, Quote
} from 'lucide-react'

interface TiptapEditorProps {
  paragraphs: string[]
  onChange: (paragraphs: string[]) => void
  placeholder?: string
}

export function TiptapEditor({ paragraphs, onChange, placeholder = 'İçeriği buraya yazın...' }: TiptapEditorProps) {
  // Convert paragraphs array to single HTML string for Tiptap initialization
  const initialHtml = paragraphs && paragraphs.length > 0
    ? paragraphs.map(p => `<p>${p}</p>`).join('')
    : '<p></p>'

  const isUpdatingRef = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'article-link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'article-image',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      isUpdatingRef.current = true
      const html = editor.getHTML()
      
      // Parse the HTML back to an array of paragraphs (inner HTML of block elements)
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      const newParagraphs = Array.from(doc.body.children).map(child => {
        // If it's a paragraph, return its innerHTML.
        // For other block tags, we can either return innerHTML or the tag itself.
        // In app.js, all items are wrapped in <p>, so we can keep the innerHTML.
        // If they used formatting like list or header, let's keep the innerHTML or full tag.
        // Let's extract the innerHTML.
        return child.innerHTML
      })

      onChange(newParagraphs)
      isUpdatingRef.current = false
    },
  })

  // Sync paragraphs from props if they change externally (e.g. switching articles/tabs)
  useEffect(() => {
    if (!editor) return

    const currentHtml = editor.getHTML()
    if (currentHtml === initialHtml || isUpdatingRef.current) return

    editor.commands.setContent(initialHtml, { emitUpdate: false })
  }, [paragraphs, editor, initialHtml])

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL Girin:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addImage = () => {
    const url = window.prompt('Görsel URL Girin:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="tiptap-editor-container" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      {/* Mini toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        alignItems: 'center'
      }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('bold') ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="Kalın"
        >
          <Bold size={16} color={editor.isActive('bold') ? 'var(--accent)' : 'currentColor'} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('italic') ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="İtalik"
        >
          <Italic size={16} color={editor.isActive('italic') ? 'var(--accent)' : 'currentColor'} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('heading', { level: 2 }) ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="Başlık 2"
        >
          <Heading1 size={16} color={editor.isActive('heading', { level: 2 }) ? 'var(--accent)' : 'currentColor'} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('heading', { level: 3 }) ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="Başlık 3"
        >
          <Heading2 size={16} color={editor.isActive('heading', { level: 3 }) ? 'var(--accent)' : 'currentColor'} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('bulletList') ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="Sırasız Liste"
        >
          <List size={16} color={editor.isActive('bulletList') ? 'var(--accent)' : 'currentColor'} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('orderedList') ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="Sıralı Liste"
        >
          <ListOrdered size={16} color={editor.isActive('orderedList') ? 'var(--accent)' : 'currentColor'} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('blockquote') ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="Alıntı"
        >
          <Quote size={16} color={editor.isActive('blockquote') ? 'var(--accent)' : 'currentColor'} />
        </button>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }} />

        <button
          type="button"
          onClick={setLink}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', background: editor.isActive('link') ? 'var(--accent-bg)' : 'transparent', border: 'none' }}
          title="Bağlantı Ekle"
        >
          <LinkIcon size={16} color={editor.isActive('link') ? 'var(--accent)' : 'currentColor'} />
        </button>

        <button
          type="button"
          onClick={addImage}
          className={`btn btn-secondary`}
          style={{ padding: '6px 10px', border: 'none', background: 'transparent' }}
          title="Görsel Ekle"
        >
          <ImageIcon size={16} />
        </button>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }} />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="btn btn-secondary"
          style={{ padding: '6px 10px', border: 'none', background: 'transparent' }}
          title="Geri Al"
        >
          <Undo size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="btn btn-secondary"
          style={{ padding: '6px 10px', border: 'none', background: 'transparent' }}
          title="Yinele"
        >
          <Redo size={16} />
        </button>
      </div>

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu editor={editor} style={{
          display: 'flex',
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          boxShadow: 'var(--shadow-md)',
          padding: '4px',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            style={{ padding: '4px 8px', background: editor.isActive('bold') ? 'var(--accent-bg)' : 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <Bold size={14} color={editor.isActive('bold') ? 'var(--accent)' : 'currentColor'} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            style={{ padding: '4px 8px', background: editor.isActive('italic') ? 'var(--accent-bg)' : 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <Italic size={14} color={editor.isActive('italic') ? 'var(--accent)' : 'currentColor'} />
          </button>
          <button
            type="button"
            onClick={setLink}
            style={{ padding: '4px 8px', background: editor.isActive('link') ? 'var(--accent-bg)' : 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <LinkIcon size={14} color={editor.isActive('link') ? 'var(--accent)' : 'currentColor'} />
          </button>
        </BubbleMenu>
      )}

      {/* Editor Content Area */}
      <div className="tiptap-editor-content" style={{ padding: '16px', background: 'var(--paper)', minHeight: '300px' }}>
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .tiptap {
          outline: none;
          min-height: 300px;
          font-family: var(--serif);
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-h);
        }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--text);
          opacity: 0.5;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        .tiptap p {
          margin: 0 0 1em 0;
        }
        .tiptap p:last-child {
          margin-bottom: 0;
        }
        .tiptap h2 {
          font-size: 1.4em;
          margin-top: 1.2em;
          margin-bottom: 0.6em;
          font-weight: 600;
        }
        .tiptap h3 {
          font-size: 1.2em;
          margin-top: 1.2em;
          margin-bottom: 0.6em;
          font-weight: 600;
        }
        .tiptap blockquote {
          border-left: 3px solid var(--accent);
          padding-left: 12px;
          margin: 1em 0;
          font-style: italic;
          color: var(--text);
        }
        .tiptap ul, .tiptap ol {
          padding-left: 20px;
          margin: 0.5em 0;
        }
        .tiptap li {
          margin: 0.2em 0;
        }
        .tiptap img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 1em 0;
        }
        .article-link {
          color: var(--accent);
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

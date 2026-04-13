'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Upload, X, ArrowLeft, ImageIcon, LogOut, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_logged_in') === 'true'
    }
    return false
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hasFetchedPhotos = useRef(false)

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/photos')
      const data = await res.json()
      if (data.photos) setPhotos(data.photos)
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  useEffect(() => {
    if (isLoggedIn && !hasFetchedPhotos.current) {
      hasFetchedPhotos.current = true
      fetch('/api/photos')
        .then(res => res.json())
        .then(data => { if (data.photos) setPhotos(data.photos) })
        .catch(() => {})
    }
  }, [isLoggedIn])

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 4000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '😘') {
      setIsLoggedIn(true)
      sessionStorage.setItem('admin_logged_in', 'true')
      setError('')
    } else {
      setError('Wrong password!')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('admin_logged_in')
    setPassword('')
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    showStatus('success', `Uploading ${files.length} photo${files.length > 1 ? 's' : ''}...`)

    const formData = new FormData()
    Array.from(files).forEach(file => formData.append('photos', file))

    try {
      const res = await fetch('/api/photos', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        showStatus('error', data.error || 'Upload failed')
      } else {
        if (data.photos) setPhotos(data.photos)
        showStatus('success', `${files.length} photo${files.length > 1 ? 's' : ''} uploaded!`)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      showStatus('error', msg)
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (photoUrl: string) => {
    try {
      const res = await fetch('/api/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl }),
      })
      const data = await res.json()
      if (data.photos) setPhotos(data.photos)
      showStatus('success', 'Photo deleted')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Delete failed'
      showStatus('error', msg)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fdf2f8] flex flex-col items-center justify-center p-4">
      {/* Status Toast */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg ${
              statusMsg.type === 'success'
                ? 'bg-green-900/80 border border-green-500/30 text-green-200'
                : 'bg-red-900/80 border border-red-500/30 text-red-200'
            }`}
          >
            {statusMsg.type === 'success'
              ? <CheckCircle className="w-4 h-4" />
              : <AlertCircle className="w-4 h-4" />}
            <span className="text-sm">{statusMsg.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          /* ───── Login Screen ───── */
          <motion.div key="login" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-sm">
            <div className="glass rounded-3xl p-8 text-center" style={{
              background: 'rgba(20, 10, 15, 0.8)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(236, 72, 153, 0.15)',
            }}>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6">
                <Heart className="w-12 h-12 text-pink-500 mx-auto fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
              </motion.div>
              <h1 className="text-2xl font-bold text-pink-300 mb-2">Admin Access</h1>
              <p className="text-pink-400/40 text-sm mb-8">This page is private</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="password" value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="Enter password..." autoFocus
                  className="w-full bg-black/40 border border-pink-500/20 rounded-xl px-4 py-3 text-pink-200 text-center text-lg placeholder:text-pink-400/30 focus:outline-none focus:border-pink-500/50 transition-colors" />
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400/70 text-sm">{error}</motion.p>
                )}
                <button type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 text-white font-medium hover:from-pink-500 hover:to-rose-400 transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                  Enter
                </button>
              </form>
              <a href="/" className="inline-flex items-center gap-2 text-pink-400/40 text-sm mt-6 hover:text-pink-300 transition-colors">
                <ArrowLeft className="w-4 h-4" />Back to site
              </a>
            </div>
          </motion.div>
        ) : (
          /* ───── Admin Panel ───── */
          <motion.div key="admin" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <a href="/" className="w-10 h-10 rounded-full flex items-center justify-center text-pink-400 hover:text-pink-200 hover:bg-pink-500/10 transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </a>
                <div>
                  <h1 className="text-xl font-bold text-pink-300">Photo Manager</h1>
                  <p className="text-pink-400/40 text-xs">Upload & manage Aditi&apos;s photos</p>
                </div>
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-pink-400/60 hover:text-pink-300 hover:bg-pink-500/10 transition-all text-sm">
                <LogOut className="w-4 h-4" />Logout
              </button>
            </div>

            {/* Upload Area */}
            <div className="glass rounded-2xl p-6 mb-8" style={{
              background: 'rgba(20, 10, 15, 0.6)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(236, 72, 153, 0.15)',
            }}>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                className="w-full py-8 rounded-xl border-2 border-dashed border-pink-500/20 hover:border-pink-500/40 flex flex-col items-center gap-3 text-pink-400/60 hover:text-pink-300 transition-all disabled:opacity-50 cursor-pointer">
                <Upload className="w-8 h-8" />
                <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Click to upload photos'}</span>
                <span className="text-xs text-pink-400/30">Supports JPG, PNG, WebP • Max 20MB</span>
              </button>
            </div>

            {/* Photo Grid */}
            {photos.length > 0 ? (
              <>
                <p className="text-pink-400/40 text-sm mb-4">{photos.length} photo{photos.length > 1 ? 's' : ''}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo, i) => (
                    <motion.div key={photo} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl overflow-hidden group relative" style={{
                        background: 'rgba(20, 10, 15, 0.6)', border: '1px solid rgba(236, 72, 153, 0.15)',
                      }}>
                      <div className="aspect-square overflow-hidden">
                        <img src={photo} alt={`Aditi ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <button onClick={() => handleDelete(photo)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-pink-300 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="glass rounded-2xl p-12 text-center" style={{
                background: 'rgba(20, 10, 15, 0.6)', border: '1px solid rgba(236, 72, 153, 0.15)',
              }}>
                <ImageIcon className="w-12 h-12 text-pink-400/30 mx-auto mb-4" />
                <p className="text-pink-300/50 text-sm">No photos yet</p>
                <p className="text-pink-400/30 text-xs mt-2">Upload photos to see them here</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

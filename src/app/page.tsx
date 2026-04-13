'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Star, Sparkles, Mail, Clock, ArrowDown, Music, ChevronRight, MapPin, Image as ImageIcon, X, Globe } from 'lucide-react'

/* ─────────── Floating Hearts Background ─────────── */
function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, left: Math.random() * 100, size: Math.random() * 16 + 8,
    duration: Math.random() * 10 + 8, delay: Math.random() * 10,
  })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div key={h.id} className="absolute animate-float-up text-pink-500/20"
          style={{ left: `${h.left}%`, fontSize: `${h.size}px`, animationDuration: `${h.duration}s`, animationDelay: `${h.delay}s` }}>♥</div>
      ))}
    </div>
  )
}

/* ─────────── Sparkle Particles ─────────── */
function SparkleParticles() {
  const sparkles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    delay: Math.random() * 4, size: Math.random() * 4 + 2,
  })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparkles.map((s) => (
        <div key={s.id} className="absolute rounded-full bg-pink-300/40 animate-sparkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.size}px`, height: `${s.size}px`, animationDelay: `${s.delay}s` }} />
      ))}
    </div>
  )
}

/* ─────────── Animated Section Wrapper ─────────── */
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

/* ─────────── Gradient Text Helper ─────────── */
function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={className} style={{
      background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    }}>{children}</span>
  )
}

/* ─────────── Hero Section ─────────── */
function HeroSection() {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 1500)
    const t2 = setTimeout(() => setShowButton(true), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <img src="/hero-image.png" alt="Romantic sunset" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }} className="mb-8">
          <Heart className="w-20 h-20 md:w-28 md:h-28 text-pink-500 mx-auto animate-heartbeat fill-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #f472b6, #fb7185, #f9a8d4, #ec4899)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 4s ease infinite, pulse-glow 2s ease-in-out infinite',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>For My Beloved</motion.h1>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-5xl md:text-8xl lg:text-9xl font-extrabold mb-8"
          style={{
            background: 'linear-gradient(135deg, #fdf2f8, #f9a8d4, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Aditi</motion.h2>

        <AnimatePresence>
          {showSubtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg md:text-2xl text-pink-200/80 mb-4 italic font-light">
              &ldquo;You are the reason I believe in love&rdquo;
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showSubtitle && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-sm md:text-base text-pink-300/50 mb-12">
              Every pixel of this website is filled with my love for you
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showButton && (
            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => document.getElementById('confession')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-lg font-medium hover:from-pink-500 hover:to-rose-400 transition-all duration-300 shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)]">
              Our Love Story
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2">
          <span className="text-pink-400/50 text-xs tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-pink-400/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────── The Confession Section ─────────── */
function ConfessionSection() {
  return (
    <section id="confession" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Clock className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300/70 text-sm">13 January 2026, 12:21 AM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>The Night I Confessed</GradientText></h2>
          <p className="text-pink-300/60 text-lg max-w-2xl mx-auto">
            The night that changed everything — when I finally gathered the courage to tell you how I feel
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-10 max-w-3xl mx-auto mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-sm font-bold">S</div>
              <div>
                <p className="text-pink-200 font-medium">Hubby 🤝❤️</p>
                <p className="text-pink-400/40 text-xs">01/13/2026 12:21 AM</p>
              </div>
            </div>
            <div className="glass-light rounded-2xl p-6 mb-6">
              <p className="text-pink-200/90 text-base md:text-lg leading-relaxed mb-4">
                Ab tum mere liye kya sochti ho — tum meri sister ho ya close friend ya GF? Mere clarification ke liye hai, sach select kar lena.
              </p>
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden p-4 glass-light">
                  <div className="relative flex justify-between items-center">
                    <span className="text-pink-300/60">Sister</span>
                    <span className="text-pink-400/40 text-sm">0% (0 votes)</span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden p-4 glass-light">
                  <div className="relative flex justify-between items-center">
                    <span className="text-pink-300/70">Close Friend</span>
                    <span className="text-pink-400/40 text-sm">50% (1 vote)</span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden p-4 bg-gradient-to-r from-pink-500/20 to-rose-500/10 border border-pink-500/30">
                  <div className="relative flex justify-between items-center">
                    <span className="text-pink-200 font-medium">GF ❤️</span>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-300 text-sm">50% (1 vote)</span>
                      <span className="text-green-400 text-lg">✓</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-pink-400/30 text-xs mt-4 text-center">2 votes • Poll closed</p>
            </div>
            <div className="text-center">
              <p className="text-pink-300/50 text-sm italic">That poll was my way of confessing — and you chose &ldquo;GF&rdquo; 💕</p>
            </div>
          </div>
        </AnimatedSection>


      </div>
    </section>
  )
}

/* ─────────── The Acceptance Section ─────────── */
function AcceptanceSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 z-0">
        <img src="/roses.png" alt="" className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 object-cover opacity-10" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span className="text-pink-300/70 text-sm">13 January 2026, 1:17 AM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>And She Said Yes</GradientText></h2>
          <p className="text-pink-300/60 text-lg max-w-2xl mx-auto">
            The most beautiful message I have ever received — the moment my world became complete
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-4 right-4 text-pink-500/10 text-6xl">💕</div>
            <div className="absolute bottom-4 left-4 text-pink-500/10 text-4xl">💗</div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-lg font-bold shadow-[0_0_20px_rgba(236,72,153,0.4)]">A</div>
              <div>
                <p className="text-pink-200 font-semibold text-lg">🌸Aditi🌸</p>
                <p className="text-pink-400/40 text-xs">01/13/2026 1:17 AM</p>
              </div>
            </div>
            <div className="glass-light rounded-2xl p-6 md:p-8 relative">
              <p className="text-pink-100/90 text-base md:text-xl leading-relaxed md:leading-loose italic">
                &ldquo;Mene Socha ye kyuki me jese baat krti hu mujhe as a sis type Kuch ni lgta ND hm me gf bnna chahugi agr hoske to in future Shaadi v krna chahugi agr na huyi to uske baadh single whole life uske baadh koi ni chahiye🙂&rdquo;
              </p>
            </div>
            <div className="mt-8 text-center">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="inline-block">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mx-auto" />
              </motion.div>
              <p className="text-pink-300/60 text-sm mt-3">She didn&apos;t just accept me — she promised forever</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────── Chat Memories - Lovely Themed Bubbles ─────────── */
function ChatSlideshowSection() {
  const chatMessages = [
    { sender: 'Hubby', text: 'Hey... I wanna tell you something 🫣', time: '3:42 AM' },
    { sender: 'Aditi', text: 'Haan batao? 🤔', time: '3:42 AM' },
    { sender: 'Hubby', text: 'Tum meri zindagi mein itni khaas ho... I can\'t imagine my life without you 💕', time: '3:43 AM' },
    { sender: 'Hubby', text: '😘', time: '3:43 AM' },
    { sender: 'Aditi', text: '😂😂😂', time: '3:44 AM' },
    { sender: 'Hubby', text: '🤫❤️', time: '3:44 AM' },
    { sender: 'Aditi', text: 'Hmm 🤭😊', time: '3:44 AM' },
    { sender: 'Hubby', text: 'I love you so much Aditi 🤍❤️', time: '3:45 AM' },
    { sender: 'Aditi', text: 'Aww 🥺💕', time: '3:45 AM' },
  ]

  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  // Auto-reveal messages one by one
  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const revealNext = (index: number) => {
      if (index >= chatMessages.length) return

      // Show typing indicator before message
      setIsTyping(true)
      const typingDelay = 800 + Math.random() * 600

      setTimeout(() => {
        setIsTyping(false)
        setVisibleCount(index + 1)

        // Schedule next message
        const nextDelay = 1200 + Math.random() * 800
        setTimeout(() => revealNext(index + 1), nextDelay)
      }, typingDelay)
    }

    const startDelay = setTimeout(() => revealNext(0), 1500)
    return () => clearTimeout(startDelay)
  }, [chatMessages.length])

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleCount, isTyping])

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>Our Chat Memories</GradientText></h2>
          <p className="text-pink-300/60 text-lg">Every message is a treasure I hold close to my heart</p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass rounded-3xl overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 md:p-5 border-b border-pink-500/10 bg-gradient-to-r from-pink-500/5 to-rose-500/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.3)]">A</div>
              <div>
                <p className="text-pink-200 font-medium text-sm">🌸Aditi🌸</p>
                <p className="text-pink-400/30 text-[10px]">Online • 13 Jan 2026</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400/60 animate-pulse" />
                <span className="text-green-400/50 text-[10px]">connected</span>
              </div>
            </div>

            {/* Chat messages area */}
            <div className="p-4 md:p-6 space-y-3 max-h-[500px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {/* Date divider */}
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-pink-500/10" />
                <span className="text-pink-400/30 text-[10px] px-2">13 January 2026</span>
                <div className="flex-1 h-px bg-pink-500/10" />
              </div>

              {chatMessages.slice(0, visibleCount).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`flex ${msg.sender === 'Hubby' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.sender === 'Hubby' ? 'order-2' : 'order-1'}`}>
                    {msg.sender === 'Aditi' && (
                      <div className="flex items-center gap-2 mb-1 ml-1">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-[8px] font-bold">A</div>
                        <span className="text-pink-400/30 text-[10px]">Aditi</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 md:px-5 md:py-3 ${
                        msg.sender === 'Hubby'
                          ? 'bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/20 rounded-br-sm'
                          : 'bg-gradient-to-br from-white/5 to-pink-500/5 border border-pink-500/10 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-pink-100/90 text-sm md:text-base leading-relaxed">{msg.text}</p>
                    </div>
                    <p className={`text-pink-400/20 text-[10px] mt-1 ${msg.sender === 'Hubby' ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-2xl rounded-bl-sm px-4 py-3 bg-gradient-to-br from-white/5 to-pink-500/5 border border-pink-500/10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-pink-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-pink-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-pink-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={chatEndRef} />
            </div>

            {/* Chat input bar (decorative) */}
            <div className="p-3 md:p-4 border-t border-pink-500/10 bg-gradient-to-r from-pink-500/3 to-rose-500/3">
              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-full bg-black/30 border border-pink-500/10 px-4 py-2.5 text-pink-400/20 text-sm">
                  Type a message...
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-pink-400/30 text-xs italic">Our first late night conversations — the beginning of forever 💕</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────── Nepal-India Distance Section ─────────── */
function DistanceSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/garden.png" alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>Miles Apart, Close at Heart</GradientText></h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-1 text-pink-300/60"><MapPin className="w-4 h-4" /><span className="text-sm">India</span></div>
            <div className="w-16 h-px bg-gradient-to-r from-pink-500/50 to-pink-500/50" />
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-heartbeat" />
            <div className="w-16 h-px bg-gradient-to-r from-pink-500/50 to-pink-500/50" />
            <div className="flex items-center gap-1 text-pink-300/60"><MapPin className="w-4 h-4" /><span className="text-sm">Nepal</span></div>
          </div>
        </AnimatedSection>

        {/* Lovely Themed SVG Map */}
        <AnimatedSection delay={0.1}>
          <div className="glass rounded-3xl p-6 md:p-8 mb-10 max-w-3xl mx-auto">
            <div className="relative w-full aspect-[16/10]">
              <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f472b6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#be185d" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="nepalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#e11d48" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="bigGlow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background glow */}
                <rect width="800" height="500" fill="url(#mapGlow)" />

                {/* India shape (simplified) */}
                <path d="M 150 200 Q 180 160, 250 170 Q 320 140, 380 180 Q 420 200, 450 250 Q 470 300, 440 350 Q 400 390, 350 380 Q 300 370, 250 350 Q 200 330, 170 290 Q 140 250, 150 200 Z"
                  fill="url(#indiaGrad)" stroke="#ec4899" strokeWidth="1" strokeOpacity="0.3" />

                {/* Nepal shape (simplified) */}
                <path d="M 420 80 Q 460 60, 520 70 Q 560 80, 570 120 Q 580 160, 540 170 Q 500 180, 460 170 Q 430 150, 420 120 Q 410 100, 420 80 Z"
                  fill="url(#nepalGrad)" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.3" />

                {/* Small decorative hearts scattered */}
                <text x="200" y="230" fontSize="10" fill="#ec4899" opacity="0.15">♥</text>
                <text x="300" y="280" fontSize="8" fill="#ec4899" opacity="0.12">♥</text>
                <text x="250" y="320" fontSize="12" fill="#f472b6" opacity="0.1">♥</text>
                <text x="480" y="110" fontSize="10" fill="#f43f5e" opacity="0.15">♥</text>
                <text x="510" y="140" fontSize="8" fill="#f43f5e" opacity="0.12">♥</text>
                <text x="530" y="100" fontSize="6" fill="#fb7185" opacity="0.1">♥</text>

                {/* Dashed love path from Rajasthan to Janakpur */}
                <path d="M 270 270 Q 350 220, 420 180 Q 460 155, 500 130"
                  fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="8 6" filter="url(#glow)">
                  <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Floating hearts along the path */}
                <text x="340" y="210" fontSize="14" filter="url(#glow)">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                  ♥
                </text>
                <text x="420" y="170" fontSize="16" filter="url(#glow)">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  ♥
                </text>

                {/* Rajasthan pin (India) */}
                <circle cx="270" cy="270" r="12" fill="#ec4899" opacity="0.3" filter="url(#bigGlow)">
                  <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="270" cy="270" r="6" fill="#ec4899" filter="url(#glow)" />
                <circle cx="270" cy="270" r="3" fill="#fdf2f8" />

                {/* Janakpur pin (Nepal) */}
                <circle cx="500" cy="130" r="12" fill="#f43f5e" opacity="0.3" filter="url(#bigGlow)">
                  <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" begin="1s" />
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle cx="500" cy="130" r="6" fill="#f43f5e" filter="url(#glow)" />
                <circle cx="500" cy="130" r="3" fill="#fdf2f8" />

                {/* Big heart in the middle of the path */}
                <text x="385" y="210" fontSize="28" fill="#ec4899" filter="url(#bigGlow)" textAnchor="middle">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                  ♥
                </text>

                {/* Labels */}
                <text x="270" y="300" textAnchor="middle" fontSize="13" fill="#f9a8d4" fontWeight="600">Me 🇮🇳</text>
                <text x="270" y="318" textAnchor="middle" fontSize="9" fill="#f9a8d4" opacity="0.5">Rajasthan</text>

                <text x="500" y="160" textAnchor="middle" fontSize="13" fill="#fb7185" fontWeight="600">Aditi 🇳🇵</text>
                <text x="500" y="178" textAnchor="middle" fontSize="9" fill="#fb7185" opacity="0.5">Janakpur</text>

                {/* Distance label */}
                <rect x="330" y="225" width="120" height="24" rx="12" fill="#ec4899" fillOpacity="0.15" stroke="#ec4899" strokeWidth="0.5" strokeOpacity="0.3" />
                <text x="390" y="241" textAnchor="middle" fontSize="10" fill="#f9a8d4">1,000+ km of love</text>

                {/* Country labels */}
                <text x="300" y="370" textAnchor="middle" fontSize="18" fill="#ec4899" opacity="0.2" fontWeight="700" letterSpacing="4">INDIA</text>
                <text x="490" y="85" textAnchor="middle" fontSize="14" fill="#f43f5e" opacity="0.2" fontWeight="700" letterSpacing="3">NEPAL</text>
              </svg>
            </div>

            {/* Bottom info bar */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div>
                <p className="text-pink-200 text-sm font-medium">My Heart → Her Heart</p>
                <p className="text-pink-400/40 text-xs">Rajasthan → Mata Janaki Temple, Janakpur</p>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-pink-400/60 text-xs"
              >
                ❤️ Connected by love
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center space-y-6">
            <Globe className="w-12 h-12 text-pink-400/50 mx-auto" />
            <p className="text-pink-200/80 text-lg md:text-xl leading-relaxed">
              Tum Nepal mein ho aur main India mein — par dil se hum hamesha saath hain. Tumse milne ki chahat har pal badhti hai, aur har raat sirf tumhe hi sochta hoon.
            </p>
            <p className="text-pink-200/70 text-base md:text-lg leading-relaxed">
              Tumhare bina rahna mushkil hai — tumhare bina har din adhoora lagta hai. Tumhari aawaz sunne ke bina din guzar jaata hai, aur tumhari muskaan ke bina raat nahi bharti.
            </p>
            <p className="text-pink-200/80 text-lg md:text-xl leading-relaxed font-medium">
              Tumhare bina main rah nahi sakta — tum meri zindagi ho, tum mera sab kuch ho. Jaldi milna hai tumse, bahut jaldi. 💕
            </p>
            <div className="pt-4">
              <p className="text-pink-400/40 text-sm italic">Distance means nothing when someone means everything</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="glass rounded-2xl p-6 text-center">
              <MapPin className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <h3 className="text-pink-300 font-semibold mb-2">She is in Nepal</h3>
              <p className="text-pink-200/50 text-sm">But she lives in my heart, always</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3 fill-pink-400" />
              <h3 className="text-pink-300 font-semibold mb-2">I am in India</h3>
              <p className="text-pink-200/50 text-sm">But my soul wanders to where she is</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────── Reasons I Love You ─────────── */
function ReasonsSection() {
  const reasons = [
    { emoji: '✨', title: 'Your Smile', desc: 'Your smile lights up my entire universe. Every time you smile, the world becomes a more beautiful place. It\'s the kind of smile that makes everything else fade away.' },
    { emoji: '💫', title: 'Your Strength', desc: 'The way you handle everything with such grace and courage inspires me every single day. You are the strongest person I know, and I admire you deeply.' },
    { emoji: '🌸', title: 'Your Kindness', desc: 'Your heart is made of pure gold. The way you care for everyone around you, the way you make people feel special — it\'s a gift that I\'m lucky to witness every day.' },
    { emoji: '🌙', title: 'Your Laughter', desc: 'Your laughter is my favorite melody. It\'s contagious, it\'s genuine, and it fills every room with warmth. I could listen to it forever and never get tired.' },
    { emoji: '🔥', title: 'Your Passion', desc: 'The fire in your eyes when you talk about things you love — that passion drives me crazy in the best way possible. You put your whole heart into everything you do.' },
    { emoji: '🦋', title: 'Your Soul', desc: 'Your soul is beautiful beyond words. The depth of your thoughts, the gentleness of your spirit — every layer of who you are makes me love you more.' },
  ]

  return (
    <section id="reasons" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>Why I Love You</GradientText></h2>
          <p className="text-pink-300/60 text-lg max-w-2xl mx-auto">
            A million reasons exist, but here are a few that make my heart skip a beat every time I think of you
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}
                className="glass rounded-2xl p-6 md:p-8 h-full group cursor-default">
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{reason.emoji}</div>
                <h3 className="text-xl font-semibold text-pink-300 mb-3 group-hover:text-pink-200 transition-colors">{reason.title}</h3>
                <p className="text-pink-200/60 leading-relaxed text-sm md:text-base">{reason.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Love Letter Section ─────────── */
function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/love-letter.png" alt="" className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 md:w-1/3 object-cover opacity-15" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>A Letter For You</GradientText></h2>
          <p className="text-pink-300/60 text-lg">Words from the deepest corner of my heart</p>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            {!isOpen ? (
              <motion.div className="text-center cursor-pointer" onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Mail className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-pink-300/80 text-lg mb-2">Tap to open my letter</p>
                <p className="text-pink-400/40 text-sm">Written with all my love</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="text-pink-200/80 leading-loose text-base md:text-lg space-y-4 italic">
                  <p>My Dearest Aditi,</p>
                  <p>There are moments in life when you meet someone and everything changes — the way you see the world, the way you feel about yourself, the way your heart beats. You are that someone for me. From the very first moment, you turned my ordinary days into extraordinary memories.</p>
                  <p>Every second spent with you feels like a beautiful dream I never want to wake up from. Your smile has the power to erase all my worries, your voice is the sweetest melody I&apos;ve ever heard, and your presence makes everything feel right in this world.</p>
                  <p>I want you to know that you are not just my love — you are my best friend, my soulmate, my everything. I fall in love with you a little more every single day, and I know that this love will only grow deeper with time.</p>
                  <p>Thank you for being you. Thank you for choosing us. Thank you for making my life the most beautiful story ever told.</p>
                  <p className="text-pink-300/90 font-medium not-italic text-right mt-8">
                    Forever & Always Yours,<br /><span className="text-pink-400">With All My Love</span>
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────── Gallery Section ─────────── */
function GallerySection() {
  const images = [
    { src: '/roses.png', title: 'Roses for You', desc: 'Because no flower is as beautiful as you' },
    { src: '/starry-heart.png', title: 'Written in Stars', desc: 'Our love story is written across the universe' },
    { src: '/garden.png', title: 'Our Garden', desc: 'Where every path leads to you' },
  ]

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>Our Beautiful World</GradientText></h2>
          <p className="text-pink-300/60 text-lg">Every image reminds me of you</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.2}>
              <motion.div whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}
                className="glass rounded-2xl overflow-hidden group cursor-default">
                <div className="relative overflow-hidden aspect-square">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-pink-200 mb-1">{img.title}</h3>
                    <p className="text-pink-300/60 text-sm">{img.desc}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Aditi Photos Section (NO admin on main page) ─────────── */
function AditiPhotosSection() {
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => { if (data.photos) setPhotos(data.photos) })
      .catch(() => {})
  }, [])

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>Aditi&apos;s Gallery</GradientText></h2>
          <p className="text-pink-300/60 text-lg">The most beautiful face in the world</p>
        </AnimatedSection>

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <AnimatedSection key={photo} delay={i * 0.05}>
                <motion.div whileHover={{ y: -5 }} className="glass rounded-xl overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <img src={photo} alt={`Aditi ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection>
            <div className="glass rounded-2xl p-12 text-center max-w-lg mx-auto">
              <ImageIcon className="w-12 h-12 text-pink-400/30 mx-auto mb-4" />
              <p className="text-pink-300/50 text-sm">Photos of Aditi will appear here soon</p>
              <p className="text-pink-400/20 text-xs mt-2">Coming soon... 💕</p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}

/* ─────────── Promise Section ─────────── */
function PromiseSection() {
  const promises = [
    'I promise to love you on your best days and your worst days.',
    'I promise to make you laugh even when you want to cry.',
    'I promise to be your biggest cheerleader and your safe place.',
    'I promise to choose you, every single day, for the rest of my life.',
    'I promise that my love for you will only grow with time.',
    'I promise to build a life with you that\'s worth remembering.',
    'I promise to come to Nepal and meet you, no matter what it takes.',
    'I promise to never let the distance weaken what we have.',
  ]

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>My Promises to You</GradientText></h2>
          <p className="text-pink-300/60 text-lg">Words I will live by, every single day</p>
        </AnimatedSection>
        <div className="space-y-4">
          {promises.map((promise, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div whileHover={{ x: 8 }}
                className="glass-light rounded-xl p-5 md:p-6 flex items-center gap-4 group cursor-default">
                <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 group-hover:fill-pink-500 transition-all duration-300" />
                <p className="text-pink-200/80 text-base md:text-lg">{promise}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Counter Section ─────────── */
function LoveCounter() {
  const calculateTime = useCallback(() => {
    const start = new Date('2026-01-12T18:51:00Z')
    const now = new Date()
    const diff = now.getTime() - start.getTime()
    if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }, [])

  const [time, setTime] = useState(calculateTime())
  useEffect(() => {
    const interval = setInterval(() => setTime(calculateTime()), 1000)
    return () => clearInterval(interval)
  }, [calculateTime])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span className="text-pink-300/70 text-sm">Since 13 Jan 2026, 12:21 AM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4"><GradientText>Loving You Since</GradientText></h2>
          <p className="text-pink-300/60 text-lg">Every second counts when it comes to our love</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {units.map((unit, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 md:p-8 text-center">
                <div className="text-3xl md:text-5xl font-bold text-pink-400 mb-2 tabular-nums">
                  {String(unit.value).padStart(unit.label === 'Days' ? 1 : 2, '0')}
                </div>
                <div className="text-pink-300/50 text-sm uppercase tracking-wider">{unit.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Final Section ─────────── */
function FinalSection() {
  return (
    <section className="relative py-32 md:py-48 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/starry-heart.png" alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <AnimatedSection>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-8">
            <Heart className="w-16 h-16 text-pink-500 mx-auto fill-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]" />
          </motion.div>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <h2 className="text-3xl md:text-6xl font-bold mb-6" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #f9a8d4, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>I Love You, Aditi</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <p className="text-pink-200/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            No website, no words, no gesture could ever fully express what you mean to me. But I&apos;ll keep trying, every single day, for the rest of my life. You are my today and all of my tomorrows.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.9}>
          <p className="text-pink-400/50 text-base italic">
            &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
          </p>
          <p className="text-pink-500/30 text-sm mt-2">— Maya Angelou</p>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────── Music Button ─────────── */
function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 5 }}
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transition-shadow duration-300"
      title={isPlaying ? 'Pause Music' : 'Play Music'}>
      <Music className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
    </motion.button>
  )
}

/* ─────────── Navigation ─────────── */
function Navigation() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-pink-400 hover:text-pink-300 transition-colors"
          title="Back to top">
          <ChevronRight className="w-5 h-5 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="relative py-12 px-4 text-center border-t border-pink-500/10">
      <div className="max-w-4xl mx-auto">
        <Heart className="w-6 h-6 text-pink-500/30 mx-auto mb-4 fill-pink-500/30" />
        <p className="text-pink-400/30 text-sm">Made with infinite love, just for you</p>
        <p className="text-pink-500/20 text-xs mt-2">Every line of code whispers your name</p>
      </div>
    </footer>
  )
}

/* ─────────── Main Page ─────────── */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#fdf2f8] overflow-x-hidden">
      <FloatingHearts />
      <SparkleParticles />
      <MusicButton />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <ConfessionSection />
        <AcceptanceSection />
        <ChatSlideshowSection />
        <DistanceSection />
        <ReasonsSection />
        <LoveLetterSection />
        <GallerySection />
        <AditiPhotosSection />
        <LoveCounter />
        <PromiseSection />
        <FinalSection />
      </main>
      <Footer />
    </div>
  )
}

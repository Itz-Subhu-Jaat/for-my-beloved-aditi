'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Star, Sparkles, Mail, Clock, ArrowDown, Music, X, ChevronRight } from 'lucide-react'

/* ─────────── Floating Hearts Background ─────────── */
function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 16 + 8,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 10,
  })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float-up text-pink-500/20"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  )
}

/* ─────────── Sparkle Particles ─────────── */
function SparkleParticles() {
  const sparkles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    size: Math.random() * 4 + 2,
  })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-pink-300/40 animate-sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────── Animated Section Wrapper ─────────── */
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
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

  const scrollToContent = () => {
    document.getElementById('reasons')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image.png"
          alt="Romantic sunset"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8"
        >
          <Heart className="w-20 h-20 md:w-28 md:h-28 text-pink-500 mx-auto animate-heartbeat fill-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #f472b6, #fb7185, #f9a8d4, #ec4899)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 4s ease infinite, pulse-glow 2s ease-in-out infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          For My Beloved
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-5xl md:text-8xl lg:text-9xl font-extrabold mb-8"
          style={{
            background: 'linear-gradient(135deg, #fdf2f8, #f9a8d4, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Aditi
        </motion.h2>

        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg md:text-2xl text-pink-200/80 mb-4 italic font-light"
            >
              &ldquo;You are the reason I believe in love&rdquo;
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-sm md:text-base text-pink-300/50 mb-12"
            >
              Every pixel of this website is filled with my love for you
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={scrollToContent}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-lg font-medium hover:from-pink-500 hover:to-rose-400 transition-all duration-300 shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)]"
            >
              Explore Our Love Story
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-pink-400/50 text-xs tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-pink-400/50" />
        </motion.div>
      </motion.div>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Why I Love You
            </span>
          </h2>
          <p className="text-pink-300/60 text-lg max-w-2xl mx-auto">
            A million reasons exist, but here are a few that make my heart skip a beat every time I think of you
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass rounded-2xl p-6 md:p-8 h-full group cursor-default"
              >
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
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img
          src="/love-letter.png"
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 md:w-1/3 object-cover opacity-15"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              A Letter For You
            </span>
          </h2>
          <p className="text-pink-300/60 text-lg">Words from the deepest corner of my heart</p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            {!isOpen ? (
              <motion.div
                className="text-center cursor-pointer"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Mail className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-pink-300/80 text-lg mb-2">Tap to open my letter</p>
                <p className="text-pink-400/40 text-sm">Written with all my love</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-pink-200/80 leading-loose text-base md:text-lg space-y-4 italic">
                  <p>My Dearest Aditi,</p>
                  <p>
                    There are moments in life when you meet someone and everything changes — the way you see the world, the way you feel about yourself, the way your heart beats. You are that someone for me. From the very first moment, you turned my ordinary days into extraordinary memories.
                  </p>
                  <p>
                    Every second spent with you feels like a beautiful dream I never want to wake up from. Your smile has the power to erase all my worries, your voice is the sweetest melody I&apos;ve ever heard, and your presence makes everything feel right in this world.
                  </p>
                  <p>
                    I want you to know that you are not just my love — you are my best friend, my soulmate, my everything. I fall in love with you a little more every single day, and I know that this love will only grow deeper with time.
                  </p>
                  <p>
                    Thank you for being you. Thank you for choosing us. Thank you for making my life the most beautiful story ever told.
                  </p>
                  <p className="text-pink-300/90 font-medium not-italic text-right mt-8">
                    Forever & Always Yours,
                    <br />
                    <span className="text-pink-400">With All My Love</span>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Our Beautiful World
            </span>
          </h2>
          <p className="text-pink-300/60 text-lg">Every image reminds me of you</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.2}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass rounded-2xl overflow-hidden group cursor-default"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
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

/* ─────────── Timeline Section ─────────── */
function TimelineSection() {
  const timeline = [
    { icon: <Star className="w-5 h-5" />, title: 'The First Glance', desc: 'The moment I saw you, I knew my life was about to change forever. Something in your eyes told me this was different — this was real.' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Falling in Love', desc: 'Every conversation, every shared laugh, every moment together — I found myself falling deeper and deeper. Love wasn\'t sudden; it was a beautiful, inevitable journey.' },
    { icon: <Heart className="w-5 h-5" />, title: 'You Became My World', desc: 'Somewhere along the way, you became not just a part of my life, but my entire world. Every thought, every dream, every plan somehow includes you.' },
    { icon: <Mail className="w-5 h-5" />, title: 'This Website', desc: 'I built this with my own hands, line by line, pixel by pixel — because you deserve something made with love, effort, and dedication. Just for you, Aditi.' },
  ]

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Our Story
            </span>
          </h2>
          <p className="text-pink-300/60 text-lg">A love story that keeps getting better</p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500/80 via-pink-400/40 to-transparent md:-translate-x-px" />

          {timeline.map((item, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.2}
              className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Icon */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">{item.title}</h3>
                  <p className="text-pink-200/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </div>
            </AnimatedSection>
          ))}
        </div>
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
  ]

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              My Promises to You
            </span>
          </h2>
          <p className="text-pink-300/60 text-lg">Words I will live by, every single day</p>
        </AnimatedSection>

        <div className="space-y-4">
          {promises.map((promise, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 8 }}
                className="glass-light rounded-xl p-5 md:p-6 flex items-center gap-4 group cursor-default"
              >
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
    // A symbolic start date - can be customized
    const start = new Date('2024-01-01T00:00:00')
    const now = new Date()
    const diff = now.getTime() - start.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { days, hours, minutes, seconds }
  }, [])

  const [time, setTime] = useState(calculateTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime())
    }, 1000)
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Loving You Since
            </span>
          </h2>
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
        <img
          src="/starry-heart.png"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <AnimatedSection>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 text-pink-500 mx-auto fill-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]" />
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <h2 className="text-3xl md:text-6xl font-bold mb-6" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #f9a8d4, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            I Love You, Aditi
          </h2>
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
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 5 }}
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transition-shadow duration-300"
      title={isPlaying ? 'Pause Music' : 'Play Music'}
    >
      <Music className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
    </motion.button>
  )
}

/* ─────────── Navigation ─────────── */
function Navigation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-pink-400 hover:text-pink-300 transition-colors"
          title="Back to top"
        >
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
        <p className="text-pink-400/30 text-sm">
          Made with infinite love, just for you
        </p>
        <p className="text-pink-500/20 text-xs mt-2">
          Every line of code whispers your name
        </p>
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
        <ReasonsSection />
        <LoveLetterSection />
        <GallerySection />
        <TimelineSection />
        <LoveCounter />
        <PromiseSection />
        <FinalSection />
      </main>

      <Footer />
    </div>
  )
}

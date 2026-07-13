import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { X, Globe, ArrowUpRight } from 'lucide-react'
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiTailwindcss, SiTypescript, SiJsonwebtokens, SiRedis,
  SiOpenai, SiClerk, SiElevenlabs, SiGooglegemini
} from 'react-icons/si'

/* ── GitHub icon ── */
function GithubIcon({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ── Tag icons ── */
const TAG_ICONS = {
  'React': <SiReact size={12} className="text-[#61DAFB]" />,
  'Next.js 16': <SiNextdotjs size={12} className="dark:text-white text-black" />,
  'Next.js': <SiNextdotjs size={12} className="dark:text-white text-black" />,
  'Node.js': <SiNodedotjs size={12} className="text-[#3C873A]" />,
  'Express.js': <SiExpress size={12} className="dark:text-white text-black" />,
  'Express': <SiExpress size={12} className="dark:text-white text-black" />,
  'MongoDB': <SiMongodb size={12} className="text-[#13AA52]" />,
  'Tailwind CSS': <SiTailwindcss size={12} className="text-[#38BDF8]" />,
  'TypeScript': <SiTypescript size={12} className="text-[#3178C6]" />,
  'JWT': <SiJsonwebtokens size={12} className="text-[#d63aff]" />,
  'Redis': <SiRedis size={12} className="text-[#DC382D]" />,
  'OpenAI API': <SiOpenai size={12} className="text-[#10a37f]" />,
  'Clerk Authentication': <SiClerk size={12} className="text-[#6C47FF]" />,
  'ElevenLabs': <SiElevenlabs size={12} className="dark:text-white text-black" />,
  'Google Gemini': <SiGooglegemini size={12} className="text-[#8E75C2]" />,
  'Playwright': <span className="text-[9px] font-bold text-[#2EAD33]">PW</span>,
  'OAuth': <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400">AUTH</span>,
  'shadcn/ui': <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400">UI</span>,
  'Vapi AI': <span className="text-[9px] font-bold text-[#00b4d8]">Vapi</span>,
}

/* ─────────────────────────────────────────────
   Scroll-animated image card inside the modal
───────────────────────────────────────────── */
function ScrollCard({ image, title, scrollRef }) {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollRef,
    offset: ['start start', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.6], [22, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.04, 1])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const titleOp = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    /* Tall section — gives room to scroll through the 3D animation */
    <div ref={sectionRef} style={{ height: '130vh' }} className="relative">

      {/* Sticky wrapper keeps everything pinned while the section scrolls */}
      <div
        className="sticky top-0 flex flex-col items-center justify-start pt-8 w-full"
        style={{ perspective: '1200px' }}
      >
        {/* Title slides up and fades as you scroll */}
        <motion.div
          style={{ y: titleY, opacity: titleOp }}
          className="text-center mb-8 px-6 z-10"
        >
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8B0000] dark:text-[#c44] mb-2 select-none">
            Featured Project
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-[#f3f3f3] tracking-tight leading-tight m-0">
            {title}
          </h2>
          <p className="mt-2 text-[12px] text-zinc-400 dark:text-[#84848f]">
            Scroll to explore ↓
          </p>
        </motion.div>

        {/* Monitor frame — starts tilted, flattens on scroll */}
        <motion.div
          style={{
            rotateX,
            scale,
            boxShadow:
              '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a',
          }}
          className="w-[90%] max-w-[800px] rounded-[22px] bg-[#1c1c1e] border-4 border-[#3a3a3c] p-2 sm:p-3 shadow-2xl"
        >
          <div className="w-full rounded-[14px] overflow-hidden bg-zinc-900">
            <img
              src={image}
              alt={title}
              className="w-full object-cover object-top block"
              style={{ height: 'clamp(200px, 38vw, 440px)' }}
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main Modal — rendered via Portal so it sits
   on top of the entire DOM tree, no z-index fights
───────────────────────────────────────────── */
export function ProjectModal({ project, onClose }) {
  const scrollRef = useRef(null)

  /* Lock scroll on BOTH html and body while modal is open */
  useEffect(() => {
    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
    }
  }, [])

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  /* Trap wheel events so background page never scrolls */
  const trapWheel = (e) => e.stopPropagation()

  const modal = (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
      onWheel={trapWheel}
      onTouchMove={trapWheel}
    >

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal panel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '960px',
            height: '92vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '18px',
            overflow: 'hidden',
            background: '#0b0b0d',
            border: '1px solid #222226',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.85)',
          }}
        >
          {/* ── Top bar ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: '1px solid #1e1e22',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Traffic-light dots (red is the close button) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: '#ff5f57', border: 'none', cursor: 'pointer',
                  padding: 0,
                }}
              />
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#febc2e', opacity: 0.55, display: 'block' }} />
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#28c840', opacity: 0.55, display: 'block' }} />
            </div>

            {/* Center label */}
            <span style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              fontSize: 12, color: '#666', fontWeight: 500, letterSpacing: '0.04em',
              userSelect: 'none',
            }}>
              {project.title}
            </span>

            {/* X close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent',
                border: '1px dashed rgba(139,0,0,0.4)',
                color: '#666', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#8B0000' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#666'; e.currentTarget.style.borderColor = 'rgba(139,0,0,0.4)' }}
            >
              <X size={13} strokeWidth={2} />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div
            ref={scrollRef}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin',
              scrollbarColor: '#2a2a2e transparent',
            }}
          >
            {/* Scroll-animated hero image */}
            <ScrollCard image={project.image} title={project.title} scrollRef={scrollRef} />

            {/* Details section */}
            <div style={{ padding: '0 40px 80px', maxWidth: 820, margin: '0 auto' }}>

              {/* Dashed divider */}
              <div style={{
                height: 1, marginBottom: 32,
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(139,0,0,0.5) 0, rgba(139,0,0,0.5) 16px, transparent 16px, transparent 32px)',
                backgroundSize: '100% 1px', backgroundPosition: 'top', backgroundRepeat: 'no-repeat',
              }} />

              {/* Title + action links */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#f3f3f3', letterSpacing: '-0.02em' }}>
                  {project.title}
                </h3>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 12px', borderRadius: 8,
                        fontSize: 11, fontWeight: 600,
                        border: '1px dashed rgba(139,0,0,0.5)',
                        color: '#a2a2ab', textDecoration: 'none',
                      }}
                    >
                      <GithubIcon size={13} /> GitHub
                    </a>
                  )}
                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 12px', borderRadius: 8,
                        fontSize: 11, fontWeight: 600,
                        border: '1px dashed rgba(139,0,0,0.6)',
                        background: 'rgba(139,0,0,0.12)',
                        color: '#cc4444', textDecoration: 'none',
                      }}
                    >
                      <Globe size={12} /> Live <ArrowUpRight size={10} />
                    </a>
                  )}
                </div>
              </div>

              {/* About */}
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B0000', marginBottom: 10 }}>
                About
              </p>
              <p style={{ fontSize: 14, color: '#a2a2ab', lineHeight: 1.75, marginBottom: 32 }}>
                {project.description}
              </p>

              {/* Dashed divider */}
              <div style={{
                height: 1, marginBottom: 24,
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(139,0,0,0.5) 0, rgba(139,0,0,0.5) 16px, transparent 16px, transparent 32px)',
                backgroundSize: '100% 1px', backgroundPosition: 'top', backgroundRepeat: 'no-repeat',
              }} />

              {/* Tech stack */}
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B0000', marginBottom: 12 }}>
                Tech Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', borderRadius: 6,
                      border: '1px dashed rgba(139,0,0,0.55)',
                      color: '#a2a2ab', fontSize: 11, fontWeight: 500,
                    }}
                  >
                    {TAG_ICONS[tag] || <span style={{ fontSize: 9, fontWeight: 700, color: '#666' }}>#</span>}
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  /* Render into document.body so nothing can block it */
  return createPortal(modal, document.body)
}

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion as Motion, useScroll, useTransform } from 'framer-motion'
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
  'Framer Motion': <span className="text-[9px] font-bold text-[#e94cff]">FM</span>,
  'Vite': <span className="text-[9px] font-bold text-[#8B5CF6]">VITE</span>,
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
        <Motion.div
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
        </Motion.div>

        {/* Monitor frame — starts tilted, flattens on scroll */}
        <Motion.div
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
        </Motion.div>
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
  const projectSlug = project.title.replace(/\s+/g, '-').toLowerCase()
  const caseStudySections = [
    {
      id: 'overview',
      label: 'Overview',
      title: 'What I built',
      body: project.description,
    },
    ...(project.sections ?? []).map((section, index) => ({
      ...section,
      id: section.id ?? `section-${index + 2}`,
      label: section.label ?? section.title ?? `Section ${index + 2}`,
    })),
  ]

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
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-100/75 dark:bg-black/75 backdrop-blur-md"
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
        <Motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          className="flex h-[94vh] w-full max-w-[1120px] flex-col overflow-hidden rounded-[18px] border border-zinc-200/90 bg-[#f8f8f9] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_40px_100px_rgba(24,24,27,0.24)] dark:border-[#222226] dark:bg-[#0b0b0d] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_100px_rgba(0,0,0,0.85)]"
          style={{
            pointerEvents: 'auto',
          }}
        >
          {/* ── Top bar ── */}
          <div className="relative flex flex-shrink-0 items-center justify-between border-b border-zinc-200/80 px-4 py-3 dark:border-[#1e1e22] sm:px-5">
            {/* Traffic-light dots (red is the close button) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="h-[13px] w-[13px] cursor-pointer rounded-full border-0 bg-[#ff5f57] p-0 transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000]"
              />
              <span className="block h-[13px] w-[13px] rounded-full bg-[#febc2e] opacity-55" />
              <span className="block h-[13px] w-[13px] rounded-full bg-[#28c840] opacity-55" />
            </div>

            {/* Center label */}
            <span className="pointer-events-none absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate select-none text-[11px] font-medium tracking-[0.04em] text-zinc-500 dark:text-[#84848f] sm:text-xs">
              {project.title}
            </span>

            {/* X close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-[#8B0000]/50 bg-white/50 text-zinc-500 transition-all duration-200 hover:border-[#8B0000] hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000] dark:bg-transparent dark:text-[#84848f] dark:hover:text-white"
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

            {/* Long-form case study shell. New content can be added through project.sections. */}
            <section className="mx-auto w-full max-w-[1000px] px-4 pb-16 sm:px-8 sm:pb-20" aria-label="Project case study">
              <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 shadow-[0_12px_32px_rgba(24,24,27,0.04)] dark:border-[#222228] dark:bg-[#101012]/75 dark:shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
                <div className="h-px structural-dashed-t structural-grid" />

                <header className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B0000] dark:text-[#c44]">
                    <span>Project case study</span>
                    <span className="font-mono text-zinc-400 dark:text-[#666]">Selected work / 01</span>
                  </div>

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="mb-2 mt-0 text-[11px] font-medium text-zinc-400 dark:text-[#666]">Designed and built by Yousef Al Bakri</p>
                      <h3 className="m-0 max-w-[560px] text-[28px] font-bold leading-none tracking-[-0.04em] text-zinc-900 dark:text-[#f3f3f3] sm:text-[34px]">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex flex-shrink-0 flex-wrap gap-2">
                      {project.github && project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#8B0000]/60 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-600 no-underline transition-colors hover:border-[#8B0000] hover:text-zinc-900 dark:bg-[#111114] dark:text-[#a2a2ab] dark:hover:text-white"
                        >
                          <GithubIcon size={13} /> GitHub
                        </a>
                      )}
                      {project.live && project.live !== '#' && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#8B0000]/70 bg-[#8B0000]/5 px-3 py-1.5 text-[11px] font-semibold text-[#8B0000] no-underline transition-colors hover:bg-[#8B0000]/10 dark:bg-[#8B0000]/10 dark:text-[#cc4444] dark:hover:bg-[#8B0000]/20"
                        >
                          <Globe size={12} /> Live <ArrowUpRight size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </header>

                <div className="h-px structural-dashed-t structural-grid" />

                <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
                  <aside className="border-b border-dashed border-[#8B0000]/35 dark:border-[#600000] lg:border-b-0 lg:border-r">
                    <div className="space-y-8 px-5 py-6 sm:px-7 lg:sticky lg:top-0 lg:py-8">
                      <div>
                        <p className="mb-3 mt-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-[#666]">On this page</p>
                        <nav aria-label="Case study sections" className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                          {caseStudySections.map((section, index) => (
                            <a
                              key={section.id}
                              href={`#${projectSlug}-${section.id}`}
                              className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium text-zinc-500 no-underline transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-[#777] dark:hover:bg-[#161618] dark:hover:text-[#f3f3f3]"
                            >
                              <span className="font-mono text-[9px] text-[#8B0000]/70 dark:text-[#c44]">{String(index + 1).padStart(2, '0')}</span>
                              {section.label}
                            </a>
                          ))}
                        </nav>
                      </div>

                      <div>
                        <p className="mb-3 mt-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-[#666]">Technology</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 rounded-[6px] border border-dashed border-[#8B0000]/55 bg-white px-2 py-1 text-[10px] font-medium text-zinc-600 dark:border-[#600000] dark:bg-[#111114] dark:text-[#a2a2ab]"
                            >
                              {TAG_ICONS[tag] || <span className="text-[9px] font-bold text-zinc-500 dark:text-[#666]">#</span>}
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </aside>

                  <article className="min-w-0">
                    {caseStudySections.map((section, index) => (
                      <section
                        key={section.id}
                        id={`${projectSlug}-${section.id}`}
                        className="scroll-mt-6 px-5 py-8 sm:px-8 sm:py-10 [&+section]:border-t [&+section]:border-dashed [&+section]:border-[#8B0000]/35 dark:[&+section]:border-[#600000]"
                      >
                        <div className="mb-6 flex items-center gap-3">
                          <span className="font-mono text-[11px] text-[#8B0000] dark:text-[#c44]">{String(index + 1).padStart(2, '0')}</span>
                          <span className="h-px w-8 bg-[#8B0000]/35 dark:bg-[#600000]" />
                          <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-[#84848f]">{section.label}</p>
                        </div>

                        <h4 className="m-0 max-w-[620px] text-[21px] font-semibold leading-tight tracking-[-0.025em] text-zinc-900 dark:text-[#f3f3f3] sm:text-[24px]">
                          {section.title}
                        </h4>

                        {(Array.isArray(section.body) ? section.body : [section.body]).filter(Boolean).map((paragraph) => (
                          <p key={paragraph} className="mb-0 mt-4 max-w-[66ch] text-[13.5px] leading-7 text-zinc-600 dark:text-[#a2a2ab]">
                            {paragraph}
                          </p>
                        ))}

                        {section.points?.length > 0 && (
                          <ul className="mb-0 mt-6 grid gap-3 p-0 sm:grid-cols-2">
                            {section.points.map((point) => (
                              <li key={point} className="flex list-none items-start gap-3 rounded-lg border border-dashed border-[#8B0000]/35 p-3 text-[12px] leading-5 text-zinc-500 dark:border-[#600000] dark:text-[#8b8b95]">
                                <span className="mt-2 h-px w-3 shrink-0 bg-[#8B0000]" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.image && (
                          <figure className="mb-0 mt-7 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1.5 dark:border-[#222228] dark:bg-[#111114]">
                            <img src={section.image} alt={section.imageAlt || ''} className="block h-auto w-full rounded-lg" />
                            {section.caption && <figcaption className="px-2 pb-1 pt-2 text-[10px] text-zinc-400 dark:text-[#666]">{section.caption}</figcaption>}
                          </figure>
                        )}
                      </section>
                    ))}

                    <div className="border-t border-dashed border-[#8B0000]/35 px-5 py-6 dark:border-[#600000] sm:px-8">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-medium text-zinc-400 dark:text-[#666]">
                        <span>End of case study</span>
                        <span className="font-mono">{String(project.tags.length).padStart(2, '0')} tools · {String(caseStudySections.length).padStart(2, '0')} sections</span>
                      </div>
                    </div>
                  </article>
                </div>

              </div>
            </section>
          </div>
        </Motion.div>
      </div>
    </div>
  )

  /* Render into document.body so nothing can block it */
  return createPortal(modal, document.body)
}

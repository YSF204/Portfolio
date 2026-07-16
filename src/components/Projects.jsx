import { useState } from 'react'
import { AnimatedRow, SectionTitle } from './ui'
import { Globe, ArrowRight } from 'lucide-react'
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiTailwindcss, SiTypescript, SiJsonwebtokens, SiRedis,
  SiOpenai, SiClerk, SiElevenlabs, SiGooglegemini
} from 'react-icons/si'
import { ProjectModal } from './ProjectModal'

import aicrsImg from '../assets/AICRS.png'
import spokenPagesImg from '../assets/SpokenPages.png'
import flashcardImg from '../assets/flashcard.png'

/* ── Inline GitHub icon (not exported by this lucide-react version) ── */
function GithubIcon({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ── Tag icon map (same icons as TechStack) ── */
const TAG_ICONS = {
  'React': <SiReact size={13} className="text-[#61DAFB]" />,
  'Next.js 16': <SiNextdotjs size={13} className="dark:text-white text-black" />,
  'Next.js': <SiNextdotjs size={13} className="dark:text-white text-black" />,
  'Node.js': <SiNodedotjs size={13} className="text-[#3C873A]" />,
  'Express.js': <SiExpress size={13} className="dark:text-white text-black" />,
  'Express': <SiExpress size={13} className="dark:text-white text-black" />,
  'MongoDB': <SiMongodb size={13} className="text-[#13AA52]" />,
  'Tailwind CSS': <SiTailwindcss size={13} className="text-[#38BDF8]" />,
  'TypeScript': <SiTypescript size={13} className="text-[#3178C6]" />,
  'JWT': <SiJsonwebtokens size={13} className="text-[#d63aff]" />,
  'Redis': <SiRedis size={13} className="text-[#DC382D]" />,
  'OpenAI API': <SiOpenai size={13} className="text-[#10a37f]" />,
  'Clerk Authentication': <SiClerk size={13} className="text-[#6C47FF]" />,
  'ElevenLabs': <SiElevenlabs size={13} className="dark:text-white text-black" />,
  'Google Gemini': <SiGooglegemini size={13} className="text-[#8E75C2]" />,
  'Playwright': <span className="text-[10px] font-bold text-[#2EAD33]">PW</span>,
  'OAuth': <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">AUTH</span>,
  'shadcn/ui': <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">UI</span>,
  'Vapi AI': <span className="text-[10px] font-bold text-[#00b4d8]">Vapi</span>,
}

/* ── Projects data ── Add future projects here ── */
const projects = [
  {
    title: 'AI-CRS',
    description: 'An AI-powered recruitment platform that enables users to build ATS-friendly resumes, analyze CVs, receive AI-driven feedback, and discover relevant job opportunities through automated job aggregation.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'OAuth', 'Redis', 'OpenAI API', 'Playwright'],
    image: aicrsImg,
    github: '#',
    live: '#',
  },
  {
    title: 'SpokenPages',
    description: 'A full-stack AI application that lets users upload PDF books and have natural voice conversations with their documents using advanced speech synthesis and generative AI.',
    tags: ['Next.js 16', 'TypeScript', 'MongoDB', 'Clerk Authentication', 'Tailwind CSS', 'shadcn/ui', 'Vapi AI', 'ElevenLabs', 'Google Gemini'],
    image: spokenPagesImg,
    github: '#',
    live: '#',
  },
  {
    title: 'AI Flash Cards',
    description: 'An AI-powered study tool that transforms pasted text into interactive flashcards, helping users review concepts through automatically generated question-and-answer cards.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API'],
    image: flashcardImg,
    github: '#',
    live: '#',
  },
]

/* ── Single project card ── */
function ProjectCard({ project, onViewDetails }) {
  return (
    <div className="flex flex-col gap-4 p-6 group">
      {/* Screenshot Frame */}
      <div className="rounded-2xl p-1.5 bg-zinc-50 dark:bg-[#121214] border border-zinc-200/70 dark:border-[#212126] shadow-sm transition-all duration-300 group-hover:border-[#8B0000]/35 dark:group-hover:border-[#8B0000]/25 group-hover:shadow-[0_4px_20px_rgba(139,0,0,0.03)] dark:group-hover:shadow-[0_4px_24px_rgba(139,0,0,0.05)]">
        <div className="rounded-xl overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-100 dark:bg-[#111114]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[160px] object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Title + icons */}
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-[#f3f3f3] tracking-tight">
          {project.title}
        </h3>
        <div className="flex items-center gap-2.5">
          <a
            href={project.github}
            onClick={(e) => { if (!project.github || project.github === '#') e.preventDefault() }}
            className="text-zinc-400 dark:text-[#7e7e89] hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href={project.live}
            onClick={(e) => { if (!project.live || project.live === '#') e.preventDefault() }}
            className="text-zinc-400 dark:text-[#7e7e89] hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Live site"
          >
            <Globe size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-[12px] text-zinc-500 dark:text-[#a2a2ab] leading-relaxed line-clamp-3 -mt-1">
        {project.description}
      </p>

      {/* Tech tags — same style as TechStack */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border border-dashed border-[#8B0000]/70 dark:border-[#600000] text-zinc-600 dark:text-[#a2a2ab] text-[11px] font-medium select-none"
          >
            {TAG_ICONS[tag] || <span className="text-[10px] font-bold text-zinc-400">#</span>}
            {tag}
          </span>
        ))}
      </div>

      {/* View Details button */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onViewDetails(project); }}
          className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-400 dark:text-[#7e7e89] hover:text-zinc-900 dark:hover:text-white transition-colors group cursor-pointer"
        >
          View Details
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}

function UpcomingProjectsStrip() {
  return (
    <div className="structural-dashed-b structural-grid relative isolate overflow-hidden px-5 py-7 sm:px-8 sm:py-8" aria-label="More projects are coming soon">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_50%,rgba(139,0,0,0.09),transparent_34%)] dark:bg-[radial-gradient(circle_at_82%_50%,rgba(139,0,0,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(139,0,0,0.12)_48%,rgba(139,0,0,0.12)_49%,transparent_49%,transparent_100%)] bg-[length:16px_16px] dark:opacity-25" />

      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B0000] shadow-[0_0_10px_rgba(139,0,0,0.65)]" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-[#777]">In the workshop</span>
        </div>
        <span className="font-mono text-[9px] text-zinc-400 dark:text-[#555]">04 / NEXT</span>
      </div>

      <div className="shipping-soon-frame group relative overflow-hidden py-1">
        <p
          aria-hidden="true"
          className="shipping-soon-word m-0 whitespace-nowrap text-center leading-none transition-all duration-500"
        >
          Shipping More Soon
        </p>
        <p className="sr-only">Shipping more projects soon.</p>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-zinc-400 dark:text-[#666]">
        <span className="h-px w-8 bg-[#8B0000]/35 dark:bg-[#600000]" />
        <span>New ideas are being designed, built, and tested.</span>
        <span className="h-px w-8 bg-[#8B0000]/35 dark:bg-[#600000]" />
      </div>
    </div>
  )
}

/* ── Projects Section ── */
export function ProjectsSection() {
  const [openProject, setOpenProject] = useState(null)

  return (
    <>
      {/* Section header */}
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="Featured" title="Projects" />
      </AnimatedRow>

      {/* Grid block — all cards in one section with explicit h-[1px] dashed dividers */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[760px] flex flex-col">

          {/* ── TOP line ── */}
          <div className="w-full h-[1px] structural-dashed-t structural-grid" />

          {/* ── Row 1 ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 structural-divide-x">
            <ProjectCard project={projects[0]} onViewDetails={setOpenProject} />
            <ProjectCard project={projects[1]} onViewDetails={setOpenProject} />
          </div>

          {/* ── MIDDLE line (crosses vertical = + sign) ── */}
          <div className="w-full h-[1px] structural-dashed-t structural-grid" />

          {/* ── Row 2 ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 structural-divide-x">
            <ProjectCard project={projects[2]} onViewDetails={setOpenProject} />
            <div className="hidden md:block" />
          </div>

          {/* ── UPCOMING WORK ── */}
          <UpcomingProjectsStrip />

        </div>
      </div>

      {/* ── Project Details Modal ── */}
      {openProject && (
        <ProjectModal
          key={openProject.title}
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  )
}

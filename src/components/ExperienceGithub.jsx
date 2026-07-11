import { GitHubCalendar } from 'react-github-calendar'
import { AnimatedRow, SectionTitle } from './ui'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import foothillLogo from '../assets/foothill.png'

const experiences = [
  {
    id: 1,
    company: 'Foothill Technology Solutions',
    role: 'Backend Intern',
    period: 'June 2025 - Current',
    logo: foothillLogo,
    logoType: 'image',
    bullets: [
      'Built and maintained RESTful APIs using modern backend frameworks',
      'Collaborated with senior engineers on database schema design and query optimization',
      'Participated in code reviews, applying best practices for clean and maintainable code',
      'Gained hands-on experience with version control workflows and CI/CD pipelines',
    ],
  },
  {
    id: 2,
    company: 'Yagmoor for Programming',
    role: 'Trainee',
    period: 'Jan 2025 — Apr 2025',
    logo: null,
    logoType: 'initial',
    logoInitial: 'Y',
    bullets: [
      'Observed and trained within a professional software development environment',
      'Gained exposure to agile methodologies and sprint-based project management',
      'Participated in team stand-ups, code walkthroughs, and retrospective sessions',
      'Developed foundational skills in real-world development workflows and collaboration tools',
    ],
  },
]

function ExperienceCard({ exp, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
    >
      {/* Clickable header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left cursor-pointer group"
      >
        <div
          className={`relative border rounded-2xl bg-white/80 dark:bg-[#0d0d0f]/80 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
            open
              ? 'border-[#8B0000]/30 dark:border-[#8B0000]/20 shadow-[0_0_24px_rgba(139,0,0,0.05)] dark:shadow-[0_0_24px_rgba(139,0,0,0.07)]'
              : 'border-zinc-200 dark:border-[#1a1a1f] hover:border-[#8B0000]/25 dark:hover:border-[#8B0000]/15'
          }`}
        >
          {/* Top accent */}
          <div
            className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B0000]/30 to-transparent transition-opacity duration-500 ${
              open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />

          <div className="p-5 sm:p-6">
            {/* Header row */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div
                className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center overflow-hidden transition-all duration-300 ${
                  open
                    ? 'border-[#8B0000]/25 shadow-[0_0_10px_rgba(139,0,0,0.08)] bg-zinc-50 dark:bg-[#111114]'
                    : 'border-zinc-200 dark:border-[#222228] bg-zinc-50 dark:bg-[#111114] group-hover:border-[#8B0000]/20'
                }`}
              >
                {exp.logoType === 'image' ? (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-7 h-7 object-contain"
                  />
                ) : (
                  <span className="text-[15px] font-bold text-[#8B0000]">
                    {exp.logoInitial}
                  </span>
                )}
              </div>

              {/* Company & Role */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-[#eee] leading-tight truncate">
                  {exp.company}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Briefcase
                      size={11}
                      className="text-[#8B0000]/60 shrink-0"
                    />
                    <span className="text-[12px] font-medium text-[#8B0000]/70 dark:text-[#c44]/80">
                      {exp.role}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-zinc-300 dark:text-[#2a2a2f]">
                    ·
                  </span>
                  <div className="hidden sm:flex items-center gap-1">
                    <Calendar
                      size={10}
                      className="text-zinc-400 dark:text-[#555]"
                    />
                    <span className="text-[11px] text-zinc-400 dark:text-[#666] font-medium">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow toggle */}
              <div
                className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  open
                    ? 'border-[#8B0000]/25 bg-[#8B0000]/5 dark:bg-[#8B0000]/10'
                    : 'border-zinc-200 dark:border-[#222228] bg-zinc-50 dark:bg-[#111114] group-hover:border-[#8B0000]/20'
                }`}
              >
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronDown
                    size={14}
                    className={`transition-colors duration-200 ${
                      open
                        ? 'text-[#8B0000]'
                        : 'text-zinc-400 dark:text-[#555] group-hover:text-[#8B0000]/60'
                    }`}
                  />
                </motion.div>
              </div>
            </div>

            {/* Mobile period (visible on small screens) */}
            <div className="flex sm:hidden items-center gap-1 mt-2 ml-[60px]">
              <Calendar
                size={10}
                className="text-zinc-400 dark:text-[#555]"
              />
              <span className="text-[11px] text-zinc-400 dark:text-[#666] font-medium">
                {exp.period}
              </span>
            </div>

            {/* Expandable bullet points */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 ml-[60px] border-l-2 border-[#8B0000]/15 dark:border-[#8B0000]/10 pl-4">
                    <ul className="space-y-2.5">
                      {exp.bullets.map((bullet, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.06,
                            ease: 'easeOut',
                          }}
                          className="flex items-start gap-2.5"
                        >
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#8B0000]/40 mt-[6px]" />
                          <span className="text-[12.5px] leading-[1.6] text-zinc-500 dark:text-[#888]">
                            {bullet}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export function ExperienceGithub({ theme }) {
  return (
    <>
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle title="Experience" />
      </AnimatedRow>

      <AnimatedRow containerClass="px-5 sm:px-8 pb-2" bottomBorder={false}>
        <div className="flex flex-col gap-3">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </AnimatedRow>

      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle title="Github's Activity" />
      </AnimatedRow>
      <AnimatedRow containerClass="p-8 overflow-hidden" bottomBorder={false}>
        <div className="w-full flex flex-col items-center max-w-full pb-2 overflow-x-hidden">
          <div className="w-full overflow-hidden flex justify-center [&_article]:w-full [&_svg]:w-full [&_svg]:max-w-[700px] [&_svg]:h-auto">
            <GitHubCalendar
              username="YSF204"
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              blockSize={10}
              blockMargin={4}
              fontSize={13}
              theme={{
                dark: ['#161616', '#2a0a0a', '#3d1111', '#5c1a1a', '#8b0000'],
                light: [
                  '#e8e0e0',
                  '#d4b0b0',
                  '#b06060',
                  '#8b2020',
                  '#6b0000',
                ],
              }}
            />
          </div>
        </div>
      </AnimatedRow>
    </>
  )
}

import { GitHubCalendar } from 'react-github-calendar'
import { AnimatedRow, SectionTitle } from './ui'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import foothillLogo from '../assets/foothill.png'

const experiences = [
  {
    id: 1,
    company: 'Foothill Technology Solutions',
    role: 'Backend Intern',
    period: 'Jun 2025 — Present',
    status: 'Current',
    location: null,
    logo: foothillLogo,
    logoType: 'image',
    summary: 'Working on backend features in a production codebase, with most of my time spent around APIs, databases, and debugging.',
    bullets: [
      'Build and maintain API endpoints, then test the full request flow before a change moves forward.',
      'Work with database schemas and queries while learning how backend decisions affect the rest of the product.',
      'Use code reviews as part of the work: explain changes, respond to feedback, and improve the implementation.',
    ],
    skills: ['REST APIs', 'Databases', 'Code review'],
  },
  {
    id: 2,
    company: 'Yaghmour for Programming',
    role: 'Programming Intern',
    period: 'Jan 2025 — May 2025',
    status: 'Completed',
    location: 'Hebron, Palestine',
    logo: null,
    logoType: 'initial',
    logoInitial: 'Y',
    summary: 'Joined a four-person team working on Al Aqsa Accounting System, a business product used by local companies.',
    bullets: [
      'Contributed to invoicing, reporting, and inventory parts of the accounting system.',
      'Tested and debugged features used by more than 100 local businesses.',
      'Learned how a team investigates real user problems and turns them into focused software fixes.',
    ],
    skills: ['Testing', 'Debugging', 'Business software'],
  },
]

function ExperienceEntry({ exp, index }) {
  const [open, setOpen] = useState(index === 0)
  const detailsId = `experience-details-${exp.id}`

  return (
    <Motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
      className="structural-dashed-b structural-grid"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="group grid w-full cursor-pointer grid-cols-[1fr_auto] text-left sm:grid-cols-[145px_minmax(0,1fr)_64px]"
      >
        <div className="col-span-2 flex items-center justify-between px-5 pb-3 pt-5 sm:col-span-1 sm:block sm:px-6 sm:py-7">
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] text-[#8B0000] dark:text-[#c44]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="m-0 font-mono text-[10px] leading-5 text-zinc-400 dark:text-[#666] sm:mt-8">
            {exp.period}
          </p>
        </div>

        <div className="border-t border-dashed border-[#8B0000]/30 px-4 py-5 dark:border-[#600000] sm:border-l sm:border-t-0 sm:px-6 sm:py-7">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-dashed border-[#8B0000]/45 bg-white dark:border-[#600000] dark:bg-[#111114]">
              {exp.logoType === 'image' ? (
                <img src={exp.logo} alt="" className="h-7 w-7 object-contain" />
              ) : (
                <span className="text-sm font-bold text-[#8B0000] dark:text-[#c44]">{exp.logoInitial}</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="m-0 text-[15px] font-semibold leading-tight text-zinc-900 dark:text-[#f3f3f3] sm:text-[17px]">
                  {exp.role}
                </h3>
                <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                  exp.status === 'Current'
                    ? 'border-[#8B0000]/35 bg-[#8B0000]/5 text-[#8B0000] dark:border-[#600000] dark:bg-[#8B0000]/10 dark:text-[#c44]'
                    : 'border-zinc-200 text-zinc-400 dark:border-[#25252a] dark:text-[#666]'
                }`}>
                  {exp.status}
                </span>
              </div>
              <p className="mb-0 mt-1 text-[12px] font-medium text-zinc-500 dark:text-[#8b8b95]">{exp.company}</p>
              <p className="mb-0 mt-4 max-w-[500px] text-[13px] leading-6 text-zinc-600 dark:text-[#a2a2ab]">
                {exp.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center border-l border-t border-dashed border-[#8B0000]/30 px-3 dark:border-[#600000] sm:border-t-0 sm:px-4">
          <Motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-[#8B0000]/45 text-zinc-400 transition-colors group-hover:border-[#8B0000] group-hover:text-[#8B0000] dark:border-[#600000] dark:text-[#666] dark:group-hover:text-[#c44]"
          >
            <ChevronDown size={14} />
          </Motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <Motion.div
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-[145px_minmax(0,1fr)_64px]">
              <div className="hidden sm:block" />
              <div className="border-t border-dashed border-[#8B0000]/30 px-5 pb-7 pt-5 dark:border-[#600000] sm:border-l sm:px-6">
                {exp.location && (
                  <div className="mb-4 flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 dark:text-[#666]">
                    <MapPin size={11} />
                    <span>{exp.location}</span>
                  </div>
                )}

                <ul className="m-0 space-y-3 p-0">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <Motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: bulletIndex * 0.05 }}
                      className="flex list-none items-start gap-3"
                    >
                      <span className="mt-[9px] h-px w-4 shrink-0 bg-[#8B0000]/55 dark:bg-[#8B0000]" />
                      <span className="text-[12.5px] leading-6 text-zinc-500 dark:text-[#8b8b95]">{bullet}</span>
                    </Motion.li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="rounded-[6px] border border-dashed border-[#8B0000]/45 px-2.5 py-1 text-[10px] font-medium text-zinc-500 dark:border-[#600000] dark:text-[#777]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden border-l border-t border-dashed border-[#8B0000]/30 dark:border-[#600000] sm:block" />
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.article>
  )
}

export function ExperienceGithub({ theme }) {
  return (
    <>
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="In practice" title="Experience" />
      </AnimatedRow>

      <AnimatedRow containerClass="structural-dashed-t structural-grid" bottomBorder={false}>
        <div>
          {experiences.map((exp, index) => (
            <ExperienceEntry key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </AnimatedRow>

      <AnimatedRow dotPattern={true} topBorder={false} bottomBorder={false}>
        <SectionTitle kicker="The work continues" title="GitHub Activity" />
      </AnimatedRow>
      <AnimatedRow containerClass="overflow-hidden px-3 py-6 sm:p-8" topBorder={true} bottomBorder={false}>
        <div className="flex w-full max-w-full flex-col items-center overflow-x-hidden pb-2">
          <div className="flex w-full justify-center overflow-hidden [&_article]:w-full [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[700px]">
            <GitHubCalendar
              username="YSF204"
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              blockSize={10}
              blockMargin={4}
              fontSize={13}
              theme={{
                dark: ['#161616', '#2a0a0a', '#3d1111', '#5c1a1a', '#8b0000'],
                light: ['#e8e0e0', '#d4b0b0', '#b06060', '#8b2020', '#6b0000'],
              }}
            />
          </div>
        </div>
      </AnimatedRow>
    </>
  )
}

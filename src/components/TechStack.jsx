import { AnimatedRow, SectionTitle } from './ui'
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiTailwindcss, SiVite, SiGit, SiDocker, SiSpringboot } from 'react-icons/si'

const techs = [
  { icon: <SiJavascript size={16} className="text-[#F7DF1E]" />, name: 'JavaScript' },
  { icon: <SiTypescript size={16} className="text-[#3178C6]" />, name: 'TypeScript' },
  { icon: <SiReact size={16} className="text-[#61DAFB]" />, name: 'React' },
  { icon: <SiNextdotjs size={16} className="dark:text-white text-black" />, name: 'Next.js' },
  { icon: <SiNodedotjs size={16} className="text-[#3C873A]" />, name: 'Node.js' },
  { icon: <SiExpress size={16} className="dark:text-white text-black" />, name: 'Express' },
  { icon: <SiMongodb size={16} className="text-[#13AA52]" />, name: 'MongoDB' },
  { icon: <SiPostgresql size={16} className="text-[#336791]" />, name: 'PostgreSQL' },
  { icon: <SiTailwindcss size={16} className="text-[#38BDF8]" />, name: 'Tailwind CSS' },
  { icon: <SiGit size={16} className="text-[#F05032]" />, name: 'Git' },
  { icon: <SiDocker size={16} className="text-[#2496ED]" />, name: 'Docker' },
  { icon: <SiSpringboot size={16} className="text-[#6DB33F]" />, name: 'Spring Boot' },
]

export function TechStack() {
  return (
    <>
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="Featured" title="Tech Stack" />
        <div className="w-full h-[1px] structural-dashed-b structural-grid relative z-10"></div>
      </AnimatedRow>

      <AnimatedRow bottomBorder={true} containerClass="px-8 sm:px-10 py-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {techs.map(({ icon, name }) => (
            <div
              key={name}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border border-dashed border-[#8B0000]/70 dark:border-[#600000] text-zinc-600 dark:text-[#a2a2ab] text-[12px] font-medium select-none"
            >
              {icon}
              {name}
            </div>
          ))}
        </div>
      </AnimatedRow>
    </>
  )
}

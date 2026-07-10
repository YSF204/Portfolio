import { AnimatedRow, SectionTitle } from './ui'
import LogoLoop from './LogoLoop'
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiTailwindcss, SiVite } from 'react-icons/si'

export function TechStack() {
  const techLogos = [
    { node: <SiJavascript size={40} className="text-[#F7DF1E]" />, title: 'JavaScript', href: '#' },
    { node: <SiTypescript size={40} className="text-[#3178C6]" />, title: 'TypeScript', href: '#' },
    { node: <SiReact size={40} className="text-[#61DAFB]" />, title: 'React', href: '#' },
    { node: <SiNextdotjs size={40} className="dark:text-white text-black" />, title: 'Next.js', href: '#' },
    { node: <SiNodedotjs size={40} className="text-[#3C873A]" />, title: 'Node.js', href: '#' },
    { node: <SiExpress size={40} className="dark:text-white text-black" />, title: 'Express', href: '#' },
    { node: <SiMongodb size={40} className="text-[#13AA52]" />, title: 'MongoDB', href: '#' },
    { node: <SiPostgresql size={40} className="text-[#336791]" />, title: 'PostgreSQL', href: '#' },
    { node: <SiVite size={40} className="text-[#646CFF]" />, title: 'Vite', href: '#' },
    { node: <SiTailwindcss size={40} className="text-[#38BDF8]" />, title: 'Tailwind CSS', href: '#' }
  ];

  return (
    <>
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="Featured" title="Tech Stack" />
        <div className="w-full h-[1px] structural-dashed-b structural-grid relative z-10"></div>
      </AnimatedRow>
      <AnimatedRow bottomBorder={false} containerClass="p-0">
        <div className="w-full relative structural-dashed-b py-10" style={{ minHeight: 'auto', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={50}
            direction="left"
            logoHeight={60}
            gap={60}
            hoverSpeed={10}
            scaleOnHover
          />
        </div>
      </AnimatedRow>
    </>
  )
}

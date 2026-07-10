import { AnimatedRow, SectionTitle, Button } from './ui'

const projects = [
  {
    title: 'Lunar',
    description: 'A music streaming web application with features like song search, playlist creation, and user profiles.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1613329671121-5d1cf551cc3f?auto=format&fit=crop&w=1300&q=80',
  },
  {
    title: 'Draft',
    description: 'Draft is a minimalist, zero-friction hub where creators drop raw ideas and assemble them into exact drafts.',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1300&q=80',
  },
]

const hackathons = [
  {
    title: 'Version Beta 8.0',
    org: 'NIT Bhopal',
    date: '2 Jan 2025',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Mediverse',
    org: 'Medicaps University Indore',
    date: '25 Nov 2025',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
  },
]

export function ProjectsSection() {
  return (
    <>
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="Featured" title="Projects" />
      </AnimatedRow>
      <AnimatedRow containerClass="p-8" bottomBorder={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
           {projects.map((project, idx) => (
             <div key={idx} className="p-3 border border-dashed border-[#8B0000]/70 dark:border-[#600000] rounded-[16px] bg-white dark:bg-[#0d0d0f] transition-colors hover:border-[#8B0000] dark:hover:border-[#8B0000]">
               <div className="p-1 rounded-xl bg-gradient-to-tr from-[#6322ff] to-[#ff3fb7]">
                 <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-[10px]" />
               </div>
               <div className="mt-5 px-1 pb-2">
                 <h3 className="font-semibold text-[15px] text-zinc-900 dark:text-[#f3f3f3]">{project.title}</h3>
                 <p className="text-[12px] text-zinc-500 dark:text-[#a2a2ab] mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
                 <div className="flex flex-wrap gap-2 mt-4">
                   {project.tags.map(tag => (
                     <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-dashed border-[#8B0000]/70 dark:border-[#600000] bg-zinc-50 dark:bg-[#151518] text-zinc-600 dark:text-[#a2a2ab] font-medium">
                       {tag}
                     </span>
                   ))}
                 </div>
                 <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-5 font-semibold flex items-center gap-2">
                   <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse"></span>
                   All Systems Operational
                 </div>
               </div>
             </div>
           ))}
        </div>
        <div className="flex justify-center w-full mt-10">
          <Button>View all projects</Button>
        </div>
      </AnimatedRow>
    </>
  )
}

export function HackathonsSection() {
  return (
    <>
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="Achievements" title="Hackathons" />
      </AnimatedRow>
      <AnimatedRow containerClass="p-8" bottomBorder={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {hackathons.map((hack, idx) => (
            <div key={idx} className="p-3 border border-dashed border-[#8B0000]/70 dark:border-[#600000] rounded-[16px] bg-white dark:bg-[#0d0d0f] transition-colors hover:border-[#8B0000] dark:hover:border-[#8B0000]">
              <img src={hack.image} alt={hack.title} className="w-full h-40 object-cover rounded-[12px] border border-dashed border-[#8B0000]/70 dark:border-[#600000]" />
              <div className="mt-4 px-1 pb-1">
                <h3 className="font-semibold text-[15px] text-zinc-900 dark:text-[#f3f3f3]">{hack.title}</h3>
                <p className="text-[12px] text-zinc-500 dark:text-[#a2a2ab] mt-1">{hack.org}</p>
                <div className="mt-3 inline-flex items-center px-2 py-0.5 rounded-full border border-dashed border-[#8B0000]/70 dark:border-[#600000] bg-amber-500/10 text-amber-600 dark:text-[#f4d580] text-[10px] font-semibold">
                  Winner 🏆
                </div>
                <p className="text-[11px] text-zinc-400 dark:text-[#7e7e89] mt-3">{hack.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full mt-10">
          <Button>View all achievements</Button>
        </div>
      </AnimatedRow>
    </>
  )
}

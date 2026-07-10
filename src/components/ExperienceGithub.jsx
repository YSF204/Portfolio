import { GitHubCalendar } from 'react-github-calendar'
import { AnimatedRow, SectionTitle } from './ui'

export function ExperienceGithub({ theme }) {
  return (
    <>
      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="Featured" title="Experience" />
      </AnimatedRow>
      <AnimatedRow containerClass="p-8" bottomBorder={false}>
        <div className="border border-dashed border-[#8B0000]/70 dark:border-[#600000] rounded-xl bg-white dark:bg-[#0d0d0f] p-5 flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-[#f3f3f3]">Google Developers Group AITR</h3>
            <p className="text-[12px] text-zinc-500 mt-1">Web Developer & Trainer</p>
          </div>
          <span className="text-[12px] text-zinc-400">2024 - Present</span>
        </div>
      </AnimatedRow>

      <AnimatedRow dotPattern={true} topBorder={true} bottomBorder={false}>
        <SectionTitle kicker="Featured" title="Github's Activity" />
      </AnimatedRow>
      <AnimatedRow containerClass="p-8 overflow-hidden" bottomBorder={false}>
        <div className="w-full flex flex-col items-center max-w-full pb-2">
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
      </AnimatedRow>
    </>
  )
}

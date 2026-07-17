import { AnimatedRow, ThemeToggle } from './ui'
import { SiNextdotjs, SiReact, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql } from 'react-icons/si'
import { MdVerified } from 'react-icons/md'
import { PiLinkedinLogoLight, PiReadCvLogoThin, PiGithubLogoLight } from 'react-icons/pi'
import YousefImg from '../assets/Yousef.png'
import cvFile from '../assets/cv/Yousef-ALBakri.pdf'
import RotatingText from './RotatingText'
import PixelTransition from './PixelTransition'

export function ProfileHeader({ theme, toggleTheme }) {
  return (
    <>
      <AnimatedRow containerClass="px-5 py-6 sm:px-10 relative" bottomBorder={false}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <div className="flex flex-col items-start gap-5 pr-10 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-4 min-[480px]:pr-0 relative z-10">
          <div className="w-[82px] h-[120px] rounded-[14px] bg-white dark:bg-[#111] flex-shrink-0 p-[3px] shadow-sm relative">
            <PixelTransition
              firstContent={
                <img src={YousefImg} alt="Yousef AL Bakri" className="w-full h-full object-cover rounded-[11px]" />
              }
              secondContent={
                <div className="w-full h-full bg-[#8B0000] dark:bg-[#600000] rounded-[11px] flex items-center justify-center">
                  <p className="font-bold text-white text-center text-[10px] leading-tight px-1">Booo !</p>
                </div>
              }
              gridSize={7}
              pixelColor={theme === 'dark' ? '#b06060' : '#8B0000'}
              animationStepDuration={0.5}
              className="w-full h-full rounded-[11px]"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-zinc-900 dark:text-zinc-100 text-[17px] flex items-center gap-1.5">
              <span>Yousef AL Bakri</span>
              <MdVerified className="text-zinc-400 dark:text-zinc-500" size={15} />
            </h1>
            <p className="break-all text-[12px] mt-0.5 text-zinc-500 dark:text-[#a2a2ab]">Yousef204b@gmail.com</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-[14px] font-bold sm:text-[16px]">
              <span className="font-mono tracking-widest text-zinc-700 dark:text-zinc-300">Yousef is a</span>
              <RotatingText
                texts={['FULL STACK', 'FRONTEND', 'BACKEND']}
                mainClassName="overflow-hidden w-[112px] sm:w-[120px] justify-center text-[#8B0000] dark:text-[#b06060] px-1 rounded-[6px] border border-dashed border-[#8B0000]/70 dark:border-[#600000]"
                staggerFrom="random"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
              <span className="font-mono tracking-widest text-zinc-700 dark:text-zinc-300">DEV</span>
            </div>
          </div>
        </div>
      </AnimatedRow>

      <AnimatedRow containerClass="px-5 sm:px-10 pb-8 pt-0 relative" topBorder={false} bottomBorder={false}>
        <div className="-mx-5 sm:-mx-10 mb-6 structural-dashed-b structural-grid h-[1px] relative z-10"></div>

        <div className="space-y-4 text-[13.5px] text-zinc-600 dark:text-[#a2a2ab] leading-[1.8] relative z-10">
          <p>
            Hey, I&apos;m a software engineer. You&apos;ve heard that a thousand times, but my focus is a little different. I love creating visually appealing experiences through code, all while making sure the base is scalable and fault-tolerant.
          </p>
          <p className="leading-[1.8]">
            To bring my ideas to life, I utilize{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 dark:text-[#eee]"><SiNextdotjs size={12} className="dark:text-white" /> Nextjs</span>,{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 dark:text-[#eee]"><SiReact size={13} className="text-[#61DAFB]" /> React</span>,{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 dark:text-[#eee]"><SiTailwindcss size={13} className="text-[#38BDF8]" /> Tailwind</span>,{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 dark:text-[#eee]"><SiExpress size={13} className="dark:text-white text-black" /> Express</span>,{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 dark:text-[#eee]"><SiMongodb size={13} className="text-[#13AA52]" /> MongoDB</span>, and{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 dark:text-[#eee]"><SiPostgresql size={13} className="text-[#336791]" /> PostgreSQL</span>. But the tech stack is not the hero of my story. I&apos;m an engineer at heart ❤️.
          </p>
        </div>
      </AnimatedRow>

      <AnimatedRow topBorder={false} bottomBorder={false}>
        <div className="grid grid-cols-3 w-full relative structural-divide-x">
          <div className="absolute top-0 left-0 w-full h-[1px] structural-dashed-t structural-grid z-10"></div>

          <div className="flex items-center justify-center px-1 py-4 sm:p-5 relative z-20">
            <a href={cvFile} download="Yousef-ALBakri.pdf" className="inline-flex flex-col items-center gap-1 text-center text-zinc-600 dark:text-[#a2a2ab] text-[10px] sm:flex-row sm:gap-2 sm:text-[13px] font-medium transition-colors hover:text-zinc-900 dark:hover:text-white">
              <PiReadCvLogoThin size={18} /> <span>CV / Resume</span>
            </a>
          </div>
          <div className="flex items-center justify-center px-1 py-4 sm:p-5 relative z-20">
            <a href="https://www.linkedin.com/in/yousefalbakri/" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center gap-1 text-center text-zinc-600 dark:text-[#a2a2ab] text-[10px] sm:flex-row sm:gap-2 sm:text-[13px] font-medium transition-colors hover:text-zinc-900 dark:hover:text-white">
              <PiLinkedinLogoLight size={18} /> <span>LinkedIn</span>
            </a>
          </div>
          <div className="flex items-center justify-center px-1 py-4 sm:p-5 relative z-20">
            <a href="https://github.com/YSF204" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center gap-1 text-center text-zinc-600 dark:text-[#a2a2ab] text-[10px] sm:flex-row sm:gap-2 sm:text-[13px] font-medium transition-colors hover:text-zinc-900 dark:hover:text-white">
              <PiGithubLogoLight size={18} /> <span>GitHub</span>
            </a>
          </div>
        </div>
      </AnimatedRow>
    </>
  )
}

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { AnimatedRow, ThemeToggle } from './ui'
import { SiNextdotjs, SiReact, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql } from 'react-icons/si'
import { MdVerified } from 'react-icons/md'
import { PiLinkedinLogoLight, PiReadCvLogoThin, PiGithubLogoLight } from 'react-icons/pi'
import YousefImg from '../assets/Yousef.png'
import RotatingText from './RotatingText'
import PixelTransition from './PixelTransition'

/* The address is the one thing a visitor actually needs to take away, so make
   taking it one click instead of a careful drag-select. */
function CopyEmail({ address }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard is blocked (insecure context, denied permission) — the
      // address is still on screen to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${address}`}
      className="focus-ring group mt-1 inline-flex items-center gap-1.5 rounded-md break-all font-mono text-[12px] text-zinc-500 transition-colors hover:text-zinc-900 dark:text-[#a2a2ab] dark:hover:text-white"
    >
      {address}
      {copied
        ? <Check size={11} className="text-[#8B0000] dark:text-[#c44]" />
        : <Copy size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />}
    </button>
  )
}

export function ProfileHeader({ theme, toggleTheme }) {
  return (
    <>
      <AnimatedRow containerClass="px-5 py-6 sm:px-10 relative" bottomBorder={false}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <div className="flex flex-col items-start gap-5 pr-10 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-4 min-[480px]:pr-0 relative z-10">
          <div className="w-[82px] h-[120px] rounded-[14px] bg-white dark:bg-[#111] flex-shrink-0 p-[3px] shadow-sm relative">
            <PixelTransition
              firstContent={
                <img src={YousefImg} alt="Yousef AL Bakri" width={82} height={120} fetchPriority="high" className="w-full h-full object-cover rounded-[11px]" />
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
            <h1 className="font-bold text-zinc-900 dark:text-zinc-100 text-[21px] tracking-tight flex items-center gap-1.5">
              <span>Yousef AL Bakri</span>
              <MdVerified className="text-zinc-400 dark:text-zinc-500" size={16} />
            </h1>
            <CopyEmail address="Yousef204b@gmail.com" />
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-[14px] font-bold sm:text-[16px]">
              <span className="font-mono tracking-widest text-zinc-700 dark:text-zinc-300">Yousef is a</span>
              <RotatingText
                texts={['FULL STACK', 'FRONTEND', 'BACKEND']}
                mainClassName="overflow-hidden w-[112px] sm:w-[120px] justify-center text-[#8B0000] dark:text-[#b06060] px-1 rounded-md border border-[#8B0000]/30 bg-[#8B0000]/[0.04] dark:border-[#8B0000]/40 dark:bg-[#8B0000]/[0.08]"
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
            <span className="chip-dashed mt-3 inline-flex items-center rounded-[6px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 dark:text-[#a2a2ab]">
              Open to opportunities
            </span>
          </div>
        </div>
      </AnimatedRow>

      <AnimatedRow containerClass="px-5 sm:px-10 pb-8 pt-0 relative" topBorder={false} bottomBorder={false}>
        <div className="-mx-5 sm:-mx-10 mb-6 structural-dashed-b structural-grid rail-cross h-[1px] relative z-10"></div>

        <div className="max-w-[68ch] space-y-4 text-[14px] text-zinc-600 dark:text-[#a2a2ab] leading-[1.85] relative z-10">
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
            <a href="https://drive.google.com/file/d/1EEtSkJkx30AsPH_jLmZvPP2tiCzJ9KRr/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="focus-ring rounded-md inline-flex flex-col items-center gap-1 text-center text-zinc-600 dark:text-[#a2a2ab] text-[10px] sm:flex-row sm:gap-2 sm:text-[13px] font-medium transition-colors hover:text-zinc-900 dark:hover:text-white">
              <PiReadCvLogoThin size={18} /> <span>CV / Resume</span>
            </a>
          </div>
          <div className="flex items-center justify-center px-1 py-4 sm:p-5 relative z-20">
            <a href="https://www.linkedin.com/in/yousefalbakri/" target="_blank" rel="noopener noreferrer" className="focus-ring rounded-md inline-flex flex-col items-center gap-1 text-center text-zinc-600 dark:text-[#a2a2ab] text-[10px] sm:flex-row sm:gap-2 sm:text-[13px] font-medium transition-colors hover:text-zinc-900 dark:hover:text-white">
              <PiLinkedinLogoLight size={18} /> <span>LinkedIn</span>
            </a>
          </div>
          <div className="flex items-center justify-center px-1 py-4 sm:p-5 relative z-20">
            <a href="https://github.com/YSF204" target="_blank" rel="noopener noreferrer" className="focus-ring rounded-md inline-flex flex-col items-center gap-1 text-center text-zinc-600 dark:text-[#a2a2ab] text-[10px] sm:flex-row sm:gap-2 sm:text-[13px] font-medium transition-colors hover:text-zinc-900 dark:hover:text-white">
              <PiGithubLogoLight size={18} /> <span>GitHub</span>
            </a>
          </div>
        </div>
      </AnimatedRow>
    </>
  )
}

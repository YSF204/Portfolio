import { AnimatedRow, Button, ThemeToggle } from './ui'
import { FaGithub, FaXTwitter, FaEnvelope, FaLinkedin, FaRegEye, FaPaperPlane, FaFileLines } from 'react-icons/fa6'
import { SiNextdotjs, SiReact, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql } from 'react-icons/si'
import { MdVerified } from 'react-icons/md'
import YousefImg from '../assets/Yousef.png'
import RotatingText from './RotatingText'
import PixelTransition from './PixelTransition'
import Shuffle from './Shuffle'

export function ProfileHeader({ theme, toggleTheme }) {
  return (
    <>
      <AnimatedRow containerClass="px-8 sm:px-10 py-6 relative" bottomBorder={false}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <div className="flex items-center gap-4 relative z-10">
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
          <div className="flex-1">
            <h1 className="font-bold text-zinc-900 dark:text-zinc-100 text-[17px] flex items-center gap-1.5">
              <Shuffle
                tag="span"
                text="Yousef AL Bakri"
                shuffleDirection="right"
                duration={0.35}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover
                respectReducedMotion={true}
                loop={false}
                loopDelay={0}
              /> <MdVerified className="text-zinc-400 dark:text-zinc-500" size={15} />
            </h1>
            <p className="text-[12px] mt-0.5 text-zinc-500 dark:text-[#a2a2ab]">@YSF204</p>
            <div className="flex items-center gap-2 mt-3 text-[16px] font-bold">
              <span className="font-mono tracking-widest text-zinc-700 dark:text-zinc-300">YOUSEF</span>
              <RotatingText
                texts={['FULL STACK', 'FRONT END', 'BACKEND']}
                mainClassName="overflow-hidden w-[120px] justify-center text-[#8B0000] dark:text-[#b06060] px-1 bg-zinc-100 dark:bg-[#1a1a1a] rounded-md border border-zinc-200 dark:border-zinc-800"
                staggerFrom="random"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={5000}
              />
              <span className="font-mono tracking-widest text-zinc-700 dark:text-zinc-300">DEV</span>
            </div>
          </div>
        </div>
      </AnimatedRow>

      <AnimatedRow containerClass="px-8 sm:px-10 pb-8 pt-0 relative" topBorder={false} bottomBorder={false}>
        <div className="-mx-8 sm:-mx-10 mb-6 structural-dashed-b structural-grid h-[1px] relative z-10"></div>

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
        <div className="grid grid-cols-2 md:grid-cols-4 w-full relative">
          <div className="absolute top-0 left-0 w-full h-[1px] structural-dashed-t structural-grid z-10"></div>
          <div className="absolute top-0 left-1/2 w-[1px] h-full structural-dashed-x hidden sm:block z-10"></div>
          <div className="absolute top-0 left-1/4 w-[1px] h-full structural-dashed-x hidden md:block z-10"></div>
          <div className="absolute top-0 left-3/4 w-[1px] h-full structural-dashed-x hidden md:block z-10"></div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] structural-dashed-b block md:hidden z-10"></div>

          <div className="flex items-center justify-center p-5 relative z-20">
            <Button variant="ghost"><FaFileLines size={14} className="text-zinc-500 dark:text-[#a2a2ab]" /> Resume / CV</Button>
          </div>
          <div className="flex items-center justify-center p-5 relative z-20">
            <Button variant="ghost"><FaPaperPlane size={14} className="text-zinc-500 dark:text-[#a2a2ab]" /> Get in Touch</Button>
          </div>
          <div className="flex items-center justify-center p-5 relative z-20">
            <Button variant="ghost"><FaEnvelope size={14} className="text-zinc-500 dark:text-[#a2a2ab]" /> Email</Button>
          </div>
          <div className="flex items-center justify-center p-5 relative z-20">
            <Button variant="ghost"><FaXTwitter size={14} className="text-zinc-500 dark:text-[#a2a2ab]" /> Twitter DM</Button>
          </div>
        </div>
      </AnimatedRow>
    </>
  )
}

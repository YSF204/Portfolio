import { AnimatedRow, Button } from './ui'
import YousefImg from '../assets/Yousef.png'

/* Guest silhouette */
function GuestAvatar() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="40" r="40" className="fill-zinc-200 dark:fill-zinc-700" />
      <circle cx="40" cy="30" r="13"  className="fill-zinc-400 dark:fill-zinc-500" />
      <ellipse cx="40" cy="68" rx="22" ry="16" className="fill-zinc-400 dark:fill-zinc-500" />
    </svg>
  )
}

/*
  Pure-CSS animated dashed gradient line.
  - `background` gives the black/white → red color gradient
  - `mask-image` cuts it into dashes
  - animating `mask-position` makes the dashes flow toward the button
*/
function ConnectingLine({ side = 'left', theme }) {
  const fromColor = theme === 'dark' ? '#ffffff' : '#18181b'
  const toColor   = '#8B0000'

  const gradient = side === 'left'
    ? `linear-gradient(to right, ${fromColor}, ${toColor})`
    : `linear-gradient(to right, ${toColor}, ${fromColor})`

  const anim = `footer-flow-${side}`

  return (
    <>
      <style>{`
        @keyframes ${anim} {
          from { -webkit-mask-position: 0px 0; mask-position: 0px 0; }
          to   { -webkit-mask-position: 11px 0; mask-position: 11px 0; }
        }
      `}</style>
      <div
        className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${side === 'left' ? 'origin-right group-hover:scale-x-[0.75]' : 'origin-left group-hover:scale-x-[0.75]'}`}
        style={{
          flex: '1 1 0%',
          minWidth: 40,
          height: 2,
          background: gradient,
          WebkitMaskImage:
            'repeating-linear-gradient(to right, #000 0px, #000 6px, transparent 6px, transparent 11px)',
          maskImage:
            'repeating-linear-gradient(to right, #000 0px, #000 6px, transparent 6px, transparent 11px)',
          animation: `${anim} 0.65s linear infinite`,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

function KaizenSignature() {
  return (
    <section
      className="kaizen-signature structural-grid structural-dashed-t relative mx-auto h-[330px] w-full max-w-[760px] cursor-default overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B0000]/45"
      tabIndex={0}
      aria-label="Kaizen: continuous improvement; changing for the better"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.06),transparent_48%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.1),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 border-t border-dashed border-[#8B0000]/25 bg-[repeating-linear-gradient(315deg,rgba(139,0,0,0.18)_0,rgba(139,0,0,0.18)_1px,transparent_1px,transparent_10px)] dark:border-[#600000] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_10px)]" />
      <div className="structural-grid structural-dashed-t pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px" />

      <div className="absolute left-5 top-5 flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-[#666]">
        <span className="font-mono text-[#8B0000] dark:text-[#c44]">改善</span>
        <span>Always improving</span>
      </div>

      <div className="kaizen-word absolute z-10 select-none" aria-hidden="true">
        <div className="group relative">
          <span
            className="pointer-events-none absolute inset-0 -z-10 block translate-x-3 translate-y-3 whitespace-nowrap text-center text-[clamp(6rem,20vw,10rem)] font-black italic leading-none text-transparent"
            style={{
              backgroundImage: 'repeating-linear-gradient(315deg, rgba(139,0,0,0.48) 0, rgba(139,0,0,0.48) 1px, transparent 1px, transparent 7px)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            改善
          </span>
          <span className="kaizen-foreground block -translate-x-3 -translate-y-3 whitespace-nowrap text-center text-[clamp(6rem,20vw,10rem)] font-black italic leading-none text-zinc-400 transition-all duration-300 dark:text-[#5b5b63]">
            改善
          </span>
        </div>
      </div>

      <div id="kaizen-definition" className="kaizen-card absolute z-20 w-[min(430px,56%)] rounded-2xl border border-zinc-200 bg-[#f8f8f9]/95 p-6 shadow-[0_22px_55px_rgba(24,24,27,0.16)] backdrop-blur-md dark:border-[#28282e] dark:bg-[#121214]/95 dark:shadow-[0_22px_55px_rgba(0,0,0,0.52)] sm:p-7">
        <div className="flex items-baseline gap-4">
          <strong className="text-2xl text-zinc-900 dark:text-[#f3f3f3]">改善</strong>
          <span className="text-sm italic text-zinc-400 dark:text-[#777]">/kaizen/</span>
        </div>
        <div className="my-5 h-px structural-dashed-t structural-grid" />
        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#8B0000] dark:text-[#c44]">Noun</p>
        <p className="mb-0 mt-2 text-[15px] leading-7 text-zinc-600 dark:text-[#a2a2ab]">
          Continuous improvement; changing for the better.
        </p>
      </div>

      <p className="absolute bottom-4 left-5 z-10 m-0 font-mono text-[9px] text-zinc-400 dark:text-[#555]">HOVER OR FOCUS TO EXPLORE</p>
    </section>
  )
}

export function Footer({ theme }) {
  return (
    <>
      <AnimatedRow containerClass="text-center py-16 px-4" bottomBorder={false} className="!border-b-0">
        <p className="text-[14px] text-zinc-600 dark:text-[#a2a2ab]">
          If you've read this far, you might be interested in what I do.
        </p>

        {/* ── pic ── line ── [Let's Connect] ── line ── guest ── */}
        <div className="group mx-auto mt-8 flex w-full max-w-[460px] items-center justify-center gap-2 sm:gap-0">

          {/* My photo — slides RIGHT toward button on hover */}
          <div className="z-10 h-[52px] w-[52px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-[#f8f8f9] shadow-md ring-2 ring-[#8B0000]/40 dark:bg-[#0b0b0d] sm:h-[68px] sm:w-[68px]
                          translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          group-hover:translate-x-5">
            <img src={YousefImg} alt="Yousef AL Bakri" className="w-full h-full object-cover" />
          </div>

          {/* Left line */}
          <div className="hidden min-[420px]:contents"><ConnectingLine side="left" theme={theme} /></div>

          {/* Button */}
          <div className="flex-shrink-0 z-10">
            <Button
              onClick={() => window.location.href = 'mailto:Yousef204b@gmail.com'}
              className="whitespace-nowrap px-4 py-2.5 sm:px-6"
            >
              Let's Connect
            </Button>
          </div>

          {/* Right line */}
          <div className="hidden min-[420px]:contents"><ConnectingLine side="right" theme={theme} /></div>

          {/* Guest avatar — slides LEFT toward button on hover */}
          <div className="z-10 h-[52px] w-[52px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-[#f8f8f9] shadow-md ring-2 ring-[#8B0000]/40 dark:bg-[#0b0b0d] sm:h-[68px] sm:w-[68px]
                          translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          group-hover:-translate-x-5">
            <GuestAvatar />
          </div>
        </div>

        <blockquote className="mt-14 text-[13px] italic text-zinc-500 leading-relaxed">
          "Knowing yourself is the beginning of all wisdom."
          <span className="block mt-2.5 font-semibold not-italic text-zinc-400">— Aristotle</span>
        </blockquote>
        <div className="mt-12 text-[11px] text-zinc-500">
          <p>Design and Developed by <span className="text-pink-500 font-medium cursor-pointer">Yousef AL-Bakri</span></p>
          <p className="mt-1.5 text-zinc-400 dark:text-[#7e7e89]">2026 All rights reserved.</p>
        </div>
      </AnimatedRow>
      <KaizenSignature />
    </>
  )
}

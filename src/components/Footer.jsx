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

export function Footer({ theme }) {
  return (
    <>
      <AnimatedRow containerClass="text-center py-16 px-4" bottomBorder={false} className="!border-b-0">
        <p className="text-[14px] text-zinc-600 dark:text-[#a2a2ab]">
          If you've read this far, you might be interested in what I do.
        </p>

        {/* ── pic ── line ── [Let's Connect] ── line ── guest ── */}
        <div className="group flex items-center justify-center mt-8 w-full max-w-[460px] mx-auto">

          {/* My photo — slides RIGHT toward button on hover */}
          <div className="flex-shrink-0 w-[68px] h-[68px] rounded-full overflow-hidden ring-2 ring-[#8B0000]/40 shadow-md cursor-pointer z-10 bg-[#f8f8f9] dark:bg-[#0b0b0d]
                          translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          group-hover:translate-x-5">
            <img src={YousefImg} alt="Yousef AL Bakri" className="w-full h-full object-cover" />
          </div>

          {/* Left line */}
          <ConnectingLine side="left" theme={theme} />

          {/* Button */}
          <div className="flex-shrink-0 z-10">
            <Button
              onClick={() => window.location.href = 'mailto:Yousef204b@gmail.com'}
              className="px-6 py-2.5 whitespace-nowrap"
            >
              Let's Connect
            </Button>
          </div>

          {/* Right line */}
          <ConnectingLine side="right" theme={theme} />

          {/* Guest avatar — slides LEFT toward button on hover */}
          <div className="flex-shrink-0 w-[68px] h-[68px] rounded-full overflow-hidden ring-2 ring-[#8B0000]/40 shadow-md cursor-pointer z-10 bg-[#f8f8f9] dark:bg-[#0b0b0d]
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
    </>
  )
}

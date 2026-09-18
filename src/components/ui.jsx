import { motion as Motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

let themeAudioContext

function playThemeTick() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  try {
    themeAudioContext ??= new AudioContext()
    if (themeAudioContext.state === 'suspended') {
      void themeAudioContext.resume()
    }

    const now = themeAudioContext.currentTime
    const duration = 0.016
    const buffer = themeAudioContext.createBuffer(
      1,
      Math.ceil(themeAudioContext.sampleRate * duration),
      themeAudioContext.sampleRate,
    )
    const samples = buffer.getChannelData(0)

    for (let index = 0; index < samples.length; index += 1) {
      const envelope = (1 - index / samples.length) ** 4
      samples[index] = (Math.random() * 2 - 1) * envelope
    }

    const source = themeAudioContext.createBufferSource()
    const filter = themeAudioContext.createBiquadFilter()
    const gain = themeAudioContext.createGain()

    source.buffer = buffer
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(2100, now)
    filter.Q.setValueAtTime(0.7, now)
    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(themeAudioContext.destination)
    source.start(now)
    source.stop(now + duration)
  } catch {
    // Theme switching should still work when browser audio is unavailable.
  }
}

export function AnimatedRow({ children, className = '', containerClass = '', dotPattern = false, bottomBorder = true, topBorder = false, ...props }) {
  return (
    <Motion.section
      {...props}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full flex justify-center ${bottomBorder ? 'structural-dashed-b' : ''} ${topBorder ? 'structural-dashed-t' : ''} ${className}`}
    >
      <div className={`w-full max-w-(--shell) relative flex flex-col ${containerClass}`}>
        {dotPattern && (
          <div className="absolute inset-y-6 left-0 w-full bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.1)_1.5px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.08)_1.5px,transparent_0)] bg-[length:14px_14px] pointer-events-none z-0"></div>
        )}
        <div className="relative z-10 w-full h-full">
           {children}
        </div>
      </div>
    </Motion.section>
  )
}

export function Row({ children, className = '', containerClass = '', dotPattern = false, bottomBorder = true, topBorder = false }) {
  return (
    <section className={`w-full flex justify-center ${bottomBorder ? 'structural-dashed-b' : ''} ${topBorder ? 'structural-dashed-t' : ''} ${className}`}>
      <div className={`w-full max-w-(--shell) relative flex flex-col ${containerClass}`}>
        {dotPattern && (
          <div className="absolute inset-y-6 left-0 w-full bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.1)_1.5px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.08)_1.5px,transparent_0)] bg-[length:14px_14px] pointer-events-none z-0"></div>
        )}
        <div className="relative z-10 w-full h-full">
           {children}
        </div>
      </div>
    </section>
  )
}

export function SectionTitle({ title, kicker, index }) {
  return (
    <div className="w-full py-12 text-center flex flex-col items-center justify-center h-full">
      {kicker && (
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-[#84848f] mb-3">{kicker}</p>
      )}
      <div className="flex items-center justify-center gap-4">
        {index && (
          <span className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-[#8B0000]/70 dark:text-[#c44]">
            {index}
            <span className="h-px w-8 bg-[#8B0000]/30 dark:bg-[#600000]" />
          </span>
        )}
        <h2 className="display-title text-[38px] sm:text-[46px] leading-[0.92] tracking-tight text-zinc-900 dark:text-[#f3f3f3]">
          {title}
        </h2>
        {index && (
          <span aria-hidden="true" className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-transparent">
            <span className="h-px w-8 bg-[#8B0000]/30 dark:bg-[#600000]" />
            {index}
          </span>
        )}
      </div>
    </div>
  )
}

export function Button({ children, className = '', variant = 'default', ...props }) {
  const variants = {
    default: 'chip chip-interactive card-raised bg-white dark:bg-[#0d0d0f] hover:bg-zinc-50 dark:hover:bg-[#161618]',
    ghost: 'bg-white dark:bg-[#161618] hover:bg-zinc-100 dark:hover:bg-[#1e1e20]'
  }

  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 text-zinc-800 dark:text-[#f3f3f3] px-5 py-2.5 rounded-[10px] text-xs font-semibold transition-all duration-200 hover:-translate-y-px ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function ThemeToggle({ theme, toggleTheme }) {
  const handleClick = (event) => {
    playThemeTick()
    toggleTheme(event)
  }

  return (
    <button
      onClick={handleClick}
      className="group focus-ring chip chip-interactive card-raised absolute top-4 right-4 w-9 h-9 rounded-full bg-white dark:bg-[#0d0d0f] flex items-center justify-center text-zinc-400 dark:text-[#777] hover:text-zinc-900 dark:hover:text-white hover:scale-110 transition-all duration-200 z-20"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="theme-toggle-icon flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  )
}

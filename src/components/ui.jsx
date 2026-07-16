import { motion as Motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

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
      <div className={`w-full max-w-[760px] relative flex flex-col ${containerClass}`}>
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
      <div className={`w-full max-w-[760px] relative flex flex-col ${containerClass}`}>
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

export function SectionTitle({ title, kicker }) {
  return (
    <div className="w-full py-8 text-center flex flex-col items-center justify-center h-full">
      {kicker && (
        <p className="text-[12px] text-zinc-400 dark:text-[#84848f] font-medium tracking-wide mb-1">{kicker}</p>
      )}
      <h2 className="display-title text-[22px] text-zinc-900 dark:text-[#f3f3f3]">{title}</h2>
    </div>
  )
}

export function Button({ children, className = '', variant = 'default', ...props }) {
  const variants = {
    default: 'border border-dashed border-[#8B0000]/70 dark:border-[#600000] bg-white dark:bg-[#0d0d0f] hover:bg-zinc-100 dark:hover:bg-[#161618]',
    ghost: 'bg-white dark:bg-[#161618] hover:bg-zinc-100 dark:hover:bg-[#1e1e20]'
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 text-zinc-800 dark:text-[#f3f3f3] px-5 py-2.5 rounded-[10px] text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="group absolute top-4 right-4 w-9 h-9 rounded-full border border-dashed border-[#8B0000]/70 dark:border-[#600000] bg-white dark:bg-[#0d0d0f] flex items-center justify-center text-zinc-400 dark:text-[#777] hover:text-zinc-900 dark:hover:text-white hover:border-[#8B0000] dark:hover:border-[#8B0000] hover:scale-110 transition-all duration-200 z-20"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="theme-toggle-icon flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  )
}

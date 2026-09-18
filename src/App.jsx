import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { ProfileHeader } from './components/Profile'
import { ProjectsSection } from './components/Projects'
import { TopHeader } from './components/TopHeader'
import { TechStack } from './components/TechStack'
import { ExperienceGithub } from './components/ExperienceGithub'
import { Footer } from './components/Footer'
import ClickSpark from './components/ClickSpark'
import LineSidebar from './components/LineSidebar'
import DotField from './components/DotField'
import { ScrollManifesto } from './components/ScrollManifesto'
import { KaizenSignature } from './components/KaizenSignature'

const SECTIONS = ['overview', 'tech-stack', 'projects', 'experience'];
const SECTION_LABELS = ['Overview', 'Stack', 'Projects', 'Work'];

/* Below xl the LineSidebar is hidden, so this is the only navigation the
   page has on phones and small laptops. */
function MobileNav({ activeSection, onSelect }) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 xl:hidden"
    >
      <ul className="chip card-raised m-0 flex list-none items-center gap-0.5 rounded-full p-1 backdrop-blur-md">
        {SECTION_LABELS.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-current={activeSection === index ? 'true' : undefined}
              className={`focus-ring rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                activeSection === index
                  ? 'bg-[#8B0000] text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-[#84848f] dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id));
    let frame = 0;

    const measure = () => {
      frame = 0;
      let current = 0;
      let minDistance = Infinity;
      const half = window.innerHeight / 2;
      els.forEach((el, index) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        // Find the section closest to the top of the viewport
        const distance = Math.abs(top);
        // Only consider it if it's somewhat in view
        if (distance < minDistance && top < half) {
          minDistance = distance;
          current = index;
        }
      });
      setActiveSection(current);
    };

    // Scroll fires far more often than the screen repaints; coalesce to one
    // layout read per frame instead of one per event.
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const goToSection = (index) => {
    setActiveSection(index)
    document.getElementById(SECTIONS[index])?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduceMotion) {
      setTheme(nextTheme)
      return
    }

    if (root.classList.contains('theme-transitioning')) return

    const buttonBounds = event.currentTarget.getBoundingClientRect()
    const originX = buttonBounds.left + buttonBounds.width / 2
    const originY = buttonBounds.top + buttonBounds.height / 2
    const radius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    )

    root.classList.add('theme-transitioning')

    const transition = document.startViewTransition(() => {
      root.classList.toggle('dark', nextTheme === 'dark')
      localStorage.setItem('theme', nextTheme)
      flushSync(() => setTheme(nextTheme))
    })

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${originX}px ${originY}px)`,
              `circle(${radius}px at ${originX}px ${originY}px)`,
            ],
          },
          {
            duration: 720,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {})

    transition.finished
      .catch(() => {})
      .finally(() => {
        root.classList.remove('theme-transitioning')
      })
  }

  return (
    <ClickSpark
      sparkColor={theme === 'dark' ? '#fff' : '#000'}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen font-sans transition-colors duration-300 overflow-x-clip w-full bg-[#f8f8f9] dark:bg-[#0b0b0d] text-zinc-900 dark:text-[#f3f3f3] structural-grid relative pt-6">
        {/* Film grain — sits above everything, catches no pointer events */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Scroll position hairline */}
        <div className="scroll-progress" aria-hidden="true" />

        {/* Global continuous vertical boundaries */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-(--shell) h-full pointer-events-none z-0 structural-dashed-x" />
        
        {/* DotField Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <DotField
            dotRadius={1}
            dotSpacing={13}
            bulgeStrength={20}
            glowRadius={100}
            sparkle
            waveAmplitude={0}
            cursorRadius={300}
            cursorForce={0}
            gradientFrom={theme === 'dark' ? '#3d1111' : '#b06060'}
            gradientTo={theme === 'dark' ? '#8b0000' : '#8b2020'}
            glowColor={theme === 'dark' ? 'rgba(139, 0, 0, 0.15)' : 'rgba(139, 0, 0, 0.05)'}
          />
        </div>
        
        {/* Line Sidebar for Navigation */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
          <LineSidebar
            items={['Overview', 'Tech Stack', 'Projects', 'Experience']}
            accentColor="#8B0000"
            textColor={theme === 'dark' ? '#c4c4c4' : '#666'}
            markerColor="#8B0000"
            showIndex
            showMarker
            proximityRadius={100}
            maxShift={30}
            falloff="smooth"
            markerLength={60}
            markerGap={0}
            tickScale={0.5}
            scaleTick
            itemGap={20}
            fontSize={1.1}
            smoothing={100}
            activeItemIndex={activeSection}
            onItemClick={goToSection}
          />
        </div>

        <MobileNav activeSection={activeSection} onSelect={goToSection} />

        <div className="relative z-10 w-full flex flex-col items-center structural-dashed-t pb-24">
          <div id="overview" className="w-full flex flex-col items-center">
            <TopHeader />
            <ProfileHeader theme={theme} toggleTheme={toggleTheme} />
            <ScrollManifesto />
          </div>
          <div id="tech-stack" className="w-full flex flex-col items-center">
            <TechStack />
          </div>
          <div id="projects" className="w-full flex flex-col items-center">
            <ProjectsSection />
          </div>
          <div id="experience" className="w-full flex flex-col items-center">
            <ExperienceGithub theme={theme} />
            <KaizenSignature />
          </div>
          <Footer theme={theme} />
        </div>

      </div>
    </ClickSpark>
  )
}

export default App

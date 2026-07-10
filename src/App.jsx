import { useEffect, useState } from 'react'
import { ProfileHeader } from './components/Profile'
import { ProjectsSection, HackathonsSection } from './components/Projects'
import { TopHeader } from './components/TopHeader'
import { TechStack } from './components/TechStack'
import { ExperienceGithub } from './components/ExperienceGithub'
import { Footer } from './components/Footer'
import ClickSpark from './components/ClickSpark'
import GradualBlur from './components/GradualBlur'
import LineSidebar from './components/LineSidebar'
import DotField from './components/DotField'

const SECTIONS = ['overview', 'tech-stack', 'projects', 'hackathons', 'experience'];

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
    const handleScroll = () => {
      let current = 0;
      let minDistance = Infinity;
      SECTIONS.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Find the section closest to the top of the viewport
          const distance = Math.abs(rect.top);
          // Only consider it if it's somewhat in view
          if (distance < minDistance && rect.top < window.innerHeight / 2) {
            minDistance = distance;
            current = index;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <ClickSpark
      sparkColor={theme === 'dark' ? '#fff' : '#000'}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen font-sans transition-colors duration-300 overflow-x-hidden w-full bg-[#f8f8f9] dark:bg-[#0b0b0d] text-zinc-900 dark:text-[#f3f3f3] structural-grid relative pt-6">
        {/* Global continuous vertical boundaries */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[760px] h-full pointer-events-none z-0 structural-dashed-x" />
        
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
            items={['Overview', 'Tech Stack', 'Projects', 'Hackathons', 'Experience']}
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
            onItemClick={(index) => {
              setActiveSection(index);
              const el = document.getElementById(SECTIONS[index]);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center structural-dashed-t pb-24">
          <div id="overview" className="w-full flex flex-col items-center">
            <TopHeader />
            <ProfileHeader theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div id="tech-stack" className="w-full flex flex-col items-center">
            <TechStack />
          </div>
          <div id="projects" className="w-full flex flex-col items-center">
            <ProjectsSection />
          </div>
          <div id="hackathons" className="w-full flex flex-col items-center">
            <HackathonsSection />
          </div>
          <div id="experience" className="w-full flex flex-col items-center">
            <ExperienceGithub theme={theme} />
          </div>
          <Footer />
        </div>

        <GradualBlur
          target="page"
          position="bottom"
          height="8rem"
          strength={1.5}
          divCount={5}
        />
      </div>
    </ClickSpark>
  )
}

export default App

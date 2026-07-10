import { useEffect, useState } from 'react'
import { ProfileHeader } from './components/Profile'
import { ProjectsSection, HackathonsSection } from './components/Projects'
import { TopHeader } from './components/TopHeader'
import { TechStack } from './components/TechStack'
import { ExperienceGithub } from './components/ExperienceGithub'
import { Footer } from './components/Footer'
import ClickSpark from './components/ClickSpark'
import GradualBlur from './components/GradualBlur'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

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
        
        <div className="relative z-10 w-full flex flex-col items-center structural-dashed-t pb-24">
          <TopHeader />
          <ProfileHeader theme={theme} toggleTheme={toggleTheme} />
          <TechStack />
          <ProjectsSection />
          <HackathonsSection />
          <ExperienceGithub theme={theme} />
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

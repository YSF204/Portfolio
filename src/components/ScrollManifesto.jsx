import { useState, useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Row } from './ui'
import './ScrollManifesto.css'

const WORDS = [
  'design.',
  'prototype.',
  'solve.',
  'build.',
  'develop.',
  'polish.',
  'ship.',
]

export function ScrollManifesto() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(
      WORDS.length - 1,
      Math.max(0, Math.round(progress * (WORDS.length - 1))),
    )

    setActiveIndex((currentIndex) => (
      currentIndex === nextIndex ? currentIndex : nextIndex
    ))
  })

  const listOffset = -50 + ((WORDS.length - 1) / 2 - activeIndex) * (100 / WORDS.length)

  return (
    <Row containerClass="manifesto-shell" className="manifesto-row">
      <section
        ref={sectionRef}
        className="scroll-manifesto"
        aria-label="From design to shipping"
      >
        <p className="sr-only">
          I can design, prototype, solve, build, develop, polish, and ship.
        </p>

        <div className="manifesto-sticky" aria-hidden="true">
          <div className="manifesto-meta">
            <span>What I do</span>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(WORDS.length).padStart(2, '0')}</span>
          </div>

          <div className="manifesto-statement">
            <span className="manifesto-prefix">I can</span>
            <div className="manifesto-window">
              <ul
                className="manifesto-words"
                style={{ transform: `translateY(${listOffset}%)` }}
              >
                {WORDS.map((word, index) => (
                  <li
                    key={word}
                    className={index === activeIndex ? 'is-active' : ''}
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="manifesto-progress">
            <span style={{ transform: `scaleX(${(activeIndex + 1) / WORDS.length})` }} />
          </div>
        </div>
      </section>
    </Row>
  )
}

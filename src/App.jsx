import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import CADGallery from './components/CADGallery'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <CADGallery />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </MotionConfig>
  )
}

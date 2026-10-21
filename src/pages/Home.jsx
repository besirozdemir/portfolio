import Hero from '../components/Hero'
import Projects from '../components/Projects'
import GalleryTeaser from '../components/GalleryTeaser'
import Experience from '../components/Experience'
import Skills from '../components/Skills'

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <GalleryTeaser />
      <Experience />
      <Skills />
    </main>
  )
}

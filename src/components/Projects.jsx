import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Github } from 'lucide-react'
import Visual from './visuals'
import { projects } from '../lib/content'

const statusLabel = { 'in-progress': 'In progress', completed: 'Tamamlandı', planned: 'Planlanıyor' }

function ProgressBar({ value = 0, status, play }) {
  const mv = useMotionValue(0)
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    if (!play) { setPhase('idle'); mv.set(0); return }
    setPhase('label')
    const t = setTimeout(() => setPhase('bar'), 1500)
    return () => clearTimeout(t)
  }, [play, mv])

  useEffect(() => {
    if (phase !== 'bar') return
    const c = animate(mv, value, { duration: 1.5, ease: [0.22, 1, 0.36, 1] })
    return () => c.stop()
  }, [phase, value, mv])

  const width = useTransform(mv, (v) => `${v}%`)
  const text = useTransform(mv, (v) => `${Math.round(v)}%`)

  return (
    <div className="relative h-8">
      <AnimatePresence>
        {phase === 'label' && (
          <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center text-sm font-semibold text-sky-300">
            {statusLabel[status] || status}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div animate={{ opacity: phase === 'bar' ? 1 : 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div style={{ width }} className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-300" />
        </div>
        <motion.span className="w-12 text-right text-sm tabular-nums text-neutral-300">{text}</motion.span>
      </motion.div>
    </div>
  )
}

function Slide({ project, i, n, p, isActive }) {
  const seg = 1 / n, a = i * seg, b = (i + 1) * seg, f = seg * 0.15
  let input, output
  if (n === 1) { input = [0, 1]; output = [1, 1] }
  else if (i === 0) { input = [0, b - f, b + f]; output = [1, 1, 0] }
  else if (i === n - 1) { input = [a - f, a + f, 1]; output = [0, 1, 1] }
  else { input = [a - f, a + f, b - f, b + f]; output = [0, 1, 1, 0] }
  const opacity = useTransform(p, input, output)
  const y = useTransform(opacity, [0, 1], [30, 0])

  return (
    <motion.div
      style={{ opacity, y }}
      aria-hidden={!isActive}
      className={`absolute inset-0 flex items-center px-4 pt-14 md:px-8 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-2 md:gap-6">
        <div className="glass flex h-[40vh] flex-col justify-between rounded-[2rem] p-6 md:h-[72vh] md:p-12">
          <div>
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300">{t}</span>
              ))}
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tighter md:mt-6 md:text-7xl">{project.title}</h2>
            <p className="mt-3 max-w-md text-base text-neutral-400 md:mt-5 md:text-xl">{project.summary}</p>
          </div>
          <div className="space-y-4">
            <ProgressBar value={project.progress} status={project.status} play={isActive} />
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200">
                <Github size={16} /> GitHub’da incele
              </a>
            )}
          </div>
        </div>
        <div className="glass h-[30vh] overflow-hidden rounded-[2rem] p-4 md:h-[72vh] md:p-8">
          <Visual project={project} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const n = projects.length
  const [active, setActive] = useState(0)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(p, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))))
  if (!n) return null

  return (
    <section id="projeler" ref={ref} style={{ height: `${n * 130}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {projects.map((pr, i) => (
          <Slide key={pr.slug} project={pr} i={i} n={n} p={p} isActive={active === i} />
        ))}
      </div>
    </section>
  )
}

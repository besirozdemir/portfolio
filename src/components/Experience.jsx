import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Heading from './Heading'
import { experiences } from '../data'

const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
const fmt = (s) => { const [y, m] = s.split('-'); return `${months[+m - 1]} ${y}` }
const duration = (a, b) => {
  const [y1, m1] = a.split('-').map(Number), [y2, m2] = b.split('-').map(Number)
  const t = (y2 - y1) * 12 + (m2 - m1) + 1
  const y = Math.floor(t / 12), m = t % 12
  return [y && `${y} yıl`, m && `${m} ay`].filter(Boolean).join(' ')
}

const sorted = [...experiences].sort((a, b) => b.start.localeCompare(a.start))

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="deneyim" className="mx-auto max-w-4xl px-4 py-32 md:px-8">
      <Heading title="Takımlar & Deneyim" sub="Takımlar, yarışmalar ve atölyeler. En yenisi en üstte." />
      <div ref={ref} className="relative pl-8 md:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-[11px]" />
        <motion.div style={{ scaleY }} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-sky-400 md:left-[11px]" />
        {sorted.map((e) => (
          <motion.article
            key={e.team}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative pb-14 last:pb-0"
          >
            <span className="absolute -left-8 top-2 h-4 w-4 rounded-full border-2 border-sky-400 bg-black md:-left-12 md:h-6 md:w-6" />
            <p className="text-sm text-neutral-500">{fmt(e.start)} – {fmt(e.end)} · {duration(e.start, e.end)}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight md:text-4xl">{e.team}</h3>
            <p className="mt-1 text-sky-300">{e.role}</p>
            <p className="text-neutral-400">{e.event}</p>
            {e.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {e.skills.map((s) => <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300">{s}</span>)}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}

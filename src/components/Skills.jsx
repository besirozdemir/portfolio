import { motion } from 'framer-motion'
import { Brain, Code, Factory, Layers, Plane, Ruler, Wind } from 'lucide-react'
import Heading from './Heading'
import { languages, technical, tools } from '../data'

const icons = { Code, Factory, Layers, Plane, Ruler, Wind }
const levelNames = ['Beginner', 'Intermediate', 'Advanced']
const vp = { once: true, margin: '-60px' }

function ToolRow({ tool, i }) {
  const base = i * 0.4
  const fill = {
    hidden: { scaleX: 0 },
    show: (seg) => ({ scaleX: seg < tool.level ? 1 : 0, transition: { delay: base + seg * 0.18, duration: 0.5, ease: 'easeOut' } }),
  }
  const label = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: base + 0.8, duration: 0.7 } } }
  return (
    <motion.div initial="hidden" whileInView="show" viewport={vp} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2">
      <p className="font-medium">{tool.name}</p>
      <motion.p variants={label} className="text-right text-xs text-sky-300">{tool.label || levelNames[tool.level - 1]}</motion.p>
      <div className="col-span-2 flex gap-1.5">
        {[0, 1, 2].map((seg) => (
          <div key={seg} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div custom={seg} variants={fill} className="h-full origin-left rounded-full bg-gradient-to-r from-sky-500 to-cyan-300" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Violin() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 21C40 21 43 26 41 31C39 35 38 37 41 41C46 46 45 58 32 58C19 58 18 46 23 41C26 37 25 35 23 31C21 26 24 21 32 21Z" />
      <path d="M32 21V7" /><circle cx="32" cy="5" r="2.5" />
      <path d="M27 42q-2 4 0 8M37 42q2 4 0 8M32 50v7" />
      <motion.path d="M8 52L58 34" variants={{ rest: { x: 0 }, hover: { x: [0, 5, -5, 0], transition: { duration: 0.8 } } }} />
    </svg>
  )
}

const interests = [
  { name: 'Keman', node: <Violin /> },
  { name: 'Psikoloji', node: <span className="flex h-14 w-14 items-center justify-center text-5xl font-light leading-none">Ψ</span> },
  { name: 'Nörobilim', node: <Brain size={56} strokeWidth={1.5} /> },
]

const card = 'glass rounded-3xl p-6 md:p-8'

export default function Skills() {
  return (
    <section id="yetenekler" className="mx-auto max-w-7xl px-4 py-32 md:px-8">
      <Heading title="Yetenekler" sub="Kullandığım araçlar, çalıştığım alanlar ve mühendislik dışında beni besleyenler." />
      <div className="grid gap-5 md:grid-cols-2">
        <div className={`${card} md:row-span-2`}>
          <h3 className="mb-6 text-2xl font-bold tracking-tight">Araçlar</h3>
          <div className="space-y-6">{tools.map((t, i) => <ToolRow key={t.name} tool={t} i={i} />)}</div>
        </div>

        <div className={card}>
          <h3 className="mb-5 text-2xl font-bold tracking-tight">Teknik alanlar</h3>
          <div className="flex flex-wrap gap-2.5">
            {technical.map((t, i) => {
              const Icon = icons[t.icon]
              return (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={vp}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm"
                >
                  <Icon size={15} className="text-sky-300" /> {t.label}
                </motion.span>
              )
            })}
          </div>
        </div>

        <div className={card}>
          <h3 className="mb-5 text-2xl font-bold tracking-tight">Diller</h3>
          <div className="space-y-4">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center justify-between">
                <div><p className="font-medium">{l.name}</p><p className="text-sm text-neutral-400">{l.level}</p></div>
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <motion.span key={k} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={vp} transition={{ delay: k * 0.1 }} className={`h-2.5 w-2.5 rounded-full ${k < l.dots ? 'bg-sky-400' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 md:col-span-2">
          {interests.map((it) => (
            <motion.div key={it.name} initial="rest" whileHover="hover" whileInView={{ opacity: 1 }} className={`${card} flex items-center gap-5 text-sky-300`}>
              <motion.div variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: [0, -8, 8, 0], scale: 1.1, transition: { duration: 0.6 } } }}>{it.node}</motion.div>
              <p className="text-xl font-semibold tracking-tight text-white">{it.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

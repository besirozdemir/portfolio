import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Piston from './Piston'
import { rocket } from '../data'

// Her aşamanın görünür olduğu scroll aralığı
const ranges = [
  { input: [0, 0.28, 0.34], output: [1, 1, 0] },
  { input: [0.3, 0.38, 0.62, 0.68], output: [0, 1, 1, 0] },
  { input: [0.64, 0.72, 1], output: [0, 1, 1] },
]

function Stage({ p, range, title, text }) {
  const opacity = useTransform(p, range.input, range.output)
  const y = useTransform(p, range.input, range.output.map((o) => (1 - o) * 30))
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <h3 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h3>
      <p className="mt-3 max-w-md text-base text-neutral-400 md:text-lg">{text}</p>
    </motion.div>
  )
}

function RocketSvg() {
  return (
    <svg viewBox="0 0 120 300" className="h-full">
      <defs>
        <linearGradient id="rk" x1="0" x2="1">
          <stop offset="0" stopColor="#6b7280" />
          <stop offset="0.5" stopColor="#f5f5f7" />
          <stop offset="1" stopColor="#4b5563" />
        </linearGradient>
        <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7b0" />
          <stop offset="0.4" stopColor="#ff9f0a" />
          <stop offset="1" stopColor="#ff453a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M50 214 Q60 296 70 214 Z"
        fill="url(#fl)"
        style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
        animate={{ scaleY: [1, 1.35, 0.9, 1.25, 1] }}
        transition={{ duration: 0.35, repeat: Infinity }}
      />
      <path d="M35 160 L10 215 L35 200 Z M85 160 L110 215 L85 200 Z" fill="#9ca3af" />
      <path d="M60 10 C85 50 90 110 85 200 L35 200 C30 110 35 50 60 10 Z" fill="url(#rk)" />
      <circle cx="60" cy="95" r="12" fill="#0b1220" stroke="#5ac8fa" strokeWidth="3" />
      <rect x="48" y="200" width="24" height="14" rx="2" fill="#374151" />
    </svg>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const rocketY = useTransform(p, [0, 1], [90, -130])
  const bar = useTransform(p, [0, 1], [0, 1])

  return (
    <section id="projeler" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center px-4 pt-14 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-2 md:gap-6">
          {/* Sol: roket */}
          <div className="glass relative h-[38vh] overflow-hidden rounded-[2rem] p-6 md:h-[72vh] md:p-12">
            <p className="text-sm font-medium text-sky-300">Öne çıkan proje</p>
            <h2 className="mt-2 text-4xl font-black tracking-tighter md:text-7xl">{rocket.name}</h2>
            <div className="relative mt-5 h-40 md:mt-10 md:h-56">
              {rocket.stages.map((s, i) => (
                <Stage key={s.title} p={p} range={ranges[i]} title={s.title} text={s.text} />
              ))}
            </div>
            <motion.div style={{ y: rocketY }} className="absolute bottom-0 right-6 h-[45%] md:right-14 md:h-[55%]">
              <RocketSvg />
            </motion.div>
            <motion.div style={{ scaleX: bar }} className="absolute inset-x-0 bottom-0 h-1 origin-left bg-sky-400" />
          </div>

          {/* Sağ: piston */}
          <div className="glass relative flex h-[38vh] flex-col overflow-hidden rounded-[2rem] p-6 md:h-[72vh] md:p-10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight md:text-4xl">Piston Mekanizması</h3>
              <p className="mt-1 text-sm text-neutral-400 md:text-base">Krank-biyel sistemi, gerçek kinematikle çalışır.</p>
            </div>
            <div className="min-h-0 flex-1"><Piston /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

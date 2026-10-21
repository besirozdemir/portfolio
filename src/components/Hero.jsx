import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data'
import { photo } from '../lib/content'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const scale = useTransform(p, [0, 1], [1, 0.55])
  const opacity = useTransform(p, [0, 0.75], [1, 0])
  const y = useTransform(p, [0, 1], [0, -140])
  const bgY = useTransform(p, [0, 1], [0, 220])
  const bgRotate = useTransform(p, [0, 1], [0, 40])

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* mekanik mesh arka plan */}
        <motion.div style={{ y: bgY, rotate: bgRotate }} className="absolute inset-0 flex items-center justify-center">
          <motion.svg
            viewBox="0 0 800 800"
            className="h-[140vmin] w-[140vmin] opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
          >
            <defs>
              <radialGradient id="fade" cx="50%" cy="50%" r="50%">
                <stop offset="30%" stopColor="#fff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="m"><rect width="800" height="800" fill="url(#fade)" /></mask>
            </defs>
            <g mask="url(#m)" fill="none" stroke="#5ac8fa" strokeOpacity="0.35">
              {[80, 140, 200, 260, 320, 380].map((r, i) => (
                <circle key={r} cx="400" cy="400" r={r} strokeDasharray={i % 2 ? '2 10' : '40 14'} />
              ))}
              {Array.from({ length: 36 }).map((_, i) => (
                <line key={i} x1="400" y1="400" x2={400 + 390 * Math.cos((i * Math.PI) / 18)} y2={400 + 390 * Math.sin((i * Math.PI) / 18)} strokeOpacity="0.12" />
              ))}
            </g>
          </motion.svg>
        </motion.div>
        <div className="absolute h-[60vmin] w-[60vmin] rounded-full bg-sky-500/10 blur-[120px]" />

        <motion.div style={{ scale, opacity, y }} className="relative z-10 px-4 text-center">
          {photo && (
            <motion.img
              src={photo}
              alt={`${profile.first} ${profile.last}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-6 h-24 w-24 rounded-full object-cover ring-2 ring-white/20 ring-offset-4 ring-offset-black md:h-36 md:w-36"
            />
          )}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-b from-white via-white to-neutral-600 bg-clip-text text-[clamp(3.5rem,16vw,15rem)] font-black leading-[0.88] tracking-tighter text-transparent"
          >
            {profile.first}
            <br />
            {profile.last}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-6 text-xl font-medium tracking-tight text-neutral-300 md:text-4xl"
          >
            {profile.title}
          </motion.p>
        </motion.div>

        <motion.div style={{ opacity }} className="absolute bottom-8 text-sm text-neutral-500">
          Aşağı kaydır
        </motion.div>
      </div>
    </section>
  )
}

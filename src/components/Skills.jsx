import { motion } from 'framer-motion'
import { Activity, Box, Flame, Rocket, Sigma, Wrench } from 'lucide-react'
import Heading from './Heading'
import { skills } from '../data'

const icons = { Activity, Box, Flame, Rocket, Sigma, Wrench }

export default function Skills() {
  return (
    <section id="yetenekler" className="mx-auto max-w-7xl px-4 py-32 md:px-8">
      <Heading title="Yetenekler" sub="Her gün kullandığım araçlar ve alanlar." />
      <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:auto-rows-[190px] md:grid-cols-4">
        {skills.map((s, i) => {
          const Icon = icons[s.icon]
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className={`glass flex flex-col justify-between rounded-3xl p-6 ${s.cls}`}
            >
              <Icon className="text-sky-300" size={s.cls.includes('row-span-2') ? 44 : 28} />
              <div>
                <h3 className={`font-bold tracking-tight ${s.cls.includes('row-span-2') ? 'text-4xl md:text-5xl' : 'text-xl md:text-2xl'}`}>{s.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{s.text}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

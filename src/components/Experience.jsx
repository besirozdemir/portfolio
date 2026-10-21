import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Heading from './Heading'
import { experiences } from '../data'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="deneyim" className="mx-auto max-w-4xl px-4 py-32 md:px-8">
      <Heading title="Deneyim" sub="Staj, takım ve bağımsız çalışmalar." />
      <div ref={ref} className="relative pl-8 md:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-[11px]" />
        <motion.div style={{ scaleY }} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-sky-400 md:left-[11px]" />
        {experiences.map((e) => (
          <motion.article
            key={e.role}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative pb-16 last:pb-0"
          >
            <span className="absolute -left-8 top-2 h-4 w-4 rounded-full border-2 border-sky-400 bg-black md:-left-12 md:h-6 md:w-6" />
            <p className="text-sm text-neutral-500">{e.date}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight md:text-4xl">{e.role}</h3>
            <p className="text-sky-300">{e.place}</p>
            <p className="mt-3 max-w-xl text-neutral-400 md:text-lg">{e.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

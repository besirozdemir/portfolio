import { motion } from 'framer-motion'

export default function Heading({ title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16"
    >
      <h2 className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-5xl font-black tracking-tighter text-transparent md:text-8xl">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-xl text-lg text-neutral-400 md:text-xl">{sub}</p>}
    </motion.div>
  )
}

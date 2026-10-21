import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Heading from './Heading'
import { gallery, programs } from '../lib/content'

export default function GalleryTeaser() {
  const latest = gallery.slice(0, 3)
  return (
    <section id="galeri" className="mx-auto max-w-7xl px-4 py-32 md:px-8">
      <Heading title="3D Tasarım Galerisi" sub={`${gallery.length} parça, ${programs.length} farklı program.`} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="glass grid gap-8 rounded-[2rem] p-6 md:grid-cols-2 md:p-12"
      >
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-wrap gap-2">
            {programs.map((pr) => (
              <Link key={pr.slug} to={`/galeri?p=${pr.slug}`} className="glass rounded-full px-4 py-2 text-sm hover:bg-white/10">
                {pr.label} <span className="text-neutral-500">{pr.count}</span>
              </Link>
            ))}
          </div>
          <Link to="/galeri" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200">
            Galeriyi aç <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {latest.map((g) => (
            <Link key={`${g.program}/${g.slug}`} to={`/galeri?p=${g.program}`} className="aspect-square overflow-hidden rounded-2xl bg-neutral-900">
              {g.thumb && <img src={g.thumb} alt={g.title} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-110" />}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

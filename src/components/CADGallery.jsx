import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Play, X } from 'lucide-react'
import Heading from './Heading'
import { cadItems, socials } from '../data'

const faces = [
  'rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)',
]

function Cube({ active }) {
  const rot = useMotionValue(30)
  useAnimationFrame((_, d) => { if (active) rot.set(rot.get() + d * 0.08) })
  return (
    <div style={{ perspective: 600 }} className="flex h-full items-center justify-center">
      <motion.div style={{ rotateY: rot, rotateX: -24, transformStyle: 'preserve-3d', width: 90, height: 90, position: 'relative' }}>
        {faces.map((f) => (
          <div
            key={f}
            style={{ transform: `${f} translateZ(45px)`, position: 'absolute', inset: 0 }}
            className="border border-sky-300/60 bg-sky-400/5"
          />
        ))}
      </motion.div>
    </div>
  )
}

function Card({ item, onOpen }) {
  const [hover, setHover] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { setHover(false); mx.set(0); my.set(0) }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHover(true)}
      onMouseMove={move}
      onMouseLeave={leave}
      onFocus={() => setHover(true)}
      onBlur={leave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="glass group overflow-hidden rounded-3xl text-left"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
        {item.youtubeId && (
          <img src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" />
        )}
        {hover && item.youtubeId ? (
          <iframe
            title={item.title}
            className="pointer-events-none absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtubeId}&modestbranding=1`}
            allow="autoplay; encrypted-media"
          />
        ) : (
          !item.youtubeId && <Cube active={hover} />
        )}
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition group-hover:opacity-100">
          <Play size={16} fill="currentColor" />
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium text-sky-300">{item.tool}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-1 text-sm text-neutral-400">{item.text}</p>
      </div>
    </motion.button>
  )
}

export default function CADGallery() {
  const [open, setOpen] = useState(null)

  const handleOpen = (item) => {
    if (item.youtubeId) setOpen(item)
    else window.open(socials.youtube, '_blank', 'noopener')
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="galeri" className="mx-auto max-w-7xl px-4 py-32 md:px-8">
      <Heading title="3D Tasarım Galerisi" sub="SolidWorks ile çizilen parçalar. Üzerine gel, döndür; tıkla, videosunu izle." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cadItems.map((item) => <Card key={item.title} item={item} onOpen={handleOpen} />)}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
            >
              <iframe
                title={open.title}
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${open.youtubeId}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
              <button onClick={() => setOpen(null)} aria-label="Kapat" className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black">
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

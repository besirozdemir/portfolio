import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Download, Play, X } from 'lucide-react'
import Heading from '../components/Heading'
import GalleryCard from '../components/GalleryCard'
import ModelViewer from '../components/ModelViewer'
import ThumbMedia from '../components/ThumbMedia'
import { gallery, programs } from '../lib/content'

function Modal({ item, onClose }) {
  const [video, setVideo] = useState(false)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()} className="glass relative w-full max-w-4xl overflow-hidden rounded-3xl bg-neutral-950">
        <div className="aspect-video w-full bg-gradient-to-br from-neutral-900 to-black">
          {video && item.youtube ? (
            <iframe title={item.title} className="h-full w-full" src={`https://www.youtube.com/embed/${item.youtube}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
          ) : item.model ? (
            <ModelViewer src={item.model} />
          ) : (
            <ThumbMedia item={item} controls />
          )}
        </div>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium text-sky-300">{item.programLabel}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{item.title}</h3>
            {item.text && <p className="mt-2 max-w-xl text-neutral-400">{item.text}</p>}
            {item.model && !video && <p className="mt-2 text-xs text-neutral-500">Sürükleyerek döndür, kaydırarak yakınlaştır.</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.youtube && (
              <button onClick={() => setVideo((v) => !v)} className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200">
                <Play size={15} fill="currentColor" /> {video ? '3D modele dön' : 'Videoyu izle'}
              </button>
            )}
            {item.source && (
              <a href={item.source} download className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                <Download size={15} /> CAD dosyası
              </a>
            )}
          </div>
        </div>
        <button onClick={onClose} aria-label="Kapat" className="absolute right-3 top-3 rounded-full bg-black/70 p-2 hover:bg-black"><X size={18} /></button>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [params, setParams] = useSearchParams()
  const current = params.get('p') || 'all'
  const [open, setOpen] = useState(null)
  const items = current === 'all' ? gallery : gallery.filter((g) => g.program === current)
  const choose = (slug) => (slug === 'all' ? setParams({}) : setParams({ p: slug }))

  const chip = (active) => `rounded-full px-4 py-2 text-sm font-medium transition ${active ? 'bg-white text-black' : 'glass text-neutral-300 hover:bg-white/10'}`

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-32 pt-28 md:px-8">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"><ArrowLeft size={16} /> Ana sayfa</Link>
      <Heading title="3D Tasarım Galerisi" sub="Programa göre filtrele, parçanın üzerine gel ve döndür." />

      <div className="sticky top-12 z-20 -mx-4 mb-8 flex gap-2 overflow-x-auto bg-black/70 px-4 py-3 backdrop-blur-md md:mx-0 md:px-0">
        <button onClick={() => choose('all')} className={chip(current === 'all')}>Tümü <span className="opacity-60">{gallery.length}</span></button>
        {programs.map((pr) => (
          <button key={pr.slug} onClick={() => choose(pr.slug)} className={chip(current === pr.slug)}>
            {pr.label} <span className="opacity-60">{pr.count}</span>
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-neutral-500">Henüz parça yok. <code>src/content/gallery</code> klasörüne ekleyebilirsin.</p>
      ) : (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => <GalleryCard key={`${item.program}/${item.slug}`} item={item} onOpen={setOpen} />)}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>{open && <Modal item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </main>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box } from 'lucide-react'
import ModelViewer from './ModelViewer'

export default function GalleryCard({ item, onOpen }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="glass group overflow-hidden rounded-3xl text-left"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
        {item.thumb ? (
          <img src={item.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-600"><Box size={48} /></div>
        )}
        {hover && item.model && (
          <div className="absolute inset-0 bg-black/85"><ModelViewer src={item.model} controls={false} /></div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-medium text-sky-300">{item.programLabel}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight">{item.title}</h3>
        {item.text && <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{item.text}</p>}
      </div>
    </motion.button>
  )
}

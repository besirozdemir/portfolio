import { useEffect, useRef, useState } from 'react'
import { Box } from 'lucide-react'

// Video varsa: ekranda göründüğünde yüklenir ve döngüde oynar, görünmezse durur.
// Yoksa fotoğraf, o da yoksa yer tutucu ikon gösterir.
export default function ThumbMedia({ item, controls = false, className = 'absolute inset-0 h-full w-full object-cover' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); v.play().catch(() => {}) } else v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [item.video])

  if (item.video) {
    return (
      <video
        ref={ref}
        src={seen || controls ? item.video : undefined}
        poster={item.thumb}
        muted loop playsInline autoPlay
        controls={controls}
        preload="metadata"
        className={controls ? 'h-full w-full object-contain' : className}
      />
    )
  }
  if (item.thumb) return <img src={item.thumb} alt={item.title} loading="lazy" className={controls ? 'h-full w-full object-contain' : className} />
  return <div className="absolute inset-0 flex items-center justify-center text-neutral-600"><Box size={48} /></div>
}

import { motion } from 'framer-motion'

export default function Rocket() {
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="flex h-full items-center justify-center">
      <svg viewBox="0 0 120 300" className="h-[90%]" role="img" aria-label="Roket çizimi">
        <defs>
          <linearGradient id="rk" x1="0" x2="1"><stop offset="0" stopColor="#6b7280" /><stop offset="0.5" stopColor="#f5f5f7" /><stop offset="1" stopColor="#4b5563" /></linearGradient>
          <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff7b0" /><stop offset="0.4" stopColor="#ff9f0a" /><stop offset="1" stopColor="#ff453a" stopOpacity="0" /></linearGradient>
        </defs>
        <motion.path d="M50 214 Q60 296 70 214 Z" fill="url(#fl)" style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }} animate={{ scaleY: [1, 1.35, 0.9, 1.25, 1] }} transition={{ duration: 0.35, repeat: Infinity }} />
        <path d="M35 160 L10 215 L35 200 Z M85 160 L110 215 L85 200 Z" fill="#9ca3af" />
        <path d="M60 10 C85 50 90 110 85 200 L35 200 C30 110 35 50 60 10 Z" fill="url(#rk)" />
        <circle cx="60" cy="95" r="12" fill="#0b1220" stroke="#5ac8fa" strokeWidth="3" />
        <rect x="48" y="200" width="24" height="14" rx="2" fill="#374151" />
      </svg>
    </motion.div>
  )
}

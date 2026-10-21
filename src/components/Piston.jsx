import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion'

const R = 40, L = 120, CX = 150, CY = 320

export default function Piston() {
  const theta = useMotionValue(0)
  useAnimationFrame((t) => theta.set((t / 1000) * 5))

  const pinX = useTransform(theta, (a) => CX + R * Math.sin(a))
  const pinY = useTransform(theta, (a) => CY - R * Math.cos(a))
  const cwX = useTransform(theta, (a) => CX - R * 0.9 * Math.sin(a))
  const cwY = useTransform(theta, (a) => CY + R * 0.9 * Math.cos(a))
  const wristY = useTransform(theta, (a) => CY - (R * Math.cos(a) + Math.sqrt(L * L - R * R * Math.sin(a) ** 2)))
  const topY = useTransform(wristY, (y) => y - 45)
  const ring1 = useTransform(topY, (y) => y + 12)
  const ring2 = useTransform(topY, (y) => y + 20)
  const chamberH = useTransform(topY, (y) => Math.max(0, y - 96))
  const glow = useTransform(theta, (a) => Math.max(0, (Math.cos(a) - 0.8) / 0.2) * 0.95)

  return (
    <svg viewBox="0 0 300 400" className="h-full w-full" role="img" aria-label="Çalışan piston mekanizması animasyonu">
      <defs>
        <linearGradient id="steel" x1="0" x2="1">
          <stop offset="0" stopColor="#6b7280" />
          <stop offset="0.45" stopColor="#e5e7eb" />
          <stop offset="1" stopColor="#4b5563" />
        </linearGradient>
        <linearGradient id="block" x1="0" x2="1">
          <stop offset="0" stopColor="#1f2937" />
          <stop offset="1" stopColor="#0b0f14" />
        </linearGradient>
        <radialGradient id="fire" cx="50%" cy="0%" r="100%">
          <stop offset="0" stopColor="#fff7b0" />
          <stop offset="0.5" stopColor="#ff9f0a" />
          <stop offset="1" stopColor="#ff453a" />
        </radialGradient>
      </defs>

      {/* blok */}
      <rect x="88" y="70" width="124" height="205" rx="8" fill="url(#block)" stroke="#374151" />
      <rect x="100" y="96" width="100" height="180" fill="#05070a" />
      <rect x="84" y="62" width="132" height="22" rx="6" fill="url(#steel)" opacity="0.9" />
      <circle cx={CX} cy={CY} r="62" fill="#05070a" stroke="#374151" strokeWidth="3" />

      {/* yanma */}
      <motion.rect x="100" y="96" width="100" height={chamberH} fill="url(#fire)" style={{ opacity: glow }} />

      {/* biyel */}
      <motion.line x1={pinX} y1={pinY} x2={CX} y2={wristY} stroke="url(#steel)" strokeWidth="9" strokeLinecap="round" />
      {/* krank + karşı ağırlık */}
      <motion.line x1={cwX} y1={cwY} x2={pinX} y2={pinY} stroke="#9ca3af" strokeWidth="10" strokeLinecap="round" />
      <motion.circle cx={cwX} cy={cwY} r="15" fill="#6b7280" stroke="#d1d5db" />
      <circle cx={CX} cy={CY} r="9" fill="#e5e7eb" />
      <motion.circle cx={pinX} cy={pinY} r="6" fill="#5ac8fa" />

      {/* piston */}
      <motion.rect x="102" width="96" height="55" rx="5" y={topY} fill="url(#steel)" stroke="#f3f4f6" strokeOpacity="0.4" />
      <motion.line x1="102" x2="198" y1={ring1} y2={ring1} stroke="#111" strokeWidth="2" />
      <motion.line x1="102" x2="198" y1={ring2} y2={ring2} stroke="#111" strokeWidth="2" />
      <motion.circle cx={CX} cy={wristY} r="6" fill="#111" stroke="#9ca3af" />
    </svg>
  )
}

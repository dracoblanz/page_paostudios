import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Wheel({ participants, spinning }) {
  const wheelStyle = useMemo(() => {
    if (!participants || participants.length === 0) return {}
    const n = participants.length
    const step = 360 / n
    const segments = participants.map((_, i)=>`${i*step}deg ${(i+1)*step}deg`).map((range, idx)=>`hsl(${(idx*47)%360} 80% 65%) ${range}`).join(", ")
    return { backgroundImage: `conic-gradient(${segments})` }
  }, [participants])

  return (
    <section className="card-dark p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold section-title">Ruleta</h2>
      <div className="flex flex-col items-center">
        <motion.div animate={spinning ? { rotate: 720 } : { rotate: 0 }} transition={{ type: "tween", duration: 1.2, ease: "easeInOut" }} className="relative h-64 w-64 rounded-full border border-neutral-700 shadow-inner" style={wheelStyle}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="h-6 w-2 rounded-b-full bg-neutral-200" />
          </div>
        </motion.div>
        <p className="mt-2 text-sm muted">La ruleta es visual. El sorteo real usa mezcla criptográfica equitativa.</p>
      </div>
    </section>
  )
}

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FinalSummary({ open, teamNames = [], assignments = [], onClose }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({ particleCount: 180, spread: 90, startVelocity: 55, scalar: 0.9, origin: { y: 0.5 } })
    }).catch(()=>{})
    return () => { document.body.style.overflow = prev }
  }, [open])

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { delayChildren: 0.4, staggerChildren: 0.06 } } }
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="final-summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[120]" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 pointer-events-none">
            <motion.div initial={{ x: '-100%' }} animate={{ x: '-50%' }} exit={{ x: '-100%' }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="absolute left-0 top-0 h-full w-1/2 bg-emerald-950" />
            <motion.div initial={{ x: '100%' }} animate={{ x: '50%' }} exit={{ x: '100%' }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="absolute right-0 top-0 h-full w-1/2 bg-emerald-950" />
          </div>
          <div className="relative z-[121] flex h-full w-full items-center justify-center p-6">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ delay: 0.55, duration: 0.35 }} className="w-full max-w-6xl rounded-3xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl text-neutral-100">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest muted">Resumen</div>
                <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-emerald-400">Todos los equipos</h2>
              </div>
              <motion.div variants={container} initial="hidden" animate="show" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamNames.map((name, idx) => (
                  <motion.div key={idx} variants={item} className="card-dark p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{name ?? `Equipo ${idx + 1}`}</h3>
                      <span className="text-xs muted">{assignments[idx]?.length || 0} jugador(es)</span>
                    </div>
                    <ul className="list-disc list-inside text-sm">
                      {(assignments[idx] || []).map(m => <li key={m}>{m}</li>)}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-6 text-center">
                <button onClick={onClose} className="btn-dark focus-ring px-4 py-2">Cerrar</button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

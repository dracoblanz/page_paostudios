import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TeamReveal({ open, team, teamName, onClose, onNext, hasNext }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    import('canvas-confetti').then(({ default: confetti }) => {
      const shoot = () => confetti({ spread: 70, startVelocity: 45, particleCount: 90, origin: { y: 0.6 } })
      shoot(); setTimeout(() => confetti({ spread: 100, startVelocity: 55, scalar: 0.9, particleCount: 120, origin: { y: 0.4 } }), 250)
    }).catch(()=>{})
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[100]" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 pointer-events-none">
            <motion.div initial={{ x: '-100%' }} animate={{ x: '-50%' }} exit={{ x: '-100%' }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="absolute left-0 top-0 h-full w-1/2 bg-[#593D7F]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: '50%' }} exit={{ x: '100%' }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="absolute right-0 top-0 h-full w-1/2 bg-[#593D7F]" />
          </div>
          <div className="relative z-[101] flex h-full w-full items-center justify-center p-6">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ delay: 0.55, duration: 0.35 }} className="w-full max-w-3xl rounded-3xl border border-neutral-700 bg-neutral-900 p-8 shadow-2xl text-neutral-100">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest muted">Equipo</div>
                <h2 className="mt-1 text-4xl font-extrabold text-[#593D7F]">{teamName}</h2>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-lg">
                  {(team || []).map((m) => (<li key={m} className="card-dark p-2">{m}</li>))}
                </ul>
                <div className="mt-8 flex items-center justify-center gap-3">
                  {hasNext && (<button onClick={onNext} className="btn-dark focus-ring px-4 py-2 font-semibold">Siguiente equipo →</button>)}
                  <button onClick={onClose} className="btn-dark focus-ring px-4 py-2">{hasNext ? 'Omitir' : 'Cerrar'}</button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

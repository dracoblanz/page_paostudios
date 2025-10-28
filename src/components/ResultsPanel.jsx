import React from 'react'
import { Download } from 'lucide-react'

export default function ResultsPanel({ resultRef, teamCount, teamNames, assignments, onCapture }) {
  return (
    <section className="card-dark p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold section-title">Resultado</h2>
      <div ref={resultRef} className="rounded-xl border border-neutral-700 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: teamCount }, (_, i) => (
            <div key={i} className="card-dark p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-semibold section-title">{teamNames[i] ?? `Equipo ${i + 1}`}</h3>
                <span className="text-xs muted">{assignments[i]?.length || 0} jugador(es)</span>
              </div>
              <ul className="list-disc list-inside text-sm">
                {(assignments[i] || []).map((p) => (<li key={p}>{p}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={onCapture} className="btn-dark focus-ring inline-flex items-center gap-2 px-3 py-2"><Download className="h-4 w-4"/> Descargar imagen del resultado</button>
      </div>
    </section>
  )
}

import React from 'react'
import { Settings, Shuffle } from 'lucide-react'

export default function TeamSettings({ teamCount, updateTeamCount, teamNames, setTeamNames, canDraw, onDraw }) {
  return (
    <section className="card-dark p-4 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold section-title"><Settings className="h-5 w-5"/> Configuración</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Cantidad de equipos</label>
          <input type="number" min={1} value={teamCount} onChange={(e)=>updateTeamCount(Number(e.target.value))} className="input-dark"/>
        </div>
        <div className="flex items-end">
          <button onClick={onDraw} className="btn-dark focus-ring w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-medium transition" disabled={!canDraw}>
            <Shuffle className="h-4 w-4"/> Sortear al azar
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: teamCount }, (_, i) => (
          <div key={i}>
            <label className="text-sm font-medium">Nombre del equipo {i + 1}</label>
            <input type="text" value={teamNames[i] ?? `Equipo ${i + 1}`} onChange={(e)=>{
              const v = e.target.value; setTeamNames(prev=>{ const arr = prev.slice(); arr[i]=v; return arr; })
            }} className="input-dark"/>
          </div>
        ))}
      </div>
    </section>
  )
}

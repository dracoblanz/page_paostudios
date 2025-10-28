import React, { useMemo, useState } from 'react'
import { Users, Plus } from 'lucide-react'

export default function ParticipantsInput({ list, setList }) {
  const [rawInput, setRawInput] = useState('')
  const parsed = useMemo(() => rawInput.split(/\n|,/).map(s => s.trim()).filter(Boolean), [rawInput])
  const apply = () => { const unique = Array.from(new Set([...(list||[]), ...parsed])); setList(unique); setRawInput('') }
  const removeParticipant = (name) => setList(list.filter(p => p !== name))
  return (
    <section className="card-dark p-4 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold section-title"><Users className="h-5 w-5"/> Participantes</h2>
      <textarea value={rawInput} onChange={(e)=>setRawInput(e.target.value)} placeholder={"Pegá nombres separados con enter o con comas."} className="input-dark min-h-[140px]"/>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button onClick={apply} className="btn-dark focus-ring inline-flex items-center gap-2 px-3 py-2"><Plus className="h-4 w-4"/> Aplicar a la lista ({parsed.length})</button>
        {parsed.length>0 && <span className="text-sm muted">Se agregarán valores únicos</span>}
      </div>
      {list?.length>0 && <div className="mt-4 flex flex-wrap gap-2">{list.map(p=>(<span key={p} className="chip">{p}<button onClick={()=>removeParticipant(p)} className="opacity-70 hover:opacity-100">×</button></span>))}</div>}
    </section>
  )
}

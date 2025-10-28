import React, { useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Tournament from './pages/Tournament.jsx'
import ParticipantsInput from './components/ParticipantsInput.jsx'
import TeamSettings from './components/TeamSettings.jsx'
import Wheel from './components/Wheel.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import TeamReveal from './components/TeamReveal.jsx'
import FinalSummary from './components/FinalSummary.jsx'
import useTeamRouletteState from './hooks/useTeamRouletteState.js'
import { captureNodeAsPng } from './utils/capture.js'
import RuletaAsignacion from "./pages/RuletaAsignacion.jsx";
import SerieDetalle from "./pages/SerieDetalle";

function RoulettePage() {
  const state = useTeamRouletteState()
  const { participants, setParticipants, teamCount, updateTeamCount, teamNames, setTeamNames, assignments, spinning, error, drawTeams } = state

  const [showReveal, setShowReveal] = React.useState(false)
  const [revealIndex, setRevealIndex] = React.useState(0)
  const [enableReveal, setEnableReveal] = React.useState(true)
  const [showSummary, setShowSummary] = React.useState(false)

  const resultRef = useRef(null)
  const handleCapture = async () => { if (!resultRef.current) return; try { await captureNodeAsPng(resultRef.current) } catch (e) { console.error(e) } }

  React.useEffect(() => {
    if (enableReveal && Array.isArray(assignments) && assignments.length > 0) {
      setRevealIndex(0)
      setShowSummary(false)
      setShowReveal(true)
    }
  }, [assignments, enableReveal])

  const closeReveal = () => {
    if (revealIndex >= teamCount - 1 && (assignments?.length ?? 0) > 0) {
      setShowReveal(false)
      setShowSummary(true)
    } else {
      setShowReveal(false)
    }
  }

  const nextReveal = () => {
    setRevealIndex((i) => {
      const next = i + 1
      if (next >= teamCount) {
        setShowReveal(false)
        setShowSummary(true)
        return i
      }
      return next
    })
  }

  const closeSummary = () => setShowSummary(false)
  const currentTeam = assignments?.[revealIndex] || []
  const currentName = teamNames?.[revealIndex] ?? `Equipo ${revealIndex + 1}`

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold section-title">Ruleta de Equipos</h1>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={enableReveal} onChange={(e)=>setEnableReveal(e.target.checked)} />
            <span className="muted">Mostrar animación</span>
          </label>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParticipantsInput list={participants} setList={setParticipants} />
          <section className="space-y-6">
            <TeamSettings teamCount={teamCount} updateTeamCount={updateTeamCount} teamNames={teamNames} setTeamNames={setTeamNames} canDraw={participants.length > 0} onDraw={drawTeams} />
            <Wheel participants={participants} spinning={spinning} />
          </section>
          <div className="lg:col-span-2">
            <ResultsPanel resultRef={resultRef} teamCount={teamCount} teamNames={teamNames} assignments={assignments} onCapture={handleCapture} />
          </div>
        </div>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <TeamReveal key={revealIndex} open={showReveal} team={currentTeam} teamName={currentName} onClose={closeReveal} onNext={nextReveal} hasNext={revealIndex < teamCount - 1} />
        <FinalSummary key={String(showSummary)} open={showSummary} teamNames={teamNames} assignments={assignments} onClose={closeSummary} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps/ruleta" element={<RoulettePage />} />
        <Route path="/apps/torneo" element={<Tournament />} />
        <Route path="/apps/sorteo" element={<RuletaAsignacion />} />
        <Route path="/series/:slug" element={<SerieDetalle />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

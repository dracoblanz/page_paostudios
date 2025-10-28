import { useCallback, useState } from 'react'
import { cryptoShuffle, clamp } from '../utils/random.js'

export default function useTeamRouletteState() {
  const [participants, setParticipants] = useState([])
  const [teamCount, setTeamCount] = useState(2)
  const [teamNames, setTeamNames] = useState(['Equipo 1', 'Equipo 2'])
  const [assignments, setAssignments] = useState([])
  const [spinning, setSpinning] = useState(false)
  const [error, setError] = useState('')

  const ensureTeamNames = useCallback((count) => {
    setTeamNames(prev => Array.from({ length: count }, (_, i) => prev[i] || `Equipo ${i + 1}`))
  }, [])

  const updateTeamCount = useCallback((n) => {
    const bounded = clamp(Math.floor(n || 1), 1, Math.max(1, participants.length || 1))
    setTeamCount(bounded)
    ensureTeamNames(bounded)
  }, [participants.length, ensureTeamNames])

  const drawTeams = useCallback(async () => {
    setError('')
    if (participants.length === 0) { setError('Agregá participantes primero.'); return }
    if (teamCount > participants.length) { setError('No puede haber más equipos que participantes.'); return }

    const shuffled = cryptoShuffle(participants)
    const teams = Array.from({ length: teamCount }, () => [])
    for (let i = 0; i < shuffled.length; i++) teams[i % teamCount].push(shuffled[i])

    setSpinning(true)
    setAssignments([])
    await new Promise(r => setTimeout(r, 900))
    setAssignments(teams)
    await new Promise(r => setTimeout(r, 1200))
    setSpinning(false)
  }, [participants, teamCount])

  const clearAll = useCallback(() => {
    setParticipants([]); setAssignments([]); setTeamCount(2); setTeamNames(['Equipo 1', 'Equipo 2']); setError('')
  }, [])

  return { participants, setParticipants, teamCount, updateTeamCount, teamNames, setTeamNames, assignments, setAssignments, spinning, setSpinning, error, setError, drawTeams, clearAll }
}

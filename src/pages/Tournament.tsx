import React, { useMemo, useState } from "react";
type Slot = { id: string; name: string; bye?: boolean };
type Match = { id: string; a: Slot | null; b: Slot | null; winner: Slot | null };
type Round = { id: string; matches: Match[] };
function uid(prefix = "id"): string { return `${prefix}_${Math.random().toString(36).slice(2, 9)}`; }
function nextPow2(n: number) { let p = 1; while (p < n) p <<= 1; return p; }
function pairUp(slots: Slot[]): Match[] { const matches: Match[] = []; for (let i = 0; i < slots.length; i += 2) { matches.push({ id: uid("m"), a: slots[i] ?? null, b: slots[i + 1] ?? null, winner: null }); } return matches; }
function autoAdvanceByes(round: Round) { round.matches.forEach((m) => { const aBye = m.a?.bye; const bBye = m.b?.bye; if (m.a && m.b) { if (aBye && !bBye) m.winner = m.b; if (bBye && !aBye) m.winner = m.a; } else if (m.a && !m.b) { m.winner = m.a; } else if (!m.a && m.b) { m.winner = m.b; } }); }
export const Tournament: React.FC = () => {
  const [rawNames, setRawNames] = useState(""); const [count, setCount] = useState(8); const [rounds, setRounds] = useState<Round[] | null>(null);
  const parsedNames = useMemo(() => rawNames.split(/\r?\n/).map((s) => s.trim()).filter(Boolean), [rawNames]);
  const generate = () => {
    const names = parsedNames.length > 0 ? parsedNames : Array.from({ length: Math.max(2, count) }, (_, i) => `Jugador ${i + 1}`);
    const target = nextPow2(names.length); const byesNeeded = target - names.length;
    const base: Slot[] = [...names.map((n) => ({ id: uid("p"), name: n })), ...Array.from({ length: byesNeeded }, () => ({ id: uid("bye"), name: "BYE", bye: true }))];
    for (let i = base.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [base[i], base[j]] = [base[j], base[i]]; }
    const firstRound: Round = { id: uid("r"), matches: pairUp(base) }; autoAdvanceByes(firstRound);
    const allRounds: Round[] = [firstRound]; let prev = firstRound;
    while (prev.matches.length > 1) { const nextMatches: Match[] = []; for (let i = 0; i < prev.matches.length; i += 2) { nextMatches.push({ id: uid("m"), a: prev.matches[i]?.winner ?? null, b: prev.matches[i + 1]?.winner ?? null, winner: null }); } const nextR: Round = { id: uid("r"), matches: nextMatches }; autoAdvanceByes(nextR); allRounds.push(nextR); prev = nextR; }
    setRounds(allRounds);
  };
  const reset = () => setRounds(null);
  const onPickWinner = (roundIdx: number, matchIdx: number, pick: "a" | "b") => {
    if (!rounds) return;
    const cloned = rounds.map(r => ({ id: r.id, matches: r.matches.map(m => ({ id: m.id, a: m.a, b: m.b, winner: m.winner })) }));
    const round = cloned[roundIdx]; const match = round.matches[matchIdx]; const chosen = pick === "a" ? match.a : match.b; if (!chosen) return;
    match.winner = chosen;
    for (let r = roundIdx + 1; r < cloned.length; r++) {
      const prevRound = cloned[r - 1]; const currRound = cloned[r]; const parentIndex = Math.floor(matchIdx / 2); const isLeftChild = matchIdx % 2 === 0;
      const parent = currRound.matches[parentIndex]; if (!parent) break;
      if (isLeftChild) parent.a = prevRound.matches[parentIndex * 2]?.winner ?? null; else parent.b = prevRound.matches[parentIndex * 2 + 1]?.winner ?? null;
      if (parent.a && parent.b) { if (parent.a.bye && !parent.b.bye) parent.winner = parent.b; else if (parent.b.bye && !parent.a.bye) parent.winner = parent.a; else parent.winner = null; }
      else if (parent.a && !parent.b) parent.winner = parent.a; else if (!parent.a && parent.b) parent.winner = parent.b; else parent.winner = null;
      matchIdx = parentIndex;
    }
    setRounds(cloned);
  };
  return (
    <div className="container" style={{ display: "grid", gap: 16 }}>
      <h1>Torneo (Eliminación directa)</h1>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <label><div style={{ marginBottom: 6 }}>Pegar participantes (uno por línea):</div>
          <textarea className="textarea" rows={6} placeholder="Pikachu\nCharizard\nSquirtle\n..." value={rawNames} onChange={(e) => setRawNames(e.target.value)} />
        </label>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            Cantidad (si no pegás lista):
            <input type="number" min={2} className="input" style={{ width: 100 }} value={count} onChange={(e) => setCount(parseInt(e.target.value || "2", 10))} />
          </label>
          <button className="button" onClick={generate}>Generar bracket</button>
          <button className="button" onClick={reset}>Reiniciar</button>
        </div>
      </div>
      {rounds && (
        <div className="bracket-wrapper">
          {rounds.map((round, rIdx) => (
            <div className="round-column" key={round.id}>
              <h3>Ronda {rIdx + 1}</h3>
              {round.matches.map((m, mIdx) => (
                <div className="match" key={m.id}>
                  <div className={`participant ${m.winner?.id === m.a?.id ? "winner" : ""} ${m.a?.bye ? "bye" : ""}`}
                       onClick={() => onPickWinner(rIdx, mIdx, "a")}
                       style={{ cursor: m.a ? "pointer" : "default" }} title={m.a ? "Elegir como ganador" : ""}>
                    <span>{m.a ? m.a.name : "—"}</span>{m.a && <button>Ganar</button>}
                  </div>
                  <div className={`participant ${m.winner?.id === m.b?.id ? "winner" : ""} ${m.b?.bye ? "bye" : ""}`}
                       onClick={() => onPickWinner(rIdx, mIdx, "b")}
                       style={{ cursor: m.b ? "pointer" : "default", marginTop: 8 }} title={m.b ? "Elegir como ganador" : ""}>
                    <span>{m.b ? m.b.name : "—"}</span>{m.b && <button>Ganar</button>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
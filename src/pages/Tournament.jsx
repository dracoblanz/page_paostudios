import React, { useMemo, useState, useEffect } from "react";

function uid(prefix = "id") { return `${prefix}_${Math.random().toString(36).slice(2, 9)}`; }
function nextPow2(n) { let p = 1; while (p < n) p <<= 1; return p; }
function pairUp(slots) {
  const out = [];
  for (let i = 0; i < slots.length; i += 2) {
    out.push({ id: uid("m"), a: slots[i] ?? null, b: slots[i + 1] ?? null, winner: null });
  }
  return out;
}
function cls(...xs) { return xs.filter(Boolean).join(" "); }

function autoAdvanceByesOneRound(round) {
  round.matches.forEach((m) => {
    const aBye = m.a?.bye, bBye = m.b?.bye;
    if (m.a && m.b) {
      if (aBye && !bBye) m.winner = m.b;
      else if (bBye && !aBye) m.winner = m.a;
      else if (!m.winner) m.winner = null;
    } else if (m.a && !m.b) {
      m.winner = m.a;
    } else if (!m.a && m.b) {
      m.winner = m.b;
    } else {
      m.winner = null;
    }
  });
}

function propagateOneStep(rounds, fromRoundIndex) {
  const nextIdx = fromRoundIndex + 1;
  if (nextIdx >= rounds.length) return;

  const prev = rounds[fromRoundIndex];
  const next = rounds[nextIdx];

  for (let i = 0; i < next.matches.length; i++) {
    const leftChild  = prev.matches[i * 2]     ?? null;
    const rightChild = prev.matches[i * 2 + 1] ?? null;

    const newA = leftChild  ? leftChild.winner  ?? null : null;
    const newB = rightChild ? rightChild.winner ?? null : null;

    const changed = (next.matches[i].a?.id !== newA?.id) || (next.matches[i].b?.id !== newB?.id);
    next.matches[i].a = newA;
    next.matches[i].b = newB;
    if (changed) next.matches[i].winner = null;
  }
}

function buildOptimizedFirstRound(players) {
  const n = players.length;
  const P = nextPow2(n);
  const byes = P - n;
  const m = n - P / 2;
  const realPlayersCount = Math.max(0, m * 2);

  const shuffled = [...players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const playersForRealMatches = shuffled.slice(0, realPlayersCount);
  const playersForByes        = shuffled.slice(realPlayersCount);

  const realMatches = pairUp(playersForRealMatches);
  const byeMatches  = playersForByes.map((p) => ({
    id: uid("m"),
    a: p,
    b: { id: uid("bye"), name: "Libre", bye: true },
    winner: null
  }));

  const firstRound = { id: uid("r"), matches: [...realMatches, ...byeMatches] };
  autoAdvanceByesOneRound(firstRound);
  return firstRound;
}

export default function Tournament() {
  const [raw, setRaw] = useState("");
  const [count, setCount] = useState(8);
  const [rounds, setRounds] = useState(null);
  const [champion, setChampion] = useState(null);

  const parsed = useMemo(
    () => raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean),
    [raw]
  );

  const generate = () => {
    setChampion(null);
    const names = parsed.length ? parsed : Array.from({ length: Math.max(2, count) }, (_, i) => `Jugador ${i + 1}`);
    const players = names.map((n) => ({ id: uid("p"), name: n }));

    const first = buildOptimizedFirstRound(players);

    const all = [first];
    let prev = first;
    while (prev.matches.length > 1) {
      const empty = pairUp(Array.from({ length: prev.matches.length }).map(() => null));
      const nextR = { id: uid("r"), matches: empty };
      all.push(nextR);
      prev = nextR;
    }

    propagateOneStep(all, 0);

    setRounds(all);
  };

  const reset = () => { setRounds(null); setChampion(null); };

  const choose = (roundIdx, matchIdx, side) => {
    setRounds((curr) => {
      if (!curr) return curr;
      setChampion(null);

      const cloned = curr.map((r) => ({
        id: r.id,
        matches: r.matches.map((m) => ({ id: m.id, a: m.a, b: m.b, winner: m.winner })),
      }));

      const round = cloned[roundIdx];
      const match = round.matches[matchIdx];
      const pick = side === "a" ? match.a : match.b;
      if (!pick) return curr;

      match.winner = pick;

      propagateOneStep(cloned, roundIdx);

      if (roundIdx === cloned.length - 1 && matchIdx === 0 && match.winner) {
        setChampion(match.winner);
      } else {
        const last = cloned[cloned.length - 1].matches[0];
        if (last && last.a && last.b && last.winner) setChampion(last.winner);
      }

      return cloned;
    });
  };

  useEffect(() => {
    if (!champion) return;
    const container = document.getElementById("confetti-container");
    if (!container) return;
    const colors = ["#22c55e", "#38bdf8", "#fbbf24", "#ef4444", "#a78bfa"];
    const pieces = 120;
    for (let i = 0; i < pieces; i++) {
      const d = document.createElement("div");
      d.className = "confetti-piece";
      const size = 6 + Math.random() * 6;
      d.style.width = `${size}px`;
      d.style.height = `${size * 0.4}px`;
      d.style.background = colors[Math.floor(Math.random() * colors.length)];
      d.style.left = Math.random() * 100 + "vw";
      d.style.animationDelay = Math.random() * 0.2 + "s";
      d.style.opacity = String(0.7 + Math.random() * 0.3);
      container.appendChild(d);
    }
    const t = setTimeout(() => { container.innerHTML = ""; }, 4000);
    return () => clearTimeout(t);
  }, [champion]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <style>{`
        .confetti-piece {
          position: fixed;
          top: -10px;
          transform: translateY(0) rotate(0deg);
          animation: fall 2.6s linear forwards;
          border-radius: 2px;
          z-index: 60;
        }
        @keyframes fall {
          to { transform: translateY(100vh) rotate(720deg); }
        }
      `}</style>

      <h1 className="text-center text-3xl font-bold text-neutral-100 mb-6">Torneo</h1>

      <div className="mx-auto max-w-3xl border border-neutral-800 rounded-2xl p-4 bg-neutral-900/60 backdrop-blur mb-6">
        <label className="block mb-3">
          <div className="mb-2 text-neutral-300">Pegar participantes:</div>
          <textarea
            rows={6}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-neutral-100"
            placeholder="Colocar un participante por linea"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
        </label>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <label className="inline-flex items-center gap-2 text-neutral-300">
            Cantidad:
            <input
              type="number"
              min={2}
              className="w-24 rounded-lg border border-neutral-700 bg-neutral-900 p-2 text-neutral-100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value || "2", 10))}
            />
          </label>

          <button
            className="px-3 py-2 rounded-xl bg-[#593D7F] border border-[#593D7F] text-neutral-100"
            onClick={generate}
          >
            Generar Tabla
          </button>
          <button
            className="px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
            onClick={reset}
          >
            Reiniciar
          </button>
        </div>
      </div>

      {rounds && (
        <div className="w-full overflow-x-auto pb-3">
          <div className="mx-auto inline-grid gap-6 grid-flow-col auto-cols-fr">
            {rounds.map((round, rIdx) => (
              <div key={round.id} className="flex flex-col gap-4 min-w-[260px]">
                <h3 className="text-center text-lg font-semibold text-neutral-200">Ronda {rIdx + 1}</h3>
                {round.matches.map((m, mIdx) => (
                  <div key={m.id} className="border border-neutral-800 rounded-2xl p-3 bg-neutral-900 shadow-sm">
                    <div
                      className={cls(
                        "p-3 rounded-xl flex items-center justify-between",
                        m.winner?.id === m.a?.id && "ring-2 ring-[#593D7F]",
                        m.a?.bye && "opacity-60 italic"
                      )}
                      onClick={() => m.a && choose(rIdx, mIdx, "a")}
                      style={{ cursor: m.a ? "pointer" : "default" }}
                      title={m.a ? "Elegir como ganador" : ""}
                    >
                      <span className="text-neutral-100">{m.a ? m.a.name : "—"}</span>
                      {m.a && <button className="px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-200">Ganar</button>}
                    </div>

                    <div
                      className={cls(
                        "p-3 mt-3 rounded-xl flex items-center justify-between",
                        m.winner?.id === m.b?.id && "ring-2 ring-[#593D7F]",
                        m.b?.bye && "opacity-60 italic"
                      )}
                      onClick={() => m.b && choose(rIdx, mIdx, "b")}
                      style={{ cursor: m.b ? "pointer" : "default" }}
                      title={m.b ? "Elegir como ganador" : ""}
                    >
                      <span className="text-neutral-100">{m.b ? m.b.name : "—"}</span>
                      {m.b && <button className="px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-200">Ganar</button>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {champion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="text-center px-6 py-5 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-xl">
            <div className="text-sm text-neutral-300 mb-1">¡Campeón!</div>
            <div className="text-3xl font-extrabold text-neutral-50">{champion.name}</div>
          </div>
          <div id="confetti-container" className="pointer-events-none fixed inset-0 z-60" />
        </div>
      )}
    </div>
  );
}

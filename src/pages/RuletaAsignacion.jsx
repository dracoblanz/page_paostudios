import React, { useEffect, useMemo, useRef, useState } from "react";

function uid(p = "id") { return `${p}_${Math.random().toString(36).slice(2, 9)}`; }
const COLORS = ["#34d399","#60a5fa","#fbbf24","#f472b6","#22d3ee","#a78bfa","#fb7185","#c084fc","#4ade80","#f59e0b"];

function cls(...xs){ return xs.filter(Boolean).join(" "); }

export default function RuletaAsignacion() {
  const [rawPlayers, setRawPlayers] = useState("");
  const [rawRewards, setRawRewards] = useState("");
  const [noRepeat, setNoRepeat] = useState(true);

  const [players, setPlayers] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [leftRewards, setLeftRewards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultIdx, setResultIdx] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [finished, setFinished] = useState(false);

  const wheelRef = useRef(null);

  const parsedPlayers = useMemo(
    () => rawPlayers.split(/\r?\n/).map(s => s.trim()).filter(Boolean),
    [rawPlayers]
  );
  const parsedRewards = useMemo(
    () => rawRewards.split(/\r?\n/).map(s => s.trim()).filter(Boolean),
    [rawRewards]
  );

  const anglePer = useMemo(() => {
    const n = rewards.length || 1;
    return 360 / n;
  }, [rewards.length]);

  const currentPlayer = players[idx] ?? null;

  const comenzar = () => {
    const ps = parsedPlayers.map(n => ({ id: uid("p"), name: n }));
    const rs = parsedRewards.map(n => ({ id: uid("r"), name: n }));
    if (ps.length < 1 || rs.length < 1) return;

    setPlayers(ps);
    setRewards(rs);
    setLeftRewards(rs.map(r => r.id));
    setAssignments([]);
    setIdx(0);
    setRotation(0);
    setResultIdx(null);
    setFinished(false);
  };

  const pickRewardIndex = () => {
    if (rewards.length === 0) return 0;
    if (!noRepeat) return Math.floor(Math.random() * rewards.length);

    const left = rewards.map((r, i) => (leftRewards.includes(r.id) ? i : null)).filter(i => i !== null);
    if (left.length === 0) return Math.floor(Math.random() * rewards.length);
    const k = Math.floor(Math.random() * left.length);
    return left[k];
  };

  const girar = () => {
    if (!currentPlayer || spinning || rewards.length < 1) return;
    const k = pickRewardIndex();
    setResultIdx(k);

    const base = rotation % 360;
    const targetCenter = k * anglePer + anglePer / 2;
    const spins = 5;
    const delta = 360 * spins + (360 - targetCenter) - base;
    setSpinning(true);
    setRotation(rotation + delta);
  };

  const onTransitionEnd = () => {
    if (!spinning) return;
    setSpinning(false);

    if (resultIdx == null || !currentPlayer) return;
    const reward = rewards[resultIdx];

    setAssignments(prev => [...prev, { player: currentPlayer.name, reward: reward.name }]);

    if (noRepeat) setLeftRewards(prev => prev.filter(id => id !== reward.id));

    setIdx(prev => {
      const next = prev + 1;
      if (next >= players.length) {
        setFinished(true);
        return prev;
      }
      return next;
    });

    setResultIdx(null);

    confetti();
  };

  const confetti = () => {
    const container = document.getElementById("confetti-ruleta");
    if (!container) return;
    const colors = ["#22c55e", "#38bdf8", "#fbbf24", "#ef4444", "#a78bfa"];
    const pieces = 60;
    for (let i = 0; i < pieces; i++) {
      const d = document.createElement("div");
      d.className = "confetti-piece";
      const size = 4 + Math.random() * 6;
      d.style.width = `${size}px`;
      d.style.height = `${size * 0.4}px`;
      d.style.background = colors[Math.floor(Math.random() * colors.length)];
      d.style.left = Math.random() * 100 + "vw";
      d.style.top = "-10px";
      d.style.animationDelay = Math.random() * 0.25 + "s";
      d.style.opacity = String(0.7 + Math.random() * 0.3);
      container.appendChild(d);
    }
    setTimeout(() => { if (container) container.innerHTML = ""; }, 2500);
  };

  const sectors = useMemo(() => {
    const n = rewards.length;
    if (n === 0) return [];
    const r = 140;
    const center = { x: 150, y: 150 };
    const angle = (2 * Math.PI) / n;

    const arr = [];
    for (let i = 0; i < n; i++) {
      const start = i * angle - Math.PI / 2;
      const end = (i + 1) * angle - Math.PI / 2;
      const x1 = center.x + r * Math.cos(start);
      const y1 = center.y + r * Math.sin(start);
      const x2 = center.x + r * Math.cos(end);
      const y2 = center.y + r * Math.sin(end);
      const largeArc = end - start > Math.PI ? 1 : 0;
      arr.push({
        d: `M ${center.x} ${center.y} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        color: COLORS[i % COLORS.length],
        label: rewards[i].name,
        midAngle: start + angle / 2,
      });
    }
    return arr;
  }, [rewards]);

  useEffect(() => {
    setRotation(0);
    setSpinning(false);
    setResultIdx(null);
    setFinished(false);
  }, [rewards.length]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
      <style>{`
        .confetti-piece {
          position: fixed;
          transform: translateY(0) rotate(0deg);
          animation: fall-ruleta 2s linear forwards;
          border-radius: 2px;
          z-index: 50;
        }
        @keyframes fall-ruleta { to { transform: translateY(100vh) rotate(600deg);} }
      `}</style>
      <div id="confetti-ruleta" className="pointer-events-none fixed inset-0 z-50" />

      <h1 className="text-center text-3xl font-bold text-neutral-100">Sorteo</h1>

      <div className="mx-auto w-full max-w-4xl grid gap-4 border border-neutral-800 rounded-2xl p-4 bg-neutral-900/60">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <div className="mb-2 text-neutral-300">Participantes:</div>
            <textarea
              rows={7}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-neutral-100"
              placeholder="Colocar cada participante por linea"
              value={rawPlayers}
              onChange={(e) => setRawPlayers(e.target.value)}
            />
          </label>
          <label className="block">
            <div className="mb-2 text-neutral-300">Recompensas:</div>
            <textarea
              rows={7}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-neutral-100"
              placeholder="Asignar cada recompensa por linea"
              value={rawRewards}
              onChange={(e) => setRawRewards(e.target.value)}
            />
          </label>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="inline-flex items-center gap-2 text-neutral-300">
            <input
              type="checkbox"
              checked={noRepeat}
              onChange={(e) => setNoRepeat(e.target.checked)}
            />
            No repetir recompensas
          </label>
          <button
            className="px-4 py-2 rounded-xl bg-[#593D7F] border border-[#593D7F] text-neutral-100"
            onClick={comenzar}
          >
            Comenzar
          </button>
        </div>
      </div>

      {players.length > 0 && rewards.length > 0 && (
        <div className="grid lg:grid-cols-[360px,1fr] gap-6 items-start justify-center">
          <div className="relative mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-10">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-[#b37bff] drop-shadow" />
            </div>

            <div
              ref={wheelRef}
              className="w-[300px] h-[300px] rounded-full border border-neutral-700 bg-neutral-800 shadow-inner overflow-hidden"
              style={{
                transition: spinning ? "transform 2.2s cubic-bezier(.17,.67,.12,1)" : "none",
                transform: `rotate(${rotation}deg)`,
              }}
              onTransitionEnd={onTransitionEnd}
            >
              <svg viewBox="0 0 300 300" width="300" height="300">
                {sectors.map((s, i) => (
                  <path key={i} d={s.d} fill={s.color} opacity="0.9" />
                ))}
                {sectors.map((s, i) => {
                  const rText = 100;
                  const x = 150 + rText * Math.cos(s.midAngle);
                  const y = 150 + rText * Math.sin(s.midAngle);
                  return (
                    <text
                      key={`t-${i}`}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      fill="#0b0b0b"
                      style={{ userSelect: "none" }}
                    >
                      {s.label.length > 16 ? s.label.slice(0, 15) + "…" : s.label}
                    </text>
                  );
                })}
              </svg>
            </div>

            <div className="text-center mt-3">
              <button
                onClick={girar}
                disabled={spinning || finished}
                className={cls(
                  "px-4 py-2 rounded-xl border text-neutral-100",
                  spinning
                    ? "border-neutral-700 bg-neutral-800 opacity-60 cursor-not-allowed"
                    : finished
                    ? "border-neutral-700 bg-neutral-800 cursor-not-allowed"
                    : "border-[#b37bff]-500/40 bg-[#b37bff]-600/20 hover:bg-[#b37bff]-600/30"
                )}
              >
                {finished ? "Finalizado" : (spinning ? "Girando..." : "Girar")}
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="border border-neutral-800 rounded-2xl p-4 bg-neutral-900/60">
              <div className="text-sm text-neutral-400 mb-1">Participante actual</div>
              <div className="text-2xl font-bold text-neutral-100">
                {players[idx]?.name ?? "—"}
              </div>
              <div className="text-neutral-400 text-sm mt-2">
                {Math.min(idx + 1, players.length)} de {players.length}
              </div>
            </div>

            <div className="border border-neutral-800 rounded-2xl p-4 bg-neutral-900/60">
              <div className="text-sm text-neutral-400 mb-2">Resultados</div>
              <div className="grid gap-2 max-h-[260px] overflow-auto pr-1">
                {assignments.length === 0 && (
                  <div className="text-neutral-500 italic">Aún no hay asignaciones.</div>
                )}
                {assignments.map((a, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2">
                    <span className="text-neutral-200">{a.player}</span>
                    <span className="text-neutral-400">→</span>
                    <span className="font-semibold text-[#b37bff]">{a.reward}</span>
                  </div>
                ))}
              </div>
            </div>

            {finished && (
              <div className="border border-neutral-800 rounded-2xl p-4 bg-neutral-900/60 text-center">
                <div className="text-sm text-neutral-400 mb-1">Asignación completa</div>
                <div className="text-2xl font-bold text-neutral-100">¡Listo! 🎉</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

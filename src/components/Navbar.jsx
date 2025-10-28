import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || "dark"; } catch { return "dark"; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("theme-light");
      root.classList.remove("theme-dark");
    } else {
      root.classList.add("theme-dark");
      root.classList.remove("theme-light");
    }
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  const [openTools, setOpenTools] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);
  const toolsRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) setOpenTools(false);
      if (socialRef.current && !socialRef.current.contains(e.target)) setOpenSocial(false);
    };
    const onEsc = (e) => { if (e.key === "Escape") { setOpenTools(false); setOpenSocial(false); } };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("keydown", onEsc); };
  }, []);

  const scrollToRedes = () => {
    const el = document.getElementById("redes");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenSocial(false);
  };

  const activeClass = "text-[#b37bff] font-semibold border-b-2 border-[#b37bff] pb-1";
  const inactiveClass = "text-neutral-300 hover:text-[#b37bff] transition-colors pb-1";

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-neutral-900/70 backdrop-blur border-b border-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img
            src="../src/assets/img/logo_pao_dark.png"
            alt="Pao Studios"
            className="h-8 w-auto object-contain logo-light select-none"
          />
          <img
            src="../src/assets/img/logo_pao_light.png"
            alt="Pao Studios"
            className="h-8 w-auto object-contain logo-dark select-none"
          />
        </div>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Inicio
          </NavLink>
          <NavLink to="/">
          <button
            onClick={scrollToRedes}
            className="text-neutral-300 hover:text-[#b37bff] transition-colors pb-1"
          >
            Redes
          </button></NavLink>
          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => { setOpenTools(v => !v); setOpenSocial(false); }}
              className="text-neutral-300 hover:text-[#b37bff] pb-1 inline-flex items-center gap-1"
              aria-haspopup="menu"
              aria-expanded={openTools}
            >
              Herramientas
              <span className={`transition-transform ${openTools ? "rotate-180" : ""}`}>▾</span>
            </button>

            {openTools && (
              <div className="absolute mt-2 w-44 rounded-xl border border-neutral-800 bg-neutral-900/95 shadow-xl p-1">
                <NavLink
                  to="/apps/ruleta"
                  onClick={() => setOpenTools(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg ${isActive ? "text-[#b37bff] bg-[#b37bff]/10" : "text-neutral-200 hover:bg-neutral-800"}`
                  }
                >
                  Ruleta
                </NavLink>
                <NavLink
                  to="/apps/torneo"
                  onClick={() => setOpenTools(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg ${isActive ? "text-[#b37bff] bg-[#b37bff]/10" : "text-neutral-200 hover:bg-neutral-800"}`
                  }
                >
                  Torneo
                </NavLink>
                <NavLink
                  to="/apps/sorteo"
                  onClick={() => setOpenTools(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg ${isActive ? "text-[#b37bff] bg-[#b37bff]/10" : "text-neutral-200 hover:bg-neutral-800"}`
                  }
                >
                  Sorteo
                </NavLink>
              </div>
            )}
          </div>

          {/* 
          <div className="flex items-center gap-3 ml-2">
            <span className="text-neutral-400 text-sm select-none">🌙</span>
            <div
              onClick={toggleTheme}
              className="relative w-14 h-7 flex items-center cursor-pointer rounded-full border border-neutral-600 bg-neutral-800 transition-all duration-300 hover:border-[#b37bff]"
              role="switch"
              aria-checked={theme === "light"}
            >
              <div
                className={`absolute left-1 top-1 w-5 h-5 rounded-full transition-all duration-300 ${
                  theme === "light"
                    ? "translate-x-7 bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]"
                    : "translate-x-0 bg-[#b37bff] shadow-[0_0_6px_rgba(179,123,255,0.8)]"
                }`}
              />
            </div>
            <span className="text-neutral-400 text-sm select-none">☀️</span>
          </div>*/}

        </div>
      </div>
    </nav>
  );
}

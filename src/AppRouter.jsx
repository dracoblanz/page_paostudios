import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Tournament from "./pages/Tournament";
import SerieDetalle from "./pages/SerieDetalle";

const Navbar = () => (
  <nav className="navbar" style={{ position: "sticky", top: 0, zIndex: 50, background: "inherit", borderBottom: "1px solid rgba(127,127,127,.2)" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Inicio</NavLink>
        <NavLink to="/ruleta" className={({ isActive }) => (isActive ? "active" : "")}>Ruleta</NavLink>
        <NavLink to="/torneo" className={({ isActive }) => (isActive ? "active" : "")}>Torneo</NavLink>
      </div>
      <button onClick={() => {
        const html = document.documentElement;
        html.classList.toggle("dark");
      }}>Switch</button>
    </div>
  </nav>
);

const Inicio = () => <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}><h1>Inicio</h1></div>;
const RuletaPlaceholder = () => <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}><h1>Ruleta</h1><p>Reemplazá por tu componente real si ya existe.</p></div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/ruleta" element={<RuletaPlaceholder />} />
        <Route path="/torneo" element={<Tournament />} />
        <Route path="/series/:slug" element={<SerieDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

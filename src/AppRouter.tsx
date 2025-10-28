import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import "./index.theme.css";
import { Tournament } from "./pages/Tournament";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="button" onClick={toggleTheme} aria-label="Cambiar entre blanco y negro">
      {theme === "light" ? "Negro" : "Blanco"}
    </button>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Inicio</NavLink>
          <NavLink to="/ruleta" className={({ isActive }) => (isActive ? "active" : "")}>Ruleta</NavLink>
          <NavLink to="/torneo" className={({ isActive }) => (isActive ? "active" : "")}>Torneo</NavLink>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

const Inicio = () => <div className="container"><h1>Inicio</h1></div>;
const RuletaPlaceholder = () => <div className="container"><h1>Ruleta</h1><p>Reemplazá con tu componente real.</p></div>;

const AppRouter: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ruleta" element={<RuletaPlaceholder />} />
          <Route path="/torneo" element={<Tournament />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;

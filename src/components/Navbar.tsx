import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Inicio</NavLink>
          <NavLink to="/ruleta" className={({ isActive }) => (isActive ? "active" : "")}>Ruleta</NavLink>
          <NavLink to="/torneo" className={({ isActive }) => (isActive ? "active" : "")}>Torneo</NavLink>
        </div>
        <button className="button" onClick={toggleTheme} aria-label="Cambiar entre blanco y negro">
          {theme === "light" ? "Negro" : "Blanco"}
        </button>
      </div>
    </nav>
  );
};
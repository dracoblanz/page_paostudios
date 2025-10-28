import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../theme/ThemeProvider";
import { Navbar } from "../components/Navbar";
import { Tournament } from "../pages/Tournament";
import "../index.theme.css";

const Inicio = () => <div className="container"><h1>Inicio</h1></div>;
const Ruleta = () => <div className="container"><h1>Ruleta</h1></div>;

export default function AppWithThemeRoutes() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ruleta" element={<Ruleta />} />
          <Route path="/torneo" element={<Tournament />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
type Theme = "light" | "dark";
type ThemeContextType = { theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void; };
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useTheme = () => { const ctx = useContext(ThemeContext); if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider"); return ctx; };
const THEME_KEY = "app-theme";
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => { try { const saved = typeof window !== "undefined" ? (localStorage.getItem(THEME_KEY) as Theme | null) : null; return saved ?? "light"; } catch { return "light"; } });
  const setTheme = (t: Theme) => { setThemeState(t); try { if (typeof window !== "undefined") localStorage.setItem(THEME_KEY, t); } catch {} };
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  useEffect(() => { const root = document.documentElement; root.classList.remove("theme-light", "theme-dark"); root.classList.add(theme === "light" ? "theme-light" : "theme-dark"); }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
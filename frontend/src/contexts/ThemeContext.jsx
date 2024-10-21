import React, { createContext, useContext, useState, useMemo } from "react";
import { THEMES } from "../constants";

// Create context object
const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ mode: "light" });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
  };

  // Memoize the activeColors variable to prevent unnecessary re-calculations
  const activeColors = useMemo(() => {
    return THEMES[theme.mode];
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, activeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
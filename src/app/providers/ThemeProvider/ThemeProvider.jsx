// ThemeProvider.jsx
import React, { useEffect, useState } from "react";
import { applyTheme, getInitialTheme } from './utils';

export const ThemeContext = React.createContext();

getInitialTheme();
applyTheme(getInitialTheme());

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

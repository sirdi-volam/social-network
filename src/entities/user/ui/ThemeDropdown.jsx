import React, { useState, useEffect } from "react";
import "./ThemeDropdown.scss";

const ThemeDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Получение сохранённой темы или системной по умолчанию
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    console.log("Initial theme detected:", initialTheme);
    return initialTheme;
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  const applyTheme = (theme) => {
    console.log("Applying theme:", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  };

  const updateTheme = (theme) => {
    console.log("Updating theme to:", theme);
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  };

  useEffect(() => {
    console.log("Applying theme on mount:", currentTheme);
    applyTheme(currentTheme);
  }, []); // Применение при монтировании

  useEffect(() => {
    console.log("Theme updated in state:", currentTheme);
    applyTheme(currentTheme);
  }, [currentTheme]); // Применение при изменении темы

  return (
    <div className="theme-dropdown">
      <div
        className="theme-dropdown__current"
        onClick={() => setDropdownOpen((prev) => !prev)}
        role="button"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        tabIndex={0}
      >
        <span>
          {currentTheme === "system"
            ? "Системная"
            : currentTheme === "dark"
              ? "Тёмная"
              : "Светлая"}
        </span>
      </div>
      {isDropdownOpen && (
        <div className="theme-dropdown__options">
          <button onClick={() => updateTheme("light")}>Светлая</button>
          <button onClick={() => updateTheme("dark")}>Тёмная</button>
          <button onClick={() => updateTheme("system")}>Системная</button>
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;

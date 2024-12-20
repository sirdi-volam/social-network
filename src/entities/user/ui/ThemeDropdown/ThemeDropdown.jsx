import React, { useState, useEffect } from "react";
import "./ThemeDropdown.scss";
import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from '../../../../shared/icons';

const ThemeDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Получение сохранённой темы или системной по умолчанию
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    return initialTheme;
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  };

  const updateTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  };

  useEffect(() => {
    applyTheme(currentTheme);
  }, []); // Применение при монтировании

  useEffect(() => {
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
          <div className="theme-dropdown__options__item" onClick={() => updateTheme("light")}>
            <div className="theme-dropdown__options__item-icon">
              <LightThemeIcon />
            </div>
            Светлая</div>
          <div className="theme-dropdown__options__item" onClick={() => updateTheme("dark")}>
            <div className="theme-dropdown__options__item-icon">
              <DarkThemeIcon />
            </div>
            Тёмная</div>
          <div className="theme-dropdown__options__item" onClick={() => updateTheme("system")}>
            <div className="theme-dropdown__options__item-icon">
              <SystemThemeIcon />
            </div>
            Системная</div>
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;

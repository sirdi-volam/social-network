import React, { useState, useEffect } from "react";
import "./ThemeDropdown.scss";

const ThemeDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  // Функция для переключения состояния меню
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    // Функция для закрытия меню при клике вне компонента
    const closeDropdown = () => {
      setDropdownOpen(false);
    };
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".header-nav-right__items-profile")) {
          closeDropdown();
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isDropdownOpen]);
  
    const handleDropdownClick = (e) => e.stopPropagation();

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  // Функция для применения темы
  const applyTheme = (theme) => {
    if (theme === "system") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", theme);
    }
  };

  // Функция для обновления темы
  const updateTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  };

  useEffect(() => {
    // Устанавливаем начальную тему при загрузке
    applyTheme(currentTheme);
  }, [currentTheme]);

  return (
    <div 
      className="theme-dropdown"
      role='button'
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
      tabIndex={0}
    >
      <div className="theme-dropdown__current"
      onClick={toggleDropdown}
      >
        <span> {currentTheme === "system" ? "Системная" : currentTheme === "dark" ? "Тёмная" : "Светлая"}</span>
      </div>
      {isDropdownOpen && (
        <div className="theme-dropdown__options" onClick={handleDropdownClick}>
          <button onClick={() => updateTheme("light")}>Светлая</button>
          <button onClick={() => updateTheme("dark")}>Тёмная</button>
          <button onClick={() => updateTheme("system")}>Системная</button>
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;

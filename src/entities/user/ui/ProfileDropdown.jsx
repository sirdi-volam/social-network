import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatarImg from '../../../assets/avatar/unnamed.jpg';
import './ProfileDropdown.scss';
import { UserIcon, SettingsIcon, ThemeIcon, LogoutIcon } from '../../../components/Icons/';
import ThemeDropdown from './ThemeDropdown';

const ProfileDropdown = () => {
  // Состояние для отображения меню
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <div className="header-nav-right__items-profile"
      onClick={toggleDropdown}
      role='button'
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
      tabIndex={0}
      >
      <div className="header-nav-right__items-profile__link">
        <div className="header-nav-right__items-profile__avatar">
          <img
            src={avatarImg}
            alt="avatar"
            className="avatar-img"
            loading='lazy'
          />
        </div>
        <div className="header-nav-right__items-avatar__profileArrow">
          <svg
            fill="none"
            height="8"
            viewBox="0 0 12 8"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Выпадающее меню */}
      {isDropdownOpen && (
        <div
          className="header-nav-right__items-profile__dropdown"
          onClick={handleDropdownClick} // Остановка всплытия события
        >
          <ul className="header-nav-right__items-profile__dropdown-list">
            <li className="header-nav-right__items-profile__dropdown-items">
              <Link to="/profile" className='header-nav-right__items-profile__dropdown-items__link'>
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <UserIcon />
                </div>Профиль</Link>
            </li>
            <li className="header-nav-right__items-profile__dropdown-items">
              <Link to="/profile/settings" className='header-nav-right__items-profile__dropdown-items__link'>
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <SettingsIcon />
                </div>
                Настройки
              </Link>
            </li>
            <li className="header-nav-right__items-profile__dropdown-items">
              <div className='header-nav-right__items-profile__dropdown-items__link'>
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <ThemeIcon />
                </div>Тема: <ThemeDropdown /></div>
            </li>
            <li className="header-nav-right__items-profile__dropdown-items">
              <Link to="/auth/logout" className='header-nav-right__items-profile__dropdown-items__link'>
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <LogoutIcon />
                </div>Выход</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

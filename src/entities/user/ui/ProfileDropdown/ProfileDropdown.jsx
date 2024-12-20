import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatarImg from '../../../../assets/avatar/unnamed.jpg';
import './ProfileDropdown.scss';
import { UserIcon, SettingsIcon, ThemeIcon, LogoutIcon, ProfileArrowIcon } from '../../../../shared/icons';
import { ThemeDropdown } from '../ThemeDropdown';
import LogoutButton from '../../../../pages/Logout/Logout';
import { useAuth } from '../../model/useAuth';


const ProfileDropdown = () => {
  const user = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header-nav-right__items-profile')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleDropdownClick = (e) => e.stopPropagation();

  return (
    <div
      className="header-nav-right__items-profile"
      onClick={toggleDropdown}
      role="button"
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
            loading="lazy"
          />
        </div>
        <div className="header-nav-right__items-avatar__profileArrow">
          <ProfileArrowIcon />
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className="header-nav-right__items-profile__dropdown"
          onClick={handleDropdownClick}
        >
          <ul className="header-nav-right__items-profile__dropdown-list">
            <li className="header-nav-right__items-profile__dropdown-items">
              <Link to="/profile" className="header-nav-right__items-profile__dropdown-items__link">
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <UserIcon />
                </div>
                Профиль
                {user?.name}                
              </Link>
            </li>
            <li className="header-nav-right__items-profile__dropdown-items">
              <Link to="/profile/settings" className="header-nav-right__items-profile__dropdown-items__link">
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <SettingsIcon />
                </div>
                Настройки
              </Link>
            </li>
            <li className="header-nav-right__items-profile__dropdown-items">
              <div className="header-nav-right__items-profile__dropdown-items__link">
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <ThemeIcon />
                </div>
                Тема: <ThemeDropdown />
              </div>
            </li>
            <li className="header-nav-right__items-profile__dropdown-items">
              <div className="header-nav-right__items-profile__dropdown-items__button">
                <div className="header-nav-right__items-profile__dropdown-items__link-icon">
                  <LogoutIcon />
                </div>
                <LogoutButton />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

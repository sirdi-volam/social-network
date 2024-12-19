// Header.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../../../entities/user/ui/ProfileDropdown';
import logo from '../../../../public/ainai.png';

const Header = () => {
  const user = useSelector((state) => state.user.user); // Получаем данные пользователя

  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          <span>Ainai</span>
        </Link>

        {user ? (
          <div className="header-authenticated">
            <ProfileDropdown />
          </div>
        ) : (
          <div className="header-unauthenticated">
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

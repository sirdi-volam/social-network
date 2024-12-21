// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../../../entities/user/ui/ProfileDropdown';
import logo from '../../../../public/ainai.png';
import { SearchBar } from '../../search';
import './Header.scss';
import { CreatePostIcon, NotificationIcon } from '../../../shared/icons';
import { useAuth } from '../../../entities/user/model/useAuth';

const Header = () => {
  const user = useAuth();  

  return (
    <header className="header">
      <div className="header-wrapper">
        <nav className="header-nav">
          <div className="header-nav_left">
            <Link to="/" className="header-nav_left__logo">
              <img src={logo} alt="logo" />
              <span className='header-nav_left__logo-text'>ainai</span>
            </Link>

            <SearchBar />
          </div>

          {user ? (
            <div className="header-authenticated">
              <Link to="/notifications" className="header-authenticated__icons">
                <div className="header-authenticated__icons-notification">
                  <NotificationIcon />
                </div>
              </Link>
              <Link to="/create-post" className="header-authenticated__icons">
                <div className="header-authenticated__icons-post-create">
                  <CreatePostIcon />
                </div>
              </Link>
              <ProfileDropdown />
            </div>
          ) : (
            <div className="header-unauthenticated">
              <Link to="/login" className='header-unauthenticated__login'>Вход</Link>
              <Link to="/register" className='header-unauthenticated__register'>Регистрация</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

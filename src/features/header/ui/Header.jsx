import './Header.scss';
import { Link } from "react-router-dom";
import logo from '../../../../public/ainai.png';
import { useAuth } from '../model/useAuth.js';
import ProfileDropdown from '../../../entities/user/ui/ProfileDropdown/index';
import SearchIcon from '../../../shared/icons/SearchIcon.jsx';
import NotificationIcon from '../../../shared/icons/NotificationIcon.jsx';
import { CreatePostIcon } from '../../../shared/icons/index.js';

const Header = () => {
  const isAuth = useAuth(); // Используем хук для проверки авторизации

  return (
    <div className="header-container">
      <header className="header">
        <nav className="header-nav">
          {/* Левая часть */}
          <ul className="header-nav_left">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" className="logo-img" />
              <span className="logo-text">Ainai</span>
            </Link>
            <div className="header-nav-left__search">
              <div className="header-nav-left__search_icon">
                <SearchIcon />
              </div>
              <input type="search" placeholder="Поиск..." className="header-nav-left__search_input" />
            </div>
          </ul>

          {/* Правая часть */}
          <ul className="header-nav-right">
            {!isAuth ? (
              <div className="header-nav-right__items">
                <div className="header-nav-right__items_icons">
                  <Link to="/notifications">
                    <div className="header-nav-right__items_icons-icon">
                      <div className="header-nav-right__items_icons-icon__notifications">
                        <NotificationIcon />
                      </div>
                    </div>
                  </Link>
                  <Link to='/create-post'>
                    <div className="header-nav-right__items_icons-icon">
                      <div className="header-nav-right__items_icons-icon__write">
                        <CreatePostIcon />
                      </div>
                    </div>
                  </Link>
                </div>
                <ProfileDropdown />
              </div>
            ) : (
              <>
                <Link to="/login" className="header-nav-right__items_login">Вход</Link>
                <Link to="/register" className="header-nav-right__items_register">Регистрация</Link>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

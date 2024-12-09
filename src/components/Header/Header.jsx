import './Header.scss';
import { Link } from "react-router-dom";
import logo from '../../../public/ainai.png'
import avatar from '../../assets/avatar/unnamed.jpg'


const Header = () => {

  const isAuth = () => {
    if (!localStorage.getItem('token')) {
      return false
    }
    return true
  }

  const authentications = () => {
    if (!isAuth()) {
      return (
        <ul className="header-nav-right__items">
          <Link to="/login" className="header-nav-right__items_login">Вход</Link>
          <Link to="/register" className="header-nav-right__items_register">Регистрация</Link>
        </ul>
      )
    }
  }


  return (
    <>
      <div className="header-container">
        <header className="header">
          <nav className="header-nav">
            <ul className="header-nav_left">
              <Link to="/" className="logo">
                <img src={logo} alt="logo" className="logo-img" />
                <span className="logo-text">Ainai</span>
              </Link>
              <div className="header-nav-left__search" >
                <div className="header-nav-left__search_icon">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" fill="currentColor" viewBox="0 0 48 48">
                    <path fill="currentColor" d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z"></path>
                  </svg>
                </div>
                <input type="search" placeholder="Поиск..." className="header-nav-left__search_input" />
              </div>
            </ul>
            {isAuth() ? (
              <ul className="header-nav-right">
                <div className="header-nav-right__items">
                  <div className="header-nav-right__items_icons">
                    <Link to="/notifications">
                      <div className="header-nav-right__items_icons-icon">
                        <div className="header-nav-right__items_icons-icon__notifications">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.1c4.02 0 6.9 3.28 6.9 7.53v1.6c0 .23.2.53.72 1.08l.27.27c1.08 1.1 1.51 1.73 1.51 2.75 0 .44-.05.79-.27 1.2-.45.88-1.42 1.37-2.87 1.37h-1.9c-.64 2.33-2.14 3.6-4.36 3.6-2.25 0-3.75-1.3-4.37-3.67l.02.07H5.74c-1.5 0-2.47-.5-2.9-1.41-.2-.4-.24-.72-.24-1.16 0-1.02.43-1.65 1.51-2.75l.27-.27c.53-.55.72-.85.72-1.08v-1.6C5.1 5.38 7.99 2.1 12 2.1Zm2.47 15.8H9.53c.46 1.25 1.25 1.8 2.47 1.8 1.22 0 2.01-.55 2.47-1.8ZM12 3.9c-2.96 0-5.1 2.43-5.1 5.73v1.6c0 .85-.39 1.46-1.23 2.33l-.28.29c-.75.75-.99 1.11-.99 1.48 0 .19.01.29.06.38.1.22.43.39 1.28.39h12.52c.82 0 1.16-.17 1.28-.4.05-.1.06-.2.06-.37 0-.37-.24-.73-.99-1.48l-.28-.29c-.84-.87-1.23-1.48-1.23-2.33v-1.6c0-3.3-2.13-5.73-5.1-5.73Z"></path>
                          </svg>
                        </div>
                      </div>
                    </Link>
                    <Link to='/create-post'>
                      <div className="header-nav-right__items_icons-icon">
                        <div className="header-nav-right__items_icons-icon__write">
                          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.25 14.5c.42 0 .75.34.75.75v.1a.75.75 0 0 1-.75.65H4.75a.75.75 0 1 1 0-1.5h12.5Zm0-5a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75v-.1a.75.75 0 0 1 .75-.65h8.5Zm-9-6.5c.4 0 .75.34.75.75v.1a.75.75 0 0 1-.75.65h-2.5v5.75a.75.75 0 0 1-1.5 0V4.5h-2.5a.76.76 0 0 1-.74-.65L1 3.75c0-.42.34-.75.75-.75h6.5Zm9 1.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75v-.1a.75.75 0 0 1 .75-.65h5.5Z" fill="currentColor"></path>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="header-nav-right__items-profile">
                    <div className="header-nav-right__items-profile__link">
                      <div className="header-nav-right__items-profile__avatar">
                        <img src={avatar} alt="avatar" className="avatar-img"></img>
                      </div>
                      <div className="header-nav-right__items-avatar__profileArrow">
                        <svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg">
                          <path clipRule="evenodd" d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentColor" fillRule="evenodd">
                          </path>
                        </svg>
                        <div className="header-nav-right__items-profile__dropdown" >
                          <ul
                            className="header-nav-right__items-profile__dropdown-list" >
                            <li className="header-nav-right__items-profile__dropdown-item">
                              <Link to="/profile">
                                Профиль
                              </Link>
                            </li>
                            <li className="header-nav-right__items-profile__dropdown-item">
                              <Link to="/profile/settings">
                                Настройки
                              </Link>
                            </li>
                            <li className="header-nav-right__items-profile__dropdown-item">
                              <Link to="/profile/theme">
                                Тема
                              </Link>
                            </li>
                            <li className="header-nav-right__items-profile__dropdown-item">
                              <Link to="/auth/logout">
                                Выход
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            ) : (
              <ul className="header-nav-right">
                {authentications()}
              </ul>
            )}
          </nav>
        </header>
      </div >
    </>
  )
}

export default Header;
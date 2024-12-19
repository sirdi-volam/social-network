import { Outlet } from 'react-router-dom'
import Header from '../features/header/ui/Header.jsx'
import './Layout.scss'
import Aside from '../features/aside/ui/Aside.jsx'
import { navLinks } from '../features/aside/model/links.js'

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Aside links={navLinks} />
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
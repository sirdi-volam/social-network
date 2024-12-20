import { Outlet } from 'react-router-dom'
import './Layout.scss'
import Header from '../features/header/ui/Header'
import Aside from '../features/aside/ui/Aside'
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
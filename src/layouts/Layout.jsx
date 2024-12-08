import { Outlet } from 'react-router-dom'
import Aside from '../components/Aside/Aside'
import Header from '../components/Header/Header'
import './Layout.scss'

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Aside />
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
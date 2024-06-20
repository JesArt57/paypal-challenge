import { Sidebar } from './components/sidebar/Sidebar'
import { Navbar } from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='layout d-flex w-100'>
      <Sidebar />
      <div className='w-100'>
        <Navbar />
        <div className='container py-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

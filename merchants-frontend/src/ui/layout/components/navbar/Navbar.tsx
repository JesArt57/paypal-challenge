import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return (
    <nav className='navbar border-bottom d-flex justify-content-between aling-items-center p-3'>
      <h1>Merchants</h1>
      <Button onClick={logout} className='rounded-pill bg-paypal-boyzone-blue text-white border-0' label='Cerrar sesión' />
    </nav>
  )
}

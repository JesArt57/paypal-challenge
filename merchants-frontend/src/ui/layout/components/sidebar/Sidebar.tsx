import { useState } from 'react';
import { Sidebar as SidebarPro, Menu, MenuItem } from 'react-pro-sidebar';
import { SidebarItem } from './components/sidebar_item/SidebarItem';
import paypalCutLogo from '@core/assets/logos/paypal-cut-logo.webp';
import paypalLogoLetters from '@core/assets/logos/paypal-logo-letters.png';

export const Sidebar = () => {
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(true);

  const onCollpase = () => {
    setIsCollapsedSidebar(true);
  }

  const onOpen = () => {
    setIsCollapsedSidebar(false);
  }

  return <SidebarPro className='sidebar' collapsed={isCollapsedSidebar} onMouseLeave={onCollpase} onMouseEnter={onOpen}>
    <>
      {
        isCollapsedSidebar
          ? <img src={paypalCutLogo} className='cut-logo m-3' alt='logo de paypal' />
          : <div className='d-flex justify-content-center'>
            <img src={paypalLogoLetters} className='logo-letters m-3' alt='logo de paypal' />
          </div>
      }
      <Menu className='mt-5'>
        <MenuItem active={true} component={<SidebarItem to='/' isCollapsedSidebar={isCollapsedSidebar} iconName='Shop' text='Merchants' />}></MenuItem>
      </Menu>
    </>
  </SidebarPro>;
}

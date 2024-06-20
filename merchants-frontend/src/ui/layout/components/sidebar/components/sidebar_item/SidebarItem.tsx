import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from '@core/assets/icons';

interface SidebarItemProps {
  to: string;
  text: string;
  iconName: string;
  isCollapsedSidebar: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ to, text, isCollapsedSidebar, iconName }) => {
  const CurrentIcon = Icon[iconName as keyof typeof Icon];

  return <Link to={to} style={{ textDecoration: 'none' }}>
    <div className='sidebar-item text-center p-2 text-paypal-text-gray d-flex align-items-center justify-content-center'>
      <div className='icon flex-shrink-0 me-3'><CurrentIcon /></div>
      {!isCollapsedSidebar && <h2>{text}</h2>}
    </div>
  </Link>
}

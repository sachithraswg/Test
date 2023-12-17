import React from 'react';
import { MenuDetails } from '../../models/MenuDetails';
import './TabMenu.css';

interface tabMenuProps {
  menu: MenuDetails[],
  onActive: (menuItem: MenuDetails) => void,
  activeMenu: MenuDetails
}

const TabMenu: React.FC<tabMenuProps> = ({menu, onActive, activeMenu}) => {
    return (<menu className="tab-container">
      {
        menu.map((menuItem: MenuDetails, index: number) => (
          <button key={index} className={activeMenu && activeMenu.title === menuItem.title ? 'active': ''} onClick={() => onActive(menuItem)}>
            <i className={menuItem.icon}></i>
            {menuItem.title}
          </button>
        ))
      }
    </menu>)
}

export default TabMenu;
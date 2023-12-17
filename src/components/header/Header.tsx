import React from 'react';
import Search from '../search-box/Search';
import './Header.css';

const Header: React.FC<any> = () => {
  return (
    <div className="header">
      <Search/>
      <menu className="menu">
        <button className="menu-btn">
          <i className="fa-regular fa-circle-question"></i>
          Help
        </button>
        <button className="menu-btn">
          <i className="fa-solid fa-sliders slider-custom"></i>
          Settings
        </button>
      </menu>
      <div className="user-name">
          PV
      </div>
    </div>
  );
}

export default Header;
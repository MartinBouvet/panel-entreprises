// frontend/src/components/Layout/Header.jsx
import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} />
        <input type="text" placeholder="Rechercher..." />
      </div>
      <div className="header-actions">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">2</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <span>JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
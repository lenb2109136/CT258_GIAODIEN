import React from 'react';
import './Header.css'; // We'll create this CSS file next

const Header: React.FC = () => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Main Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-icons">
          <span className="icon notification-icon">🔔</span>
          <span className="icon user-icon">AP</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
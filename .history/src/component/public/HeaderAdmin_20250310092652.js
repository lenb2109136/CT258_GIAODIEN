import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderAdmin() {
  const navigate = useNavigate();

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Main Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-actions">
          <span
            className="action-item notification-icon"
            onClick={() => navigate('/admin/notifications')}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start' 
            }}
          >
            <span style={{ marginRight: '8px' }}>🔔</span> 
          </span>
          <span
            className="action-item user-icon"
            onClick={() => navigate('/admin/profile')}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start' 
            }}
          >
            <span style={{ marginRight: '8px' }}>👤</span> 
          </span>
          <span
            className="action-item back-to-public"
            onClick={() => navigate('/khachhang/home')}
            style={{ 
              cursor: 'pointer', 
              color: '#007bff', 
              marginLeft: '15px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start' 
            }}
          >
            <span style={{ marginRight: '8px' }}>🏠</span> 
          </span>
        </div>
      </div>
    </header>
  );
}
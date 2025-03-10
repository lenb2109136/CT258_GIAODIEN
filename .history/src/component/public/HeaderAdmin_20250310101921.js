import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Main Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
        <div className="header-actions">
          <span
            className="action-item notification-icon"
            onClick={() => navigate('/admin/notifications')}
            style={{ cursor: 'pointer' }}
          >
            🔔
          </span>
          
          {/* User Icon + Dropdown */}
          <div 
            className="user-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="user-icon">
              👤
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => navigate('/admin/profile')}>
                  Thông tin cá nhân
                </div>
                <div className="dropdown-item" onClick={() => navigate('/admin/change-password')}>
                  Đổi mật khẩu
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item" onClick={() => navigate('/login')}>
                  Đăng xuất
                </div>
              </div>
            )}
          </div>

          <span
            className="action-item back-to-public"
            onClick={() => navigate('/khachhang/home')}
            style={{ cursor: 'pointer', color: '#007bff', marginLeft: '15px' }}
          >
            Back to Public Site
          </span>
        </div>
      </div>
    </header>
  );
}

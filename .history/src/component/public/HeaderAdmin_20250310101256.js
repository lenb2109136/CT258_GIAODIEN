import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderAdmin.css';

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfile = () => {
    navigate('/admin/profile');
    setIsDropdownOpen(false);
  };

  const handleChangePassword = () => {
    navigate('/admin/change-password');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsDropdownOpen(false);
  };

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
          <span
            className="action-item user-icon"
            onClick={toggleDropdown}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <span className="user-symbol">👤</span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleProfile}>
                  Thông tin cá nhân
                </div>
                <div className="dropdown-item" onClick={handleChangePassword}>
                  Đổi mật khẩu
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item" onClick={handleLogout}>
                  Đăng xuất
                </div>
              </div>
            )}
          </span>
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
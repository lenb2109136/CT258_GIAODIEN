import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderAdmin.css'; // Add custom CSS for the dropdown

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle navigation for dropdown items
  const handleProfile = () => {
    navigate('/admin/profile'); // Navigate to profile page
    setIsDropdownOpen(false); // Close dropdown
  };

  const handleChangePassword = () => {
    navigate('/admin/change-password'); // Navigate to change password page (create this route if needed)
    setIsDropdownOpen(false); // Close dropdown
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear session, redirect to login)
    navigate('/login'); // Redirect to login page
    setIsDropdownOpen(false); // Close dropdown
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
            Ngôn Nguyễn
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
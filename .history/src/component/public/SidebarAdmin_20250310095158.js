import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SidebarAdmin.css'; // Custom CSS for refinements

export default function SidebarAdmin() {
  const navigate = useNavigate();

  return (
    <div className="sidebar bg-light shadow-sm">
      <h2 className="sidebar-title text-primary fw-bold p-3">Traveller</h2>
      <ul className="list-unstyled">
        <li className="sidebar-item">
          <span
            onClick={() => navigate('/admin')}
            className="sidebar-link"
          >
            <span className="sidebar-icon">🏠</span> Trang chủ
          </span>
        </li>
        <li className="sidebar-item">
          <span
            onClick={() => navigate('/admin/blank')}
            className="sidebar-link"
          >
            <span className="sidebar-icon">✈️</span> Quản lý tour
          </span>
        </li>
        <li className="sidebar-item">
          <span
            onClick={() => navigate('/admin/basic-tables')}
            className="sidebar-link"
          >
            <span className="sidebar-icon">📅</span> Quản lý Booking
          </span>
        </li>
        <li className="sidebar-item">
          <span
            onClick={() => navigate('/admin/discount')}
            className="sidebar-link"
          >
            <span className="sidebar-icon">🎟️</span> Mã giảm giá
          </span>
        </li>
        <li className="sidebar-item">
          <span
            onClick={() => navigate('/admin/blank')}
            className="sidebar-link"
          >
            <span className="sidebar-icon">📋</span> Danh mục tour
          </span>
        </li>
        <li className="sidebar-item">
          <span
            onClick={() => navigate('/admin/blank')}
            className="sidebar-link"
          >
            <span className="sidebar-icon">👥</span> Khách hàng
          </span>
        </li>
      </ul>
    </div>
  );
}
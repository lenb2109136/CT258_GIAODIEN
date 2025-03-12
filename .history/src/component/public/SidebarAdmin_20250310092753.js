import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarAdmin() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Traveller</h2>
      <ul>
        <li>
          <span
            onClick={() => navigate('/admin')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <span style={{ marginRight: '8px' }}>🏠</span> Trang chủ
          </span>
        </li>
        <li>
          <span
            onClick={() => navigate('/admin/blank')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <span style={{ marginRight: '8px' }}>✈️</span> Quản lý tour
          </span>
        </li>
        <li>
          <span
            onClick={() => navigate('/admin/basic-tables')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <span style={{ marginRight: '8px' }}>📅</span> Quản lý Booking
          </span>
        </li>
        <li>
          <span
            onClick={() => navigate('/admin/profile')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <span style={{ marginRight: '8px' }}>🎟️</span> Quản lý mã giảm giá
          </span>
        </li>
        <li>
          <span
            onClick={() => navigate('/admin/signin')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <span style={{ marginRight: '8px' }}>📋</span> Quản lý danh mục tour
          </span>
        </li>
        <li>
          <span
            onClick={() => navigate('/admin/blank')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <span style={{ marginRight: '8px' }}>👥</span> Quản lý khách hàng
          </span>
        </li>
      </ul>
    </div>
  );
}
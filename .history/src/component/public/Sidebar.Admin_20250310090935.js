import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarAdmin() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>HORIZON FREE</h2>
      <ul>
        <li>
          <span onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>
            Main Dashboard
          </span>
        </li>
        <li>
          <span onClick={() => navigate('/admin/blank')} style={{ cursor: 'pointer' }}>
            NFT Marketplace
          </span>
        </li>
        <li>
          <span onClick={() => navigate('/admin/basic-tables')} style={{ cursor: 'pointer' }}>
            Data Tables
          </span>
        </li>
        <li>
          <span onClick={() => navigate('/admin/profile')} style={{ cursor: 'pointer' }}>
            Profile
          </span>
        </li>
        <li>
          <span onClick={() => navigate('/admin/signin')} style={{ cursor: 'pointer' }}>
            Sign In
          </span>
        </li>
        <li>
          <span onClick={() => navigate('/admin/blank')} style={{ cursor: 'pointer' }}>
            RTL Admin
          </span>
        </li>
      </ul>
    </div>
  );
}
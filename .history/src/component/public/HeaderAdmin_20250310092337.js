import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAppstore, AiOutlineShoppingCart, AiOutlineTags, AiOutlineUser, AiOutlineTeam } from 'react-icons/ai';

export default function SidebarAdmin() {
  const navigate = useNavigate();

  return (
    <div className="sidebar bg-gray-800 text-white h-screen w-60 p-4">
      <h2 className="text-xl font-bold mb-6">Traveller</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate('/admin')}>
          <AiOutlineHome size={20} />
          <span>Trang chủ</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate('/admin/tours')}>
          <AiOutlineAppstore size={20} />
          <span>Quản lý tour</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate('/admin/bookings')}>
          <AiOutlineShoppingCart size={20} />
          <span>Quản lý Booking</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate('/admin/discounts')}>
          <AiOutlineTags size={20} />
          <span>Quản lý mã giảm giá</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate('/admin/categories')}>
          <AiOutlineAppstore size={20} />
          <span>Quản lý danh mục tour</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => navigate('/admin/customers')}>
          <AiOutlineUser size={20} />
          <span>Quản lý khách hàng</span>
        </li>
      </ul>
    </div>
  );
}

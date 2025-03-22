import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import axios from 'axios';
import api from '../../config/axiosconfig'; // Assuming you have this axios config

export default function BookingAdmin() {
  // State for bookings and search term
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch bookings from API on component mount
  useEffect(() => {
    api
      .get('ve/getall') // Adjust the endpoint as per your backend API
      .then(response => {
        setBookings(response.data.data); // Adjust based on your API response structure
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách vé:', error);
      });
  }, []);

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    booking =>
      booking.V_ID.toString().includes(searchTerm.toLowerCase()) ||
      (booking.khachhang?.KH_TEN || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (booking.tour?.T_TEN || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // Handle delete booking
  const handleDelete = bookingId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vé này không?')) {
      api
        .delete(`ve/delete/${bookingId}`) // Adjust the endpoint as per your backend API
        .then(() => {
          setBookings(bookings.filter(booking => booking.V_ID !== bookingId));
          alert('Xóa vé thành công!');
        })
        .catch(error => {
          console.error('Lỗi khi xóa vé:', error);
          alert('Có lỗi xảy ra khi xóa vé!');
        });
    }
  };

  return (
    <div className="container mt-5 booking-container">
      <h2 className="mb-4 text-primary fw-bold">Quản lý Vé</h2>

      {/* Search Bar and Add Button */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Tìm kiếm vé..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <button className="btn btn-primary btn-add shadow-sm">
            <i className="fas fa-plus me-2"></i> Thêm vé mới
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Mã vé</th>
                <th scope="col">Tên khách hàng</th>
                <th scope="col">Tên tour</th>
                <th scope="col">Giá</th>
                <th scope="col">Ngày đặt</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <tr key={booking.V_ID}>
                    <td>{booking.V_ID}</td>
                    <td className="fw-medium">{booking.V_ID}</td>
                    <td>{booking.khachhang?.KH_TEN || 'N/A'}</td>
                    <td>{booking.tour?.T_TEN || 'N/A'}</td>
                    <td>{booking.V_GIA.toLocaleString()} VND</td>
                    <td>{new Date(booking.V_NGAYDAT).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-outline-warning btn-sm me-2">
                        <i className="fas fa-edit"></i> Sửa
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(booking.V_ID)}
                      >
                        <i className="fas fa-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    Không tìm thấy vé nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

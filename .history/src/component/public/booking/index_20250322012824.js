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
      .get('ve/getall')
      .then(response => {
        console.log('API Response:', response.data); // Log the response
        console.log('Bookings Data:', response.data.data); // Log the bookings data
        const fetchedBookings = response.data.data || [];
        setBookings(fetchedBookings);
        console.log('Set Bookings:', fetchedBookings); // Log the state after setting
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách vé:', error);
        setBookings([]); // Set to empty array on error
      });
  }, []);

  // Filter bookings based on search term with defensive checks
  const filteredBookings = bookings.filter(booking => {
    // Ensure booking and id are defined
    if (!booking || !booking.id) {
      console.log('Invalid booking:', booking); // Log invalid bookings
      return false;
    }

    const idString = booking.id.toString().toLowerCase();
    const customerName = (booking.khachHang?.ten || '').toLowerCase();
    const tourName = (booking.thoiGianKhoiHanh?.tour?.ten || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    const matches =
      idString.includes(search) ||
      customerName.includes(search) ||
      tourName.includes(search);

    console.log('Booking:', booking, 'Matches:', matches); // Log each booking and whether it matches
    return matches;
  });

  // Log filtered bookings
  console.log('Filtered Bookings:', filteredBookings);

  // Handle search input change
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // Handle delete booking
  const handleDelete = bookingId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vé này không?')) {
      api
        .delete(`ve/delete/${bookingId}`)
        .then(() => {
          setBookings(bookings.filter(booking => booking.id !== bookingId));
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
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td className="fw-medium">{booking.id}</td>
                    <td>{booking.khachHang?.ten || 'N/A'}</td>
                    <td>{booking.thoiGianKhoiHanh?.tour?.ten || 'N/A'}</td>
                    <td>{booking.gia.toLocaleString()} VND</td>
                    <td>{new Date(booking.ngayDat).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-outline-warning btn-sm me-2">
                        <i className="fas fa-edit"></i> Sửa
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(booking.id)}
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

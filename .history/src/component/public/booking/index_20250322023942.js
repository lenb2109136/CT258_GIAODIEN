import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../config/axiosconfig';

export default function BookingAdmin() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedBooking, setEditedBooking] = useState({
    gia: 0,
    ngayDat: '',
    khachHang: { ten: '' },
    thoiGianKhoiHanh: { tour: { ten: '' } },
  });

  useEffect(() => {
    api
      .get('ve/getall')
      .then(response => {
        console.log('API Response:', response.data);
        console.log('Bookings Data:', response.data.data);
        const fetchedBookings = response.data.data || [];
        setBookings(fetchedBookings);
        console.log('Set Bookings:', fetchedBookings);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách vé:', error);
        setBookings([]);
      });
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (!booking || !booking.id) {
      console.log('Invalid booking:', booking);
      return false;
    }

    const idString = booking.id.toString().toLowerCase();
    const customerName = (booking.khachHang?.ten || '').toLowerCase();
    const tourName = (booking.thoiGianKhoiHanh?.tour?.ten || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    console.log('Booking ID:', booking.id);
    console.log('thoiGianKhoiHanh:', booking.thoiGianKhoiHanh);
    console.log('tour:', booking.thoiGianKhoiHanh?.tour);
    console.log('tour name:', booking.thoiGianKhoiHanh?.tour?.ten);

    const matches =
      idString.includes(search) ||
      customerName.includes(search) ||
      tourName.includes(search);

    console.log('Booking:', booking, 'Matches:', matches);
    return matches;
  });

  console.log('Filtered Bookings:', filteredBookings);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = booking => {
    setEditingId(booking.id);
    setEditedBooking({
      gia: booking.gia,
      ngayDat: booking.ngayDat,
      khachHang: { ten: booking.khachHang?.ten || '' },
      thoiGianKhoiHanh: {
        tour: { ten: booking.thoiGianKhoiHanh?.tour?.ten || '' },
      },
    });
  };

  const handleInputChange = (field, value) => {
    if (field === 'khachHang.ten') {
      setEditedBooking(prev => ({
        ...prev,
        khachHang: { ...prev.khachHang, ten: value },
      }));
    } else if (field === 'thoiGianKhoiHanh.tour.ten') {
      setEditedBooking(prev => ({
        ...prev,
        thoiGianKhoiHanh: {
          ...prev.thoiGianKhoiHanh,
          tour: { ...prev.thoiGianKhoiHanh.tour, ten: value },
        },
      }));
    } else {
      setEditedBooking(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleUpdate = () => {
    const updatedBooking = {
      gia: parseFloat(editedBooking.gia),
      ngayDat: editedBooking.ngayDat,
      khachHang: { ten: editedBooking.khachHang.ten },
      thoiGianKhoiHanh: {
        tour: { ten: editedBooking.thoiGianKhoiHanh.tour.ten },
      },
    };

    api
      .put(`/ve/update/${editingId}`, updatedBooking)
      .then(response => {
        console.log('Response từ server:', response.data);
        if (response.data.status === 'OK') {
          setBookings(
            bookings.map(booking =>
              booking.id === editingId
                ? { ...booking, ...response.data.data }
                : booking
            )
          );
          setEditingId(null);
          alert('Cập nhật vé thành công!');
        } else {
          alert(
            'Lỗi từ server: ' + (response.data.message || 'Không xác định')
          );
        }
      })
      .catch(error => {
        console.error('Lỗi chi tiết:', error.response?.data || error.message);
        alert(
          'Có lỗi xảy ra khi cập nhật: ' +
            (error.response?.data?.message || error.message)
        );
      });
  };

  const handleDelete = bookingId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vé này không?')) {
      api
        .delete(`ve/delete/${bookingId}`)
        .then(response => {
          console.log('Response từ server:', response.data);
          if (response.data.status === 'OK') {
            setBookings(bookings.filter(booking => booking.id !== bookingId));
            alert('Xóa vé thành công!');
          } else {
            alert(
              'Lỗi từ server: ' + (response.data.message || 'Không xác định')
            );
          }
        })
        .catch(error => {
          console.error('Lỗi chi tiết:', error.response?.data || error.message);
          alert(
            'Có lỗi xảy ra khi xóa: ' +
              (error.response?.data?.message || error.message)
          );
        });
    }
  };

  return (
    <div className="container mt-5 booking-container">
      <h2 className="mb-4 text-primary fw-bold">Quản lý Vé</h2>

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
                    <td className="fw-medium">{booking.id}</td>
                    <td>
                      {editingId === booking.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedBooking.khachHang.ten}
                          onChange={e =>
                            handleInputChange('khachHang.ten', e.target.value)
                          }
                        />
                      ) : (
                        booking.khachHang?.ten || 'N/A'
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedBooking.thoiGianKhoiHanh.tour.ten}
                          onChange={e =>
                            handleInputChange(
                              'thoiGianKhoiHanh.tour.ten',
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        booking.thoiGianKhoiHanh?.tour?.ten || 'N/A'
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={editedBooking.gia}
                          onChange={e =>
                            handleInputChange('gia', e.target.value)
                          }
                        />
                      ) : (
                        booking.gia.toLocaleString() + ' VND'
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={editedBooking.ngayDat.slice(0, 16)}
                          onChange={e =>
                            handleInputChange('ngayDat', e.target.value)
                          }
                        />
                      ) : (
                        new Date(booking.ngayDat).toLocaleDateString()
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <>
                          <button
                            className="btn btn-outline-success btn-sm me-2"
                            onClick={handleUpdate}
                          >
                            <i className="fas fa-save"></i> Lưu
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setEditingId(null)}
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-outline-warning btn-sm me-2"
                            onClick={() => handleEdit(booking)}
                          >
                            <i className="fas fa-edit"></i> Sửa
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(booking.id)}
                          >
                            <i className="fas fa-trash"></i> Xóa
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
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

import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import api from '../../config/axiosconfig';
import LS from './lichsudattour';

export default function CustomerAdmin() {
  const [openlsdattour, setOpen] = useState(false);
  const nv = useRef(0);

  const [data, setData] = useState([]);
  const [sdt, setSdt] = useState('');
  const [editingId, setEditingId] = useState(null); // Theo dõi khách hàng đang chỉnh sửa
  const [editedCustomer, setEditedCustomer] = useState({}); // Lưu dữ liệu chỉnh sửa tạm thời

  const getAll = () => {
    api
      .get('admin/khachhang/getall?sdt=' + sdt)
      .then(v => v.data)
      .then(v => {
        setData(v);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
        setData([]);
      });
  };

  useEffect(() => {
    getAll();
  }, [sdt]);

  // Handle search input change
  const handleSearch = e => {
    setSdt(e.target.value);
  };

  // Bắt đầu chỉnh sửa
  const handleEdit = customer => {
    setEditingId(customer.id);
    setEditedCustomer({ ...customer });
  };

  // Handle input change khi chỉnh sửa
  const handleInputChange = (field, value) => {
    setEditedCustomer(prev => ({ ...prev, [field]: value }));
  };

  // Handle update customer
  const handleUpdate = () => {
    api
      .post('admin/khachhang/update', editedCustomer)
      .then(() => {
        alert('Cập nhật thành công!');
        setEditingId(null); // Thoát chế độ chỉnh sửa
        getAll(); // Refresh dữ liệu
      })
      .catch(error => {
        alert(error.response?.data || 'Có lỗi xảy ra khi cập nhật!');
      });
  };

  // Handle delete customer
  const handleDelete = customerId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
      api
        .delete(`admin/khachhang/delete/${customerId}`)
        .then(() => {
          setData(data.filter(customer => customer.id !== customerId));
          alert('Xóa khách hàng thành công!');
        })
        .catch(error => {
          console.error('Lỗi khi xóa khách hàng:', error);
          alert('Có lỗi xảy ra khi xóa khách hàng!');
        });
    }
  };

  // Handle opening booking history
  const handleViewDetails = customerId => {
    nv.current = customerId;
    setOpen(true);
  };

  return (
    <div className="container mt-5 discount-container">
      <h2 className="mb-4 text-primary fw-bold">
        Quản lý Tài khoản Khách hàng
      </h2>

      {/* Modal for booking history */}
      {openlsdattour && <LS setopen={setOpen} nv={nv.current} />}

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
              placeholder="Nhập số điện thoại khách hàng..."
              value={sdt}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <button className="btn btn-primary btn-add shadow-sm">
            <i className="fas fa-plus me-2"></i> Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">CCCD</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td className="fw-medium">
                      {editingId === customer.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedCustomer.soDienThoai || ''}
                          onChange={e =>
                            handleInputChange('soDienThoai', e.target.value)
                          }
                          onClick={e => e.stopPropagation()}
                        />
                      ) : (
                        customer.soDienThoai
                      )}
                    </td>
                    <td>
                      {editingId === customer.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedCustomer.ten || ''}
                          onChange={e =>
                            handleInputChange('ten', e.target.value)
                          }
                          onClick={e => e.stopPropagation()}
                        />
                      ) : (
                        customer.ten
                      )}
                    </td>
                    <td>
                      {editingId === customer.id ? (
                        <input
                          type="email"
                          className="form-control"
                          value={editedCustomer.email || ''}
                          onChange={e =>
                            handleInputChange('email', e.target.value)
                          }
                          onClick={e => e.stopPropagation()}
                        />
                      ) : (
                        customer.email
                      )}
                    </td>
                    <td>
                      {editingId === customer.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedCustomer.cccd || ''}
                          onChange={e =>
                            handleInputChange('cccd', e.target.value)
                          }
                          onClick={e => e.stopPropagation()}
                        />
                      ) : (
                        customer.cccd
                      )}
                    </td>
                    <td>
                      {editingId === customer.id ? (
                        <select
                          className="form-control"
                          value={editedCustomer.gioiTinh ? 'true' : 'false'}
                          onChange={e =>
                            handleInputChange(
                              'gioiTinh',
                              e.target.value === 'true'
                            )
                          }
                          onClick={e => e.stopPropagation()}
                        >
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                      ) : customer.gioiTinh ? (
                        'Nam'
                      ) : (
                        'Nữ'
                      )}
                    </td>
                    <td>
                      {editingId === customer.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedCustomer.diaChi || ''}
                          onChange={e =>
                            handleInputChange('diaChi', e.target.value)
                          }
                          onClick={e => e.stopPropagation()}
                        />
                      ) : (
                        customer.diaChi
                      )}
                    </td>
                    <td>
                      {editingId === customer.id ? (
                        <button
                          className="btn btn-outline-success btn-sm me-2"
                          onClick={e => {
                            e.stopPropagation();
                            handleUpdate();
                          }}
                        >
                          <i className="fas fa-save"></i> Lưu
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning btn-sm me-2"
                          onClick={e => {
                            e.stopPropagation();
                            handleEdit(customer);
                          }}
                        >
                          <i className="fas fa-edit"></i> Sửa
                        </button>
                      )}
                      <button
                        className="btn btn-outline-info btn-sm me-2"
                        onClick={e => {
                          e.stopPropagation();
                          handleViewDetails(customer.id);
                        }}
                      >
                        <i className="fas fa-info-circle"></i> Chi tiết
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(customer.id);
                        }}
                      >
                        <i className="fas fa-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    Không tìm thấy khách hàng nào
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

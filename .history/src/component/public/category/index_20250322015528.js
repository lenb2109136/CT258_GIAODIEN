import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

export default function Discount() {
  // Mock discount data
  const initialDiscounts = [
    {
      id: 1,
      code: 'DISCOUNT10',
      amount: 10,
      type: 'Percentage',
      status: 'Active',
      expiry: '2025-12-31',
    },
    {
      id: 2,
      code: 'SAVE20',
      amount: 20,
      type: 'Fixed',
      status: 'Inactive',
      expiry: '2025-06-30',
    },
    {
      id: 3,
      code: 'SUMMER25',
      amount: 25,
      type: 'Percentage',
      status: 'Active',
      expiry: '2025-08-15',
    },
    {
      id: 4,
      code: 'WELCOME5',
      amount: 5,
      type: 'Fixed',
      status: 'Expired',
      expiry: '2024-12-01',
    },
  ];

  // State for discounts and search term
  const [discounts] = useState(initialDiscounts); // Removed setDiscounts if not used yet
  const [searchTerm, setSearchTerm] = useState('');

  // Filter discounts based on search term
  const filteredDiscounts = discounts.filter(
    discount =>
      discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mt-5 discount-container">
      <h2 className="mb-4 text-primary fw-bold">Quản lý mã Danh mục</h2>

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
              placeholder="Tìm kiếm mã giảm giá..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <button className="btn btn-primary btn-add shadow-sm">
            <i className="fas fa-plus me-2"></i> Thêm mã giảm giá
          </button>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Mã giảm giá</th>
                <th scope="col">Giá trị</th>
                <th scope="col">Loại</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Ngày hết hạn</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiscounts.length > 0 ? (
                filteredDiscounts.map(discount => (
                  <tr key={discount.id}>
                    <td>{discount.id}</td>
                    <td className="fw-medium">{discount.code}</td>
                    <td>
                      {discount.amount}
                      {discount.type === 'Percentage' ? '%' : ' USD'}
                    </td>
                    <td>{discount.type}</td>
                    <td>
                      <span
                        className={`badge ${
                          discount.status === 'Active'
                            ? 'bg-success-subtle text-success'
                            : discount.status === 'Inactive'
                            ? 'bg-warning-subtle text-warning'
                            : 'bg-danger-subtle text-danger'
                        }`}
                      >
                        {discount.status}
                      </span>
                    </td>
                    <td>{discount.expiry}</td>
                    <td>
                      <button className="btn btn-outline-warning btn-sm me-2">
                        <i className="fas fa-edit"></i> Sửa
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
                        <i className="fas fa-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    Không tìm thấy mã giảm giá nào
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

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './discount.css';

export default function Discount() {
  const initialDiscounts = [
    { id: 1, code: 'DISCOUNT10', amount: 10, type: 'Percentage', status: 'Active', expiry: '2025-12-31' },
    { id: 2, code: 'SAVE20', amount: 20, type: 'Fixed', status: 'Inactive', expiry: '2025-06-30' },
    { id: 3, code: 'SUMMER25', amount: 25, type: 'Percentage', status: 'Active', expiry: '2025-08-15' },
    { id: 4, code: 'WELCOME5', amount: 5, type: 'Fixed', status: 'Expired', expiry: '2024-12-01' },
  ];

  const [discounts] = useState(initialDiscounts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mt-4 discount-container">
      <h2 className="mb-4 text-primary fw-bold">Quản lý Tài khoản</h2>

      <div className="row mb-3 align-items-center">
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

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Mã giảm giá</th>
                <th>Giá trị</th>
                <th>Loại</th>
                <th>Trạng thái</th>
                <th>Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiscounts.length > 0 ? (
                filteredDiscounts.map((discount) => (
                  <tr key={discount.id}>
                    <td>{discount.id}</td>
                    <td>{discount.code}</td>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
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
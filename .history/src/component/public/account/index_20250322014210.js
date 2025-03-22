import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import api from '../../config/axiosconfig';
import LS from './lichsudattour';

export default function Discount() {
  const [openlsdattour, setOpen] = useState(false);
  const nv = useRef(0);

  const [data, setData] = useState([
    {
      id: 1,
      soDienThoai: '0970958495',
      ten: 'Bùi Văn Lên',
      cccd: '908897878',
      email: 'fdffdfd',
      gioiTinh: true,
      diaChi: 'cần thơ',
      namSinh: '2003-03-02',
    },
  ]);

  const [sdt, setSdt] = useState('');
  const [reload, setReload] = useState(true);

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

  // Handle update customer
  const handleUpdate = customer => {
    api
      .post('admin/khachhang/update', customer)
      .then(() => {
        alert('Cập nhật thành công!');
        getAll(); // Refresh the data after update
      })
      .catch(error => {
        alert(error.response?.data || 'Có lỗi xảy ra khi cập nhật!');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary fw-bold">
        Quản lý Tài khoản Khách hàng
      </h2>

      {/* Modal for booking history */}
      {openlsdattour && <LS setopen={setOpen} nv={nv.current} />}

      {/* Search Bar */}
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
      </div>

      {/* Customers Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">CCCD</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((customer, index) => (
                  <tr
                    key={customer.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      nv.current = customer.id;
                      setOpen(true);
                    }}
                  >
                    <td className="fw-medium">
                      <input
                        onChange={e => {
                          data[index].isUpdate = true;
                          data[index].soDienThoai = e.target.value;
                          setReload(!reload);
                        }}
                        style={{
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          padding: '5px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: customer.isUpdate
                            ? '#fff3cd'
                            : '#f8f9fa',
                        }}
                        value={customer.soDienThoai}
                      />
                    </td>
                    <td>
                      <input
                        onChange={e => {
                          data[index].isUpdate = true;
                          data[index].ten = e.target.value;
                          setReload(!reload);
                        }}
                        style={{
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          padding: '5px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: customer.isUpdate
                            ? '#fff3cd'
                            : '#f8f9fa',
                        }}
                        value={customer.ten}
                      />
                    </td>
                    <td>
                      <input
                        onChange={e => {
                          data[index].isUpdate = true;
                          data[index].email = e.target.value;
                          setReload(!reload);
                        }}
                        style={{
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          padding: '5px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: customer.isUpdate
                            ? '#fff3cd'
                            : '#f8f9fa',
                        }}
                        value={customer.email}
                      />
                    </td>
                    <td>
                      <input
                        onChange={e => {
                          data[index].isUpdate = true;
                          data[index].cccd = e.target.value;
                          setReload(!reload);
                        }}
                        style={{
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          padding: '5px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: customer.isUpdate
                            ? '#fff3cd'
                            : '#f8f9fa',
                        }}
                        value={customer.cccd}
                      />
                    </td>
                    <td>
                      <select
                        onChange={e => {
                          data[index].isUpdate = true;
                          data[index].gioiTinh = e.target.value === 'true';
                          setReload(!reload);
                        }}
                        style={{
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          padding: '5px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: customer.isUpdate
                            ? '#fff3cd'
                            : '#f8f9fa',
                        }}
                      >
                        <option value="true" selected={customer.gioiTinh}>
                          Nam
                        </option>
                        <option value="false" selected={!customer.gioiTinh}>
                          Nữ
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        onChange={e => {
                          data[index].isUpdate = true;
                          data[index].diaChi = e.target.value;
                          setReload(!reload);
                        }}
                        style={{
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          padding: '5px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: customer.isUpdate
                            ? '#fff3cd'
                            : '#f8f9fa',
                        }}
                        value={customer.diaChi}
                      />
                    </td>
                    <td>
                      <button
                        style={{
                          border: '1px solid #7AB730',
                          backgroundColor: customer.isUpdate
                            ? '#7AB730'
                            : '#e9ecef',
                          color: customer.isUpdate ? '#fff' : '#6c757d',
                          transition: 'all 0.3s ease',
                        }}
                        onClick={e => {
                          e.stopPropagation(); // Prevent row click from opening modal
                          handleUpdate(customer);
                        }}
                        disabled={!customer.isUpdate}
                        className="btn btn-sm me-2"
                      >
                        <i
                          style={{
                            color: customer.isUpdate ? '#fff' : '#7AB730',
                          }}
                          className="fas fa-save"
                        ></i>{' '}
                        {customer.isUpdate ? 'Lưu' : 'Cập nhật'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
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

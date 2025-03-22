import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import api from '../../config/axiosconfig';
import LS from './lichsudattour';
export default function Discount() {
  const [openlsdattour, setopen] = useState(false);
  const nv = useRef(0);
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

  const getAll = () => {
    api
      .get('admin/khachhang/getall?sdt=' + sdt)
      .then(v => {
        return v.data;
      })
      .then(v => {
        setData(v);
      });
  };

  useEffect(() => {
    getAll();
  }, [sdt]);

  const [reload, setReload] = useState(true);

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
    setSdt(e.target.value);
  };

  return (
    <div className="row" style={{ position: 'relative' }}>
      <h2 style={{ marginTop: '20px' }} className="mb-4 text-primary fw-bold">
        Quản lý Tài khoản
      </h2>
      {openlsdattour ? <LS setopen={setopen} nv={nv.current}></LS> : null}
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
      </div>

      {/* Discounts Table */}
      {/* <div className="card  shadow-sm border-0">
        <div className="card-body p-0"> */}
      <table
        style={{ width: '99%', marginLeft: '15px' }}
        className="table table-hover table-striped mb-0"
      >
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
          {filteredDiscounts.length > 0 ? (
            data.map((discount, index) => (
              <tr
                style={{ cursor: 'pointer' }}
                key={discount.id}
                onClick={() => {
                  nv.current = discount.id;
                  setopen(true);
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
                      border: '0px',
                      backgroundColor: '#ECECEC',
                      outline: 'none',
                    }}
                    value={discount.soDienThoai}
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
                      border: '0px',
                      backgroundColor: '#ECECEC',
                      outline: 'none',
                    }}
                    value={discount.ten}
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
                      border: '0px',
                      backgroundColor: '#ECECEC',
                      outline: 'none',
                    }}
                    value={discount.email}
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
                      border: '0px',
                      backgroundColor: '#ECECEC',
                      outline: 'none',
                    }}
                    value={discount.cccd}
                  />
                </td>
                <td>
                  <select
                    onChange={e => {
                      data[index].isUpdate = true;
                      data[index].gioiTinh = e.target.value;
                      setReload(!reload);
                    }}
                  >
                    <option value={true} selected={discount.gioiTinh}>
                      Nam
                    </option>
                    <option value={false} selected={discount.gioiTinh}>
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
                      border: '0px',
                      backgroundColor: '#ECECEC',
                      outline: 'none',
                    }}
                    value={discount.diaChi}
                  />
                </td>
                {/* <td>
                        <input
                        onChange={(e) => {
                          data[index].isUpdate = true;
                          data[index].namSinh = e.target.value;
                          setReload(!reload);
                        }} type="datetime-local"
                        style={{
                          border: "0px",
                          backgroundColor: "#ECECEC",
                          outline: "none",
                        }}
                        value={discount.namSinh}
                      />
                    </td> */}
                <td>
                  <button
                    style={{ border: '1px solid #7AB730' }}
                    onClick={() => {
                      api
                        .post('admin/khachhang/update', discount)
                        .then(v => {
                          alert('Update thành công');
                        })
                        .catch(error => {
                          alert(error.response.data);
                        });
                    }}
                    disabled={discount.isUpdate === undefined}
                    className="btn btn-outline-warning btn-sm me-2"
                  >
                    <i
                      style={{ color: '#7AB730', border: '1px solid #7AB730' }}
                      className="fas fa-edit"
                    ></i>{' '}
                    {discount.isUpdate !== undefined ? 'Update' : ''}
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
    //   </div>
    // </div>
  );
}

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuanLyUuDai from './uudai';
import AddTour from './ModalAddTour';

export default function Discount() {
  const navigate = useNavigate();
  const [dstour, setDstour] = useState([]);
  const [opentgkh, setOpentgkh] = useState(false);
  const [thongtin, setThongtin] = useState(null);
  const [loai, setLoai] = useState([]);
  const [loaichon, setLoaichon] = useState(0);
  const [value, setValue] = useState('recents');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/tour/getadmintour')
      .then(data => {
        setDstour(data.data.data || []);
      })
      .catch(error => console.error('Lỗi khi lấy danh sách tour:', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/loaitour/getall')
      .then(data => {
        setLoai(data.data.data || []);
      })
      .catch(error => console.error('Lỗi khi lấy loại tour:', error));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    console.log('Search term:', e.target.value);
  };

  const filteredTours = dstour.filter(tour =>
    tour.ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold" style={{ fontSize: '28px' }}>
          Quản lý Tour
        </h2>
        <AddTour />
      </div>

      {opentgkh && <QuanLyUuDai ds={thongtin} />}

      {/* Search and Filter */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-8 d-flex align-items-center gap-3">
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-light border-0">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Tìm kiếm tour..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ borderRadius: '0 5px 5px 0' }}
            />
          </div>

          <BottomNavigation
            sx={{ height: '40px', backgroundColor: '#f8f9fa' }}
            value={value}
            onChange={handleChange}
          >
            {loai.map(data => (
              <BottomNavigationAction
                key={data.id}
                onClick={() => setLoaichon(data.id)}
                label={data.ten}
                value={data.ten}
                icon={
                  <img
                    src={data.icon}
                    alt={data.ten}
                    style={{ width: 24, height: 24 }}
                  />
                }
              />
            ))}
          </BottomNavigation>
        </div>
        <div className="col-md-4 text-end">
          <button
            onClick={() => navigate('haha')}
            className="btn shadow-sm"
            style={{
              backgroundColor: '#7AB730',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={e => (e.target.style.backgroundColor = '#689f28')}
            onMouseOut={e => (e.target.style.backgroundColor = '#7AB730')}
          >
            <i className="fas fa-plus me-2"></i> Thêm mã giảm giá
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="card shadow-sm border-0"
        style={{ borderRadius: '10px', overflow: 'hidden' }}
      >
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead style={{ backgroundColor: '#343a40', color: 'white' }}>
              <tr>
                <th scope="col" className="py-3">
                  STT
                </th>
                <th scope="col" className="py-3">
                  Tên tour
                </th>
                <th scope="col" className="py-3">
                  Nhân viên hướng dẫn
                </th>
                <th scope="col" className="py-3">
                  Thông tin cơ bản
                </th>
                <th scope="col" className="py-3">
                  Ưu đãi áp dụng
                </th>
                <th scope="col" className="py-3">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.length > 0 ? (
                filteredTours.map((data, index) => (
                  <tr
                    key={data.id}
                    style={{ transition: 'background-color 0.2s' }}
                  >
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle fw-medium">{data.ten}</td>
                    <td className="align-middle">
                      {data.nhanvien?.ten || 'Chưa có'}
                    </td>
                    <td className="align-middle"></td>
                    <td className="align-middle">
                      <button
                        onClick={() => {
                          setThongtin(data);
                          setOpentgkh(true);
                        }}
                        className="btn btn-outline-warning btn-sm"
                        style={{
                          borderRadius: '5px',
                          padding: '5px 10px',
                          transition: 'all 0.3s',
                        }}
                        onMouseOver={e => {
                          e.target.style.backgroundColor = '#ffc107';
                          e.target.style.color = 'white';
                        }}
                        onMouseOut={e => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#ffc107';
                        }}
                      >
                        <i className="fas fa-eye me-1"></i> Xem chi tiết
                      </button>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        style={{
                          borderRadius: '5px',
                          padding: '5px 10px',
                          transition: 'all 0.3s',
                        }}
                        onMouseOver={e => {
                          e.target.style.backgroundColor = '#007bff';
                          e.target.style.color = 'white';
                        }}
                        onMouseOut={e => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#007bff';
                        }}
                      >
                        <i className="fas fa-edit me-1"></i> Sửa
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        style={{
                          borderRadius: '5px',
                          padding: '5px 10px',
                          transition: 'all 0.3s',
                        }}
                        onMouseOver={e => {
                          e.target.style.backgroundColor = '#dc3545';
                          e.target.style.color = 'white';
                        }}
                        onMouseOut={e => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#dc3545';
                        }}
                      >
                        <i className="fas fa-trash me-1"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    Không tìm thấy tour nào
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

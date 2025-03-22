import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Đảm bảo import Bootstrap
import api from '../../config/axiosconfig';

function formatDateTime(input) {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default function BookingHistory({ nv, setopen }) {
  const today = new Date().toISOString().slice(0, 16);
  const firstDay = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .slice(0, 16);

  const [bd, setBd] = useState(firstDay);
  const [kt, setKt] = useState(today);
  const [dsve, setDsve] = useState([]);

  const fetchData = (bdValue, ktValue) => {
    const formData = new FormData();
    formData.append('id', nv);
    formData.append('bd', bdValue);
    formData.append('kt', ktValue);

    api.post('ve/ls', formData).then(response => {
      setDsve(response.data.data || []);
    });
  };

  useEffect(() => {
    fetchData(firstDay, today);
  }, [nv]); // Thêm nv vào dependency để refetch khi nv thay đổi

  const handleCancelBooking = (veId, index) => {
    api.post(`ve/huyve?id=${veId}`).then(response => {
      if (response.data.status !== 'OK') {
        alert('Hủy vé thất bại');
      } else {
        alert('Hủy vé thành công');
        setDsve(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
      }
    });
  };

  return (
    <div
      className="container position-absolute shadow-lg"
      style={{
        border: '2px solid #7AB730',
        width: '95%',
        backgroundColor: 'white',
        height: '500px',
        overflow: 'auto',
        zIndex: 20,
        left: '3%',
        top: '143px',
        borderRadius: '10px',
      }}
    >
      <img
        onClick={() => setopen(false)}
        src="https://cdn-icons-png.flaticon.com/128/189/189254.png"
        style={{
          position: 'absolute',
          cursor: 'pointer',
          left: '15px',
          top: '15px',
          width: '25px',
        }}
        alt="Close"
      />
      <h3
        className="text-center mt-5 mb-4 fw-bold"
        style={{ color: '#7AB730' }}
      >
        Lịch sử đặt tour
      </h3>
      <div className="row px-3 mb-4">
        <div className="col-6 d-flex align-items-center">
          <label
            htmlFor="bd"
            className="fw-medium me-2"
            style={{ color: '#7AB730' }}
          >
            Từ:
          </label>
          <input
            id="bd"
            type="datetime-local"
            className="form-control shadow-sm"
            style={{ maxWidth: '200px', borderColor: '#7AB730' }}
            value={bd}
            onChange={e => {
              setBd(e.target.value);
              fetchData(e.target.value, kt);
            }}
          />
        </div>
        <div className="col-6 d-flex align-items-center">
          <label
            htmlFor="kt"
            className="fw-medium me-2"
            style={{ color: '#7AB730' }}
          >
            Đến:
          </label>
          <input
            id="kt"
            type="datetime-local"
            className="form-control shadow-sm"
            style={{ maxWidth: '200px', borderColor: '#7AB730' }}
            value={kt}
            onChange={e => {
              setKt(e.target.value);
              fetchData(bd, e.target.value);
            }}
          />
        </div>
      </div>
      <div className="px-3">
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th className="text-center" style={{ width: '5%' }}>
                STT
              </th>
              <th>Tên tour</th>
              <th>Ngày đặt</th>
              <th>Thời điểm khởi hành</th>
              <th>Giá vé áp dụng</th>
              <th className="text-center" style={{ width: '15%' }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {dsve.length > 0 ? (
              dsve.map((data, index) => (
                <tr key={index}>
                  <td className="text-center fw-bold">{index + 1}</td>
                  <td>{data.T_TEN}</td>
                  <td>{formatDateTime(data.V_NGAYDAT)}</td>
                  <td>{formatDateTime(data.T_THOIGIANKHOIHANH)}</td>
                  <td>{data.V_GIA.toLocaleString()} VND</td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleCancelBooking(data.v_id, index)}
                    >
                      <i className="fas fa-trash me-1"></i> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  Không có tour trong thời gian này
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

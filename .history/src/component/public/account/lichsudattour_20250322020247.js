import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Đảm bảo đã import Bootstrap
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

function isFutureDate(dateTimeStr) {
  const [date, time] = dateTimeStr.split(' ');
  const [day, month, year] = date.split('/').map(Number);
  const [hour, minute, second] = time.split(':').map(Number);

  const inputDate = new Date(year, month - 1, day, hour, minute, second);
  const now = new Date();

  return inputDate > now;
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

    api
      .post('ve/ls', formData)
      .then(response => {
        setDsve(response.data.data || []);
      })
      .catch(error => {
        console.error('Lỗi khi lấy lịch sử đặt tour:', error);
        setDsve([]);
      });
  };

  useEffect(() => {
    fetchData(firstDay, today);
  }, [nv]);

  const handleCancelBooking = (veId, index, thoigiankhoihanh) => {
    if (!isFutureDate(formatDateTime(thoigiankhoihanh))) {
      alert('Không thể hủy vé vì tour đã khởi hành hoặc đã kết thúc!');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn hủy vé này không?')) {
      api
        .post(`ve/huyve?id=${veId}`)
        .then(response => {
          if (response.data.status !== 'OK') {
            alert('Hủy vé thất bại!');
          } else {
            alert('Hủy vé thành công!');
            setDsve(prev => prev.filter((_, i) => i !== index));
          }
        })
        .catch(error => {
          console.error('Lỗi khi hủy vé:', error);
          alert('Có lỗi xảy ra khi hủy vé!');
        });
    }
  };

  return (
    <div
      style={{
        border: '2px solid #28a745', // Xanh lá đậm
        width: '95%',
        backgroundColor: 'white',
        height: '500px',
        overflow: 'auto',
        zIndex: 20,
        left: '3%',
        top: '143px',
        position: 'absolute',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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
      <h3 style={{ marginTop: '50px', textAlign: 'center', color: '#28a745' }}>
        Lịch sử đặt tour
      </h3>
      <div className="row" style={{ padding: '0 20px' }}>
        <div
          className="col-6"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <label
            htmlFor="bd"
            style={{
              marginRight: '10px',
              fontWeight: 'bold',
              color: '#28a745',
            }}
          >
            Từ:
          </label>
          <input
            id="bd"
            type="datetime-local"
            className="form-control"
            style={{ maxWidth: '200px', borderColor: '#28a745' }}
            value={bd}
            onChange={e => {
              setBd(e.target.value);
              fetchData(e.target.value, kt);
            }}
          />
        </div>
        <div
          className="col-6"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <label
            htmlFor="kt"
            style={{
              marginRight: '10px',
              fontWeight: 'bold',
              color: '#28a745',
            }}
          >
            Đến:
          </label>
          <input
            id="kt"
            type="datetime-local"
            className="form-control"
            style={{ maxWidth: '200px', borderColor: '#28a745' }}
            value={kt}
            onChange={e => {
              setKt(e.target.value);
              fetchData(bd, e.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <table
          className="table table-bordered"
          style={{ borderColor: '#28a745' }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: '#28a745', // Xanh lá đậm
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                STT
              </th>
              <th style={{ backgroundColor: '#28a745', color: 'white' }}>
                Tên tour
              </th>
              <th style={{ backgroundColor: '#28a745', color: 'white' }}>
                Ngày đặt
              </th>
              <th style={{ backgroundColor: '#28a745', color: 'white' }}>
                Thời điểm khởi hành
              </th>
              <th style={{ backgroundColor: '#28a745', color: 'white' }}>
                Giá vé
              </th>
              <th
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {dsve.length > 0 ? (
              dsve.map((data, index) => (
                <tr key={data.v_id}>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {index + 1}
                  </td>
                  <td>{data.T_TEN}</td>
                  <td>{formatDateTime(data.V_NGAYDAT)}</td>
                  <td>{formatDateTime(data.T_THOIGIANKHOIHANH)}</td>
                  <td>{data.V_GIA.toLocaleString()} VND</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() =>
                        handleCancelBooking(
                          data.v_id,
                          index,
                          data.T_THOIGIANKHOIHANH
                        )
                      }
                      className="btn btn-outline-success btn-sm" // Đổi thành xanh lá
                      disabled={
                        !isFutureDate(formatDateTime(data.T_THOIGIANKHOIHANH))
                      }
                    >
                      <i className="fas fa-trash"></i> Hủy
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: 'center',
                    color: '#28a745',
                    padding: '20px',
                  }}
                >
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

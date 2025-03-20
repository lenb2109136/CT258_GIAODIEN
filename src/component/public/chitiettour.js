import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';
import Header from './header';
import Comment from './comment';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './KhachHang';
import Slider from './cartslider';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Hàm tính độ tương đồng cosine
function cosineSimilarity(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += Math.pow(vectorA[i], 2);
    normB += Math.pow(vectorB[i], 2);
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  return normA === 0 || normB === 0 ? 0 : dotProduct / (normA * normB);
}

// Hàm tính độ tương đồng Jaccard cho tags
function calculateTagSimilarity(tags1, tags2) {
  if (!tags1 || !tags2) return 0;

  const set1 = new Set(tags1.split(/[,\s]+/).filter(tag => tag));
  const set2 = new Set(tags2.split(/[,\s]+/).filter(tag => tag));

  const intersection = new Set([...set1].filter(tag => set2.has(tag)));
  const unionSize = set1.size + set2.size - intersection.size;

  return unionSize === 0 ? 0 : intersection.size / unionSize;
}

const TourInfo = () => {
  const { cart, setcart } = useContext(CartContext);
  const [favorite, setfavorate] = useState([]);
  const [allTours, setAllTours] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [t, sett] = useState();
  const [chuachon, setchu] = useState(true);
  const [loading, setLoading] = useState(false);

  // Lấy tất cả tour khi component mount
  useEffect(() => {
    axios
      .get('http://localhost:8080/tour/getListTour?sdt=0123456789')
      .then(data => {
        const tours = Array.isArray(data.data.data) ? data.data.data : [];
        setAllTours(tours);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách tour:', error);
        setAllTours([]);
      });
  }, []);

  // Cập nhật danh sách tour khuyến nghị dựa trên tour hiện tại
  useEffect(() => {
    if (id && allTours.length > 0) {
      setLoading(true);
      const selectedTour = allTours.find(tour => tour.T_ID === parseInt(id));
      if (!selectedTour) {
        setLoading(false);
        return;
      }

      // Chuẩn hóa dữ liệu
      const maxLtId = Math.max(...allTours.map(t => t.LT_ID || 0), 1);
      const maxSoNgay = Math.max(...allTours.map(t => t.T_SONGAY || 0), 1);
      const maxSoDem = Math.max(...allTours.map(t => t.T_SODEM || 0), 1);
      const maxGia = Math.max(...allTours.map(t => t.gia || 0), 1);
      const maxSoSao = Math.max(...allTours.map(t => t.T_SOSAO || 0), 1);
      const maxTimeDiff = Math.max(
        ...allTours
          .filter(t => t.T_THOIGIANKHOIHANH && selectedTour.T_THOIGIANKHOIHANH)
          .map(
            t =>
              Math.abs(
                new Date(t.T_THOIGIANKHOIHANH) -
                  new Date(selectedTour.T_THOIGIANKHOIHANH)
              ) /
              (1000 * 60 * 60 * 24)
          ),
        1
      );

      // Vector đặc trưng của tour được chọn
      const selectedVector = [
        (selectedTour.LT_ID || 0) / maxLtId,
        (selectedTour.T_SONGAY || 0) / maxSoNgay,
        (selectedTour.T_SODEM || 0) / maxSoDem,
        (selectedTour.gia || 0) / maxGia,
        (selectedTour.T_SOSAO || 0) / maxSoSao,
        calculateTagSimilarity(selectedTour.T_TAGS, selectedTour.T_TAGS),
        selectedTour.T_THOIGIANKHOIHANH && selectedTour.T_THOIGIANKHOIHANH
          ? 1 -
            Math.abs(
              new Date(selectedTour.T_THOIGIANKHOIHANH) -
                new Date(selectedTour.T_THOIGIANKHOIHANH)
            ) /
              (maxTimeDiff * 1000 * 60 * 60 * 24)
          : 0,
      ];

      // Tính độ tương đồng với các tour khác
      const similarities = allTours
        .filter(tour => tour.T_ID !== parseInt(id))
        .map(tour => {
          const tourVector = [
            (tour.LT_ID || 0) / maxLtId,
            (tour.T_SONGAY || 0) / maxSoNgay,
            (tour.T_SODEM || 0) / maxSoDem,
            (tour.gia || 0) / maxGia,
            (tour.T_SOSAO || 0) / maxSoSao,
            calculateTagSimilarity(selectedTour.T_TAGS, tour.T_TAGS),
            tour.T_THOIGIANKHOIHANH && selectedTour.T_THOIGIANKHOIHANH
              ? 1 -
                Math.abs(
                  new Date(tour.T_THOIGIANKHOIHANH) -
                    new Date(selectedTour.T_THOIGIANKHOIHANH)
                ) /
                  (maxTimeDiff * 1000 * 60 * 60 * 24)
              : 0,
          ];
          return {
            tour,
            similarity: cosineSimilarity(selectedVector, tourVector),
          };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 6)
        .map(item => item.tour);

      setfavorate(similarities);
      // Lưu danh sách favorite vào localStorage
      localStorage.setItem('favoriteTours', JSON.stringify(similarities));
      localStorage.setItem('selectedTourId', id); // Lưu selectedTourId
      setLoading(false);
    }
  }, [id, allTours]);

  // Lấy thông tin tour
  useEffect(() => {
    axios
      .get(`http://localhost:8080/tour/getinfortour?id=${id}`)
      .then(data => {
        sett(data.data.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin tour:', error);
      });
  }, [id]);

  // Cuộn lên đầu trang khi id thay đổi
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Kiểm tra tour đã có trong giỏ hàng chưa
  useEffect(() => {
    if (cart && Array.isArray(cart)) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          setchu(false);
          break;
        }
      }
    }
  }, [cart, id]);

  const [activeTab, setActiveTab] = useState('Giới thiệu chung');

  const handleTourClick = tourId => {
    // Khi nhấp vào tour trong slider, cập nhật selectedTourId và điều hướng
    localStorage.setItem('selectedTourId', tourId);
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="fw-bold">{t?.ten || 'Đang tải...'}</h2>
        <ul className="nav nav-tabs mt-3">
          {[
            'Giới thiệu chung',
            'Lịch trình chi tiết',
            'Chi tiết giá',
            'Hình ảnh',
          ].map(tab => (
            <li className="nav-item" key={tab}>
              <a
                className="nav-link"
                href="#"
                onClick={() => setActiveTab(tab)}
                style={{
                  backgroundColor:
                    activeTab === tab ? '#7AB730' : 'transparent',
                  borderColor: activeTab === tab ? '#7AB730' : 'white',
                  color: activeTab === tab ? 'white' : '#000',
                  borderRadius: '5px',
                }}
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="position-relative">
              <img
                style={{ height: '500px', width: '600px' }}
                className="img-fluid"
                src={t?.anh || 'https://via.placeholder.com/600x500'}
                alt="Tour"
              />
              <div className="blog-date">
                <h6 className="font-weight-bold mb-n1">01</h6>
                <small className="text-white text-uppercase">Jan</small>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row d-flex align-items-center justify-content-center">
              <img
                className="mb-2 col-lg-2"
                style={{ width: '70px', height: '8%', marginRight: '2%' }}
                src="https://cdn-icons-png.flaticon.com/128/10693/10693001.png"
                alt="price-icon"
              />
              <h4 className="col-lg-10 text-danger text-center">
                73.900.000 đ
              </h4>
            </div>
            <div className="d-flex">
              <img
                className="mb-2"
                style={{ width: '8%', height: '8%', marginRight: '6%' }}
                src="https://cdn-icons-png.flaticon.com/128/2784/2784459.png"
                alt="airline-icon"
              />
              <p>
                <strong>Thời gian:</strong> {t?.soNgay} ngày {t?.soDem} đêm
              </p>
            </div>
            <div>
              <p>Thông tin khởi hành chi tiết</p>
              <ul>
                {t?.thoiGianKhoiHanh2?.map(data => (
                  <li key={data.thoiGian}>
                    Khởi hành: {formatDate(data.thoiGian)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex">
              <img
                className="mb-2"
                style={{ width: '8%', height: '8%', marginRight: '6%' }}
                src="https://cdn-icons-png.flaticon.com/128/984/984233.png"
                alt="airline-icon"
              />
              <p>
                <strong>Hãng hàng không:</strong> Turkish Airlines
              </p>
            </div>
            <div className="d-flex">
              <img
                className="mb-2"
                style={{ width: '8%', height: '8%', marginRight: '6%' }}
                src="https://cdn-icons-png.flaticon.com/128/282/282803.png"
                alt="calendar-icon"
              />
              <p>
                <strong>Ngày khởi hành:</strong>
              </p>
            </div>
            <div className="container">
              <div className="row">
                {t?.thoiGianKhoiHanh2?.map(data => (
                  <div className="col-md-6" key={data.thoiGian}>
                    <ul className="list-unstyled">
                      <li>{formatDate(data.thoiGian)}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <button
              disabled={!chuachon}
              onClick={() => {
                let y = [...cart];
                y.push({ ...t, dsdv: [] });
                setcart(y);
                setchu(false);
              }}
              className="w-100"
              style={{
                backgroundColor: chuachon ? '#7AB730' : 'gray',
                color: 'white',
                border: '1px solid white',
                height: '30px',
                borderRadius: '10px',
              }}
            >
              <strong>ĐẶT TOUR</strong>
            </button>
          </div>
        </div>
        <hr />

        <div className="row pb-3">
          <div className="bg-white mb-3" style={{ padding: '30px' }}>
            <h2 className="mb-3">
              Dolor justo sea kasd lorem clita justo diam amet
            </h2>
            <p>Sadipscing </p>
            <p>justo dolore sit invidunt.</p>
            <h4 className="mb-3">Est dolor lorem et ea</h4>
            <img
              className="img-fluid w-50 float-left mr-4 mb-2"
              src="img/blog-2.jpg"
              alt="Blog 2"
            />
            <p>
              Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
              voluptua tempor invidunt at est sanctus sanctus. Clita dolores sit
            </p>
            <p>
              Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
            </p>
            <h5 className="mb-3">Est dolor lorem et ea</h5>
            <img
              className="img-fluid w-50 float-right ml-4 mb-2"
              src="img/blog-3.jpg"
              alt="Blog 3"
            />
            <p>
              Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
              voluptua tempor invidunt at est sanctus sanctus. Clita dolores sit
            </p>
          </div>
        </div>

        <hr />

        <h2 className="mb-3">You might also like</h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Đang tải...</p>
          </div>
        ) : Array.isArray(favorite) && favorite.length > 0 ? (
          <Slider ds={favorite} onTourClick={handleTourClick} />
        ) : (
          <p>Không có tour gợi ý</p>
        )}
        <hr />

        <h2 className="mb-3">Detailed schedule</h2>
        <div className="chan mt-4">
          {t?.chan?.map((data, index) => (
            <div
              className="custom-card border rounded p-3"
              style={{ marginBottom: '20px', cursor: 'pointer' }}
              data-bs-toggle="collapse"
              data-bs-target={'#collapseContent' + (index + 1)}
              key={index}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2693/2693710.png"
                    className="me-2"
                    alt="Calendar"
                    style={{ width: '24px', height: '24px' }}
                  />
                  <strong>
                    <h7 className="mb-0">
                      Ngày {data?.ngayBatDau} - {data?.ngayKetThuc}:{' '}
                      {data.diaDiemDen}
                    </h7>
                  </strong>
                </div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/226/226172.png"
                  alt="Dropdown"
                  className="icon-dropdown"
                  style={{
                    width: '18px',
                    height: '18px',
                    marginLeft: 'auto',
                  }}
                />
              </div>
              <div
                id={'collapseContent' + (index + 1)}
                className="collapse mt-2"
                style={{ paddingLeft: '0px' }}
              >
                {/* Nội dung chi tiết nếu có */}
              </div>
            </div>
          ))}
        </div>
        <Comment id={id} />
      </div>
    </>
  );
};

export default TourInfo;

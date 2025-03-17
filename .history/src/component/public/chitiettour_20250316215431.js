import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';
import Header from './header';
import Comment from './comment';
import { useSearchParams } from 'react-router-dom';
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

const TourInfo = () => {
  const { cart, setcart } = useContext(CartContext);
  const [favorite, setFavorite] = useState([]);
  const [allTours, setAllTours] = useState([]);
  const [chanData, setChanData] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [t, sett] = useState();
  const [chuachon, setchu] = useState(true);

  const calculateSimilarity = (tour1, tour2, chanData) => {
    const vector1 = [tour1.T_SONGAY || 0, tour1.T_SODEM || 0, tour1.gia || 0];
    const vector2 = [tour2.T_SONGAY || 0, tour2.T_SODEM || 0, tour2.gia || 0];

    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }

    const magnitude1 = Math.sqrt(
      vector1.reduce((sum, val) => sum + val * val, 0)
    );
    const magnitude2 = Math.sqrt(
      vector2.reduce((sum, val) => sum + val * val, 0)
    );

    let similarity =
      magnitude1 === 0 || magnitude2 === 0
        ? 0
        : dotProduct / (magnitude1 * magnitude2);

    if (tour1.LT_ID === tour2.LT_ID) {
      similarity += 0.1;
    }

    const chanTour1 = Array.isArray(chanData)
      ? chanData.filter(chan => chan.T_ID === tour1.T_ID)
      : [];
    const chanTour2 = Array.isArray(chanData)
      ? chanData.filter(chan => chan.T_ID === tour2.T_ID)
      : [];
    const commonDestinations = chanTour1.filter(c1 =>
      chanTour2.some(c2 => c1.C_DIADIEMDEN === c2.C_DIADIEMDEN)
    ).length;
    if (commonDestinations > 0) {
      similarity += 0.05 * commonDestinations;
    }

    const time1 = new Date(tour1.T_THOIGIANKHOIHANH).getTime();
    const time2 = new Date(tour2.T_THOIGIANKHOIHANH).getTime();
    const timeDiff = Math.abs(time1 - time2) / (1000 * 60 * 60 * 24);
    if (timeDiff <= 7) {
      similarity += 0.1 * (1 - timeDiff / 7);
    }

    const tags1 = (tour1.T_TAGS || '').split(',').map(tag => tag.trim());
    const tags2 = (tour2.T_TAGS || '').split(',').map(tag => tag.trim());
    const commonTags = tags1.filter(tag => tags2.includes(tag)).length;
    if (commonTags > 0) {
      similarity += 0.05 * commonTags;
    }

    return Math.min(Math.max(similarity, 0), 1);
  };

  const getRecommendedTours = selectedTour => {
    const similarities = allTours.map(tour => ({
      tour,
      similarity: calculateSimilarity(selectedTour, tour, chanData),
    }));

    const sortedTours = similarities
      .filter(item => item.tour.T_ID !== selectedTour.T_ID)
      .sort((a, b) => b.similarity - a.similarity);

    return sortedTours.slice(0, 5).map(item => item.tour);
  };

  const handleTourSelect = selectedTour => {
    const recommendedTours = getRecommendedTours(selectedTour);
    setFavorite(recommendedTours);
    sessionStorage.setItem('selectedTour', JSON.stringify(selectedTour));
    sessionStorage.setItem(
      'recommendedTours',
      JSON.stringify(recommendedTours)
    );
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/tour/getListTour')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setAllTours(response.data.data);
        } else {
          console.error('Dữ liệu tour không hợp lệ:', response.data);
          setAllTours([]);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách tour:', error);
        setAllTours([]);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/chan/getall')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setChanData(response.data.data);
        } else {
          console.error('Dữ liệu chan không hợp lệ:', response.data);
          setChanData([]);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu chan:', error);
        setChanData([]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/tour/getinfortour?id=${id}`)
      .then(response => {
        if (response.data && response.data.data) {
          sett(response.data.data);
        } else {
          console.error('Dữ liệu tour chi tiết không hợp lệ:', response.data);
          sett(null);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin tour:', error);
        sett(null);
      });
  }, [id]);

  useEffect(() => {
    const isInCart = cart?.some(item => item.id == id);
    setchu(!isInCart);
  }, [cart, id]);

  useEffect(() => {
    const storedRecommendedTours = JSON.parse(
      sessionStorage.getItem('recommendedTours')
    );
    const selectedTour =
      JSON.parse(sessionStorage.getItem('selectedTour')) || t;

    if (storedRecommendedTours && storedRecommendedTours.length > 0) {
      setFavorite(storedRecommendedTours);
    } else if (selectedTour && allTours.length > 0 && chanData.length > 0) {
      const recommendedTours = getRecommendedTours(selectedTour);
      setFavorite(
        recommendedTours.length > 0 ? recommendedTours : allTours.slice(0, 5)
      );
    }
  }, [allTours, t, chanData]);

  const [activeTab, setActiveTab] = useState('Giới thiệu chung');

  return (
    <>
      <div className="container mt-4">
        <h2 className="fw-bold">{t?.ten}</h2>
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
                onClick={e => {
                  e.preventDefault();
                  setActiveTab(tab);
                }}
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
                src={t?.anh}
                alt=""
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
                  <div key={data.thoiGian} className="col-md-6">
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
                const updatedCart = [...cart, { ...t, dsdv: [] }];
                setcart(updatedCart);
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

        {activeTab === 'Giới thiệu chung' && (
          <div className="row pb-3">
            <div className="bg-white mb-3" style={{ padding: '30px' }}>
              <h2 className="mb-3">
                Dolor justo sea kasd lorem clita justo diam amet
              </h2>
              <p>
                Sadipscing labore amet rebum est et justo gubergren. Et eirmod
                ipsum sit diam ut magna lorem...
              </p>
              {/* Nội dung giới thiệu chung */}
            </div>
          </div>
        )}

        {activeTab === 'Lịch trình chi tiết' && (
          <div className="chan mt-4">
            {t?.chan?.map((data, index) => (
              <div
                key={index}
                className="custom-card border rounded p-3"
                style={{ marginBottom: '20px', cursor: 'pointer' }}
                data-bs-toggle="collapse"
                data-bs-target={`#collapseContent${index + 1}`}
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
                        Ngày {formatDate(data.ngayBatDau)} -{' '}
                        {formatDate(data.ngayKetThuc)}: {data.diaDiemDen}
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
                  id={`collapseContent${index + 1}`}
                  className="collapse mt-2"
                  style={{ paddingLeft: '0px' }}
                >
                  <p>{data.moTa}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr />

        <h2 className="mb-3">You might also like</h2>
        <Slider
          ds={favorite}
          allTours={allTours}
          chanData={chanData}
          onTourClick={handleTourSelect}
        />
        <hr />

        <Comment id={id} />
      </div>
    </>
  );
};

export default TourInfo;

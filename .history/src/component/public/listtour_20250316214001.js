import { useEffect, useRef, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Cart from './carttour';
import Slider from './cartslider';
import axios from 'axios';

function kiemtra(a, u) {
  for (let i = 0; i < a.length; i++) {
    if (a[i].batDau == u) {
      return i;
    }
  }
  return -1;
}

export default () => {
  const [loai, setloai] = useState([]);
  const [loaichon, setloaichon] = useState(0);
  const [value, setValue] = useState('recents');
  const [collapsed, setCollapsed] = useState(true);
  const [indx, setindx] = useState(0);
  const [listtour, setlisttour] = useState([]);
  const [favorite, setfavorate] = useState([]);
  const [allTours, setAllTours] = useState([]);

  const thoiLuong = useRef([
    { batDau: 1, KetThuc: 3 },
    { batDau: 3, KetThuc: 6 },
    { batDau: 6, KetThuc: 9 },
    { batDau: 9, KetThuc: 12 },
    { batDau: 12, KetThuc: 15 },
  ]);

  const dsNgay = useRef([
    { batDau: 1, KetThuc: 10 },
    { batDau: 11, KetThuc: 20 },
    { batDau: 21, KetThuc: 30 },
  ]);

  const filter = useRef({
    giaBatDau: -1,
    giaKetThuc: -1,
    dsNgay: [],
    thoiLuong: [],
    loai: 0,
  });

  const calculateSimilarity = (tour1, tour2, chanData) => {
    // Vector cơ bản: Số ngày, số đêm, giá
    const vector1 = [tour1.T_SONGAY || 0, tour1.T_SODEM || 0, tour1.gia || 0];
    const vector2 = [tour2.T_SONGAY || 0, tour2.T_SODEM || 0, tour2.gia || 0];

    // Tính tích vô hướng và độ lớn của vector
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

    // 1. So sánh loại tour (LT_ID)
    if (tour1.LT_ID === tour2.LT_ID) {
      similarity += 0.1; // Tăng độ tương đồng nếu cùng loại tour
    }

    // 2. So sánh điểm đến trong bảng chan (dựa trên T_ID)
    const chanTour1 = chanData.filter(chan => chan.T_ID === tour1.T_ID);
    const chanTour2 = chanData.filter(chan => chan.T_ID === tour2.T_ID);
    const commonDestinations = chanTour1.filter(c1 =>
      chanTour2.some(c2 => c1.C_DIADIEMDEN === c2.C_DIADIEMDEN)
    ).length;
    if (commonDestinations > 0) {
      similarity += 0.05 * commonDestinations; // Tăng độ tương đồng dựa trên số điểm đến chung
    }

    // 3. So sánh thời gian khởi hành (T_THOIGIANKHOIHANH)
    const time1 = new Date(tour1.T_THOIGIANKHOIHANH).getTime();
    const time2 = new Date(tour2.T_THOIGIANKHOIHANH).getTime();
    const timeDiff = Math.abs(time1 - time2) / (1000 * 60 * 60 * 24); // Chênh lệch tính bằng ngày
    if (timeDiff <= 7) {
      similarity += 0.1 * (1 - timeDiff / 7); // Tương đồng giảm dần nếu cách xa đến 7 ngày
    }

    // 4. So sánh tags (T_TAGS)
    const tags1 = (tour1.T_TAGS || '').split(',').map(tag => tag.trim());
    const tags2 = (tour2.T_TAGS || '').split(',').map(tag => tag.trim());
    const commonTags = tags1.filter(tag => tags2.includes(tag)).length;
    if (commonTags > 0) {
      similarity += 0.05 * commonTags; // Tăng độ tương đồng dựa trên số tag chung
    }

    // Giới hạn similarity trong khoảng [0, 1]
    return Math.min(Math.max(similarity, 0), 1);
  };

  const getRecommendedTours = selectedTour => {
    const similarities = allTours.map(tour => ({
      tour,
      similarity: calculateSimilarity(selectedTour, tour),
    }));

    const sortedTours = similarities
      .filter(item => item.tour.T_ID !== selectedTour.T_ID)
      .sort((a, b) => b.similarity - a.similarity);

    return sortedTours.slice(0, 5).map(item => item.tour);
  };

  const handleTourSelect = selectedTour => {
    const recommendedTours = getRecommendedTours(selectedTour);
    setfavorate(recommendedTours);
    // Lưu cả tour được chọn và danh sách favorite vào sessionStorage
    sessionStorage.setItem('selectedTour', JSON.stringify(selectedTour));
    sessionStorage.setItem(
      'recommendedTours',
      JSON.stringify(recommendedTours)
    );
  };

  // Khôi phục favorite từ sessionStorage khi component mount
  useEffect(() => {
    const storedFavorite = JSON.parse(
      sessionStorage.getItem('recommendedTours')
    );
    if (storedFavorite && storedFavorite.length > 0) {
      setfavorate(storedFavorite);
    } else {
      // Nếu không có dữ liệu trong sessionStorage, gọi API để lấy danh sách mặc định
      axios
        .get('http://localhost:8080/tour/getListTourfavourite')
        .then(data => {
          setfavorate(data.data.data);
          sessionStorage.setItem(
            'recommendedTours',
            JSON.stringify(data.data.data)
          );
        });
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/tour/getListTour').then(data => {
      setAllTours(data.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/loaitour/getall').then(data => {
      setloai(data.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/tour/getListTour').then(data => {
      setlisttour(data.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/tour/getListTourByLoai?idloai=${loaichon}`)
      .then(data => {
        setlisttour(data.data.data);
      });
  }, [loaichon]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="row">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <div>
          <BottomNavigation
            sx={{ width: 500 }}
            value={value}
            onChange={handleChange}
          >
            {loai?.map(data => (
              <BottomNavigationAction
                onClick={() => {
                  setloaichon(data.id);
                }}
                label={data.ten}
                value={data.ten}
                icon={
                  <img
                    src={data.icon}
                    alt="Recents"
                    style={{ width: 24, height: 24 }}
                  />
                }
              />
            ))}
          </BottomNavigation>
        </div>
      </div>

      <div style={{ width: '100%', marginBottom: '15px' }}>
        <div className="text-center mb-3 pb-3 mt-3">
          <h6
            className="text-uppercase"
            style={{ letterSpacing: '5px', color: '#7AB730' }}
          >
            Tours You May Like
          </h6>
        </div>
        <hr style={{ color: '#7AB730' }} />
        <Slider
          ds={favorite}
          allTours={allTours}
          onTourClick={handleTourSelect}
        />
      </div>

      <div
        className="bosung"
        style={{
          display: 'flex',
          gap: '20px',
          position: 'fixed',
          width: '100%',
          zIndex: 20,
        }}
      >
        <div
          style={{ position: 'absolute', zIndex: 3, left: '10px', top: '0px' }}
        ></div>
      </div>

      <div className="text-center mb-3 pb-3 mt-3">
        <h6
          className="text-uppercase"
          style={{ letterSpacing: '5px', color: '#7AB730' }}
        >
          Best Selling Tour
        </h6>
        <h1>Explore Top Destination</h1>
      </div>

      <div className="row" style={{ width: '90%', marginLeft: '4%' }}>
        <div
          className="col-lg-3"
          style={{ maxHeight: '600px', overflowY: 'scroll' }}
        >
          <div
            style={{
              width: '100%',
              padding: '10px',
              borderRight: '1px solid #ddd',
              textAlign: 'left',
            }}
          >
            <div>
              <h5
                style={{
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  color: '#7ab730',
                }}
              >
                Traveler
              </h5>
              <p style={{ color: 'gray', fontSize: '14px' }}>
                Khám Phá - Du Lịch
              </p>
            </div>

            <div style={{ marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold' }}>KHOẢNG GIÁ</p>
              <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                <input
                  onChange={event => {
                    filter.current.giaBatDau = parseFloat(event.target.value);
                  }}
                  type="number"
                  placeholder="₫ TỪ"
                  style={{
                    width: '50%',
                    padding: '5px',
                    border: '1px solid #ddd',
                    textAlign: 'left',
                  }}
                />
                <input
                  onChange={event => {
                    filter.current.giaKetThuc = parseFloat(event.target.value);
                  }}
                  type="number"
                  placeholder="₫ ĐẾN"
                  style={{
                    width: '50%',
                    padding: '5px',
                    border: '1px solid #ddd',
                    textAlign: 'left',
                  }}
                />
              </div>
              <button
                style={{
                  marginTop: '10px',
                  width: '100%',
                  backgroundColor: 'rgb(212, 160, 23)',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
                onClick={() => {
                  filter.current.loai = loaichon;
                  axios
                    .post(
                      'http://localhost:8080/tour/getfilter',
                      filter.current,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      }
                    )
                    .then(response => {
                      setlisttour(response.data.data);
                      console.log(response.data);
                    })
                    .catch(error => {
                      console.error(error);
                    });
                }}
              >
                Áp dụng
              </button>
            </div>

            <div style={{ marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold' }}>Quốc gia</p>
              {[
                'Việt Nam',
                'Pháp',
                'Thụy Sỹ',
                'Trung Quốc',
                'Hà Lan',
                'Nhật Bản',
                'Hy Lạp',
              ].map((brand, index) => (
                <label
                  key={index}
                  style={{
                    display: 'block',
                    margin: '5px 0',
                    textAlign: 'left',
                  }}
                >
                  <input type="checkbox" style={{ marginRight: '5px' }} />{' '}
                  {brand}
                </label>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold' }}>Thời lượng</p>
              {thoiLuong.current.map((brand, index) => (
                <label
                  key={index}
                  style={{
                    display: 'block',
                    margin: '5px 0',
                    textAlign: 'left',
                  }}
                >
                  <input
                    onClick={() => {
                      let mm = kiemtra(filter.current.thoiLuong, brand.batDau);
                      if (mm == -1) {
                        filter.current.thoiLuong.push(brand);
                        console.log(filter);
                      } else {
                        filter.current.thoiLuong.splice(mm, 1);
                        console.log(filter);
                      }
                    }}
                    type="checkbox"
                    style={{ marginRight: '5px' }}
                  />{' '}
                  {brand.batDau} - {brand.KetThuc} Ngày
                </label>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold' }}>Ngày khởi hành</p>
              {dsNgay.current.map((brand, index) => (
                <label
                  key={index}
                  style={{
                    display: 'block',
                    margin: '5px 0',
                    textAlign: 'left',
                  }}
                >
                  <input
                    onClick={() => {
                      let mm = kiemtra(filter.current.dsNgay, brand.batDau);
                      if (mm == -1) {
                        filter.current.dsNgay.push(brand);
                      } else {
                        filter.current.dsNgay.splice(mm, 1);
                      }
                    }}
                    type="checkbox"
                    style={{ marginRight: '5px' }}
                  />{' '}
                  Ngày {brand.batDau} - {brand.KetThuc}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'start',
              height: '600px',
              overflowY: 'scroll',
              width: '100%',
              position: 'relative',
              paddingBottom: '50px',
            }}
          >
            {listtour.map((data, index) => {
              if (index <= indx + 5 && index >= indx) {
                return (
                  <Link
                    key={index}
                    to={'/khachhang/tour?id=' + data.T_ID}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={e => {
                      e.preventDefault();
                      handleTourSelect(data); // Cập nhật slider trong trang hiện tại
                      setTimeout(() => {
                        window.location.href = `/khachhang/tour?id=${data.T_ID}`; // Chuyển hướng
                      }, 100);
                    }}
                  >
                    <Cart
                      ten={data.T_TEN}
                      id={data.T_ID}
                      gia={data.gia}
                      ngay={data.T_SONGAY}
                      anh={data.T_ANH}
                      dem={data.T_SODEM}
                      lt_id={data.LT_ID}
                      onTourSelect={handleTourSelect}
                    />
                  </Link>
                );
              }
              return null;
            })}

            {listtour.length === 0 && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10608/10608904.png"
                  alt="Không tìm thấy"
                />
                <p>Không tìm thấy tour phù hợp</p>
              </div>
            )}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '0px',
              right: '0px',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              background: 'white',
              padding: '10px 20px',
            }}
          >
            <strong>
              <p
                style={{
                  color: indx === 0 ? 'gray' : 'rgb(212, 160, 23)',
                  cursor: indx === 0 ? 'default' : 'pointer',
                }}
                onClick={() => indx > 0 && setindx(indx - 6)}
              >
                Quay Lại
              </p>
            </strong>
            <strong>
              <p
                style={{
                  color:
                    indx >= listtour.length - 1 ? 'gray' : 'rgb(212, 160, 23)',
                  cursor: indx >= listtour.length - 1 ? 'default' : 'pointer',
                }}
                onClick={() => indx < listtour.length - 1 && setindx(indx + 6)}
              >
                Kế Tiếp
              </p>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

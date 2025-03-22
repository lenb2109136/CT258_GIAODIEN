import { useContext, useEffect, useRef, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Cart from '../carttour';
import Slider from './cartslider';
import axios from 'axios';
import { AppContext } from '../../App';
import api from '../config/axiosconfig';

// Hàm kiểm tra
function kiemtra(a, u) {
  for (let i = 0; i < a.length; i++) {
    if (a[i].batDau === u) return i;
  }
  return -1;
}

// Hàm tính độ tương đồng cosine
function cosineSimilarity(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length)
    throw new Error('Vectors must have the same length');
  let dotProduct = 0,
    normA = 0,
    normB = 0;
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

// Hàm suy ra địa điểm từ T_TEN (mở rộng danh sách địa điểm)
function extractLocationFromName(tourName) {
  if (!tourName) return 'Unknown';
  const locations = [
    // Các tỉnh thành phố
    'Hà Nội',
    'TP.HCM',
    'Hồ Chí Minh',
    'Hải Phòng',
    'Đà Nẵng',
    'Cần Thơ',
    'Hải Dương',
    'Hà Giang',
    'Cao Bằng',
    'Lào Cai',
    'Bắc Kạn',
    'Lạng Sơn',
    'Tuyên Quang',
    'Yên Bái',
    'Thái Nguyên',
    'Phú Thọ',
    'Vĩnh Phúc',
    'Bắc Giang',
    'Bắc Ninh',
    'Quảng Ninh',
    'Hà Tĩnh',
    'Nghệ An',
    'Thanh Hóa',
    'Quảng Bình',
    'Quảng Trị',
    'Thừa Thiên Huế',
    'Huế',
    'Quảng Nam',
    'Quảng Ngãi',
    'Bình Định',
    'Phú Yên',
    'Khánh Hòa',
    'Ninh Thuận',
    'Bình Thuận',
    'Kon Tum',
    'Gia Lai',
    'Đắk Lắk',
    'Đắk Nông',
    'Lâm Đồng',
    'Bình Phước',
    'Tây Ninh',
    'Bình Dương',
    'Đồng Nai',
    'Bà Rịa - Vũng Tàu',
    'Vũng Tàu',
    'Long An',
    'Tiền Giang',
    'Bến Tre',
    'Trà Vinh',
    'Vĩnh Long',
    'Đồng Tháp',
    'An Giang',
    'Kiên Giang',
    'Hậu Giang',
    'Sóc Trăng',
    'Bạc Liêu',
    'Cà Mau',

    // Các địa điểm du lịch nổi bật
    'Hạ Long',
    'Sa Pa',
    'Đà Lạt',
    'Phú Quốc',
    'Nha Trang',
    'Hội An',
    'Mỹ Sơn',
    'Phong Nha',
    'Sơn Đoòng',
    'Côn Đảo',
    'Cát Bà',
    'Mộc Châu',
    'Mai Châu',
    'Tam Đảo',
    'Ba Vì',
    'Cát Tiên',
    'Cù Lao Chàm',
    'Lý Sơn',
    'Quy Nhơn',
    'Phan Thiết',
    'Mũi Né',
    'Bà Nà',
    'Ngũ Hành Sơn',
    'Tràng An',
    'Ninh Bình',
    'Bái Đính',
    'Yên Tử',
    'Cửa Lò',
    'Sầm Sơn',
    'Đồ Sơn',
    'Tà Xùa',
    'Fansipan',
    'Bạch Mã',
    'Cốc Pài',
    'Lũng Cú',
    'Đồng Văn',
    'Mèo Vạc',
    'Hà Tiên',
    'Rạch Giá',
    'Châu Đốc',
    'Cái Răng',
    'Mỹ Tho',
    'Sa Đéc',
    'Cồn Phụng',
    'Cồn Khương',
    'Vĩnh Nghiêm',
    'Điện Biên',
    'Sơn La',
    'Lai Châu',
    'Pearl Island',
    'Nam Du',
    'Bình Ba',
    'Bình Hưng',
    'Tây Bắc',
    'Đông Bắc',
    'Miền Tây',
    'Trung Bộ',
    'Vietnam',
  ];
  const nameLower = tourName.toLowerCase();
  return (
    locations.find(loc => nameLower.includes(loc.toLowerCase())) || 'Unknown'
  );
}

export default () => {
  const [loai, setloai] = useState([]);
  const { s, sets } = useContext(AppContext);
  const [loaichon, setloaichon] = useState(0);
  const [value, setValue] = useState('recents');
  const [collapsed, setCollapsed] = useState(true);
  const [indx, setindx] = useState(0);
  const [sdt, setSdt] = useState(localStorage.getItem('sdt'));
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTourId, setSelectedTourId] = useState(
    () => parseInt(localStorage.getItem('selectedTourId')) || null
  );
  const [loading, setLoading] = useState(false);
  const [allTours, setAllTours] = useState([]);
  const [favorite, setfavorate] = useState(
    () => JSON.parse(localStorage.getItem('favoriteTours')) || []
  );
  const [listtour, setlisttour] = useState([]);
  const [closestTours, setClosestTours] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const OPENROUTE_API_KEY =
    '5b3ce3597851110001cf6248f88b4df23e86413f846d28862cce425c';

  const handleChange = (event, newValue) => setValue(newValue);
  const toggleMenu = () => setCollapsed(!collapsed);
  useEffect(() => {
    if (s != null && s != undefined && s != '') {
      api
        .get(
          `http://localhost:8080/tour/getsearch?sdt=${localStorage.getItem(
            'sdt'
          )}&thamso=${s}`
        )
        .then(data => {
          setlisttour(data.data.data);
        });
    }
  }, [s]);
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
    giaBatDau: 1,
    giaKetThuc: 9000000000,
    dsNgay: [],
    thoiLuong: [],
    loai: 0,
    sdt: localStorage.getItem('sdt'),
  });

  // Lấy tất cả tour từ API getAllTours
  useEffect(() => {
    axios
      .get('http://localhost:8080/tour/getAllTours')
      .then(data => {
        const tours = Array.isArray(data.data.data) ? data.data.data : [];
        setAllTours(tours);
        console.log('All Tours:', tours); // Debug dữ liệu tour
        const savedFavorites = localStorage.getItem('favoriteTours');
        if (savedFavorites) {
          setfavorate(JSON.parse(savedFavorites));
        } else {
          axios
            .get('http://localhost:8080/tour/getListTourfavourite')
            .then(data =>
              setfavorate(Array.isArray(data.data.data) ? data.data.data : [])
            )
            .catch(error => {
              console.error('Lỗi khi lấy danh sách tour yêu thích:', error);
              setfavorate([]);
            });
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách tour:', error);
        setAllTours([]);
      });

    axios
      .get('http://localhost:8080/loaitour/getall')
      .then(data =>
        setloai(Array.isArray(data.data.data) ? data.data.data : [])
      )
      .catch(error => {
        console.error('Lỗi khi lấy danh sách loại tour:', error);
        setloai([]);
      });
  }, []);

  // Lấy vị trí người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log('User Location:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }); // Debug vị trí người dùng
        },
        error => {
          console.error('Lỗi khi lấy vị trí người dùng:', error);
          axios
            .get('https://ipapi.co/json/')
            .then(response => {
              setUserLocation({
                lat: response.data.latitude,
                lng: response.data.longitude,
              });
              console.log('User Location from IP:', {
                lat: response.data.latitude,
                lng: response.data.longitude,
              });
            })
            .catch(err => console.error('Lỗi IP Geolocation:', err));
        }
      );
    }
  }, []);

  // Lấy danh sách tour gần nhất dựa trên T_TEN
  useEffect(() => {
    const fetchClosestTours = async () => {
      if (!userLocation || allTours.length === 0) return;
      setLoading(true);

      try {
        // Bước 1: Suy ra địa điểm từ T_TEN
        const tourLocations = allTours.map(tour => ({
          tour,
          location: extractLocationFromName(tour.T_TEN),
        }));
        console.log('Tour Locations:', tourLocations); // Debug số lượng tour và địa điểm

        // Bước 2: Lấy tọa độ từ Nominatim
        const locationPromises = tourLocations.map(
          async ({ tour, location }) => {
            if (location === 'Unknown') return null;
            const geoResponse = await axios.get(
              `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                location + ', Việt Nam'
              )}&format=json&limit=1`
            );
            console.log(
              `Nominatim response for ${location}:`,
              geoResponse.data
            ); // Debug API Nominatim
            if (!geoResponse.data.length) return null;
            const { lat, lon } = geoResponse.data[0];
            return { tour, lat: parseFloat(lat), lng: parseFloat(lon) };
          }
        );

        const tourCoords = (await Promise.all(locationPromises)).filter(
          Boolean
        );
        console.log('Tour Coords:', tourCoords); // Debug số lượng tour có tọa độ

        if (tourCoords.length === 0) {
          setClosestTours([]);
          setLoading(false);
          return;
        }

        // Bước 3: Tính khoảng cách bằng OpenRouteService
        const locations = [
          [userLocation.lng, userLocation.lat],
          ...tourCoords.map(coord => [coord.lng, coord.lat]),
        ];

        const response = await axios.post(
          'https://api.openrouteservice.org/v2/matrix/driving-car',
          {
            locations,
            metrics: ['distance', 'duration'],
            units: 'km',
          },
          {
            headers: {
              Authorization: OPENROUTE_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('OpenRoute Response:', response.data); // Debug API OpenRouteService

        if (response.data.error) {
          throw new Error(response.data.error.message);
        }

        // Bước 4: Gắn khoảng cách vào tour và sắp xếp
        const closestTours = tourCoords
          .map((coord, index) => {
            const distance = response.data.distances[0][index + 1] ?? 0; // Mặc định 0 nếu null
            const duration = response.data.durations[0][index + 1] ?? 0;
            const durationText = `${Math.floor(duration / 3600)}h ${Math.round(
              (duration % 3600) / 60
            )}m`;
            return {
              ...coord.tour,
              distanceInfo: `${distance.toFixed(1)} km (${durationText})`,
              distanceValue: distance,
            };
          })
          .sort((a, b) => a.distanceValue - b.distanceValue)
          .slice(0, 6);

        console.log('Closest Tours:', closestTours); // Debug kết quả cuối cùng
        setClosestTours(closestTours);
      } catch (error) {
        console.error('Lỗi khi lấy tour gần nhất:', error);
        setClosestTours([]);
      } finally {
        setLoading(false);
      }
    };

    if (userLocation && allTours.length > 0) fetchClosestTours();
  }, [userLocation, allTours]);

  // Các useEffect khác
  useEffect(() => {
    axios
      .get(`http://localhost:8080/tour/getListTour?sdt=${sdt}`)
      .then(data =>
        setlisttour(Array.isArray(data.data.data) ? data.data.data : [])
      )
      .catch(error => {
        console.error('Lỗi khi lấy danh sách tour:', error);
        setlisttour([]);
      });
  }, [sdt]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/tour/getListTourByLoai?idloai=${loaichon}&sdt=${sdt}`
      )
      .then(data =>
        setlisttour(Array.isArray(data.data.data) ? data.data.data : [])
      )
      .catch(error => {
        console.error('Lỗi khi lấy danh sách tour:', error);
        setlisttour([]);
      });
  }, [loaichon, sdt]);

  useEffect(() => {
    if (selectedTourId && allTours.length > 0) {
      setLoading(true);
      const selectedTour = allTours.find(tour => tour.T_ID === selectedTourId);
      if (!selectedTour) {
        setLoading(false);
        return;
      }

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

      const selectedVector = [
        (selectedTour.LT_ID || 0) / maxLtId,
        (selectedTour.T_SONGAY || 0) / maxSoNgay,
        (selectedTour.T_SODEM || 0) / maxSoDem,
        (selectedTour.gia || 0) / maxGia,
        (selectedTour.T_SOSAO || 0) / maxSoSao,
        calculateTagSimilarity(selectedTour.T_TAGS, selectedTour.T_TAGS),
        selectedTour.T_THOIGIANKHOIHANH ? 1 : 0,
      ];

      const similarities = allTours
        .filter(tour => tour.T_ID !== selectedTourId)
        .map(tour => {
          const tourVector = [
            (tour.LT_ID || 0) / maxLtId,
            (tour.T_SONGAY || 0) / maxSoNgay,
            (tour.T_SODEM || 0) / maxSoDem,
            (tour.gia || 0) / maxGia,
            (tour.T_SOSAO || 0) / maxSoSao,
            calculateTagSimilarity(selectedTour.T_TAGS, tour.T_TAGS),
            tour.T_THOIGIANKHOIHANH ? 1 : 0,
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
      localStorage.setItem('favoriteTours', JSON.stringify(similarities));
      setLoading(false);
    }
  }, [selectedTourId, allTours]);

  const handleTourClick = tourId => {
    setSelectedTourId(tourId);
    localStorage.setItem('selectedTourId', tourId);
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
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={handleChange}
        >
          {loai.map(data => (
            <BottomNavigationAction
              key={data.id}
              onClick={() => setloaichon(data.id)}
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

      {/* Slider Tours You May Like */}
      <div style={{ width: '100%', marginBottom: '15px' }}>
        <div className="text-center mb-3 pb-3 mt-3">
          <h6
            className="text-uppercase"
            style={{ letterSpacing: '5px', color: '#7AB730' }}
          >
            Có thể bạn sẽ thích
          </h6>
        </div>
        <hr style={{ color: '#7AB730' }} />
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Đang tải...</p>
          </div>
        ) : (
          <Slider ds={favorite} onTourClick={handleTourClick} />
        )}
      </div>

      {/* Slider Các Tour Gần Nhất */}
      <div style={{ width: '100%', marginBottom: '15px' }}>
        <div className="text-center mb-3 pb-3 mt-3">
          <h6
            className="text-uppercase"
            style={{ letterSpacing: '5px', color: '#7AB730' }}
          >
            Các tour gần nhất với bạn
          </h6>
        </div>
        <hr style={{ color: '#7AB730' }} />
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Đang tải...</p>
          </div>
        ) : (
          <Slider
            ds={closestTours.map(tour => ({
              ...tour,
              additionalInfo: tour.distanceInfo,
              isNearby: true,
            }))}
            onTourClick={handleTourClick}
          />
        )}
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
          Những tours hot nhất
        </h6>
        <h1>Khám phá những địa điểm nổi bật</h1>
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
                  onChange={event =>
                    (filter.current.giaBatDau = parseFloat(event.target.value))
                  }
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
                  onChange={event =>
                    (filter.current.giaKetThuc = parseFloat(event.target.value))
                  }
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
                  if (s == null || s == undefined || s === '') {
                    axios
                      .post(
                        'http://localhost:8080/tour/getfilter',
                        filter.current,
                        { headers: { 'Content-Type': 'application/json' } }
                      )
                      .then(response =>
                        setlisttour(
                          Array.isArray(response.data.data)
                            ? response.data.data
                            : []
                        )
                      )
                      .catch(error => {
                        console.error(error);
                        setlisttour([]);
                      });
                  } else {
                    axios
                      .post(
                        'http://localhost:8080/tour/filtermix',
                        { ...filter.current, thamso: s },
                        { headers: { 'Content-Type': 'application/json' } }
                      )
                      .then(response =>
                        setlisttour(
                          Array.isArray(response.data.data)
                            ? response.data.data
                            : []
                        )
                      )
                      .catch(error => {
                        console.error(error);
                        setlisttour([]);
                      });
                  }
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
                      if (mm === -1) filter.current.thoiLuong.push(brand);
                      else filter.current.thoiLuong.splice(mm, 1);
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
                      if (mm === -1) filter.current.dsNgay.push(brand);
                      else filter.current.dsNgay.splice(mm, 1);
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

        <div className="col-lg-9" style={{ position: 'relative' }}>
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
            {Array.isArray(listtour) && listtour.length > 0 ? (
              listtour.map((data, index) => {
                if (index <= indx + 5 && index >= indx) {
                  return (
                    <Link
                      key={index}
                      to={`/khachhang/tour?id=${data.T_ID}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={() => handleTourClick(data.T_ID)}
                    >
                      <Cart
                        ten={data.T_TEN}
                        id={data.T_ID}
                        gia={data.gia}
                        ngay={data.T_SONGAY}
                        anh={data.T_ANH}
                        dem={data.T_SODEM}
                      />
                    </Link>
                  );
                }
                return null;
              })
            ) : (
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

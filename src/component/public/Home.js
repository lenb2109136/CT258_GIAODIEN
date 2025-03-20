import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import anh1 from '../../img/carousel-1.jpg';
import anh2 from '../../img/carousel-2.jpg';
import about from '../../img/about.jpg';
import ngon from '../../img/ngon.jpg';
import toan from '../../img/ton.jpg';
import len from '../../img/len.jpg';

// Tùy chỉnh nút Prev và Next
const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '-50px' }}
      onClick={onClick}
    >
      <button className="btn btn-primary btn-lg-square">
        <i className="fa fa-arrow-left"></i>
      </button>
    </div>
  );
};

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '-50px' }}
      onClick={onClick}
    >
      <button className="btn btn-primary btn-lg-square">
        <i className="fa fa-arrow-right"></i>
      </button>
    </div>
  );
};

// Hàm sinh số ngẫu nhiên từ 4.1 đến 5 với 1 chữ số thập phân
const getRandomRating = () => {
  const min = 4.1;
  const max = 5.0;
  const random = (Math.random() * (max - min) + min).toFixed(1);
  return parseFloat(random);
};

// Hàm sinh số ngẫu nhiên từ 50 đến 100
const getRandomReviews = () => {
  const min = 5;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Home = () => {
  const [dshometour, setDshometour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get('http://localhost:8080/tour/getAllTours')
      .then(response => {
        console.log('Response từ API:', response.data);
        if (response.data && response.data.data) {
          setDshometour(response.data.data.slice(0, 6)); // Lấy 6 tour đầu tiên
        } else {
          setError('Không có dữ liệu tour từ API.');
        }
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error.response || error.message);
        setError('Lỗi khi tải dữ liệu tour. Vui lòng thử lại sau.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Cấu hình cho Slider với nút chuyển qua lại
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Định dạng giá tiền
  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <>
      <div className="container-fluid bg-light pt-3 d-none d-lg-block"></div>

      <div className="container-fluid p-0">
        <div
          id="header-carousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src={anh1} alt="Hình ảnh" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: '900px' }}>
                  <h4 className="text-white text-uppercase mb-md-3">
                    Du Lịch & Khám Phá
                  </h4>
                  <h1 className="display-3 text-white mb-md-4">
                    Cùng Khám Phá Thế Giới!
                  </h1>
                  <a
                    href=""
                    className="btn background-xanh py-md-3 px-md-5 mt-2"
                  >
                    Đặt Ngay
                  </a>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src={anh2} alt="Hình ảnh" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: '900px' }}>
                  <h4 className="text-white text-uppercase mb-md-3">
                    Du Lịch & Khám Phá
                  </h4>
                  <h1 className="display-3 text-white mb-md-4">
                    Khám Phá Những Điểm Đến Tuyệt Vời
                  </h1>
                  <a
                    href=""
                    className="btn background-xanh text-xanh py-md-3 px-md-5 mt-2"
                  >
                    Đặt Ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#header-carousel"
            data-slide="prev"
          >
            <div
              className="btn btn-dark"
              style={{ width: '45px', height: '45px' }}
            >
              <span className="carousel-control-prev-icon mb-n2"></span>
            </div>
          </a>
          <a
            className="carousel-control-next"
            href="#header-carousel"
            data-slide="next"
          >
            <div
              className="btn btn-dark"
              style={{ width: '45px', height: '45px' }}
            >
              <span className="carousel-control-next-icon mb-n2"></span>
            </div>
          </a>
        </div>
      </div>

      <div className="container-fluid booking mt-5 pb-5">
        <div className="container pb-5">
          <div className="bg-light shadow" style={{ padding: '30px' }}>
            <div
              className="row align-items-center"
              style={{ minHeight: '60px' }}
            >
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3 mb-md-0">
                      <select
                        className="custom-select px-4"
                        style={{ height: '47px' }}
                        defaultValue=""
                      >
                        <option value="">Điểm đến</option>
                        <option value="1">Hà Nội</option>
                        <option value="2">Đà Nẵng</option>
                        <option value="3">TP. Hồ Chí Minh</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 mb-md-0">
                      <div
                        className="date"
                        id="date1"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control p-4 datetimepicker-input"
                          placeholder="Ngày đi"
                          data-target="#date1"
                          data-toggle="datetimepicker"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 mb-md-0">
                      <div
                        className="date"
                        id="date2"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control p-4 datetimepicker-input"
                          placeholder="Ngày về"
                          data-target="#date2"
                          data-toggle="datetimepicker"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 mb-md-0">
                      <select
                        className="custom-select px-4"
                        style={{ height: '47px' }}
                        defaultValue=""
                      >
                        <option value="">Thời gian</option>
                        <option value="1">3 ngày 2 đêm</option>
                        <option value="2">4 ngày 3 đêm</option>
                        <option value="3">5 ngày 4 đêm</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  style={{ height: '47px', marginTop: '-2px' }}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-6" style={{ minHeight: '500px' }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src={about}
                  style={{ objectFit: 'cover', left: '0px' }}
                  alt="Về chúng tôi"
                />
              </div>
            </div>
            <div className="col-lg-6 pt-5 pb-lg-5">
              <div className="about-text bg-white p-4 p-lg-5 my-lg-5">
                <h6
                  className="text-primary text-uppercase"
                  style={{ letterSpacing: '3px' }}
                >
                  Về Chúng Tôi
                </h6>
                <h1 className="mb-3">
                  Chúng Tôi Mang Đến Những Tour Du Lịch Tốt Nhất Trong Tầm Giá
                </h1>
                <p>
                  Chúng tôi tự hào cung cấp các gói tour du lịch chất lượng cao,
                  phù hợp với mọi ngân sách. Từ những bãi biển tuyệt đẹp của Đà
                  Nẵng đến những di sản văn hóa tại Huế, chúng tôi cam kết mang
                  lại trải nghiệm tuyệt vời nhất cho bạn.
                </p>
                <div className="row mb-4">
                  <div className="col-6">
                    <img className="img-fluid" src="img/about-1.jpg" alt="" />
                  </div>
                  <div className="col-6">
                    <img className="img-fluid" src="img/about-2.jpg" alt="" />
                  </div>
                </div>
                <a href="" className="btn mt-1">
                  Đặt Ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần slider tour */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: '5px' }}
            >
              Gói Tour
            </h6>
            <h1>Các Gói Tour Hoàn Hảo</h1>
          </div>
          {loading ? (
            <div className="col-12 text-center">Đang tải dữ liệu tour...</div>
          ) : error ? (
            <div className="col-12 text-center text-danger">{error}</div>
          ) : dshometour.length > 0 ? (
            <Slider {...sliderSettings}>
              {dshometour.map(data => (
                <div key={data.id} className="px-2">
                  <div className="package-item bg-white mb-2">
                    <img
                      style={{
                        height: '500px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                      src={data.T_ANH}
                      alt={data.T_TEN}
                      onError={e => {
                        e.target.src = 'path/to/fallback-image.jpg'; // Thay bằng đường dẫn ảnh dự phòng
                      }}
                    />
                    <div className="p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <small className="m-0">
                          <i className="fa fa-calendar-alt text-primary mr-2"></i>
                          {data.T_SONGAY} ngày
                        </small>
                        <small className="m-0">
                          <i className="fa fa-calendar-alt text-primary mr-2"></i>
                          {data.T_SODEM} đêm
                        </small>
                        <small className="m-0">
                          <i className="fa fa-user text-primary mr-2"></i>
                          {data.T_SONGUOITHAMGIA} người
                        </small>
                      </div>
                      <Link
                        to={`/tour?id=${data.id}`}
                        className="h5 text-decoration-none"
                      >
                        {data.T_TEN}
                      </Link>
                      <div className="border-top mt-4 pt-4">
                        <div className="d-flex justify-content-between">
                          <h6 className="m-0">
                            <i className="fa fa-star text-primary mr-2"></i>
                            {data.T_SOSAO
                              ? data.T_SOSAO
                              : getRandomRating()}{' '}
                            <small>
                              ({data.soluongdanhg || getRandomReviews()})
                            </small>
                          </h6>
                          <h5 className="m-0">{formatPrice(data.gia)}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="col-12 text-center">
              Không có tour nào để hiển thị
            </div>
          )}
        </div>
      </div>

      {/* Các section còn lại giữ nguyên */}
      <div className="container-fluid bg-registration py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="mb-4">
                <h6
                  className="text-primary text-uppercase"
                  style={{ letterSpacing: '5px' }}
                >
                  Ưu Đãi Đặc Biệt
                </h6>
                <h1 className="text-white">
                  <span className="text-primary">GIẢM 30%</span> Cho Tuần Trăng
                  Mật
                </h1>
              </div>
              <p className="text-white">
                Hãy để chúng tôi biến tuần trăng mật của bạn thành một kỷ niệm
                ngọt ngào với ưu đãi giảm giá 30%. Khám phá những điểm đến lãng
                mạn, tận hưởng dịch vụ đẳng cấp và lưu giữ khoảnh khắc yêu
                thương.
              </p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Trải nghiệm
                  dịch vụ cao cấp
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Điểm đến lãng
                  mạn tuyệt đẹp
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Ưu đãi đặc
                  biệt chỉ dành cho bạn
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-primary text-center p-4">
                  <h1 className="text-white m-0">Đăng Ký Ngay</h1>
                </div>
                <div className="card-body rounded-bottom bg-white p-5">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control p-4"
                        placeholder="Họ và tên"
                        required="required"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control p-4"
                        placeholder="Email của bạn"
                        required="required"
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select px-4"
                        style={{ height: '47px' }}
                        defaultValue=""
                      >
                        <option value="">Chọn điểm đến</option>
                        <option value="1">Phú Quốc</option>
                        <option value="2">Đà Lạt</option>
                        <option value="3">Nha Trang</option>
                      </select>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-block py-3"
                        type="submit"
                      >
                        Đăng Ký Ngay
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: '5px' }}
            >
              Hướng Dẫn Viên
            </h6>
            <h1>Hướng Dẫn Viên Của Chúng Tôi</h1>
          </div>
          <div className="d-flex justify-content-center flex-wrap">
            <div
              className="team-item bg-white mb-4 mx-3"
              style={{ maxWidth: '300px' }}
            >
              <div className="team-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={len} alt="" />
                <div className="team-social">
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="text-center py-4">
                <h5 className="text-truncate">Bùi Văn Lên</h5>
                <p className="m-0">Hướng Dẫn Viên</p>
              </div>
            </div>
            <div
              className="team-item bg-white mb-4 mx-3"
              style={{ maxWidth: '300px' }}
            >
              <div className="team-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={toan} alt="" />
                <div className="team-social">
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="text-center py-4">
                <h5 className="text-truncate">Trần Thái Toàn</h5>
                <p className="m-0">Hướng Dẫn Viên</p>
              </div>
            </div>
            <div
              className="team-item bg-white mb-4 mx-3"
              style={{ maxWidth: '300px' }}
            >
              <div className="team-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={ngon} alt="" />
                <div className="team-social">
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="text-center py-4">
                <h5 className="text-truncate">Nguyễn Thiện Ngôn</h5>
                <p className="m-0">Hướng Dẫn Viên</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import axios from "axios";
import anh1 from "../../img/carousel-1.jpg";
import anh2 from "../../img/carousel-2.jpg";
import about from "../../img/about.jpg";
import api from "../config/axiosconfig";

const Home = () => {
  const [dshometour, setdshometour] = useState([]);

  useEffect(() => {
    let o=localStorage.getItem("sdt")
    axios.get(`http://localhost:8080/tour/gethometour?sdt=${o}`).then((data) => {
      setdshometour(data.data.data);
    });
  }, []);

  return (
    <>
      <div className="container-fluid bg-light pt-3 d-none d-lg-block"></div>
      <div className="container-fluid p-0">
        <div id="header-carousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src={anh1} alt="Hình ảnh" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: "900px" }}>
                  <h4 className="text-white text-uppercase mb-md-3">Du Lịch & Khám Phá</h4>
                  <h1 className="display-3 text-white mb-md-4">Cùng Khám Phá Thế Giới!</h1>
                  <a href="" className="btn background-xanh py-md-3 px-md-5 mt-2">
                    Đặt Ngay
                  </a>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src={anh2} alt="Hình ảnh" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: "900px" }}>
                  <h4 className="text-white text-uppercase mb-md-3">Du Lịch & Khám Phá</h4>
                  <h1 className="display-3 text-white mb-md-4">Khám Phá Những Điểm Đến Tuyệt Vời</h1>
                  <a href="" className="btn background-xanh text-xanh py-md-3 px-md-5 mt-2">
                    Đặt Ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
            <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
              <span className="carousel-control-prev-icon mb-n2"></span>
            </div>
          </a>
          <a className="carousel-control-next" href="#header-carousel" data-slide="next">
            <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
              <span className="carousel-control-next-icon mb-n2"></span>
            </div>
          </a>
        </div>
      </div>

      <div className="container-fluid booking mt-5 pb-5">
        <div className="container pb-5">
          <div className="bg-light shadow" style={{ padding: "30px" }}>
            <div className="row align-items-center" style={{ minHeight: "60px" }}>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3 mb-md-0">
                      <select className="custom-select px-4" style={{ height: "47px" }}>
                        <option selected>Điểm đến</option>
                        <option value="1">Hà Nội</option>
                        <option value="2">Đà Nẵng</option>
                        <option value="3">TP. Hồ Chí Minh</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 mb-md-0">
                      <div className="date" id="date1" data-target-input="nearest">
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
                      <div className="date" id="date2" data-target-input="nearest">
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
                      <select className="custom-select px-4" style={{ height: "47px" }}>
                        <option selected>Thời gian</option>
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
                  style={{ height: "47px", marginTop: "-2px" }}
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
            <div className="col-lg-6" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src={about}
                  style={{ objectFit: "cover", left: "0px" }}
                  alt="Về chúng tôi"
                />
              </div>
            </div>
            <div className="col-lg-6 pt-5 pb-lg-5">
              <div className="about-text bg-white p-4 p-lg-5 my-lg-5">
                <h6 className="text-primary text-uppercase" style={{ letterSpacing: "3px" }}>
                  Về Chúng Tôi
                </h6>
                <h1 className="mb-3">Chúng Tôi Mang Đến Những Tour Du Lịch Tốt Nhất Trong Tầm Giá</h1>
                <p>
                  Chúng tôi tự hào cung cấp các gói tour du lịch chất lượng cao, phù hợp với mọi ngân sách. Từ những bãi
                  biển tuyệt đẹp của Đà Nẵng đến những di sản văn hóa tại Huế, chúng tôi cam kết mang lại trải nghiệm
                  tuyệt vời nhất cho bạn.
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

      <div className="container-fluid pb-5">
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex mb-4 mb-lg-0">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3"
                  style={{ height: "100px", width: "100px" }}
                >
                  <i className="fa fa-2x fa-money-check-alt text-white"></i>
                </div>
                <div className="d-flex flex-column">
                  <h5 className="">Giá Cả Cạnh Tranh</h5>
                  <p className="m-0">
                    Chúng tôi cam kết mang đến mức giá tốt nhất, đảm bảo bạn có chuyến đi đáng giá trong tầm tay.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex mb-4 mb-lg-0">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3"
                  style={{ height: "100px", width: "100px" }}
                >
                  <i className="fa fa-2x fa-award text-white"></i>
                </div>
                <div className="d-flex flex-column">
                  <h5 className="">Dịch Vụ Tốt Nhất</h5>
                  <p className="m-0">
                    Đội ngũ chuyên nghiệp của chúng tôi luôn sẵn sàng phục vụ bạn với sự tận tâm và chu đáo nhất.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex mb-4 mb-lg-0">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3"
                  style={{ height: "100px", width: "100px" }}
                >
                  <i className="fa fa-2x fa-globe text-white"></i>
                </div>
                <div className="d-flex flex-column">
                  <h5 className="">Phủ Sóng Toàn Cầu</h5>
                  <p className="m-0">
                    Từ Việt Nam đến các điểm đến quốc tế, chúng tôi kết nối bạn với thế giới qua những hành trình tuyệt vời.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
              Điểm Đến
            </h6>
            <h1>Khám Phá Những Điểm Đến Hàng Đầu</h1>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="destination-item position-relative overflow-hidden mb-2">
                <img className="img-fluid" src="img/destination-1.jpg" alt="" />
                <a className="destination-overlay text-white text-decoration-none" href="">
                  <h5 className="text-white">Hà Nội</h5>
                  <span>36 Phố Phường</span>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="destination-item position-relative overflow-hidden mb-2">
                <img className="img-fluid" src="img/destination-2.jpg" alt="" />
                <a className="destination-overlay text-white text-decoration-none" href="">
                  <h5 className="text-white">Đà Lạt</h5>
                  <span>Thành Phố Ngàn Hoa</span>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="destination-item position-relative overflow-hidden mb-2">
                <img className="img-fluid" src="img/destination-3.jpg" alt="" />
                <a className="destination-overlay text-white text-decoration-none" href="">
                  <h5 className="text-white">Phú Quốc</h5>
                  <span>Đảo Ngọc Việt Nam</span>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="destination-item position-relative overflow-hidden mb-2">
                <img className="img-fluid" src="img/destination-4.jpg" alt="" />
                <a className="destination-overlay text-white text-decoration-none" href="">
                  <h5 className="text-white">Huế</h5>
                  <span>Kinh Đô Xưa</span>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="destination-item position-relative overflow-hidden mb-2">
                <img className="img-fluid" src="img/destination-5.jpg" alt="" />
                <a className="destination-overlay text-white text-decoration-none" href="">
                  <h5 className="text-white">Nha Trang</h5>
                  <span>Thiên Đường Biển</span>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="destination-item position-relative overflow-hidden mb-2">
                <img className="img-fluid" src="img/destination-6.jpg" alt="" />
                <a className="destination-overlay text-white text-decoration-none" href="">
                  <h5 className="text-white">Sa Pa</h5>
                  <span>Thị Trấn Sương Mù</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
              Dịch Vụ
            </h6>
            <h1>Dịch Vụ Du Lịch & Lữ Hành</h1>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="service-item bg-white text-center mb-2 py-5 px-4">
                <i className="fa fa-2x fa-route mx-auto mb-4"></i>
                <h5 className="mb-2">Hướng Dẫn Du Lịch</h5>
                <p className="m-0">
                  Đội ngũ hướng dẫn viên nhiệt tình, giàu kinh nghiệm sẽ đồng hành cùng bạn trên mọi hành trình.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="service-item bg-white text-center mb-2 py-5 px-4">
                <i className="fa fa-2x fa-ticket-alt mx-auto mb-4"></i>
                <h5 className="mb-2">Đặt Vé</h5>
                <p className="m-0">
                  Dịch vụ đặt vé máy bay, tàu hỏa nhanh chóng, tiện lợi, đảm bảo bạn có chuyến đi suôn sẻ.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="service-item bg-white text-center mb-2 py-5 px-4">
                <i className="fa fa-2x fa-hotel mx-auto mb-4"></i>
                <h5 className="mb-2">Đặt Khách Sạn</h5>
                <p className="m-0">
                  Hệ thống khách sạn đa dạng từ bình dân đến cao cấp, đáp ứng mọi nhu cầu của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
              Gói Tour
            </h6>
            <h1>Các Gói Tour Hoàn Hảo</h1>
          </div>
          <div className="row">
            {dshometour.map((data) => {
              return (
                <>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="package-item bg-white mb-2">
                      <img
                        style={{ height: "500px", width: "400px" }}
                        src={data.T_ANH}
                        alt={data.T_TEN}
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
                        <Link to={"tour?id=" + data.id} className="h5 text-decoration-none">
                          {data.T_TEN}
                        </Link>
                        <div className="border-top mt-4 pt-4">
                          <div className="d-flex justify-content-between">
                            <h6 className="m-0">
                              <i className="fa fa-star text-primary mr-2"></i>
                              {data.T_SOSAO} <small>({data.soluongdanhg})</small>
                            </h6>
                            <h5 className="m-0">{data.gia}đ</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-fluid bg-registration py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="mb-4">
                <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
                  Ưu Đãi Đặc Biệt
                </h6>
                <h1 className="text-white">
                  <span className="text-primary">GIẢM 30%</span> Cho Tuần Trăng Mật
                </h1>
              </div>
              <p className="text-white">
                Hãy để chúng tôi biến tuần trăng mật của bạn thành một kỷ niệm ngọt ngào với ưu đãi giảm giá 30%. Khám
                phá những điểm đến lãng mạn, tận hưởng dịch vụ đẳng cấp và lưu giữ khoảnh khắc yêu thương.
              </p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Trải nghiệm dịch vụ cao cấp
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Điểm đến lãng mạn tuyệt đẹp
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Ưu đãi đặc biệt chỉ dành cho bạn
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
                      <select className="custom-select px-4" style={{ height: "47px" }}>
                        <option selected>Chọn điểm đến</option>
                        <option value="1">Phú Quốc</option>
                        <option value="2">Đà Lạt</option>
                        <option value="3">Nha Trang</option>
                      </select>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-block py-3" type="submit">
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
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
              Hướng Dẫn Viên
            </h6>
            <h1>Hướng Dẫn Viên Của Chúng Tôi</h1>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
              <div className="team-item bg-white mb-4">
                <div className="team-img position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="img/team-1.jpg" alt="" />
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
                  <h5 className="text-truncate">Nguyễn Văn A</h5>
                  <p className="m-0">Hướng Dẫn Viên</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
              <div className="team-item bg-white mb-4">
                <div className="team-img position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="img/team-2.jpg" alt="" />
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
                  <h5 className="text-truncate">Trần Thị B</h5>
                  <p className="m-0">Hướng Dẫn Viên</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
              <div className="team-item bg-white mb-4">
                <div className="team-img position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
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
                  <h5 className="text-truncate">Lê Văn C</h5>
                  <p className="m-0">Hướng Dẫn Viên</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-2">
              <div className="team-item bg-white mb-4">
                <div className="team-img position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
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
                  <h5 className="text-truncate">Phạm Thị D</h5>
                  <p className="m-0">Hướng Dẫn Viên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
              Ý Kiến Khách Hàng
            </h6>
            <h1>Khách Hàng Nói Gì Về Chúng Tôi</h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <div className="text-center pb-4">
              <img
                className="img-fluid mx-auto"
                src="img/testimonial-1.jpg"
                style={{ width: "100px", height: "100px" }}
                alt=""
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Tôi đã có một chuyến đi tuyệt vời cùng gia đình nhờ dịch vụ chuyên nghiệp và tận tâm của công ty. Chắc
                  chắn sẽ quay lại!
                </p>
                <h5 className="text-truncate">Nguyễn Thị Lan</h5>
                <span>Nhân viên văn phòng</span>
              </div>
            </div>
            <div className="text-center">
              <img
                className="img-fluid mx-auto"
                src="img/testimonial-2.jpg"
                style={{ width: "100px", height: "100px" }}
                alt=""
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Tour được tổ chức rất chu đáo, hướng dẫn viên nhiệt tình và giá cả hợp lý. Rất đáng để trải nghiệm!
                </p>
                <h5 className="text-truncate">Trần Văn Hùng</h5>
                <span>Kỹ sư</span>
              </div>
            </div>
            <div className="text-center">
              <img
                className="img-fluid mx-auto"
                src="img/testimonial-3.jpg"
                style={{ width: "100px", height: "100px" }}
                alt=""
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Dịch vụ đặt vé và khách sạn rất nhanh chóng, giúp tôi tiết kiệm thời gian. Cảm ơn đội ngũ hỗ trợ!
                </p>
                <h5 className="text-truncate">Lê Thị Mai</h5>
                <span>Giáo viên</span>
              </div>
            </div>
            <div className="text-center">
              <img
                className="img-fluid mx-auto"
                src="img/testimonial-4.jpg"
                style={{ width: "100px", height: "100px" }}
                alt=""
              />
              <div className="testimonial-text bg-white p-4 mt-n5">
                <p className="mt-5">
                  Chuyến đi Phú Quốc thật sự đáng nhớ, cảnh đẹp và dịch vụ tuyệt vời. Tôi sẽ giới thiệu cho bạn bè!
                </p>
                <h5 className="text-truncate">Phạm Văn Nam</h5>
                <span>Doanh nhân</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
              Blog Của Chúng Tôi
            </h6>
            <h1>Tin Tức Mới Nhất Từ Blog</h1>
          </div>
          <div className="row pb-3">
            <div className="col-lg-4 col-md-6 mb-4 pb-2">
              <div className="blog-item">
                <div className="position-relative">
                  <img className="img-fluid w-100" src="img/blog-1.jpg" alt="" />
                  <div className="blog-date">
                    <h6 className="font-weight-bold mb-n1">01</h6>
                    <small className="text-white text-uppercase">Tháng 1</small>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="d-flex mb-2">
                    <a className="text-primary text-uppercase text-decoration-none" href="">
                      Admin
                    </a>
                    <span className="text-primary px-2">|</span>
                    <a className="text-primary text-uppercase text-decoration-none" href="">
                      Du Lịch & Khám Phá
                    </a>
                  </div>
                  <a className="h5 m-0 text-decoration-none" href="">
                    Khám phá vẻ đẹp hoang sơ của vịnh Hạ Long
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 pb-2">
              <div className="blog-item">
                <div className="position-relative">
                  <img className="img-fluid w-100" src="img/blog-2.jpg" alt="" />
                  <div className="blog-date">
                    <h6 className="font-weight-bold mb-n1">01</h6>
                    <small className="text-white text-uppercase">Tháng 1</small>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="d-flex mb-2">
                    <a className="text-primary text-uppercase text-decoration-none" href="">
                      Admin
                    </a>
                    <span className="text-primary px-2">|</span>
                    <a className="text-primary text-uppercase text-decoration-none" href="">
                      Du Lịch & Khám Phá
                    </a>
                  </div>
                  <a className="h5 m-0 text-decoration-none" href="">
                    5 lý do bạn nên ghé thăm Đà Lạt mùa hoa mai anh đào
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 pb-2">
              <div className="blog-item">
                <div className="position-relative">
                  <img className="img-fluid w-100" src="img/blog-3.jpg" alt="" />
                  <div className="blog-date">
                    <h6 className="font-weight-bold mb-n1">01</h6>
                    <small className="text-white text-uppercase">Tháng 1</small>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="d-flex mb-2">
                    <a className="text-primary text-uppercase text-decoration-none" href="">
                      Admin
                    </a>
                    <span className="text-primary px-2">|</span>
                    <a className="text-primary text-uppercase text-decoration-none" href="">
                      Du Lịch & Khám Phá
                    </a>
                  </div>
                  <a className="h5 m-0 text-decoration-none" href="">
                    Hành trình khám phá ẩm thực đường phố Sài Gòn
                  </a>
                </div>
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
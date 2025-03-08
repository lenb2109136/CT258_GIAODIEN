import visa from "../../img/visa.jpg";
import paypal from "../../img/package-6.jpg";
import mc from "../../img/mastercard.jpg";
import ae from "../../img/am.jpg";

export default () => {
    return (
        <>
            <div
                className="container-fluid text-white-50 py-4 px-3"
                style={{
                    marginTop: "90px",
                    background: "linear-gradient(to right, #00008B, #000000)",
                }}
            >
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <a href="" className="navbar-brand">
                            <h1 className="text-primary">
                                <span className="text-white">TRAVEL</span>ER
                            </h1>
                        </a>
                        <p>
                            Dịch vụ du lịch chất lượng cao, mang đến trải nghiệm tuyệt vời.
                        </p>
                        <h6
                            className="text-white text-uppercase mt-4 mb-2"
                            style={{ letterSpacing: "3px" }}
                        >
                            Theo Dõi Chúng Tôi
                        </h6>
                        <div className="d-flex justify-content-center">
                            <a
                                className="btn btn-square mr-2"
                                href="#"
                                style={{ backgroundColor: "#1DA1F2", color: "#fff" }}
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                className="btn btn-square mr-2"
                                href="#"
                                style={{ backgroundColor: "#3B5998", color: "#fff" }}
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                className="btn btn-square mr-2"
                                href="#"
                                style={{ backgroundColor: "#0077B5", color: "#fff" }}
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a
                                className="btn btn-square mr-2"
                                href="#"
                                style={{ backgroundColor: "#E1306C", color: "#fff" }}
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                className="btn btn-square"
                                href="#"
                                style={{ backgroundColor: "#FF0000", color: "#fff" }}
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5
                            className="text-white text-uppercase mb-3"
                            style={{ letterSpacing: "3px" }}
                        >
                            Dịch Vụ
                        </h5>
                        <div className="d-flex flex-column">
                            <a
                                className="text-white-50 mb-1"
                                href="#"
                                style={{ textDecoration: "none" }}
                            >
                                Giới Thiệu
                            </a>
                            <a
                                className="text-white-50 mb-1"
                                href="#"
                                style={{ textDecoration: "none" }}
                            >
                                Điểm Đến
                            </a>
                            <a
                                className="text-white-50 mb-1"
                                href="#"
                                style={{ textDecoration: "none" }}
                            >
                                Gói Du Lịch
                            </a>
                            <a
                                className="text-white-50 mb-1"
                                href="#"
                                style={{ textDecoration: "none" }}
                            >
                                Blog
                            </a>
                            <a
                                className="text-white-50 mb-1"
                                href="#"
                                style={{ textDecoration: "none" }}
                            >
                                Hướng Dẫn Viên
                            </a>
                            <a
                                className="text-white-50"
                                href="#"
                                style={{ textDecoration: "none" }}
                            >
                                Đánh Giá
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5
                            className="text-white text-uppercase mb-3"
                            style={{ letterSpacing: "3px" }}
                        >
                            Liên Hệ
                        </h5>
                        <p>
                            <i className="fa fa-map-marker-alt mr-2"></i>Khu II, Đại học Cần Thơ, Cần Thơ
                        </p>
                        <p>
                            <i className="fa fa-phone-alt mr-2"></i>+0909397988
                        </p>
                        <p>
                            <i className="fa fa-envelope mr-2"></i>Travler@gmail.com
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5
                            className="text-white text-uppercase mb-3"
                            style={{ letterSpacing: "3px" }}
                        >
                            Bản Tin
                        </h5>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control border-light"
                                style={{ padding: "20px" }}
                                placeholder="Email của bạn"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary">Đăng Ký</button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a className="mr-2" href="#">
                                <img
                                    src={visa}
                                    alt="Visa"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </a>
                            <a className="mr-2" href="#">
                                <img
                                    src={mc}
                                    alt="MasterCard"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </a>
                            <a className="mr-2" href="#">
                                <img
                                    src={paypal}
                                    alt="PayPal"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </a>
                            <a className="" href="#">
                                <img
                                    src={ae}
                                    alt="American Express"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="container-fluid text-white-50 py-3 px-3"
                style={{
                    background: "linear-gradient(to right, #00008B, #000000)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
            >
                <div className="row">
                    <div className="col-lg-6 text-center text-md-left">
                        <p className="m-0">
                            Bản quyền © 2025. Mọi quyền được bảo lưu.
                        </p>
                    </div>
                    <div className="col-lg-6 text-center text-md-right">
                        <p className="m-0">
                            Thiết kế bởi <a href="https://htmlcodex.com">Ngôn Nguyễn</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
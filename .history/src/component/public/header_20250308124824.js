import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                        <p>
                            <i className="fa fa-envelope mr-2"></i>Travler@gmail.com | <i className="fa fa-phone-alt mr-2"></i>+0909 397 988
                        </p>
                    </div>
                    <div className="col-lg-6 text-center text-lg-right">
                        <a className="px-2" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="px-2" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="px-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a className="px-2" href="#"><i className="fab fa-instagram"></i></a>
                        <a className="px-2" href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div className="container-fluid position-relative nav-bar p-0" style={{ borderTop: "1px solid black" }}>
                <div className="container-lg position-relative p-0 px-lg-3" style={{ zIndex: 9 }}>
                    <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-lg py-3 py-lg-0">
                        <a href="" className="navbar-brand">
                            <h1 className="m-0 text-primary"><span className="text-dark">TRAVEL</span>ER</h1>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav ml-auto">
                                <a onClick={() => navigate("/khachhang/home")} className="nav-item nav-link" style={{ cursor: "pointer" }}>Trang Chủ</a>
                                <a href="about.html" className="nav-item nav-link">Giới Thiệu</a>
                                <a onClick={() => navigate("/khachhang/listtour")} className="nav-item nav-link" style={{ cursor: "pointer" }}>Dịch Vụ</a>
                                <a href="package.html" className="nav-item nav-link">Gói Du Lịch</a>
                                <a href="contact.html" className="nav-item nav-link">Liên Hệ</a>
                                <div className="d-flex align-items-center ml-3">
                                    <Button variant="contained" color="primary" size="small" onClick={() => navigate("/signup")} style={{ marginRight: "10px" }}>Đăng Ký</Button>
                                    <Button variant="contained" color="success" size="small" onClick={() => navigate("/login")} >Đăng Nhập</Button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

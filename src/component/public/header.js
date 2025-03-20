import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null; // Check if user is logged in

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('role'); // Remove role (if stored)
    navigate('/login'); // Navigate to login page
  };

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <p>
                <i className="fa fa-envelope mr-2"></i>Travler@gmail.com
              </p>
              <p className="text-body px-3">|</p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+0909 397 988
              </p>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="px-3" href="#" style={{ color: '#1DA1F2' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a className="px-3" href="#" style={{ color: '#3B5998' }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="px-3" href="#" style={{ color: '#0077B5' }}>
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="px-3" href="#" style={{ color: '#E1306C' }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a className="px-3" href="#" style={{ color: '#FF0000' }}>
                <i className="fab fa-youtube"></i>
              </a>
              <span style={{ marginLeft: '20px' }}></span>
              {!isLoggedIn && (
                <>
                  <a
                    onClick={() => navigate('/signup')}
                    style={{
                      cursor: 'pointer',
                      color: '#333',
                      padding: '0 10px',
                      textDecoration: 'none',
                    }}
                  >
                    Đăng Ký
                  </a>
                  <a
                    onClick={() => navigate('/login')}
                    style={{
                      cursor: 'pointer',
                      color: '#333',
                      padding: '0 10px',
                      textDecoration: 'none',
                    }}
                  >
                    Đăng Nhập
                  </a>
                  <a
                    onClick={() => navigate('/admin')}
                    style={{
                      cursor: 'pointer',
                      color: '#333',
                      padding: '0 10px',
                      textDecoration: 'none',
                    }}
                  >
                    Quản Lý Tài Khoản
                  </a>
                </>
              )}
              {isLoggedIn && (
                <a
                  onClick={handleLogout}
                  style={{
                    cursor: 'pointer',
                    color: '#333',
                    padding: '0 10px',
                    textDecoration: 'none',
                  }}
                >
                  Đăng Xuất
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid position-relative nav-bar p-0"
        style={{ borderTop: '1px solid black' }}
      >
        <div
          className="container-lg position-relative p-0 px-lg-3"
          style={{ zIndex: 9 }}
        >
          <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-lg py-3 py-lg-0 pl-3 pl-lg-5">
            <a href="" className="navbar-brand">
              <h1 className="m-0 text-primary">
                <span className="text-dark">TRAVEL</span>ER
              </h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">
                <a
                  onClick={() => navigate('/khachhang/home')}
                  style={{ cursor: 'pointer' }}
                  className="nav-item nav-link"
                >
                  Trang Chủ
                </a>
                <a
                  onClick={() => navigate('/khachhang/about')}
                  style={{ cursor: 'pointer' }}
                  className="nav-item nav-link"
                >
                  Giới Thiệu
                </a>
                <a
                  onClick={() => navigate('/khachhang/listtour')}
                  style={{ cursor: 'pointer' }}
                  className="nav-item nav-link"
                >
                  Dịch Vụ
                </a>
                <a href="package.html" className="nav-item nav-link">
                  Gói Du Lịch
                </a>
                <a
                  onClick={() => navigate('/khachhang/contact')}
                  style={{ cursor: 'pointer' }}
                  className="nav-item nav-link"
                >
                  Liên Hệ
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

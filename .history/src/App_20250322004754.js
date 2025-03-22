import logo from './logo.svg';
import './App.css';
import Home from './component/public/Home';
import './lib/owlcarousel/assets/owl.carousel.min.css';
import './lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes, useLocation } from 'react-router-dom';
import Tour from './component/public/chitiettour';
import ListTour from './component/public/listtour';
import F from './component/public/footer';
import H from './component/public/header';
import S from './component/public/shopingcart';
import CheckoutPage from './component/public/Checkout';
import KH from './component/public/KhachHang';
import DV from './component/public/dichvu';
import About from './component/public/about-us';
import Contact from './component/public/contact';
import Login from './component/public/login';
import Admin from './component/public/Admin';
import SidebarAdmin from './component/public/SidebarAdmin';
import HeaderAdmin from './component/public/HeaderAdmin';
import Discount from './component/public/discount/index';
import Category from './component/public/category/index';
import TourAdmin from './component/public/tour/index';
import Booking from './component/public/booking/index';
import UserAdmin from './component/public/account/index';
import { useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {!location.pathname.startsWith('/admin') && <H />}
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="notifications" element={<div>Notifications Page</div>} />
          <Route path="profile" element={<div>Profile Page</div>} />
          <Route path="blank" element={<div>Blank Page (NFT/RTL)</div>} />
          <Route path="basic-tables" element={<div>Data Tables Page</div>} />
          <Route path="discount" element={<Discount />} />
          <Route path="category" element={<Category />} />
          <Route path="tour" element={<TourAdmin />} />
          <Route path="booking" element={<Booking />} />
          <Route path="user" element={<UserAdmin />} />
          <Route path="signin" element={<Login initialTab="login" />} />
        </Route>
        <Route path="/khachhang" element={<KH />}>
          <Route path="home" element={<Home />} />
          <Route path="tour" element={<Tour />} />
          <Route path="Listtour" element={<ListTour />} />
          <Route path="shopingcart" element={<S />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="dichvu" element={<DV />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login initialTab="login" />} />
        <Route path="/signup" element={<Login initialTab="register" />} />{' '}
        {/* Add this line */}
      </Routes>
      {!location.pathname.startsWith('/admin') && <F />}
    </div>
  );
}

function AdminLayout() {
  const navigate = useNavigate();
  if (
    localStorage.getItem('token') == null ||
    localStorage.getItem('role') != 'nhanvien'
  ) {
    navigate('/login');
  }
  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="main-content">
        <HeaderAdmin />
        <Routes>
          <Route index element={<Admin />} />
          <Route path="notifications" element={<div>Notifications Page</div>} />
          <Route path="profile" element={<div>Profile Page</div>} />
          <Route path="blank" element={<div>Blank Page (NFT/RTL)</div>} />
          <Route path="basic-tables" element={<div>Data Tables Page</div>} />
          <Route path="discount" element={<Discount />} />
          <Route path="category" element={<Category />} />
          <Route path="tour" element={<TourAdmin />} />
          <Route path="booking" element={<Booking />} />
          <Route path="user" element={<UserAdmin />} />
          <Route path="signin" element={<Login initialTab="login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

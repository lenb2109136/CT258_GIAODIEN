import logo from './logo.svg';
import './App.css';
import Home from './component/public/Home';
import './lib/owlcarousel/assets/owl.carousel.min.css';
import './lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes } from 'react-router-dom';
import Tour from "./component/public/chitiettour";
import ListTour from "./component/public/listtour";
import F from "./component/public/footer";
import H from "./component/public/header";
import S from "./component/public/shopingcart";
import CheckoutPage from './component/public/Checkout';
import KH from "./component/public/KhachHang";
import DV from "./component/public/dichvu";
import About from "./component/public/about-us";
import Contact from "./component/public/contact";
import Login from "./component/public/login";
import Admin from "./component/public/Admin"; // Thêm import cho trang admin

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route cho Admin - Không có Header và Footer */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Route cho Login và Register/Signup */}
        <Route path="/login" element={<Login initialTab="login" />} />
        <Route path="/signup" element={<Login initialTab="register" />} />

        {/* Route cho khách hàng */}
        <Route
          path="/*"
          element={
            <>
              <H />
              <Routes>
                <Route path='khachhang/home' element={<Home />} />
                <Route path='khachhang/tour' element={<Tour />} />
                <Route path='khachhang/Listtour' element={<ListTour />} />
                <Route path='khachhang/shopingcart' element={<S />} />
                <Route path='khachhang/checkout' element={<CheckoutPage />} />
                <Route path='khachhang/dichvu' element={<DV />} />
                <Route path='khachhang/about' element={<About />} />
                <Route path='khachhang/contact' element={<Contact />} />
              </Routes>
              <F />
            </>
          }
        />

        {/* Route mặc định */}
        <Route path="/" element={<Login initialTab="login" />} />
      </Routes>
    </div>
  );
}


export default App;
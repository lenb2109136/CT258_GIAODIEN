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
import Admin from "./component/public/Admin"; // Admin dashboard
import SidebarAdmin from "./component/public/SidebarAdmin"; // Assuming these are in the same folder
import HeaderAdmin from "./component/public/HeaderAdmin";
import Discount from './component/public/discount';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="notifications" element={<div>Notifications Page</div>} />
          <Route path="profile" element={<div>Profile Page</div>} />
          <Route path="blank" element={<div>Blank Page (NFT/RTL)</div>} />
          <Route path="basic-tables" element={<div>Data Tables Page</div>} />
          <Route path="signin" element={<Login initialTab="login" />} />
        </Route>

    
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
                <Route path="/login" element={<Login initialTab="login" />} />
                <Route path="/signup" element={<Login initialTab="register" />} />
              </Routes>
              <F />
            </>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Login initialTab="login" />} />
      </Routes>
    </div>
  );
}

// Admin Layout Component to wrap admin pages with Sidebar and Header
function AdminLayout() {
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
          <Route path="signin" element={<Login initialTab="login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
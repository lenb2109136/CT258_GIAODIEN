import React, { useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./component/public/Home";
import Tour from "./component/public/chitiettour";
import ListTour from "./component/public/listtour";
import Footer from "./component/public/footer";
import Header from "./component/public/header";
import ShoppingCart from "./component/public/shopingcart";
import CheckoutPage from "./component/public/Checkout";
import KhachHang from "./component/public/KhachHang";
import DichVu from "./component/public/dichvu";
import About from "./component/public/about-us";
import Contact from "./component/public/contact";
import Login from "./component/public/login";
import Admin from "./component/public/Admin";
import SidebarAdmin from "./component/public/SidebarAdmin";
import HeaderAdmin from "./component/public/HeaderAdmin";
import Discount from "./component/public/discount/index";
import Category from "./component/public/category/index";
import TourAdmin from "./component/public/tour/index";
import Booking from "./component/public/booking/index";
import UserAdmin from "./component/public/account/index";
import LichSu from "./component/public/LichSuDat";
import CheckoutBot from "./component/public/checkoutbot";


export const AppContext = createContext();

function App() {
  const [s, sets] = useState("");

  return (
    <AppContext.Provider value={{ s, sets }}>
      <div className="App">
        <Header />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* User Routes */}
          <Route path="/khachhang/*" element={<KhachHang />}>
            <Route path="home" element={<Home />} />
            <Route path="tour" element={<Tour />} />
            <Route path="listtour" element={<ListTour />} />
            <Route path="shopingcart" element={<ShoppingCart />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="dichvu" element={<DichVu />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="lichsu" element={<LichSu />} />
            <Route path="checkoutbot" element={<CheckoutBot />} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<Login initialTab="login" />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

// Admin Layout Component
function AdminLayout() {
  const navigate = useNavigate();

  // Kiểm tra quyền truy cập
  if (!localStorage.getItem("token") || localStorage.getItem("role") !== "nhanvien") {
    navigate("/login");
    return null; // Không render gì nếu không có quyền
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

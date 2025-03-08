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

function App() {
  return (
    <div className="App">
      <H />
      <Routes>
        {/* Route cho Login và Register */}
        <Route path="/login" element={<Login initialTab="login" />} />
        <Route path="/register" element={<Login initialTab="register" />} />

        {/* Các route khác */}
        <Route path='/khachhang' element={<KH />}>
          <Route path='home' element={<Home />} />
          <Route path='tour' element={<Tour />} />
          <Route path='Listtour' element={<ListTour />} />
          <Route path='shopingcart' element={<S />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='dichvu' element={<DV />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
        </Route>

        {/* Route mặc định (có thể dẫn về Home hoặc Login tùy bạn) */}
        <Route path="/" element={<Login initialTab="login" />} /> {/* Mặc định là trang Login */}
      </Routes>
      <F />
    </div>
  );
}

export default App;
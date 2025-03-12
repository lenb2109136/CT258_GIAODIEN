import logo from './logo.svg';
import './App.css';
import './lib/owlcarousel/assets/owl.carousel.min.css';
import './lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
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

// Import components from the first project (admin-related)
import SignIn from './admin/src/pages/AuthPages/SignIn';
import SignUp from './admin/src/pages/AuthPages/SignUp';
import NotFound from './admin/src/pages/OtherPage/NotFound';
import UserProfiles from './admin/src/pages/UserProfiles';
import Videos from './admin/src/pages/UiElements/Videos';
import Images from './admin/src/pages/UiElements/Images';
import Alerts from './admin/src/pages/UiElements/Alerts';
import Badges from './admin/src/pages/UiElements/Badges';
import Avatars from './admin/src/pages/UiElements/Avatars';
import Buttons from './admin/src/pages/UiElements/Buttons';
import LineChart from './admin/src/pages/Charts/LineChart';
import BarChart from './admin/src/pages/Charts/BarChart';
import Calendar from './admin/src/pages/Calendar';
import BasicTables from './admin/src/pages/Tables/BasicTables';
import FormElements from './admin/src/pages/Forms/FormElements';
import Blank from './admin/src/pages/Blank';
import AppLayout from './admin/src/layout/AppLayout';
import { ScrollToTop } from './admin/src/components/common/ScrollToTop';
import Home from './admin/src/pages/Dashboard/Home'; // This is the admin dashboard

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        {/* Public routes will have the header and footer */}
        <Routes>
          {/* Public Routes with Header and Footer */}
          <Route
            element={
              <>
                <H />
                <div className="main-content">
                  <Routes>
                    {/* Route cho Login và Register/Signup */}
                    <Route path="/login" element={<Login initialTab="login" />} />
                    <Route path="/signup" element={<Login initialTab="register" />} />

                    {/* Các route cho khách hàng */}
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

                    {/* Route mặc định */}
                    <Route path="/" element={<Login initialTab="login" />} />
                  </Routes>
                </div>
                <F />
              </>
            }
          />

          {/* Admin Routes with AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<Home />} /> {/* Admin Dashboard */}

            {/* Other Admin Pages */}
            <Route path="/admin/profile" element={<UserProfiles />} />
            <Route path="/admin/calendar" element={<Calendar />} />
            <Route path="/admin/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/admin/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/admin/basic-tables" element={<BasicTables />} />

            {/* UI Elements */}
            <Route path="/admin/alerts" element={<Alerts />} />
            <Route path="/admin/avatars" element={<Avatars />} />
            <Route path="/admin/badge" element={<Badges />} />
            <Route path="/admin/buttons" element={<Buttons />} />
            <Route path="/admin/images" element={<Images />} />
            <Route path="/admin/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/admin/line-chart" element={<LineChart />} />
            <Route path="/admin/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Routes (No Layout) */}
          <Route path="/admin/signin" element={<SignIn />} />
          <Route path="/admin/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
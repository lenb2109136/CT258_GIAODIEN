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

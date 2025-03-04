import logo from './logo.svg';
import './App.css';
import Home from './component/public/Home';
import './lib/owlcarousel/assets/owl.carousel.min.css';
import './lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";  
import { Route, Routes } from 'react-router-dom';
import Tour from "./component/public/chitiettour"
import ListTour from "./component/public/listtour"
import F from "./component/public/footer"
import H from "./component/public/header"
import S from "./component/public/shopingcart"
import CheckoutPage from './component/public/Checkout';
function App() {
  return (
    <div className="App">
      <H></H>
      <Routes>
          <Route path='/home' element={<Home/>}> </Route>
          <Route path='/tour' element={<Tour></Tour>}></Route>
          <Route path='/Listtour' element={<ListTour></ListTour>}></Route>
          <Route path='/shopingcart' element={<S></S>}></Route>
          <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>
      <F></F>
    </div>
  );
}

export default App;

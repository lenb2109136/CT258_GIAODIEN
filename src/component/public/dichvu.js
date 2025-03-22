import { useEffect, useRef, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Menu, Button } from "antd";
import { AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Cart from "./Cartdichvu";
import Slider from "./SLiderdichVu";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "./KhachHang";
function kiemtra(a, u){
  for(let i=0;i<a.length;i++){
    if(a[i].batDau==u){
      return i;
    }
  }
  return -1;
}


export default () => {
  const {cart,setcart}= useContext(CartContext)
  const [searchParams] = useSearchParams();
  const inde = searchParams.get("inde");
  const [loai, setloai] = useState([])
  const [dvall,setdvall]=useState([])
  const [loaichon, setloaichon] = useState(0);
  const [value, setValue] = useState("recents");
  const [collapsed, setCollapsed] = useState(true);
  const[dsdichvu,setdsdichvu]=useState([])
  const [indx, setindx] = useState(0)
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };
  const [listtour, setlisttour] = useState([])
  const [favorite, setfavorate] = useState([])
  const thoiLuong=useRef([
    {batDau:1, KetThuc:3},
    {batDau:3, KetThuc:6},
    {batDau:6, KetThuc:9},
    {batDau:9, KetThuc:12},
    {batDau:12, KetThuc:15}
  ])
  const dsNgay=useRef([
    {batDau:1, KetThuc:10},
    {batDau:11, KetThuc:20},
    {batDau:21, KetThuc:30}
  ])
  const filter = useRef({
    giaBatDau:-1,
    giaKetThuc:-1,
    dsNgay:[],
    thoiLuong:[],
    loai:0

  })
  useEffect(()=>{
    if(cart.length>inde){
      axios.get(`http://localhost:8080/dichvu/phuhop?id=${cart?.[inde].id}`)
      .then(data=>{
          setdsdichvu(data.data.data)})
    }
    axios.get("http://localhost:8080/dichvu/getall")
    .then(data=>{
        setdvall(data.data.data)
    })
  },[cart])
 
  return (
    <div className="row">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
        

      </div>

      <div style={{ width: "100%", marginBottom: "15px" }}>
        <div class="text-center mb-3 pb-3 mt-3">
          <h6 class="text-uppercase" style={{ letterSpacing: "5px", color: "#7AB730" }}>
          service may be suitable</h6>

        </div>
        <hr style={{ color: "#7AB730" }}></hr>
        <Slider inde={inde} ds={dsdichvu} />
      </div>

      <div className="bosung" style={{ display: "flex", gap: "20px", position: "fixed", width: "100%", zIndex: 20 }}>

        <div style={{ position: "absolute", zIndex: 3, left: "10px", top: "0px" }}>

        </div>


      </div>
      <div class="text-center mb-3 pb-3 mt-3">
        <h6 class="text-uppercase" style={{ letterSpacing: "5px", color: "#7AB730" }}>Service may be suitable</h6>
        <h1>Explore Top Service</h1>
      </div>
      <div className="row" style={{ width: "90%", marginLeft: "4%" }}>
        {/* <div className="col-lg-3" style={{ maxHeight: "600px", overflowY: "scroll" }}>
          <div style={{ width: "100%", padding: "10px", borderRight: "1px solid #ddd", textAlign: "left" }}>

            <div>
              <h5 style={{ fontWeight: "bold", marginBottom: "5px", color: "#7ab730" }}>Traveler</h5>
              <p style={{ color: "gray", fontSize: "14px" }}>Khám Phá - Du Lịch</p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p style={{ fontWeight: "bold" }}>KHOẢNG GIÁ</p>
              <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                <input onChange={(event)=>{
                      filter.current.giaBatDau=parseFloat(event.target.value)
                }} type="number" placeholder="₫ TỪ" style={{ width: "50%", padding: "5px", border: "1px solid #ddd", textAlign: "left" }} />
                <input onChange={(event)=>{
                      filter.current.giaKetThuc=parseFloat(event.target.value)
                }} type="number" placeholder="₫ ĐẾN" style={{ width: "50%", padding: "5px", border: "1px solid #ddd", textAlign: "left" }} />
              </div>
              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  backgroundColor: "rgb(212, 160, 23)",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  cursor: "pointer",
                  textAlign: "center"
                }}
                onClick={()=>{
                  filter.current.loai=loaichon;
                  axios.post("http://localhost:8080/tour/getfilter", filter.current, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                  setlisttour(response.data.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
                
                }}
              >
                Áp dụng
              </button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontWeight: "bold" }}>Quốc gia</p>
              {[
                "Việt Nam",
                "Pháp",
                "Thụy Sỹ",
                "Trung Quốc",
                "Hà Lan",
                "Nhật Bản",
                "Hy Lạp",
              ].map((brand, index) => (
                <label key={index} style={{ display: "block", margin: "5px 0", textAlign: "left" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} /> {brand}
                </label>
              ))}
            </div>
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontWeight: "bold" }} >Thời lượng</p>
              {thoiLuong.current.map((brand, index) => (
                <label key={index} style={{ display: "block", margin: "5px 0", textAlign: "left" }}>
                  <input onClick={()=>{
                    let  mm=kiemtra(filter.current.thoiLuong,brand.batDau)
                     if(mm==-1){
                      filter.current.thoiLuong.push(brand)
                     }
                     else{
                      filter.current.thoiLuong.pop(mm)
                     }
                  }}  type="checkbox" style={{ marginRight: "5px" }} /> {brand.batDau} - {brand.KetThuc} Ngày
                </label>
              ))}
            </div><div style={{ marginTop: "20px" }}>
              <p style={{ fontWeight: "bold" }}>Ngày khởi hành</p>
              {dsNgay.current.map((brand, index) => (
                <label key={index} style={{ display: "block", margin: "5px 0", textAlign: "left" }}>
                  <input onClick={()=>{
                    let  mm=kiemtra(filter.current.dsNgay,brand.batDau)
                     if(mm==-1){
                      filter.current.dsNgay.push(brand)
                      alert("vaof theem ")
                     }
                     else{
                      alert("số lượng: "+mm)
                      filter.current.dsNgay.pop(mm)
                     }
                  }} type="checkbox" style={{ marginRight: "5px" }} />  Ngày {brand.batDau} - {brand.KetThuc}
                </label>
              ))}
            </div>
          </div>
        </div> */}
        <div className="col-lg-12" >
          <div
            style={{
              display: "flex", flexWrap: "wrap", alignItems: "start",
              justifyContent: "start", height: "600px", overflowY: "scroll",width:"100%",
              position: "relative", paddingBottom: "50px"
            }}>

            {dvall?.map((data, index) => {
              if (index <= indx + 5 && index >= indx) {
                return (
                     <Cart inde={inde} ten={data.ten} id={data.id} gia={data.gia} anh={data.anh} />
                );
              }
              return null;
            })
            }

            {dvall.length === 0 && (
              <div style={{ width: "100%", textAlign: "center" }}>
                <img src="https://cdn-icons-png.flaticon.com/128/10608/10608904.png" alt="Không tìm thấy" />
                <p>Không tìm thấy tour phù hợp</p>
              </div>
            )}


          </div>
           {/* Thanh điều hướng cố định */}
           <div style={{
            position: "absolute", bottom: "0px", left: "0px", right: "0px",
            display: "flex", justifyContent: "space-between", width: "100%",
            background: "white", padding: "10px 20px"
          }}>
            <strong>
              <p style={{
                color: indx === 0 ? "gray" : "rgb(212, 160, 23)",
                cursor: indx === 0 ? "default" : "pointer"
              }}
                onClick={() => indx > 0 && setindx(indx - 6)}>Quay Lại</p>
            </strong>
            <strong>
              <p style={{
                color: indx >= listtour.length - 1 ? "gray" : "rgb(212, 160, 23)",
                cursor: indx >= listtour.length - 1 ? "default" : "pointer"
              }}
                onClick={() => indx < listtour.length - 1 && setindx(indx + 6)}>Kế Tiếp</p>
            </strong>
          </div>
        </div>

      </div>


    </div>
  );
};

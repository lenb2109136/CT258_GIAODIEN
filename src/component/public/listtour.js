import { useEffect, useRef, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import { AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Cart from "../carttour";
import Slider from "./cartslider";
import axios from "axios";

export default () => {
  const [value, setValue] = useState("recents");
  const [collapsed, setCollapsed] = useState(true);
  const [indx, setindx] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };
  const [listtour, setlisttour] = useState([])
  const [favorite,setfavorate]= useState([])
  useEffect(()=>{
    axios.get("http://localhost:8080/tour/getListTourfavourite")
      .then(data => {
        setfavorate(data.data.data)
      })
    
  },[])
  useEffect(() => {
    axios.get("http://localhost:8080/tour/getListTour")
      .then(data => {
        setlisttour(data.data.data)
      })
  }, [])
  return (
    <div className="row">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
        <div>
          <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="explore"
              value="recents"
              icon={<img src="https://cdn-icons-png.flaticon.com/128/3850/3850134.png" alt="Recents" style={{ width: 24, height: 24 }} />}
            />
            <BottomNavigationAction
              label="culture"
              value="culture"
              icon={<img src="https://cdn-icons-png.flaticon.com/128/1813/1813884.png" alt="Favorites" style={{ width: 24, height: 24 }} />}
            />
            <BottomNavigationAction
              label="Nearby"
              value="nearby"
              icon={<img src="https://cdn-icons-png.flaticon.com/128/5273/5273626.png" alt="Nearby" style={{ width: 24, height: 24 }} />}
            />
            <BottomNavigationAction
              label="Folder"
              value="folder"
              icon={<img src="https://cdn-icons-png.flaticon.com/128/7009/7009005.png" alt="Folder" style={{ width: 24, height: 24 }} />}
            />
            <BottomNavigationAction
              label="Foreign"
              value="folde"
              icon={<img src="https://cdn-icons-png.flaticon.com/128/10154/10154500.png" alt="Folder" style={{ width: 24, height: 24 }} />}
            />
          </BottomNavigation>
        </div>

      </div>

      <div style={{ width: "100%", marginBottom: "15px" }}>
        <div class="text-center mb-3 pb-3 mt-3">
          <h6 class="text-uppercase" style={{ letterSpacing: "5px", color: "#7AB730" }}>Tours You May Like</h6>

        </div>
        <hr style={{ color: "#7AB730" }}></hr>
        <Slider ds={favorite} />
      </div>

      <div className="bosung" style={{ display: "flex", gap: "20px", position: "fixed", width: "100%", zIndex: 20 }}>

        <div style={{ position: "absolute", zIndex: 3, left: "10px", top: "0px" }}>

        </div>


      </div>
      <div class="text-center mb-3 pb-3 mt-3">
        <h6 class="text-uppercase" style={{ letterSpacing: "5px", color: "#7AB730" }}>Best Selling Tour</h6>
        <h1>Explore Top Destination</h1>
      </div>
      <div className="row" style={{ width: "90%", marginLeft: "4%" }}>
        <div className="col-lg-3" style={{ maxHeight: "600px", overflowY: "scroll" }}>
          <div style={{ width: "100%", padding: "10px", borderRight: "1px solid #ddd", textAlign: "left" }}>
            
            <div>
              <h5 style={{ fontWeight: "bold", marginBottom: "5px", color: "#7ab730" }}>Traveler</h5>
              <p style={{ color: "gray", fontSize: "14px" }}>Khám Phá - Du Lịch</p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p style={{ fontWeight: "bold" }}>KHOẢNG GIÁ</p>
              <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                <input type="text" placeholder="₫ TỪ" style={{ width: "50%", padding: "5px", border: "1px solid #ddd", textAlign: "left" }} />
                <input type="text" placeholder="₫ ĐẾN" style={{ width: "50%", padding: "5px", border: "1px solid #ddd", textAlign: "left" }} />
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
              <p style={{ fontWeight: "bold" }}>Thời lượng</p>
              {[
                "1 - 3 Ngày",
                "3 - 6 Ngày",
                "9 - 12 Ngày",
                "12 - 15 Ngày",
                "15 - 20 Ngày"
              ].map((brand, index) => (
                <label key={index} style={{ display: "block", margin: "5px 0", textAlign: "left" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} /> {brand}
                </label>
              ))}
            </div><div style={{ marginTop: "20px" }}>
              <p style={{ fontWeight: "bold" }}>Ngày khởi hành</p>
              {[
                "Ngày 1 - 10",
                "Ngày 10 - 20",
                "Ngày 20 -30",
              ].map((brand, index) => (
                <label key={index} style={{ display: "block", margin: "5px 0", textAlign: "left" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} /> {brand}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-9" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "start", maxHeight: "600px", overflowY: "scroll" }}>


          {

            listtour.map((data, index) => {
              if (index <= indx + 5 && index >= indx) {
                return <>
                  <Link key={index} to={"/tour?id="+data.T_ID} style={{ textDecoration: "none", color: "inherit", marginLeft: "6%" }}>
                    <Cart ten={data.T_TEN} id={data.T_ID} gia={data.gia} ngay={data.T_SONGAY} anh={data.T_ANH} dem={data.T_SODEM} />
                  </Link>
                </>
              }
              else {
                return null
              }
            }
            )
          }
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>
            <div style={{ display: "flex" }}>
              <strong>
                <p style={{
                  color: indx == 0 ? "gray" : "rgb(212, 160, 23)",
                  cursor: "pointer",
                  pointerEvents: indx == 0 ? "none" : "auto"
                }} onClick={() => {

                  setindx(indx - 6)
                }}>Quay Lại</p>
              </strong>
            </div>
            <div style={{ display: "flex" }}>
              <strong>
                <p style={{
                  color: indx >= listtour.length - 1 ? "gray" : "rgb(212, 160, 23)",
                  cursor: "pointer",
                  pointerEvents: indx >= listtour.length ? "none" : "auto"
                }} onClick={() => {
                  setindx(indx + 6)
                }}>Kế Tiếp</p>
              </strong>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

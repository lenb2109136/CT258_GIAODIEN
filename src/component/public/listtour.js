import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import { AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Cart from "../carttour";
import Slider from "./cartslider";

export default () => {
  const [value, setValue] = useState("recents");
  const [collapsed, setCollapsed] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

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
                <h6 class="text-uppercase" style={{letterSpacing: "5px",color:"#7AB730"}}>Tours You May Like</h6>
         
            </div>
        <hr style={{color:"#7AB730"}}></hr>
        <Slider />
      </div>

      <div className="bosung" style={{ display: "flex", gap: "20px", position: "fixed", width: "100%", zIndex: 20 }}>
        
        <div style={{ position: "absolute", zIndex: 3, left: "10px", top: "0px" }}>
          <Button
            type="primary"
            onClick={toggleMenu}
            style={{
              marginBottom: 16,
              position: "relative",
              left: "3px",
              backgroundColor: "#7AB730",
              border: "none",
              color: "white"
            }}
          >
            {collapsed ? <MenuUnfoldOutlined style={{ color: "rgb(255, 255, 255)" }} /> : <MenuFoldOutlined style={{ color: "rgb(255, 255, 255)" }} />}
          </Button>
        </div>

        {/* Menu */}
        <div style={{ position: "absolute", top: "50px", zIndex: 2 }}>
          {!collapsed && (
            <Menu style={{
              maxWidth: "300px",
              marginLeft:"20px",
              maxHeight: "600px",
              overflowY: "auto",
              border: "1px solid rgb(19, 32, 3)",
              borderRadius: "8px",
              backgroundColor:"#7AB730"
            }}
              mode="inline"
              items={[
                {
                  key: "sub1",
                  label: (
                    <span>
                      <img src="https://cdn-icons-png.flaticon.com/128/727/727606.png" alt="icon" width="20" height="20" style={{ marginRight: 8 }} />
                      Địa điểm
                    </span>
                  ),
                  children: [
                    { key: "sub13", label: "Châu Âu" },
                    { key: "sub14", label: "Châu Á" },
                    { key: "sub15", label: "Châu Mỹ" },
                    { key: "sub16", label: "Bắc Cực" },
                  ],
                },

                {
                  key: "sub3",
                  label: (
                    <span>
                      <img src="https://cdn-icons-png.flaticon.com/128/2972/2972531.png" alt="icon" width="20" height="20" style={{ marginRight: 8 }} />
                      Thời gian
                    </span>
                  ),
                  children: [
                    { key: "sub33", label: "Tháng 1 - 3" },
                    { key: "sub34", label: "Tháng 3 - 6" },
                    { key: "sub35", label: "Tháng 6 - 9" },
                    { key: "sub36", label: "Tháng 9 - 12" },
                  ],
                }
                ,
                {
                  key: "sub3ưư",
                  label: (
                    <span>
                      <img src="https://cdn-icons-png.flaticon.com/128/5579/5579187.png" alt="icon" width="20" height="20" style={{ marginRight: 8 }} />
                      Khoảng Giá
                    </span>
                  ),
                  children: [
                    { key: "sub3ưư3", label: "1 - 5 Triệu" },
                    { key: "sub3ưư4", label: "5 - 15 Triệu" },
                    { key: "sub3ưư5", label: "15 - 45 Triệu" },
                    { key: "sub3ưư6", label: "Từ 45 Triệu" },
                  ],
                }
                ,
                {
                  key: "sub44",
                  label: (
                    <span>
                      <img src="https://cdn-icons-png.flaticon.com/128/18273/18273670.png" alt="icon" width="20" height="20" style={{ marginRight: 8 }} />
                      Thời lượng
                    </span>
                  ),
                  children: [
                    { key: "sub443", label: "1 - 3 Ngày" },
                    { key: "sub444", label: "3 - 6 Ngày" },
                    { key: "sub445", label: "6 - 9 Ngày" },
                    { key: "sub446", label: "Từ 9 Ngày" },
                  ],
                }
              ]}
            />
          )}
        </div>
      </div>
      <div class="text-center mb-3 pb-3 mt-3">
                <h6 class="text-uppercase" style={{letterSpacing: "5px",color:"#7AB730"}}>Best Selling Tour</h6>
                <h1>Explore Top Destination</h1>
            </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        {[...Array(8)].map((_, index) => (
          <Link key={index} to="/tour" style={{ textDecoration: "none", color: "inherit" }}>
            <Cart />
          </Link>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", width: "80%",marginTop:"10px"}}>
        <div style={{ display: "flex" }}>
          <strong>
            <p style={{ color: "rgb(212, 160, 23)", cursor: "pointer" }}>Quay Lại</p>
          </strong>
        </div>
        <div style={{ display: "flex" }}>
          <strong>
            <p style={{ color: "rgb(212, 160, 23)", cursor: "pointer" }}>Kế Tiếp</p>
          </strong>
        </div>
      </div>
      </div>
      

    </div>
  );
};

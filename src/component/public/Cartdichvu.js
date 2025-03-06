import { useContext } from "react";
import { CartContext } from "./KhachHang";
function kiemtradachon (c,id){
  for(let i=0;i<c.length;i++){
    for(let u=0;u<c[i].dsdv.length;u++){
        if(id==c[i].dsdv[u].id){
          return true;
        }
    }
  }
  return false;
}
export default function TourCard(prop) {
  
  const {cart,setcart}= useContext(CartContext);
  console.log(cart)
  console.log(prop.inde)
    return (
      <div
        style={prop.style!=null ? prop.style : {
            width: "300px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            margin: "auto",
            textAlign: "center",
          }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={prop.anh}
            alt="Cyprus - Đảo Síp"
            style={{
              width: "80%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "green",
              color: "white",
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "6px",
            }}
          >
            MỚI
          </span>
        </div>
  
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: "12px 0" ,whiteSpace:"normal", wordWrap:"break-word"}}>
            {prop.ten}
          </h2>
        </div>
  
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8f8f8",
            padding: "10px",
            borderRadius: "8px"
            
          }}
        >
          <div style={{ display: "flex", alignItems: "center"}}>
            <img
              src="https://deviet.vn/wp-content/themes/gctheme/images/index/tag.png"
              alt="Giá"
              style={{ width: "24px", height: "24px" }}
            />
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#d4a017", marginRight: "20px" }}>
              {prop.gia}đ
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://deviet.vn/wp-content/themes/gctheme/images/index/calendar.png"
              alt="Thời gian"
              style={{ width: "24px", height: "24px", marginRight: "3px" }}
            />
          </div>
        </div>
  
        <button
          style={{
            width: "100%",
            border: "2px solid #d4a017",
            color: "#d4a017",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "25px",
            marginTop: "12px",
            cursor: kiemtradachon(cart, prop.id) ? "none" :"pointer",
            transition: "0.3s",
            background: kiemtradachon(cart,prop.id)==true?"none" :"transparent",
            backgroundColor:"white"
          }}
          onMouseOver={(e) => {
            if (!kiemtradachon(cart, prop.id)==true) { 
              e.target.style.background = "#d4a017";
              e.target.style.color = "white";
            }
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#d4a017";
          }}
          onClick={()=>{
            let c= [...cart];
            console.log("danh sách dịch vụ: ")
            console.log(c[prop.inde])
            c[prop.inde].dsdv.push({
              id:prop.id,
              ten:prop.ten,
              anh:prop.anh,
              gia:prop.gia
            })
            setcart(c)
          }}
          disabled={kiemtradachon(cart,prop.id)}
        >
          Chọn dịch vụ
        </button>
      </div>
    );
  }
  
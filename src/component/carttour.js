export default function TourCard(prop) {
    return (
      <div
        style={prop.style!=null ? prop.style : {
            width: "320px",
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
            src="https://deviet.vn/wp-content/uploads/2024/07/tour-ghep-cyprus-dao-sip.png"
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
            Tour ghép tại châu Âu: CYPRUS – Đảo Síp
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
              1.298EUR
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://deviet.vn/wp-content/themes/gctheme/images/index/calendar.png"
              alt="Thời gian"
              style={{ width: "24px", height: "24px", marginRight: "3px" }}
            />
            <p style={{ fontSize: "14px", color: "#555" }}>5 ngày 4 đêm</p>
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
            cursor: "pointer",
            transition: "0.3s",
            background: "transparent",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#d4a017";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#d4a017";
          }}
        >
          Đặt tour ngay
        </button>
      </div>
    );
  }
  
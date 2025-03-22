import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "./KhachHang";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function isFutureDate(dateStr) {
  let parts = dateStr.split("/");
  let inputDate = new Date(parts[2], parts[1] - 1, parts[0]);
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate > today;
}

function total(a) {
  let gia = 0;
  for (let o = 0; o < a?.length; o++) {
    a[o]?.thoiGianKhoiHanh2?.map(data => {
      if (data.chon == true) {
        gia += data.gia
      }
    })
    a[o]?.dsdv?.map(data => {
      gia += data.gia
    })
    return gia
  }
}
const CheckoutPage = () => {
  const navigator = useNavigate()
  const { cart, setcart } = useContext(CartContext)
  return (
    <div className="container my-5">
      <div className="row">
        {/* Shopping Cart Section */}
        <div className="col-lg-8">
          <h4 style={{ color: "#7AB730", marginBottom: "22px" }}>Shopping Tour <span className="text-muted">{cart?.length} Tour</span></h4>
          <table className="table">
            <thead style={{ border: "0px solid red" }}>
              <tr style={{ backgroundColor: "#7AB730" }}>
                <th style={{ backgroundColor: "#7AB730" }}>Product Details</th>
                <th>Price</th>
                <th style={{ backgroundColor: "#7AB730" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                cart?.length < 0 ? <div style={{ width: "100%", textAlign: "center" }}>
                  <div style={{ marginLeft: "70%" }}><img src="https://cdn-icons-png.flaticon.com/128/10608/10608904.png" alt="Không tìm thấy" />
                    <p>Bạn chưa chọn tour nào </p></div>
                </div> : null
              }
              {
                cart?.map((data, index) => {
                  return <>
                    <tr >
                      <td>
                        <div style={{ display: "flex", gap: 22 }}>
                          <img style={{ width: "90px", height: "90px", borderRadius: "5px" }} src={data.anh} />
                          <p className="text-muted fw-bold">{data.ten}</p>
                        </div>
                      </td>
                      <td>
                        {
                          data?.thoiGianKhoiHanh2?.map((d, i) => {
                            return isFutureDate(formatDate(d.thoiGian)) ? (
                              <div key={i} style={{ paddingTop: "10px" }}>
                                <input
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    border: "2px solid #7AB730",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    position: "relative",
                                    padding: "10px",
                                    cursor: "pointer",
                                  }}
                                  // checked={data?.thoiGianKhoiHanh2?.length === 1} 
                                  onClick={(event) => {
                                    let j = [...cart];
                                    for (let p = 0; p < j[index].thoiGianKhoiHanh2.length; p++) {
                                      j[index].thoiGianKhoiHanh2[p].chon = false;
                                    }
                                    j[index].thoiGianKhoiHanh2[i].chon = true;
                                    console.log(j);
                                    setcart(j);
                                  }}
                                  name={"bbb" + index}
                                  type="radio"
                                />

                                <span style={{ marginLeft: "10px" }}>
                                  Ngày Khởi Hành: {formatDate(d.thoiGian)}
                                </span>
                              </div>
                            ) : null;
                          })
                        }


                      </td>
                      <td ><div>
                        <div><button style={{ backgroundColor: "#7AB730", border: "1px solid white", paddingLeft: "10px", paddingRight: "10px", color: "white", borderRadius: "7px" }} onClick={() => {
                          let t = [...cart]
                          t.splice(index, 1)
                          localStorage.setItem("cart", JSON.stringify(t))
                          setcart(t)
                        }}>
                          remove
                        </button></div>
                        <div>
                          <button style={{ backgroundColor: "white", border: "1px solid #7AB730", marginTop: "10px", paddingLeft: "10px", paddingRight: "10px", color: "black", borderRadius: "7px" }} onClick={() => {
                            navigator("/khachhang/dichvu?inde=" + index)
                          }}>Pick Service</button>
                        </div>

                      </div></td>
                    </tr>
                    {
                      data?.dsdv?.map((de, id) => {
                        return <tr>
                          <td>
                            <div style={{ display: "flex", gap: 22 }}>
                              <img style={{ width: "90px", height: "90px", borderRadius: "5px", marginLeft: "32%" }} src={de.anh} />
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 22 }}>
                              <p style={{ marginLeft: "13%" }} className="text-muted fw-bold">{de.ten}</p>
                            </div>
                          </td>
                          <td ><div>
                            <strong><p>{de.gia}</p></strong>
                            <button style={{ backgroundColor: "#7AB730", border: "1px solid white", paddingLeft: "10px", paddingRight: "10px", color: "white", borderRadius: "7px" }} onClick={() => {
                              let t = [...cart]
                              t[index].dsdv.splice(id, 1)
                              localStorage.setItem("cart", JSON.stringify(t))
                              setcart(t)
                            }}>remove</button>

                          </div></td>
                        </tr>
                      })
                    }
                  </>

                })
              }


            </tbody>
          </table>
        </div>

        {/* Order Summary Section */}
        <div className="col-lg-4" style={{ backgroundColor: "white", border: "1px solidrgb(24, 37, 8)", borderRadius: "10px" }}>
          <div className="  p-3">
            <h4 cla>Order Summary</h4>
            <p>Số lượng tour: {cart?.length} <span className="float-end">{total(cart)}</span></p>
            <input type="text" className="form-control my-2" value={localStorage.getItem("ten")} />
            <input type="text" className="form-control my-2" value={localStorage.getItem("sdt")} />
            <button onClick={() => {
              if (cart.length == 0) {
                alert("Vui lòng chọn nhiều hơn 1 tour");
              }
              else {
                let ss = [];
let hasError = false;

cart.forEach(data => {
  let thoidiemkhoihanh = 0;

  // Kiểm tra xem có ít nhất một thời điểm được chọn không
  let isSelected = data.thoiGianKhoiHanh2.some(f => f.chon == true);
  
  if (!isSelected) {
    alert("Bạn vui lòng chọn thời điểm khởi hành cho tour: " + data.ten);
    hasError = true;
    return; // Dừng vòng lặp hiện tại
  }

  // Lấy ID của thời điểm khởi hành đã chọn
  data.thoiGianKhoiHanh2.forEach(f => {
    if (f.chon == true) {
      thoidiemkhoihanh = f.id;
    }
  });

  let dsdv = data.dsdv.map(f => f.id); // Chuyển danh sách dịch vụ thành mảng ID

  ss.push({
    idtgkh: thoidiemkhoihanh,
    dsdv: dsdv
  });
});

// Nếu có lỗi (thiếu thời điểm khởi hành), không gửi API
if (hasError) {
  return;
}

let thongtingui = {
  idkh: 1,
  infove: ss
};

function formatVND(amount) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

axios.post("http://localhost:8080/ve/save", thongtingui, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (response.data.status !== "OK") {
      alert(response.data.message);
    } else {
      alert("Đặt tour thành công");
      localStorage.setItem("cart", JSON.stringify([]));
      setcart([]);
    }
  })
  .catch(error => {
    console.error("Lỗi:", error);
    alert("Đã xảy ra lỗi khi gửi dữ liệu");
  });
              }
            }} style={{ backgroundColor: "#7AB730" }} className="btn  w-100 mb-2"><strong><span style={{ color: "white" }}>Apply</span></strong></button>
            <hr />
            <h5>Total Cost: <span className="float-end">{total(cart)}</span></h5>
            <button className="btn   w-100" style={{ backgroundColor: "white", border: "2px solid #7AB730", color: "black" }}>
              <strong><span>Checkout</span></strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
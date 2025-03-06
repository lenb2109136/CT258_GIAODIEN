import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "./KhachHang";
import { useNavigate } from "react-router-dom";
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function total(a) {
  let gia = 0;
  for (let o = 0; o < a.length; o++) {
    a[o].thoiGianKhoiHanh2.map(data=>{
      if(data.chon==true){
        gia+=data.gia
      }
    })
    a[o].dsdv.map(data => {
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
          <h4 style={{ color: "#7AB730", marginBottom: "22px" }}>Shopping Tour <span className="text-muted">{cart.length} Tour</span></h4>
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
                cart.map((data, index) => {
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
                          data.thoiGianKhoiHanh2.map((d, i) => {
                            return <>
                              <div style={{ paddingTop: "10px" }}>
                                <input style={{
                                  width: "20px",
                                  height: "20px",
                                  border: "2px solid #7AB730",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  position: "relative",
                                  padding: "10px"
                                }} onClick={(event) => {
                                  let j = [...cart]
                                  for (let p = 0; p < j[index].thoiGianKhoiHanh2.length; p++) {
                                    j[index].thoiGianKhoiHanh2[p].chon = false;
                                  }
                                  j[index].thoiGianKhoiHanh2[i].chon = true
                                  setcart(j)
                                  console.log(j)
                                }} name={"bbb" + index} type="radio"></input>
                                <span style={{ marginLeft: "10px" }}>Ngày Khởi Hành: {formatDate(d.thoiGian)}</span>
                              </div>
                            </>
                          })

                        }

                      </td>
                      <td ><div>
                        <div><button style={{ backgroundColor: "#7AB730", border: "1px solid white", paddingLeft: "10px", paddingRight: "10px", color: "white", borderRadius: "7px" }} onClick={() => {
                          let t = [...cart]
                          t.pop(index)
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
                      data.dsdv.map((de, id) => {
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
                              t[index].dsdv.pop(id)
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
            <p>Số lượng tour: {cart.length} <span className="float-end">{total(cart)}</span></p>
            <input type="text" className="form-control my-2" placeholder="Enter your phone" />
            <input type="text" className="form-control my-2" placeholder="Enter your name" />
            <button style={{ backgroundColor: "#7AB730" }} className="btn  w-100 mb-2"><strong><span style={{ color: "white" }}>Apply</span></strong></button>
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
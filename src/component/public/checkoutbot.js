import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "./KhachHang";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../config/axiosconfig";
import { useSearchParams } from "react-router-dom";

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

function totall(ve) {
  if(ve!=undefined&&ve!=null){
   let total=0;
  total+=ve?.ve?.gia;
 for(let i=0;i<ve?.thoiGianKhoiHanh?.ve?.[0].phiDichVu.length;i++){
  total+=ve?.thoiGianKhoiHanh?.ve?.[0].phiDichVu?.[i].gia
 }
  return total
  }
  else return 0;
}
const CheckoutPage = () => {
  const [search] = useSearchParams();
const id = search.get("id");
  const navigator = useNavigate()
  const [ve,setve]= useState({});
  useEffect(()=>{
    api.get(`http://localhost:8080/ve/getvebyid?id=${id}`
    ).then(data=>{
      setve(data.data.data)
      console.log(data.data.data?.thoiGianKhoiHanh?.ve?.[0].phiDichVu);
    })
  },[]);
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <h4 style={{ color: "#7AB730", marginBottom: "22px" }}>Thông tin vé</h4>
          <table className="table">
            <thead style={{ border: "0px solid red" }}>
              <tr style={{ backgroundColor: "#7AB730" }}>
                <th style={{ backgroundColor: "#7AB730" }}>Product Details</th>
                <th>Thông tin khởi hànhh</th>
                <th style={{ backgroundColor: "#7AB730" }}>Thông tin giá</th>
              </tr>
            </thead>
            <tbody>
                    <tr >
                      <td>
                        <div style={{ display: "flex", gap: 22 }}>
                          <img style={{ width: "90px", height: "90px", borderRadius: "5px" }} src={ve?.tour?.anh} />
                          <p style={{marginTop:"10px"}} className="text-muted fw-bold">{ve?.tour?.ten}</p>
                        </div>
                      </td>
                      <td> 
                              <div  style={{ paddingTop: "10px" }}>
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
                                  checked={true}
                                  type="radio"
                                />

                                <span style={{ marginLeft: "10px" }}>
                                  Ngày Khởi Hành: {formatDate(ve?.thoiGianKhoiHanh?.thoiGian)}
                                </span>
                              </div>
                      </td>
                      <td ><div>
                                    <p style={{marginTop:"10px"}}>{ve?.ve?.gia}</p>
                      </div></td>
                    </tr>
                    {
                      ve?.ve?.phiDichVu?.map((de, id) => {
                        return <tr>
                          <td>
                            <div style={{ display: "flex", gap: 22 }}>
                              <img style={{ width: "90px", height: "90px", borderRadius: "5px", marginLeft: "32%" }} src={de?.dichVu?.anh} />
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 22 }}>
                             
                             
                              <p style={{ marginLeft: "13%" }} className="text-muted fw-bold">{de?.dichVu?.ten}</p>
                            
                            
                            </div>
                          </td>
                          <td ><div>
                            <strong><p>{de?.dichVu?.gia}</p></strong>
                           

                          </div></td>
                        </tr>
                      })
                    }

            </tbody>
          </table>
        </div>

        <div className="col-lg-4" style={{ backgroundColor: "white", border: "1px solidrgb(24, 37, 8)", borderRadius: "10px" }}>
          <div className="  p-3">
            <h4 cla>Order Summary</h4>
            <p>Số lượng tour: {1} <span className="float-end">{totall(ve)}</span></p>
            <input type="text" className="form-control my-2" value={localStorage.getItem("ten")} />
            <input type="text" className="form-control my-2" value={localStorage.getItem("sdt")} />
            <hr />
            <h5>Total Cost: <span className="float-end">{totall(ve)}</span></h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
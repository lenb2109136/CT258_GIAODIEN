import React, { useEffect, useState } from "react"
import api from "../../config/axiosconfig"
import Cart from "../Cartdichvu";
import { Context } from "./index";
function filterArray(a1, a2) {
    console.log(a1)
    if (!Array.isArray(a1) ) {
        return a2
    }
    return a2.filter(item => 
        !a1.some(a1Item => a1Item?.dichVu?.id === item?.id)
    );
}

export default function (prop) {
    const { dstour, setdstour } = React.useContext(Context)
    const [dv, setdv] = useState([])
    useEffect(() => {
        api.get("dichvu/getall")
            .then(data => {
                setdv(data.data.data)
            })
    },[])
    return <>
        <div style={{ position: "fixed", width: "100%", height: "100%", backgroundColor: "white", top: "0px", right: "0px", zIndex: 30, border: "2px solid #7AB730", borderRadius: "10px" }}>
            <img onClick={() => {
                prop.setopen(false)

            }} src="https://cdn-icons-png.flaticon.com/128/189/189254.png" style={{ position: "absolute", cursor: "pointer", left: "10px", width: "30px", marginTop: "20px" }}></img>
            <h3 style={{ textAlign: "center", marginTop: "20px", color: "#7AB730" }}>Chọn dịch vụ</h3>
            <hr></hr>
            <div style={{ display: "flex", flex: "wrap" }}>
                {
                    filterArray(prop.dsl, dv)?.map(data => {
                        return <>
                            <div style={{
                                width: "23.2%", height: "200px", marginLeft: "10px", border: "1px solid #7AB730",
                                borderRadius: "10px"
                            }}>
                                <img style={{ width: "66%", height: "120px", textAlign: "center", marginLeft: "15%", marginTop: "5%", borderRadius: "20px" }} src={data.anh}></img>
                                <strong><p style={{ textAlign: "center", marginBottom: "10px" }}>{data.ten}</p></strong>
                                <button onClick={() => {
                                    api.get(`phidichvu/add?iddv=${data.id}&idve=${prop.idve}`)
                                        .then(dat => {
                                            if (dat.data.status == "OK") {
                                                alert("Thêm dịch vụ thành công")
                                                let t = [...dstour]
                                                console.log(data)
                                                console.log(t[prop.ind1].thoiGianKhoiHanh2[prop.ind2].ve[prop.ind3].phiDichVu)
                                                t[prop.ind1].thoiGianKhoiHanh2[prop.ind2].ve[prop.ind3].phiDichVu=t[prop.ind1].thoiGianKhoiHanh2[prop.ind2].ve[prop.ind3].phiDichVu===undefined?[]: t[prop.ind1].thoiGianKhoiHanh2[prop.ind2].ve[prop.ind3].phiDichVu;
                                                t[prop.ind1].thoiGianKhoiHanh2[prop.ind2].ve[prop.ind3].phiDichVu.push(dat.data.data)
                                                setdstour(t)
                                            }
                                            else {
                                                alert(dat.data.message)
                                            }
                                        })

                                }} style={{ backgroundColor: "#7AB730", border: "0px", borderRadius: "5px", marginLeft: "18%", marginBottom: "50px" }}>Chọn Dịch Vụ</button>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    </>
}
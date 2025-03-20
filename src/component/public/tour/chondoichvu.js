import React, { useEffect, useState, useContext } from "react";
import api from "../../config/axiosconfig";
import { Context } from "./index";

function filterArray(a1, a2) {
    if (!Array.isArray(a1)) return a2;
    return a2.filter(item => !a1.some(a1Item => a1Item?.dichVu?.id === item?.id));
}

export default function ServiceSelector({ dsl, setopen, idve, ind1, ind2, ind3 }) {
    const { dstour, setdstour } = useContext(Context);
    const [dv, setdv] = useState([]);

    useEffect(() => {
        api.get("dichvu/getall").then(data => {
            setdv(data.data.data);
        });
    }, []);

    return (
        <div style={{
            position: "fixed",
            width: "90%",
            height: "90%",
            backgroundColor: "white",
            top: "5%",
            left: "5%",
            zIndex: 30,
            border: "2px solid #7AB730",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Nút đóng */}
            <img onClick={() => setopen(false)}
                src="https://cdn-icons-png.flaticon.com/128/189/189254.png"
                style={{ position: "absolute", cursor: "pointer", left: "15px", width: "30px", top: "15px" }} />

            <h3 style={{ textAlign: "center", color: "#7AB730", marginBottom: "10px" }}>Chọn dịch vụ</h3>
            <hr />

            {/* Danh sách dịch vụ */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                flexGrow: 1, // Chiếm phần còn lại của div
                overflowY: "auto", // Cuộn dọc nếu danh sách dài
                padding: "10px"
            }}>
                {filterArray(dsl, dv).map(data => (
                    <div key={data.id} style={{
                        width: "100%",
                        maxWidth: "220px",
                        border: "1px solid #7AB730",
                        borderRadius: "10px",
                        textAlign: "center",
                        padding: "10px",
                        position: "relative"
                    }}>
                        <img src={data.anh} alt={data.ten}
                            style={{ width: "100%", height: "120px", borderRadius: "10px" }} />

                        <p style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            margin: "10px 0",
                            fontWeight: "bold"
                        }}>{data.ten}</p>

                        <button onClick={() => {
                            api.get(`phidichvu/add?iddv=${data.id}&idve=${idve}`)
                                .then(dat => {
                                    if (dat.data.status === "OK") {
                                        alert("Thêm dịch vụ thành công");
                                        let t = [...dstour];
                                        t[ind1].thoiGianKhoiHanh2[ind2].ve[ind3].phiDichVu ??= [];
                                        t[ind1].thoiGianKhoiHanh2[ind2].ve[ind3].phiDichVu.push(dat.data.data);
                                        setdstour(t);
                                    } else {
                                        alert(dat.data.message);
                                    }
                                });
                        }} style={{
                            backgroundColor: "#7AB730",
                            border: "none",
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "5px",
                            width: "100%",
                            fontSize: "14px"
                        }}>Chọn Dịch Vụ</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

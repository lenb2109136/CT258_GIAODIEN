import { useState, useEffect } from "react";
import api from "../../config/axiosconfig";
import axios from "axios";
function formatDateTime(input) {
    let date = new Date(input);
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
function isFutureDate(dateTimeStr) {
    let [date, time] = dateTimeStr.split(" ");
    let [day, month, year] = date.split("/").map(Number);
    let [hour, minute, second] = time.split(":").map(Number);

    let inputDate = new Date(year, month - 1, day, hour, minute, second);
    let now = new Date(); 

    return inputDate > now;
}
export default function ({ nv,setopen }) {
    const today = new Date().toISOString().slice(0, 16); 
    const firstDay = new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 16); 

    const [bd, setBd] = useState(firstDay);
    const [kt, setKt] = useState(today);
    const [dsve, setDsve] = useState([]);

    const fetchData = (bdValue, ktValue) => {
        let t = new FormData();
        t.append("id", nv);
        t.append("bd", bdValue);
        t.append("kt", ktValue);

        api.post("ve/ls", t).then((response) => {
            setDsve(response.data.data);
        });
    };

    useEffect(() => {
        fetchData(firstDay, today);
    }, []);

    return (
        <div style={{ border:"2px solid #7AB730",width: "95%",backgroundColor:"white", height: "500px", overflow:"auto", zIndex: 20,left:"3%", top: "143px",position:"absolute" }}>
            <img onClick={() => {
                setopen(false)

            }} src="https://cdn-icons-png.flaticon.com/128/189/189254.png" style={{ position: "absolute", cursor: "pointer", left: "10px", width: "30px", marginTop: "20px" }}></img>
            
            <h3 style={{marginTop:"60px"}}>Lịch sử đặt tour</h3>
            <div className="row">
                <div style={{ display: "flex"}} className="col-6">
                    <p style={{marginTop:"20px"}}>Thời điểm bắt đầu: </p>{" "}
                    <input
                        id="bd"
                        type="datetime-local"
                        style={{borderRadius:"10px",padding:"10px",marginLeft:"18px"}}
                        value={bd}
                        onChange={(e) => {
                            setBd(e.target.value);
                            fetchData(e.target.value, kt);
                        }}
                    />
                </div>
                <div style={{ display: "flex" ,justifyContent:"center" }} className="col-6">
                    <p style={{marginTop:"20px"}}>Thời điểm kết thúc: </p>
                    <input
                        id="kt"
                        type="datetime-local"
                        style={{borderRadius:"10px",padding:"10px",marginLeft:"18px"}}
                        value={kt}
                        onChange={(e) => {
                            setKt(e.target.value);
                            fetchData(bd, e.target.value);
                        }}
                    />
                </div>
            </div>
            <div>
                <table style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#7AB730", color: "white" }}>STT</th>
                            <th style={{ border: "2px solid #7AB730" }}>Tên tour</th>
                            <th style={{ border: "2px solid #7AB730" }}>Ngày Đặt</th>
                            <th style={{ border: "2px solid #7AB730" }}>Thời điểm khởi hành</th>
                            <th style={{ border: "2px solid #7AB730" }}>Giá vé áp dụng</th>
                            <th style={{ backgroundColor: "#7AB730", color: "white" }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsve?.map((data, index) => (
                            <tr key={index}>
                                <td style={{ backgroundColor: "#7AB730", color: "white" }}>{index + 1}</td>
                                <td style={{ border: "2px solid #7AB730" }}>{data.T_TEN}</td>
                                <td style={{ border: "2px solid #7AB730" }}>{ formatDateTime(data.V_NGAYDAT)}</td>
                                <td style={{ border: "2px solid #7AB730" }}>{formatDateTime(data.T_THOIGIANKHOIHANH)}</td>
                                <td style={{ border: "2px solid #7AB730" }}>{data.V_GIA}</td>
                                <td style={{ backgroundColor: "#7AB730", color: "white" }}>
                                    <button onClick={()=>{
                                        api.post(`ve/huyve?id=${data.v_id}`)
                                            .then(data=>{
                                                if(data.data.status!="OK"){
                                                    alert("Hủy vé thất bại")
                                                }
                                                else{
                                                        alert("hủy vé thành công")
                                                        dsve.splice(index,1)
                                                }
                                                
                                            })
                                    }}
                                    style={{backgroundColor:"white",color:"#7AB730",paddingLeft:"10px",paddingRight:"10px"}} >Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {dsve?.length === 0 && (
                    <h3 style={{ textAlign: "center", marginTop: "30px", color: "#7AB730" }}>
                        Không có tour trong thời gian này
                    </h3>
                )}
            </div>
        </div>
    );
}

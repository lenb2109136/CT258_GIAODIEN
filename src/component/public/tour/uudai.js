import axios from "axios";
import api from "../../config/axiosconfig";
import ThongTin from "./thongtindattour"
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


export default function (prop) { 
    const thayDoi=(value,key,indexTgkh,indexUDindexUD)=>{
        let a=prop.ds?.thoiGianKhoiHanh2[indexTgkh].giaUuDai[indexUDindexUD];
        a[key]=value; 
    }

    const submit=(aa)=>{
        axios.post("http://localhost:8080/tour/uudai/update",aa)
              .then(data => { 
                if(data.data.status!="OK"){
                    alert(data.data.message)
                }
                else{
                    alert("Cập nhật thành công")
                }
              }).catch(error=>{
                alert("Thông tin cập nhật không hợp lệ")
              })
        
    }
    return <>
        <div style={{
           width: "87%",
            overflowY:"scroll",
            height: "700px",
            position: "absolute", zIndex: 3, backgroundColor: "white",
            left:"200px",
            top:"120px"
        }}> 
        <img onClick={()=>{prop.setopen(false)}} src="https://cdn-icons-png.flaticon.com/128/189/189254.png" style={{position:"absolute",cursor:"pointer",left:"10px",width:"30px"}}></img>
        <strong><h4 style={{color:"#7AB730",backgroundColor:"white"}}>Thông Tin Ưu Đãi</h4></strong>
        <hr style={{color:"#7AB730", alignItems:"center"}}></hr>
        <table style={{width:"97%",marginLeft:"1.5%"}}>

            <tr style={{backgroundColor:"#7AB730", textAlign:"center"}}>
                <th style={{backgroundColor:"#7AB730", textAlign:"center"}} >STT</th>
                <th style={{textAlign:"center", border:"2px solid #7AB730",backgroundColor:"white"}} >Thời gian khởi hành</th>
                <th  style={{textAlign:"center", border:"2px solid #7AB730",backgroundColor:"white"}}><p style={{marginLeft:"40px"}}>Thông tin ưu đãi</p></th>
             <th style={{backgroundColor:"#7AB730", textAlign:"center"}}>Danh sách đã đặt</th>
            </tr>
            {
                prop?.ds?.thoiGianKhoiHanh2?.map((data, index) => {
                    return <tr style={{borderBottom:"1px solid #7AB730"}}>
                        <td style={{textAlign:"center",borderBottom:"1px solid #7AB730",borderRight:"1px solid #7AB730"}}>{index+1}</td>
                        <td style={{textAlign:"center",borderBottom:"1px solid #7AB730",borderRight:"1px solid #7AB730"}}>{formatDate(data.thoiGian)}</td>
                        <td style={{borderBottom:"1px solid #7AB730",borderRight:"1px solid #7AB730"}}>
                            {
                                data?.giaUuDai?.map((d,i)=>{
                                        return <div style={{marginLeft:"30px"}}>

                                            <p style={{marginBottom:"10px",marginTop:"20px"}}><strong>Ngày giờ áp dụng : </strong> {formatDate(d.ngayGioApDung)}</p>
                                            <input style={{padding:"10px",borderRadius:"5px"}} disabled={true} onChange={(e)=>thayDoi(e.target.value,"ngayGioApDung",index,i)} defaultValue={d.ngayGioApDung}  type="datetime-local"/>
                                            <p style={{marginBottom:"10px",marginTop:"20px"}}><strong>Ngày giờ kết thúc : </strong>  {formatDate(d.ngayKetThuc)}</p>
                                            <input  disabled={true} style={{cursor:new Date(d.ngayKetThuc) > new Date() ? "pointer" : "none",padding:"10px",borderRadius:"5px"}}  onChange={(e)=>thayDoi(e.target.value,"ngayKetThuc",index,i)} defaultValue={d.ngayKetThuc} type="datetime-local"/>
                                           <div style={{marginTop:"20px"}}>
                                           <span style={{display:"inline-block"}}><strong>Giá áp dụng: {d.gia}</strong> </span>
                                           </div>
                                            
                                            <hr></hr>
                                        </div>
                                })
                                
                            }
                            {
                                data?.giaUuDai?.length==0 ?<p>Chưa áp dụng ưu đãi nào</p> :null
                            }
                        </td>
                        <td style={{textAlign:"center",borderBottom:"1px solid #7AB730"}}>
                            {data?.ve?.map((f,ff)=>{
                                return <div style={{padding:"10px"}}>
                                    <span>Tên KH: {f.khachHang.ten} - <strong>SDT</strong> :{f.khachHang.soDienThoai}</span>
                                    <button onClick={
                                        ()=>{
                                            let f2 = new FormData()
                                            f2.append("id",f.id)
                                            api.post("ve/huyve",f2)
                                                .then(data=>{
                                                    if(data.data.status!="OK"){
                                                        alert(data.data.message)
                                                    }
                                                    else{
                                                        alert("Hủy đặt vé thành công")
                                                    }
                                                })
                                        }
                                    } style={{border:"0px",backgroundColor:"#7AB730",color:"white",marginLeft:"15px"}}>Hủy vé đặt</button>
                                    <ThongTin ind1={prop.ind} ind2={index} ind3={ff} thongtinkhoihanhthongtinkhoihanh v={f}></ThongTin>
                                </div>
                            })
                        }
                        </td>
                    </tr>
                })
            }
        </table>
        </div>

    </>
}
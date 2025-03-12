import axios from "axios";

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
                alert("Cập nhật thành công")
              }).catch(error=>{
                alert("Thông tin cập nhật không hợp lệ")
              })
        
    }
    return <>
        <div style={{
            width: "85%",
            height: "73%",
            position: "fixed", zIndex: 3, backgroundColor: "white"
        }}> 
        <strong><h4 style={{color:"#7AB730",backgroundColor:"white"}}>Thông Tin Ưu Đãi</h4></strong>
        <hr style={{color:"#7AB730", alignItems:"center"}}></hr>
        <table >

            <tr style={{backgroundColor:"#7AB730", textAlign:"center"}}>
                <th style={{backgroundColor:"#7AB730", textAlign:"center"}} >STT</th>
                <th style={{textAlign:"center", border:"2px solid #7AB730",backgroundColor:"white"}} >Thời gian khởi hành</th>
                <th  style={{textAlign:"center", border:"2px solid #7AB730",backgroundColor:"white"}}><p style={{marginLeft:"40px"}}>Thông tin ưu đãi</p></th>
             
            </tr>
            {
                prop?.ds?.thoiGianKhoiHanh2?.map((data, index) => {
                    return <tr style={{borderBottom:"1px solid #7AB730"}}>
                        <td style={{textAlign:"center",borderBottom:"1px solid #7AB730"}}>{index+1}</td>
                        <td style={{textAlign:"center",borderBottom:"1px solid #7AB730"}}>{formatDate(data.thoiGian)}</td>
                        <td style={{borderBottom:"1px solid #7AB730"}}>
                            {
                                data.giaUuDai.map((d,i)=>{
                                        return <div style={{marginLeft:"30px"}}>

                                            <p><strong>Ngày giờ áp dụng : </strong> {formatDate(d.ngayGioApDung)}</p>
                                            <input onChange={(e)=>thayDoi(e.target.value,"ngayGioApDung",index,i)} defaultValue={d.ngayGioApDung}  type="datetime-local"/>
                                            <p><strong>Ngày giờ kết thúc : </strong>  {formatDate(d.ngayKetThuc)}</p>
                                            <input disabled={new Date(d.ngayKetThuc) < new Date()} style={{cursor:new Date(d.ngayKetThuc) > new Date() ? "pointer" : "none"}}  onChange={(e)=>thayDoi(e.target.value,"ngayKetThuc",index,i)} defaultValue={d.ngayKetThuc} type="datetime-local"/>
                                            <span><strong>Giá áp dụng:</strong> </span><input onChange={(e)=>thayDoi(e.target.value,"gia",index,i)}  type="number" style={{paddingLeft:"15px", border:"0px", borderBottom:"1px solid black",outline:"none"}}  defaultValue={d.gia}></input>
                                            <button onClick={()=>{submit(d)}} disabled={new Date(d.ngayKetThuc) > new Date() ?false:true} style={{backgroundColor:"#7AB730", color:"white", border:"0px", borderRadius:"5px", padding:"6px"}}>   {new Date(d.ngayKetThuc) > new Date() ? "Ngừng áp dụng" : "Ko có thao tác "}</button>
                                            
                                        </div>
                                })
                            }
                        </td>
                        <td style={{textAlign:"center",borderBottom:"1px solid #7AB730"}}>
                        </td>
                    </tr>
                })
            }
        </table>
        </div>

    </>
}
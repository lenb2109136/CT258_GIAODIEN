import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./footer";
import Header from "./header";
import Comment from "./comment"
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./KhachHang";
import Slider from "./cartslider";
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
const TourInfo = () => {
    const {cart,setcart} =useContext(CartContext)
    const [favorite, setfavorate] = useState([])
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const [t, sett] = useState();
    const [chuachon,setchu]=useState(true)
    useEffect(() => {
        axios.get("http://localhost:8080/tour/getListTourfavourite")
          .then(data => {
            setfavorate(data.data.data)
          })
    
      }, [])
    useEffect(() => {
        axios.get(`http://localhost:8080/tour/getinfortour?id=${id}`)
            .then(data => {
                sett(data.data.data);
            })
    }, [])
    useEffect(()=>{
        for( let i=0;i<cart?.length;i++){
            if(cart[i].id==id){
               setchu(false)
            }
        }
    })
    const [activeTab, setActiveTab] = useState("Giới thiệu chung");
    return (<>
        <div className="container mt-4">
            <h2 className="fw-bold">{t?.ten}</h2>
            <ul className="nav nav-tabs mt-3">
                {["Giới thiệu chung", "Lịch trình chi tiết", "Chi tiết giá", "Hình ảnh"].map((tab) => (
                    <li className="nav-item" key={tab} >
                        <a
                            className="nav-link"
                            href="#"
                            onClick={() => setActiveTab(tab)}
                            style={{
                                backgroundColor: activeTab === tab ? "#7AB730" : "transparent",
                                borderColor: activeTab === tab ? "#7AB730" : "white",
                                color: activeTab === tab ? "white" : "#000",
                                borderRadius: "5px"
                            }}
                        >
                            {tab}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="row mt-4">
                <div className="col-md-6">

                    <div class="position-relative">
                        <img style={{height:"500px",width:"600px"}} class="img-fluid " src={t?.anh} alt="" />
                        <div class="blog-date">
                            <h6 class="font-weight-bold mb-n1">01</h6>
                            <small class="text-white text-uppercase">Jan</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row d-flex align-items-center justify-content-center">
                        <img className="mb-2 col-lg-2" style={{ width: "70px", height: "8%", marginRight: "2%" }} src="https://cdn-icons-png.flaticon.com/128/10693/10693001.png" alt="price-icon" />
                        <h4 className="col-lg-10 text-danger text-center">73.900.000 đ</h4>
                    </div>
                    <div className="d-flex">
                        <img className="mb-2" style={{ width: "8%", height: "8%", marginRight: "6%" }} src=" https://cdn-icons-png.flaticon.com/128/2784/2784459.png" alt="airline-icon" />
                        <p><strong>Thời gian:</strong> {t?.soNgay} ngày {t?.soDem} đêm</p>
                    </div>
                    <div>
                        <p>Thông tin khởi hành chi tiết</p>
                        <ul>
                            {
                                t?.thoiGianKhoiHanh2.map(data=>{
                                    return <li>Khởi hành: {formatDate(data.thoiGian)}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="d-flex">
                        <img className="mb-2" style={{ width: "8%", height: "8%", marginRight: "6%", }} src="https://cdn-icons-png.flaticon.com/128/984/984233.png" alt="airline-icon" />
                        <p><strong>Hãng hàng không:</strong> Turkish Airlines</p>
                    </div>
                    <div className="d-flex">
                        <img className="mb-2" style={{ width: "8%", height: "8%", marginRight: "6%" }} src="https://cdn-icons-png.flaticon.com/128/282/282803.png" alt="calendar-icon" />
                        <p><strong>Ngày khởi hành:</strong></p>
                    </div>
                    <div className="container">
                        <div className="row">

                            {
                                t?.thoiGianKhoiHanh2.map(data => {
                                    return <>
                                        <div className="col-md-6">
                                            <ul className="list-unstyled">
                                                <li>{formatDate(data.thoiGian)}</li>
                                               
                                            </ul>
                                        </div>
                                    </>
                                })
                            }
                        </div>
                    </div>
                    <button disabled={!chuachon} onClick={()=>{
                        let y=[...cart]
                        y.push({...t,dsdv:[]})
                       setcart(y)
                    }} className="w-100" style={{ backgroundColor:chuachon==true ?  "#7AB730" :"gray", color: "white", border: "1px solid white", height: "30px", borderRadius: "10px" }}>
                        <strong>ĐẶT TOUR</strong>
                    </button>
                </div>
            </div>
            <hr></hr>

            <div class="row pb-3">
                <div class="blog-item">

                </div>
                <div class="bg-white mb-3" style={{ padding: "30px" }}>
                    <div dangerouslySetInnerHTML={{ __html: t.moTa }} />
                    <h2 class="mb-3">Dolor justo sea kasd lorem clita justo diam amet</h2>
                    <p>Sadipscing labore amet rebum est et justo gubergren. Et eirmod ipsum sit diam ut
                        magna lorem. Nonumy vero labore lorem sanctus rebum et lorem magna kasd, stet
                        amet magna accusam consetetur eirmod. Kasd accusam sit ipsum sadipscing et at at
                        sanctus et. Ipsum sit gubergren dolores et, consetetur justo invidunt at et
                        aliquyam ut et vero clita. Diam sea sea no sed dolores diam nonumy, gubergren
                        sit stet no diam kasd vero.</p>
                    <p>Voluptua est takimata stet invidunt sed rebum nonumy stet, clita aliquyam dolores
                        vero stet consetetur elitr takimata rebum sanctus. Sit sed accusam stet sit
                        nonumy kasd diam dolores, sanctus lorem kasd duo dolor dolor vero sit et. Labore
                        ipsum duo sanctus amet eos et. Consetetur no sed et aliquyam ipsum justo et,
                        clita lorem sit vero amet amet est dolor elitr, stet et no diam sit. Dolor erat
                        justo dolore sit invidunt.</p>
                    <h4 class="mb-3">Est dolor lorem et ea</h4>
                    <img class="img-fluid w-50 float-left mr-4 mb-2" src="img/blog-2.jpg" />
                    <p>Diam dolor est labore duo invidunt ipsum clita et, sed et lorem voluptua tempor
                        invidunt at est sanctus sanctus. Clita dolores sit kasd diam takimata justo diam
                        lorem sed. Magna amet sed rebum eos. Clita no magna no dolor erat diam tempor
                        rebum consetetur, sanctus labore sed nonumy diam lorem amet eirmod. No at tempor
                        sea diam kasd, takimata ea nonumy elitr sadipscing gubergren erat. Gubergren at
                        lorem invidunt sadipscing rebum sit amet ut ut, voluptua diam dolores at
                        sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos. Invidunt sed diam
                        dolores takimata dolor dolore dolore sit. Sit ipsum erat amet lorem et, magna
                        sea at sed et eos. Accusam eirmod kasd lorem clita sanctus ut consetetur et. Et
                        duo tempor sea kasd clita ipsum et.
                    </p>
                    <p>Diam dolor est labore duo invidunt ipsum clita et, sed et lorem voluptua tempor
                        invidunt at est sanctus sanctus. Clita dolores sit kasd diam takimata justo diam
                        lorem sed. Magna amet sed rebum eos. Clita no magna no dolor erat diam tempor
                        rebum consetetur, sanctus labore sed nonumy diam lorem amet eirmod. No at tempor
                        sea diam kasd, takimata ea nonumy elitr sadipscing gubergren erat. Gubergren at
                        lorem invidunt sadipscing rebum sit amet ut ut, voluptua diam dolores at
                        sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos. Invidunt sed diam
                        dolores takimata dolor dolore dolore sit. Sit ipsum erat amet lorem et, magna
                        sea at sed et eos. Accusam eirmod kasd lorem clita sanctus ut consetetur et. Et
                        duo tempor sea kasd clita ipsum et.
                    </p>
                    <h5 class="mb-3">Est dolor lorem et ea</h5>
                    <img class="img-fluid w-50 float-right ml-4 mb-2" src="img/blog-3.jpg" />
                    <p>Diam dolor est labore duo invidunt ipsum clita et, sed et lorem voluptua tempor
                        invidunt at est sanctus sanctus. Clita dolores sit kasd diam takimata justo diam
                        lorem sed. Magna amet sed rebum eos. Clita no magna no dolor erat diam tempor
                        rebum consetetur, sanctus labore sed nonumy diam lorem amet eirmod. No at tempor
                        sea diam kasd, takimata ea nonumy elitr sadipscing gubergren erat. Gubergren at
                        lorem invidunt sadipscing rebum sit amet ut ut, voluptua diam dolores at
                        sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos. Invidunt sed diam
                        dolores takimata dolor dolore dolore sit. Sit ipsum erat amet lorem et, magna
                        sea at sed et eos. Accusam eirmod kasd lorem clita sanctus ut consetetur et. Et
                        duo tempor sea kasd clita ipsum et. Takimata kasd diam justo est eos erat
                        aliquyam et ut.</p>
                </div>
            </div>

            <hr></hr>
            
            <h2 class="mb-3">You might also like</h2>
            <Slider ds={favorite} />
            <hr></hr>
            <h2 class="mb-3">Detailed schedule</h2>
            <div className="chan mt-4">
                {
                    t?.chan.map((data, index) => {
                        return <>
                            <div className="custom-card border rounded p-3" style={{ marginBottom: "20px", cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target={"#collapseContent" + (index + 1)}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src="https://cdn-icons-png.flaticon.com/128/2693/2693710.png" className="me-2" alt="Calendar" style={{ width: "24px", height: "24px" }} />
                                        <strong><h7 className="mb-0">Ngày {data?.ngayBatDau} - {data?.ngayKetThuc}: {data.diaDiemDen}</h7></strong>
                                    </div>
                                    <img src="https://cdn-icons-png.flaticon.com/128/226/226172.png" alt="Dropdown" className="icon-dropdown" style={{ width: "18px", height: "18px", marginLeft: "auto" }} />
                                </div>
                                <div id={"collapseContent" + (index + 1)} className="collapse mt-2" style={{ paddingLeft: "0px" }}>
                                    {/* <p style={{ textAlign: "start" }}></p>
                                     */}
                                     <div dangerouslySetInnerHTML={{ __html: data.moTa }} />
                                </div>
                            </div>
                        </>
                    })
                }


            </div>
            <Comment id={id}></Comment>

        </div>
    </>
    );
};

export default TourInfo;
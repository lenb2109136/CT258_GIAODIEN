import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import api from '../../config/axiosconfig';
import { Context } from './index';
import Pick from "./chondoichvu"
const AddTour = (prop) => {
    const { dstour, setdstour } = React.useContext(Context)
    const [opene,setopene] = React.useState(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState('1');
    const [tour, setTour] = React.useState({
        "id": 1,
        "thoiGianKhoiHanh": "2025-06-02T09:57:06",
        "soNgay": 4,
        "soDem": 4,
        "soNguoiThamGia": 5,
        "moTa": "...",
        "ten": "Pearl Island Getaway",
        "anh": "http://localhost:8080/datasource/1.jpeg",
        "loaiTour": {
            "id": 2,
            "ten": "culture",
            "icon": "https://cdn-icons-png.flaticon.com/128/1813/1813884.png"
        },
        "nhanvien": {
            "id": 1,
            "ten": "Nguyễn Duy Anh",
            "anh": null,
            "soDienThoai": "0709302846",
            "socmnd": "09094347340232",
            "sdt": "0709302846"
        },
        "thoiGianKhoiHanh2": [
            {
                "id": 1,
                "thoiGian": "2025-06-02T10:21:10",
                "gia": 2000.0,
                "nhanVien": {
                    "id": 1,
                    "ten": "Nguyễn Duy Anh",
                    "anh": null,
                    "soDienThoai": "0709302846",
                    "socmnd": "09094347340232",
                    "sdt": "0709302846"
                },
                "giaUuDai": [
                    {
                        "id": 1,
                        "gia": 2900.0,
                        "ngayGioApDung": "2025-03-04T16:09:04",
                        "ngayKetThuc": "2025-03-04T16:09:06"
                    },
                    {
                        "id": 3,
                        "gia": 222222.0,
                        "ngayGioApDung": "2025-03-12T11:30:50",
                        "ngayKetThuc": "2025-03-13T11:30:53"
                    }
                ]
            },
            {
                "id": 2,
                "thoiGian": "2025-07-02T10:21:27",
                "gia": 1800.0,
                "nhanVien": {
                    "id": 1,
                    "ten": "Nguyễn Duy Anh",
                    "anh": null,
                    "soDienThoai": "0709302846",
                    "socmnd": "09094347340232",
                    "sdt": "0709302846"
                },
                "giaUuDai": [
                    {
                        "id": 2,
                        "gia": 1200.0,
                        "ngayGioApDung": "2025-03-11T16:00:05",
                        "ngayKetThuc": "2025-03-11T16:00:06"
                    }
                ]
            }
        ],
        "chan": [
            {
                "id": 1,
                "moTa": "Quý khách khởi hành từ điểm hẹn lên sân bay quốc tế để làm thủ tục xuất cảnh. Sau đó, quý khách lên chuyến bay đi Châu Âu.",
                "ngayBatDau": "2025-03-02",
                "ngayKetThuc": "2025-03-02",
                "diaDiemDen": "Cần thơ"
            },
            {
                "id": 2,
                "moTa": "Quý khách khởi hành từ điểm hẹn lên sân bay quốc tế để làm thủ tục xuất cảnh. Sau đó, quý khách lên chuyến bay đi Châu Âu.",
                "ngayBatDau": "2025-03-02",
                "ngayKetThuc": "2025-03-02",
                "diaDiemDen": "Vĩnh Long"
            }
        ]
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [loaiTour, setLoaiTour] = React.useState([])

    React.useEffect(() => {
        api.get("loaitour/getall").then(v => {
            setLoaiTour(v.data.data);
        }).then(v => {

        })
    }, [])

    return (
        <div>
             
            {/* {<Pickservice></Pickservice>} */}
            <Button onClick={handleOpen}>Xem chi tiết</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <h2 className="mb-4 text-primary fw-bold text-center">Thông tin đặt tour  </h2>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Thông tin khách hàng" value="1" />
                                    <Tab label="Thông tin vé đặt" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div className='containercontainer'>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-6'>Tên khách hàng: </p>
                                        <p className='col-6'>{prop?.v?.khachHang?.ten}</p>
                                        {/* <Pickservice></Pickservice> */}
                                    </div>
                                    <hr style={{ color: "#7AB730", margin: "5px" }}></hr>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-6'>Số điện thoại: </p>
                                        <p className='col-6'>{prop?.v?.khachHang?.soDienThoai}</p>
                                      
                                    </div>
                                    <hr style={{ color: "#7AB730", margin: "5px" }}></hr>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-6'>Căn cước công dân: </p>
                                        <p className='col-6'>{prop?.v?.khachHang?.cccd}</p>
                                    </div>
                                    <hr style={{ color: "#7AB730", margin: "5px" }}></hr>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-6'>Email: </p>
                                        <p className='col-6'>{prop?.v?.khachHang?.email}</p>
                                    </div>
                                    <hr style={{ color: "#7AB730", margin: "5px" }}></hr>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-6'>Giới tính: </p>
                                        <p className='col-6'>{prop?.v?.khachHang?.gioiTinh ? "Nam" : "Nữ"}</p>
                                    </div>
                                    <hr style={{ color: "#7AB730", margin: "5px" }}></hr>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-6'>Địa chỉ: </p>
                                        <p className='col-6'>{prop?.v?.khachHang?.diaChi}</p>
                                    </div>
                                    <hr style={{ color: "#7AB730", margin: "5px" }}></hr>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-6'>Năm sinh: </p>
                                        <p className='col-6'>{prop?.v?.khachHang?.namSinh}</p>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                            
                                <div className='row'>
                                    <p className='col-7'>Ngày đặt vé: {prop?.v?.ngayDat} </p>
                                    <p className='col-5'>Giá áp dụng: {prop?.v?.gia} </p>
                                </div>
                                <p>Dịch vụ áp dụng: </p>
                                <div className='row'>
                                    {
                                        prop?.v?.phiDichVu?.map(((data, ll) => {
                                            return <div className='row' style={{ marginLeft: "2%" }}>
                                                <img className='col-4' style={{ width: "120px", height: "100px", borderRadius: "15px" }} src={data?.dichVu?.anh}></img>
                                                <p style={{ textAlign: "center" }} className='col-3'>{data?.dichVu?.ten}</p>
                                                <p style={{ textAlign: "center" }} className='col-3'>Giá áp dụng : {data?.dichVu?.gia}</p>
                                                <div className='col-2'><button onClick={() => {
                                                    api.get(`phidichvu/huy?id=${data.id}`)
                                                        .then(data => {
                                                            if (data.data.status == "OK") {
                                                                alert("Hủy dịch vụ thành công")
                                                                let t = [...dstour]
                                                                t[prop.ind1].thoiGianKhoiHanh2[prop.ind2].ve[prop.ind3].phiDichVu.splice(ll, 1)
                                                                setdstour(t)
                                                            }
                                                            else{
                                                                alert("Hủy dịch vụ thất bại")
                                                            }
                                                        })

                                                }} style={{ backgroundColor: "#0D6EFD", color: "white", borderRadius: "10px", paddingLeft: "20px", paddingRight: "20px", border: "0px" }}>Hủy</button></div>
                                                <hr style={{ marginTop: "2%" }}></hr>
                                            </div>
                                        }))
                                    }
                                </div>
                                {opene ?  <Pick idve={prop?.v?.id} ind1= {prop.ind1} ind2={prop.ind2} ind3={prop.ind3} dsl={prop?.v?.phiDichVu} setopen={setopene}/> :null}
                                <div style={{border:"1px solid #0D6EFD",color:"#0D6EFD", width:"150px",borderRadius:"10px",cursor:"pointer"}}>
                                    <p onClick={()=>{
                                        setopene(true)
                                    }} style={{padding:"10px", width:"auto",cursor:"pointer"}}>+ Thêm dịch vụ</p>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
export default AddTour
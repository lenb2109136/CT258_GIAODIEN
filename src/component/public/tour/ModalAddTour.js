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
const AddTour = () => {


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
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <h2 className="mb-4 text-primary fw-bold text-center">Thêm tour mới  </h2>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Thông tin cơ bảnbản" value="1" />
                                    <Tab label="Mô tả" value="2" />
                                    <Tab label="Thông tin khởi hành" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div className='containercontainer'>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-3'>Tên tour</p>
                                        <input className='col-9' />
                                    </div>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-3'>Số ngày</p>
                                        <input type='number' style={{ borderRadius: 2, outline: "none" }} className='col-9' />
                                    </div>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-3'>Số đêm</p>
                                        <input type='number' style={{ borderRadius: 2, outline: "none" }} className='col-9' />
                                    </div>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-3'>Số lượng người tham gia</p>
                                        <input type='number' style={{ borderRadius: 2, outline: "none" }} className='col-9' />
                                    </div>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-3'>Số lượng filefile</p>
                                        <input type='file' style={{ borderRadius: 2, outline: "none" }} className='col-9' />
                                    </div>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <p className='col-3'>Loại tour</p>
                                        <select onChange={(e) => {

                                        }} style={{ borderRadius: 2, outline: "none" }} className='col-9'>
                                            {loaiTour.map((v, index) => {
                                                return <option value={index}>{v.ten}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value="2">Mô tả</TabPanel>
                            <TabPanel value="3">Thông tin khởi hành</TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
export default AddTour
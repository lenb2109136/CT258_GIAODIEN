import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import axios from 'axios';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuanLyUuDai from "./uudai"
import AddTour from './ModalAddTour';
import UpdateTour from './ModalUpdate';
import api from '../../config/axiosconfig';
const Context=React.createContext()
  export {Context};
export default function Discount() {
  
  const navigate= useNavigate()
  const [dstour, setdstour] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8080/tour/getadmintour")
      .then(data => {
        setdstour(data.data.data)
      })
  },[])
  const [opentgkh,setopentgkh]= useState(false)
  const [thongtin,setthongtin]=useState()
  const [loai, setloai] = useState([])
  const [loaichon, setloaichon] = useState(0);
  useEffect(()=>{
      api.get(`tour/getl?id=${loaichon}`)
      .then(data=>{
        setdstour(data.data.data)
      })
  },[loaichon])
  const [value, setValue] = useState("recents");
  const ind=useRef(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios.get("http://localhost:8080/loaitour/getall")
      .then(data => {
        setloai(data.data.data);
      })
  }, [])
  // Mock discount data
  const initialDiscounts = [
    { id: 1, code: 'DISCOUNT10', amount: 10, type: 'Percentage', status: 'Active', expiry: '2025-12-31' },
    { id: 2, code: 'SAVE20', amount: 20, type: 'Fixed', status: 'Inactive', expiry: '2025-06-30' },
    { id: 3, code: 'SUMMER25', amount: 25, type: 'Percentage', status: 'Active', expiry: '2025-08-15' },
    { id: 4, code: 'WELCOME5', amount: 5, type: 'Fixed', status: 'Expired', expiry: '2024-12-01' },
  ];

  // State for discounts and search term
  const [discounts] = useState(initialDiscounts); // Removed setDiscounts if not used yet
  const [searchTerm, setSearchTerm] = useState('');

  // Filter discounts based on search term
  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Context.Provider value={{dstour,setdstour}}>

    <div className="container mt-5 discount-container">
      <h2 className="mb-4 text-primary fw-bold">Quản lý Tour  <AddTour/></h2>

{opentgkh ? <QuanLyUuDai ind={ind.current} setopen={setopentgkh} ds= {thongtin}></QuanLyUuDai> : null}
      
      {/* Search Bar and Add Button */}
      <div style={{display:"flex"}} className="row mb-4 align-items-center">
        <div style={{display:"flex", alignItems:"center"}} className="col-md-8">
          <div className="input-group">
            <span style={{height:"38px"}} className="input-group-text bg-light">
              <i className="fas fa-search"></i>
            </span>
            <input
            style={{width:"200px"}}
              type="text"
              className="form-control shadow-sm"
              placeholder="Tìm kiếm tour..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
        <div>
          <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            {
              loai?.map(data => {
                return <BottomNavigationAction
                  onClick={() => {
                    setloaichon(data.id)
                  }}
                  label={data.ten}
                  value={data.ten}
                  icon={<img src={data.icon} alt="Recents" style={{ width: 24, height: 24 }} />}
                />

              })
            }
          </BottomNavigation>
        </div>

      </div>
        </div>
        <div className="col-md-4 text-md-end mt-3 mt-md-0">
          <button style={{backgroundColor:"#7AB730",border:"0px"}} onClick={()=>{navigate("haha")}} className="btn btn-primary btn-add shadow-sm">
            <i className="fas fa-plus me-2" ></i> Thêm mã giảm giá
          </button>
          
        </div>
      </div>

      {/* Discounts Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table style={{ width: "100%" }} className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên tour</th>
                <th scope="col">Nhân viên hướng dẫn</th>
                <th scope="col">Thông tin cơ bản</th>
                <th scope="col">Ưu đãi áp dụng</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {dstour?.length > 0 ? (
                dstour.map((data,index) => (
                  <tr key={data.id}>
                    <td>{index+1}</td>
                    <td className="fw-medium">{data.ten}</td>
                    <td>{data.nhanvien.ten}</td>
                    <td>
                    </td>
                    <td><button onClick={()=>{
                        setthongtin(data);
                        ind.current=index

                         setopentgkh(true)}} className="btn btn-outline-warning btn-sm me-2">
                      <i  className="fas fa-edit"></i> Xem chi tiết
                    </button></td>
                    <td>
                      <UpdateTour tours={data}/>
                      <button className="btn btn-outline-danger btn-sm">
                        <i className="fas fa-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    Không tìm thấy mã giảm giá nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Context.Provider>
  );
}
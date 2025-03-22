import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Nav, Tab } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    setActiveTab(location.pathname.includes("signup") ? "register" : "login");
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === "login" ? "/login" : "/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?furniture,modern')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <Container className="relative z-10">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="bg-white/95 p-6 rounded-2xl shadow-lg">
              <Card.Body>
                <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                  <Nav variant="tabs" className="flex justify-center mb-4 border-b">
                    <Nav.Item>
                      <Nav.Link eventKey="login" className={`px-5 py-2 font-semibold transition-all rounded-t-md ${activeTab === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}>
                        Đăng Nhập
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="register" className={`px-5 py-2 font-semibold transition-all rounded-t-md ${activeTab === "register" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}>
                        Đăng Ký
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    {/* Login Form */}
                    <Tab.Pane eventKey="login">
                      <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">Chào Mừng Trở Lại!</h2>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label className="font-medium">Số điện thoại</Form.Label>
                          <Form.Control id="sdt" type="email" placeholder="Nhập số điện thoại của bạn" required className="rounded-lg px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label  className="font-medium">Mật Khẩu</Form.Label>
                          <Form.Control id="pass" type="password" placeholder="Nhập mật khẩu" required className="rounded-lg px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200" />
                        </Form.Group>

                        <div className="flex items-center justify-between mb-3">
                          <Form.Check type="checkbox" label="Ghi nhớ tôi" />
                          <a href="#" className="text-blue-500 text-sm hover:underline">Quên mật khẩu?</a>
                        </div>

                        <Button onClick={()=>{
                          let f= new FormData()
                          f.append("pass",document.getElementById("pass").value);
                          f.append("sdt",document.getElementById("sdt").value);
                          axios.post("http://localhost:8080/autho/login",f)
                            .then((data)=>{
                              if(data.data.status!="OK"){
                                alert(data.data.message)
                              }
                              else{
                                localStorage.setItem("token",data.data.data.token)
                                localStorage.setItem("role",data.data.data.role)
                                localStorage.setItem("ten",data.data.data.ten)
                                localStorage.setItem("sdt",data.data.data.sdt)
                                if(data.data.data.role==="khachhang"){
                                  navigate("/khachhang/home")
                                }
                                else{
                                  navigate("/admin")
                                }
                              }
                            })
                        }} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all">
                          Đăng Nhập
                        </Button>
                      </Form>
                    </Tab.Pane>

                    {/* Register Form */}
                    <Tab.Pane eventKey="register">
                      <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">Tạo Tài Khoản Mới</h2>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label className="font-medium">Họ và Tên</Form.Label>
                          <Form.Control type="text" placeholder="Nhập họ và tên" required className="rounded-lg px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="font-medium">Email</Form.Label>
                          <Form.Control type="email" placeholder="Nhập email của bạn" required className="rounded-lg px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="font-medium">Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Nhập mật khẩu" required className="rounded-lg px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="font-medium">Xác Nhận Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Xác nhận mật khẩu" required className="rounded-lg px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200" />
                        </Form.Group>

                        <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all">
                          Đăng Ký
                        </Button>
                      </Form>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

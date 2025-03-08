import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Nav, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || "login");
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(initialTab || "login");
  }, [initialTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === "login" ? "/login" : "/signup"); // Điều hướng đến /signup cho tab register
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="login-form">
              <Card.Body>
                <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                  <Nav variant="tabs" className="justify-content-center mb-4">
                    <Nav.Item>
                      <Nav.Link eventKey="login">Đăng Nhập</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="register">Đăng Ký</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    {/* Tab Đăng Nhập */}
                    <Tab.Pane eventKey="login">
                      <h2>Chào Mừng Trở Lại!</h2>
                      <Form>
                        <Form.Group className="mb-3" controlId="loginEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Nhập email của bạn" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPassword">
                          <Form.Label>Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Nhập mật khẩu" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginRememberMe">
                          <Form.Check type="checkbox" label="Ghi nhớ tôi" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Đăng Nhập
                        </Button>

                        <div className="text-center mt-3">
                          <a href="#">Quên mật khẩu?</a>
                        </div>
                      </Form>
                    </Tab.Pane>

                    {/* Tab Đăng Ký */}
                    <Tab.Pane eventKey="register">
                      <h2>Tạo Tài Khoản Mới</h2>
                      <Form>
                        <Form.Group className="mb-3" controlId="registerName">
                          <Form.Label>Họ và Tên</Form.Label>
                          <Form.Control type="text" placeholder="Nhập họ và tên" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Nhập email của bạn" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerPassword">
                          <Form.Label>Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Nhập mật khẩu" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerConfirmPassword">
                          <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Xác nhận mật khẩu" required />
                        </Form.Group>

                        <Button variant="secondary" type="submit">
                          Đăng Ký
                        </Button>

                        <div className="text-center mt-3">
                          <span>Đã có tài khoản? </span>
                          <a href="#" onClick={() => handleTabChange("login")}>
                            Đăng nhập ngay
                          </a>
                        </div>
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
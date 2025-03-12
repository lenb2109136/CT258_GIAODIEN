import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Nav, Tab } from "react-bootstrap";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const loginContainerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `url('https://images.unsplash.com/photo-1507521628349-6e9b9b8f8b7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed`,
    backgroundSize: "cover",
    position: "relative",
  };

  const overlayStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
  };

  const loginFormStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    width: "100%",
    maxWidth: "450px",
  };

  const titleStyle = {
    color: "#1a73e8",
    fontWeight: 600,
    textAlign: "center",
    marginBottom: "1.5rem",
  };

  const navLinkStyle = {
    color: "#1a73e8",
    fontWeight: 500,
  };

  const navLinkActiveStyle = {
    color: "#ff6f61",
    borderBottom: "2px solid #ff6f61",
  };

  const formControlStyle = {
    borderRadius: "8px",
    padding: "0.75rem",
  };

  const btnPrimaryStyle = {
    backgroundColor: "#1a73e8",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem",
    fontWeight: 500,
    width: "100%",
  };

  const btnPrimaryHoverStyle = {
    backgroundColor: "#1557b0",
  };

  const btnSecondaryStyle = {
    backgroundColor: "#ff6f61",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem",
    fontWeight: 500,
    width: "100%",
  };

  const btnSecondaryHoverStyle = {
    backgroundColor: "#e65b50",
  };

  const formCheckLabelStyle = {
    color: "#666",
  };

  const linkStyle = {
    color: "#1a73e8",
    textDecoration: "none",
  };

  const linkHoverStyle = {
    textDecoration: "underline",
  };

  return (
    <div style={loginContainerStyle}>
      <div style={overlayStyle}></div> {/* Lớp phủ không hiển thị trực tiếp trong JSX, cần xử lý khác */}
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card style={loginFormStyle}>
              <Card.Body>
                <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                  <Nav variant="tabs" className="justify-content-center mb-4">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="login"
                        style={activeTab === "login" ? navLinkActiveStyle : navLinkStyle}
                      >
                        Đăng Nhập
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="register"
                        style={activeTab === "register" ? navLinkActiveStyle : navLinkStyle}
                      >
                        Đăng Ký
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    {/* Tab Đăng Nhập */}
                    <Tab.Pane eventKey="login">
                      <h2 style={titleStyle}>Chào Mừng Trở Lại!</h2>
                      <Form>
                        <Form.Group className="mb-3" controlId="loginEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Nhập email của bạn"
                            required
                            style={formControlStyle}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPassword">
                          <Form.Label>Mật Khẩu</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            required
                            style={formControlStyle}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginRememberMe">
                          <Form.Check
                            type="checkbox"
                            label="Ghi nhớ tôi"
                            style={{ ...formCheckLabelStyle }}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          style={btnPrimaryStyle}
                          onMouseOver={(e) => (e.target.style.backgroundColor = btnPrimaryHoverStyle.backgroundColor)}
                          onMouseOut={(e) => (e.target.style.backgroundColor = btnPrimaryStyle.backgroundColor)}
                        >
                          Đăng Nhập
                        </Button>

                        <div className="text-center mt-3">
                          <a href="#" style={linkStyle} onMouseOver={(e) => (e.target.style = { ...linkHoverStyle })} onMouseOut={(e) => (e.target.style = { ...linkStyle })}>
                            Quên mật khẩu?
                          </a>
                        </div>
                      </Form>
                    </Tab.Pane>

                    {/* Tab Đăng Ký */}
                    <Tab.Pane eventKey="register">
                      <h2 style={titleStyle}>Tạo Tài Khoản Mới</h2>
                      <Form>
                        <Form.Group className="mb-3" controlId="registerName">
                          <Form.Label>Họ và Tên</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nhập họ và tên"
                            required
                            style={formControlStyle}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Nhập email của bạn"
                            required
                            style={formControlStyle}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerPassword">
                          <Form.Label>Mật Khẩu</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            required
                            style={formControlStyle}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerConfirmPassword">
                          <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            required
                            style={formControlStyle}
                          />
                        </Form.Group>

                        <Button
                          variant="secondary"
                          type="submit"
                          style={btnSecondaryStyle}
                          onMouseOver={(e) => (e.target.style.backgroundColor = btnSecondaryHoverStyle.backgroundColor)}
                          onMouseOut={(e) => (e.target.style.backgroundColor = btnSecondaryStyle.backgroundColor)}
                        >
                          Đăng Ký
                        </Button>

                        <div className="text-center mt-3">
                          <span>Đã có tài khoản? </span>
                          <a
                            href="#"
                            onClick={() => setActiveTab("login")}
                            style={linkStyle}
                            onMouseOver={(e) => (e.target.style = { ...linkHoverStyle })}
                            onMouseOut={(e) => (e.target.style = { ...linkStyle })}
                          >
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
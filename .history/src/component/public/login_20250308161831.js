import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Nav, Tab } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

// Định nghĩa CSS dưới dạng JavaScript object
const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
  },
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `url("https://images.unsplash.com/photo-1507521628349-6e9b9b8f8b7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80") no-repeat center center fixed`,
    backgroundSize: "cover",
    position: "relative",
  },
  overlay: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
  },
  loginForm: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    width: "100%",
    maxWidth: "450px",
  },
  formControl: {
    borderRadius: "8px",
    padding: "0.75rem",
  },
  btnPrimary: {
    backgroundColor: "#1a73e8",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem",
    fontWeight: 500,
    width: "100%",
  },
  btnPrimaryHover: {
    backgroundColor: "#1557b0",
  },
  btnSecondary: {
    backgroundColor: "#ff6f61",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem",
    fontWeight: 500,
    width: "100%",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/register" || path === "/signup") {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === "login" ? "/login" : "/signup");
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.overlay}></div>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card style={styles.loginForm}>
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
                    <Tab.Pane eventKey="login">
                      <h2 style={{ color: "#1a73e8", fontWeight: 600, textAlign: "center", marginBottom: "1.5rem" }}>
                        Chào Mừng Trở Lại!
                      </h2>
                      <Form>
                        <Form.Group className="mb-3" controlId="loginEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Nhập email của bạn" required style={styles.formControl} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPassword">
                          <Form.Label>Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Nhập mật khẩu" required style={styles.formControl} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginRememberMe">
                          <Form.Check type="checkbox" label="Ghi nhớ tôi" />
                        </Form.Group>

                        <Button variant="primary" type="submit" style={styles.btnPrimary}>
                          Đăng Nhập
                        </Button>

                        <div className="text-center mt-3">
                          <a href="#">Quên mật khẩu?</a>
                        </div>
                      </Form>
                    </Tab.Pane>

                    <Tab.Pane eventKey="register">
                      <h2 style={{ color: "#1a73e8", fontWeight: 600, textAlign: "center", marginBottom: "1.5rem" }}>
                        Tạo Tài Khoản Mới
                      </h2>
                      <Form>
                        <Form.Group className="mb-3" controlId="registerName">
                          <Form.Label>Họ và Tên</Form.Label>
                          <Form.Control type="text" placeholder="Nhập họ và tên" required style={styles.formControl} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Nhập email của bạn" required style={styles.formControl} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerPassword">
                          <Form.Label>Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Nhập mật khẩu" required style={styles.formControl} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerConfirmPassword">
                          <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                          <Form.Control type="password" placeholder="Xác nhận mật khẩu" required style={styles.formControl} />
                        </Form.Group>

                        <Button variant="secondary" type="submit" style={styles.btnSecondary}>
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

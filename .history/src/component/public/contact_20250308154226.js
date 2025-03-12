import React, { useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import image from "../../img/contact-us.png";

const Contact = () => {
  useEffect(() => {
    document.title = "Liên hệ với chúng tôi";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <section className="contact pt-5">
        <Container>
          <Row>
            <Col md="12" className="text-center">
              <h1 className="mb-2 h1 font-bold">Hãy Kết Nối Với Chúng Tôi!</h1>
              <p className="body-text mt-1">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ để cùng nhau tạo nên những trải nghiệm tuyệt vời!
              </p>
            </Col>
          </Row>
          <Row className="py-5">
            <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2 position-relative">
                    <div
                      className="rounded-circle bg-light shadow-sm p-3 mb-2"
                      style={{
                        backgroundColor: "#E6F0FA",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "translateY(-50%)",
                        position: "absolute",
                        top: "0",
                      }}
                    >
                      <i className="fas fa-phone h4" style={{ color: "#00A3FF" }}></i>
                    </div>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <Card.Title className="fw-bold h5">Gọi Cho Chúng Tôi</Card.Title>
                    <p className="mb-3 body-text">
                      Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng trả lời mọi thắc mắc của bạn qua điện thoại.
                    </p>
                    <div className="d-block justify-content-center">
                      <p className="mb-1">
                        <strong>+84 88889999</strong>
                      </p>
                    
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2 position-relative">
                    <div
                      className="rounded-circle bg-light shadow-sm p-3 mb-2"
                      style={{
                        backgroundColor: "#FCE4EC",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "translateY(-50%)",
                        position: "absolute",
                        top: "0",
                      }}
                    >
                      <i className="fas fa-envelope h4" style={{ color: "#FF6F61" }}></i>
                    </div>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <Card.Title className="fw-bold h5">Gửi Email Cho Chúng Tôi</Card.Title>
                    <p className="mb-3 body-text">
                      Liên hệ với chúng tôi qua email để nhận được phản hồi nhanh chóng và chi tiết.
                    </p>
                    <div className="d-block justify-content-center">
                      <p className="mb-0">
                        <strong>support@travelvn.com</strong>
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="12" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2 position-relative">
                    <div
                      className="rounded-circle bg-light shadow-sm p-3 mb-2"
                      style={{
                        backgroundColor: "#FFF8E1",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "translateY(-50%)",
                        position: "absolute",
                        top: "0",
                      }}
                    >
                      <i className="fas fa-globe h4" style={{ color: "#FFB300" }}></i>
                    </div>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <Card.Title className="fw-bold h5">Mạng Xã Hội</Card.Title>
                    <p className="mb-3 body-text">
                      Theo dõi chúng tôi trên các nền tảng xã hội để cập nhật tin tức và ưu đãi mới nhất.
                    </p>
                    <div className="d-block justify-content-center">
                      <ListGroup horizontal className="justify-content-center">
                        <ListGroup.Item className="border-0">
                          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube h4" style={{ color: "#FF0000" }}></i>
                          </a>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram h4" style={{ color: "#E1306C" }}></i>
                          </a>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter h4" style={{ color: "#1DA1F2" }}></i>
                          </a>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook h4" style={{ color: "#3B5998" }}></i>
                          </a>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-tiktok h4" style={{ color: "#00F2EA" }}></i>
                          </a>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin h4" style={{ color: "#0077B5" }}></i>
                          </a>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="py-5 align-items-center">
            <Col xl="6" md="6" className="d-none d-md-block">
              <img src={image} alt="Liên hệ" className="img-fluid me-3" />
            </Col>
            <Col xl="6" md="6">
              <Card className="bg-light p-4 border-0 shadow-sm">
                <div className="form-box">
                  <h1 className="h3 font-bold mb-4">Gửi Tin Nhắn Cho Chúng Tôi</h1>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FloatingLabel controlId="name" label="Họ và Tên" className="mb-4">
                          <Form.Control type="text" placeholder="Họ và Tên" />
                        </FloatingLabel>
                      </Col>
                      <Col md="6">
                        <FloatingLabel controlId="email" label="Địa chỉ Email" className="mb-4">
                          <Form.Control type="email" placeholder="ten@example.com" />
                        </FloatingLabel>
                      </Col>

                      <Col md="12">
                        <FloatingLabel controlId="phone" label="Số Điện Thoại" className="mb-4">
                          <Form.Control type="text" placeholder="Số Điện Thoại" />
                        </FloatingLabel>
                      </Col>

                      <Col md="12">
                        <FloatingLabel controlId="message" label="Tin Nhắn">
                          <Form.Control
                            as="textarea"
                            placeholder="Tin Nhắn"
                            style={{ height: "126px" }}
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <button className="primaryBtn mt-3" type="button">
                      Gửi Tin Nhắn
                    </button>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
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
            <Col md="12">
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
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-telephone-fill h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Gọi Cho Chúng Tôi</Card.Title>
                  <p className="mb-3 body-text">
                    Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng trả lời mọi thắc mắc của bạn qua điện thoại.
                  </p>
                  <div className="d-block justify-content-between">
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-phone me-1"></i>
                      +84 123 456 789
                    </a>
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-telephone me-1"></i>
                      +84 987 654 321
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-envelope-fill h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Gửi Email Cho Chúng Tôi</Card.Title>
                  <p className="mb-3 body-text">
                    Liên hệ với chúng tôi qua email để nhận được phản hồi nhanh chóng và chi tiết.
                  </p>
                  <div className="d-block justify-content-between">
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-envelope me-2"></i>
                      support@travelvn.com
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="12" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-globe h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Mạng Xã Hội</Card.Title>
                  <p className="mb-3 body-text">
                    Theo dõi chúng tôi trên các nền tảng xã hội để cập nhật tin tức và ưu đãi mới nhất.
                  </p>
                  <div className="d-block justify-content-center">
                    <ListGroup horizontal className="justify-content-center">
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-youtube"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-instagram"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-twitter"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-facebook"></i>
                      </ListGroup.Item>
                    </ListGroup>
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
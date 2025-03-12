import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import aboutImg from "../../img/aboutimg.png";
import icons1 from "../../img/destination.png";
import icons2 from "../../img/best-price.png";
import icons3 from "../../img/quick.png";

const About = () => {
  useEffect(() => {
    document.title = "Về chúng tôi";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <section className="py-5">
        <Container>
          <Row>
            <Col md="8">
              <div className="about-content">
                <div className="about-image position-relative">
                  <img
                    src={aboutImg}
                    alt="Về chúng tôi"
                    className="img-fluid rounded-5"
                  />
                  <div className="about-image-content position-absolute top-50 end-0 p-md-4 p-3 rounded-5 shadow-sm">
                    <h3 className="h2 fw-bold text-white">
                      TẠI SAO CHÚNG TÔI LÀ LỰA CHỌN HÀNG ĐẦU CHO DU LỊCH!
                    </h3>
                  </div>
                </div>
              </div>
              <h2 className="h2 font-bold pt-4 pb-2">
                TẠI SAO CHÚNG TÔI LÀ LỰA CHỌN HÀNG ĐẦU CHO DU LỊCH!
              </h2>
              <p className="body-text mb-2">
                Chúng tôi tự hào mang đến những trải nghiệm du lịch tuyệt vời, 
                kết hợp giữa sự tiện lợi, chất lượng và giá trị vượt trội. Với 
                đội ngũ chuyên nghiệp và tận tâm, chúng tôi luôn nỗ lực để biến 
                mỗi chuyến đi của bạn thành một hành trình đáng nhớ.
              </p>
              <p className="body-text mb-2">
                Từ những điểm đến tuyệt đẹp trên khắp thế giới đến dịch vụ chăm 
                sóc khách hàng chu đáo, chúng tôi cam kết mang lại sự hài lòng 
                tối đa. Hơn 10 năm kinh nghiệm trong ngành du lịch giúp chúng tôi 
                hiểu rõ nhu cầu của bạn và đáp ứng vượt mong đợi.
              </p>
              <p className="body-text mb-2">
                Hãy để chúng tôi đồng hành cùng bạn trên mọi nẻo đường, khám phá 
                những chân trời mới và tạo nên những kỷ niệm không thể nào quên. 
                Du lịch không chỉ là hành trình, mà còn là cảm xúc – và chúng tôi 
                ở đây để làm cho cảm xúc ấy thêm trọn vẹn!
              </p>
            </Col>
            <Col md="4">
              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons1} alt="icon" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">
                    Hơn 50 Điểm Đến
                  </Card.Title>
                  <p className="mb-2 body-text">
                    Khám phá hơn 50 điểm đến tuyệt vời trên toàn thế giới, từ những 
                    bãi biển trong xanh đến những thành phố sôi động và thiên nhiên kỳ vĩ.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons2} alt="icon" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">
                    Giá Tốt Nhất Thị Trường
                  </Card.Title>
                  <p className="mb-2 body-text">
                    Chúng tôi cam kết mang đến mức giá cạnh tranh nhất, đảm bảo bạn nhận 
                    được giá trị tuyệt vời cho mỗi chuyến đi.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons3} alt="icon" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">
                    Đặt Chỗ Siêu Nhanh
                  </Card.Title>
                  <p className="mb-2 body-text">
                    Quy trình đặt chỗ đơn giản, nhanh chóng, chỉ vài phút là bạn đã sẵn 
                    sàng cho hành trình khám phá của mình!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
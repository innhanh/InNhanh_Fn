import { useEffect } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiClients } from '../apiConfig/axiosClients';
import Banner from '../components/carousels';
import SlideBanner from '../components/slideBanner';
import { ProductionSuccess } from '../redux/dataSlice';
import { DataSelector } from '../redux/selector/data';

const ArrImages = [
  {
    name: "intro1",
    url: "/img/intro/intro1.jpg"
  },
  {
    name: "intro2",
    url: "/img/intro/intro2.jpg"
  },
  {
    name: "intro3",
    url: "/img/intro/intro3.jpg"
  },
  {
    name: "intro4",
    url: "/img/intro/intro4.jpg"
  },
];

export default function Home() {
  const dispath = useDispatch();

  useEffect(() => {
    const GetProductions = async () => {
      await ApiClients.Productions(dispath, ProductionSuccess)
    };
    GetProductions();
  }, []);


  const Productions = useSelector(DataSelector.Productions);
  console.log(Productions)
  return (
    <div id='homePage'>
      <Banner />
      <div id='intro'>
        <Container>
          <Row>
            <Col xs={7}>
              <div className='innhanh_title'>
                <h3 className='mb-3'>Trung Tâm <span>INNHANH79</span></h3>
              </div>
              <div className='intro_main'>
                <p>
                  In nhanh là một lĩnh vực đang rất phát triển tại Việt Nam, đặt biệt là các thành phố lớn, thành phố du lịch, khi sự hội nhập đòi hỏi sự chuyên nghiệp và nhanh chóng chính xác cao cùng với đời sống kinh tế ngày càng đi lên thì quan điểm về quảng cáo, khuyến mãi cũng không ngừng thay đổi.<br />
                  <br />
                  Trong đó, xu hướng chung là mọi Khách Hàng ngày càng khắt khe hơn với những ấn phẩm quảng cáo, những thông điệp mà bất cứ Doanh Nghiệp nào cũng cần phải có, để tiếp cận thị trường, tiếp cận Khách Hàng tiềm năng của mình.
                  <br />
                  <br />
                  Là một Doanh Nghiệp chuyên ngành in ấn giấy, chúng tôi mong muốn được góp một phần công sức của mình vào sự thành công và phát triển của quý vị.
                </p>
              </div>
            </Col>
            <Col xs={5}>
              <SlideBanner
                ArrImages={ArrImages}
              />
            </Col>
          </Row>

        </Container>

      </div>

      <div id='productions'>
        <Container>
          <div className='innhanh_title'>
            <h3 className='mb-3'>Sản phẩm của <span>INNHANH79</span></h3>
          </div>
          <div className='productions_content'>
            <Row>
              {
                Productions?.map((produc, index) => {
                  return (
                    <Col key={index} xs={4}>
                      <Card style={{ width: '25rem' }}>
                        <Card.Img variant="top" src={produc.Image.url} />
                        <Card.Body>
                          <Card.Title>{produc.name}</Card.Title>
                          <ListGroup variant="flush">
                            <ListGroup.Item>Kích Thước: {produc.size}</ListGroup.Item>
                            <ListGroup.Item>Định Lượng: {produc.quantitative}</ListGroup.Item>
                            <ListGroup.Item>Loại Giấy: {produc.typePaper}</ListGroup.Item>
                            <ListGroup.Item>{produc.tag}</ListGroup.Item>
                          </ListGroup>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    </Col>

                  )
                })
              }
            </Row>
          </div>
        </Container>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiAdmin } from '../apiConfig/axiosAdmin';
import { ApiClients } from '../apiConfig/axiosClients';
import Banner from '../components/carousels';
import ListPartner from '../components/partners';
import SlideBanner from '../components/slideBanner';
import ModalProduction from '../modals/production';
import { IntroImageSuccess, PartnerSuccess, ProductionSuccess } from '../redux/dataSlice';
import { AdminSelector } from '../redux/selector/admin';
import { DataSelector } from '../redux/selector/data';

export default function Home() {

  const accessToken = useSelector(AdminSelector.Admin).accessToken;

  const dispath = useDispatch();
  const [edit, setEdit] = useState("");
  const [editProduc, setEditProduc] = useState("");

  const [textEdit, setTextEdit] = useState("");

  //Productions
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [showModalProduc, setShowModalProduc] = useState(false);
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    const GetProductions = async () => {
      await ApiClients.Productions(dispath, ProductionSuccess);
    };
    GetProductions();
  }, []);

  const [producName, setProducName] = useState("");
  const [producSize, setProducSize] = useState("");
  const [producQuantati, setProducQuantati] = useState("");
  const [producTypePaper, setProducTypePaper] = useState("");
  const [producTag, setProducTag] = useState("");

  const handleEditProduction = async (id) => {
    await ApiAdmin.Manager.Productions.Edit(accessToken, id, producName, producSize, producQuantati, producTypePaper, producTag, photo);
    await ApiClients.Productions(dispath, ProductionSuccess);
    setEditProduc("");
  };
  const handleDeleteProduc = async (id) => {
    await ApiAdmin.Manager.Productions.Delete(id, accessToken);
    await ApiClients.Productions(dispath, ProductionSuccess);
  }

  //Texts
  const handleEditText = (id) => {
    alert(id)
    setEdit("");
  };
  const handleDeleteText = (id) => {
    alert(id)
  };

  //Get Intro images
  useEffect(() => {
    const GetImagesIntro = async () => {
      await ApiClients.Images.GetImageByType("Intro", dispath, IntroImageSuccess)
    };
    GetImagesIntro();
  }, []);

  const IntroImages = useSelector(DataSelector.IntroImages);


  //Get Partners
  useEffect(() => {
    const GetPartners = async () => {
      await ApiClients.Partners(dispath, PartnerSuccess);
    };

    GetPartners();
  }, [])

  const Productions = useSelector(DataSelector.Productions);
  const Partners = useSelector(DataSelector.Partners);

  const Categorys = useSelector(DataSelector.Categorys);
  const homePageText = Categorys.filter(cate => cate.name === "Home")[0].Pages[0].Texts;



  return (
    <div id='homePage'>
      <Banner />
      <div id='intro'>
        <Container>
          <Row>
            <Col xs={12} lg={7}>
              <div className='innhanh_title'>
                <h3 className='mb-3'>Trung Tâm <span>INNHANH79</span></h3>
              </div>
              <div className='intro_main'>
                {
                  homePageText?.map((text, index) => {
                    return (
                      accessToken ?
                        <p key={index}>
                          {
                            edit === text.id ?
                              <>
                                <InputGroup>
                                  <InputGroup.Text>{text.name}</InputGroup.Text>
                                  <Form.Control as="textarea" aria-label="With textarea" onChange={(e) => setTextEdit(e.target.value)} value={textEdit} />
                                </InputGroup>
                                <ButtonGroup aria-label="Basic example">
                                  <Button onClick={() => handleEditText(text.id)} variant="primary">Save</Button>
                                  <Button onClick={() => setEdit("")} variant="danger">Cancle</Button>
                                </ButtonGroup>
                              </>
                              :
                              <>
                                {text.text}
                                <ButtonGroup aria-label="Basic example">
                                  <Button onClick={() => {
                                    setEdit(text.id);
                                    setTextEdit(text.text)
                                  }} variant="primary">Edit</Button>
                                  <Button onClick={() => handleDeleteText(text.id)} variant="danger">Delete</Button>
                                </ButtonGroup>
                              </>
                          }
                        </p>

                        :
                        <p key={index}>
                          {text.text}
                        </p>


                    )
                  })
                }
              </div>
            </Col>
            <Col xs={12} lg={5}>
              <SlideBanner
                ArrImages={IntroImages}
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
            {
              accessToken ?
                <Row>
                  {
                    Productions?.map((produc, index) => {
                      return (
                        <Col key={index} xs={12} sm={6} xxl={4}>
                          <Card>
                            {
                              editProduc === produc.id ?
                                <>
                                  <Card.Img variant="top" src={preview} />
                                  <Card.Body>

                                    <Form.Group controlId="formFile" className="mb-3">
                                      <Form.Control type="file" accept="image/png, image/jpeg" onChange={(e) => onImageChange(e)} />
                                    </Form.Group>

                                    <InputGroup className="mb-3">
                                      <InputGroup.Text id="basic-name">Production</InputGroup.Text>
                                      <Form.Control
                                        placeholder="Production Name"
                                        aria-label="name"
                                        aria-describedby="basic-name"
                                        onChange={(e) => setProducName(e.target.value)}
                                        value={producName}
                                      />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                      <InputGroup.Text id="basic-size">Size</InputGroup.Text>
                                      <Form.Control
                                        placeholder="Production size"
                                        aria-label="size"
                                        aria-describedby="basic-size"
                                        onChange={(e) => setProducSize(e.target.value)}
                                        value={producSize}
                                      />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                      <InputGroup.Text id="basic-quantati">Định Lượng</InputGroup.Text>
                                      <Form.Control
                                        placeholder="Production quantati"
                                        aria-label="quantati"
                                        aria-describedby="basic-quantati"
                                        onChange={(e) => setProducQuantati(e.target.value)}
                                        value={producQuantati}
                                      />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                      <InputGroup.Text id="basic-typePaper">Định Lượng</InputGroup.Text>
                                      <Form.Control
                                        placeholder="Production typePaper"
                                        aria-label="typePaper"
                                        aria-describedby="basic-typePaper"
                                        onChange={(e) => setProducTypePaper(e.target.value)}
                                        value={producTypePaper}
                                      />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                      <InputGroup.Text id="basic-tag">Định Lượng</InputGroup.Text>
                                      <Form.Control
                                        placeholder="Production tag"
                                        aria-label="tag"
                                        aria-describedby="basic-tag"
                                        onChange={(e) => setProducTag(e.target.value)}
                                        value={producTag}
                                      />
                                    </InputGroup>

                                    <ButtonGroup aria-label="Basic example">
                                      <Button onClick={() => handleEditProduction(produc.id)} variant="primary">Save</Button>
                                      <Button onClick={() => setEditProduc("")} variant="danger">Cancle</Button>
                                    </ButtonGroup>
                                  </Card.Body>

                                </>

                                :
                                <>
                                  <Card.Img variant="top" src={produc.Image.url} />
                                  <Card.Body>
                                    <Card.Title>{produc.name}</Card.Title>
                                    <ListGroup variant="flush">
                                      <ListGroup.Item>Kích Thước: {produc.size}</ListGroup.Item>
                                      <ListGroup.Item>Định Lượng: {produc.quantitative}</ListGroup.Item>
                                      <ListGroup.Item>Loại Giấy: {produc.typePaper}</ListGroup.Item>
                                      <ListGroup.Item>{produc.tag}</ListGroup.Item>
                                    </ListGroup>
                                    <ButtonGroup aria-label="Basic example">
                                      <Button variant="primary">Xem thêm</Button>
                                      <Button onClick={() => {
                                        setEditProduc(produc.id);
                                        setPreview(produc.Image.url);
                                        setProducName(produc.name);
                                        setProducSize(produc.size);
                                        setProducQuantati(produc.quantitative);
                                        setProducTypePaper(produc.typePaper);
                                        setProducTag(produc.tag);
                                      }
                                      } variant="primary">Edit</Button>
                                      <Button onClick={() => handleDeleteProduc(produc.id)} variant="danger">Delete</Button>
                                    </ButtonGroup>
                                  </Card.Body>
                                </>
                            }
                          </Card>
                        </Col>

                      )
                    })
                  }
                  <Button onClick={() => setShowModalProduc(true)}>Thêm mới</Button>
                  <ModalProduction
                    show={showModalProduc}
                    setShow={setShowModalProduc}
                  />
                </Row>
                :
                <Row>
                  {
                    Productions?.map((produc, index) => {
                      return (
                        <Col key={index} xs={12} sm={6} xxl={4}>
                          <Card>
                            <Card.Img variant="top" src={produc.Image.url} />
                            <Card.Body>
                              <Card.Title>{produc.name}</Card.Title>
                              <ListGroup variant="flush">
                                <ListGroup.Item>Kích Thước: {produc.size}</ListGroup.Item>
                                <ListGroup.Item>Định Lượng: {produc.quantitative}</ListGroup.Item>
                                <ListGroup.Item>Loại Giấy: {produc.typePaper}</ListGroup.Item>
                                <ListGroup.Item>{produc.tag}</ListGroup.Item>
                              </ListGroup>
                              <ButtonGroup aria-label="Basic example">
                                <Button variant="primary">Xem thêm</Button>
                              </ButtonGroup>
                            </Card.Body>
                          </Card>
                        </Col>

                      )
                    })
                  }
                </Row>
            }

          </div>
        </Container>
      </div>
      <div id='partners'>
        <Container>
          <div className='innhanh_title'>
            <h3 className='mb-3'>Đối tác <span>INNHANH79</span></h3>
          </div>
          <ListPartner
            ArrImages={Partners}
          />
        </Container>
      </div>
    </div>
  )
}

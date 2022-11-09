import React, { useEffect, useState } from 'react';
import { ApiClients } from '../apiConfig/axiosClients';
import { Button, ButtonGroup, Card, Carousel, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import BannerHome from './carouselHome';
import { useDispatch, useSelector } from 'react-redux';
import { CarouselSuccess } from '../redux/dataSlice';
import { DataSelector } from '../redux/selector/data';
import { AdminSelector } from '../redux/selector/admin';
import { ApiAdmin } from '../apiConfig/axiosAdmin';
import ModalImages from '../modals/images';


function Banner(props) {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState("");
    const [newName, setNewName] = useState("");

    const [photo, setPhoto] = useState("");
    const [preview, setPreview] = useState("");
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const dispath = useDispatch();
    const accessToken = useSelector(AdminSelector.Admin).accessToken;

    useEffect(() => {
        const GetCarousels = async () => {
            await ApiClients.Images.GetImageByType("carousel", dispath, CarouselSuccess);
        };
        GetCarousels();
    }, []);

    const carousels = useSelector(DataSelector.Carousels);

    const handleEditBanner = async (id) => {
        await ApiAdmin.Manager.Carousels.Edit(accessToken, id, newName);
        await ApiClients.Images.GetImageByType("carousel", dispath, CarouselSuccess);
        setEdit("");
    };

    const handleDeleteBanner = async (id) => {
        await ApiAdmin.Manager.Carousels.Delete(accessToken, id);
        await ApiClients.Images.GetImageByType("carousel", dispath, CarouselSuccess);
    };

    const handleShow = () => setShow(true);

    return (
        <div id='myCarousel'>
            <Container>
                {
                    accessToken ?
                        <Row>
                            {
                                carousels.map((carousel, index) => {
                                    return (
                                        <Col key={index} xs={4}>
                                            <Card>
                                                <Card.Img variant="top" src={carousel.url} />
                                                <Card.Body>
                                                    {
                                                        edit === carousel.id ?
                                                            <>
                                                                <Form.Group controlId="formFile" className="mb-3">
                                                                    <Form.Control type="file" />
                                                                </Form.Group>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Text id="basic-newname">@</InputGroup.Text>
                                                                    <Form.Control
                                                                        placeholder="New name"
                                                                        aria-label="newName"
                                                                        aria-describedby="basic-newname"
                                                                        onChange={(e) => setNewName(e.target.value)}
                                                                        value={newName}
                                                                    />
                                                                </InputGroup>
                                                                <ButtonGroup aria-label="Basic example">
                                                                    <Button onClick={() => handleEditBanner(carousel.id)} variant="primary">Save</Button>
                                                                    <Button onClick={() => setEdit("")} variant="danger">Cancle</Button>
                                                                </ButtonGroup>
                                                            </>

                                                            :
                                                            <>
                                                                <p>Name: {carousel.name}</p>
                                                                <p>Type: {carousel.type}</p>
                                                                <p>FileName: {carousel.fileName}</p>
                                                                <p>Path: {carousel.url}</p>
                                                                <ButtonGroup aria-label="Basic example">
                                                                    <Button onClick={() => {
                                                                        setEdit(carousel.id);
                                                                        setNewName(carousel.name)
                                                                    }} variant="primary">Edit</Button>
                                                                    <Button onClick={() => handleDeleteBanner(carousel.id)} variant="danger">Delete</Button>
                                                                </ButtonGroup>
                                                            </>
                                                    }

                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                            <Col xs={12}>
                                <Button variant="primary" onClick={handleShow}>
                                    Thêm mới
                                </Button>
                            </Col>
                            <ModalImages
                                show={show}
                                setShow={setShow}
                                type={"carousel"}
                                title={"Thêm Mới"}
                            />
                        </Row>
                        :
                        <Carousel>
                            <Carousel.Item className='item1'>
                                <BannerHome />
                                <div className='item_1_text'>
                                    <h1 className='text_inBanVe'>In <span>BẢN VẼ</span></h1>
                                    <h1 className='text_innhanh'>In <span>NHANH <span>{"&"}</span></span></h1>
                                    <h1 className='text_inQuangCao'>In <span>QUẢNG CÁO</span></h1>
                                    <button className='btn btn_more'>Xem Thêm</button>
                                </div>
                            </Carousel.Item>
                            {
                                carousels.map((carousel, index) => {
                                    return (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={carousel.url}
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                    )
                                })
                            }

                        </Carousel>
                }

            </Container>
        </div>
    );
}

export default Banner;
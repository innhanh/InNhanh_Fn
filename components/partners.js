import React, { useState } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { AdminSelector } from '../redux/selector/admin';
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { ApiAdmin } from '../apiConfig/axiosAdmin';
import { ApiClients } from '../apiConfig/axiosClients';
import { PartnerSuccess } from '../redux/dataSlice';
import ModalPartners from '../modals/partners';

function ListPartner({ ArrImages }) {
    const accessToken = useSelector(AdminSelector.Admin).accessToken;
    const dispath = useDispatch();

    const [edit, setEdit] = useState("");
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [preview, setPreview] = useState("");
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleEdit = async (id) => {
        await ApiAdmin.Manager.Partners.Edit(id, accessToken, name, photo);
        await ApiClients.Partners(dispath, PartnerSuccess);
        setEdit("");
        setPhoto("");
    };

    const handleDelete = async (id) => {
        await ApiAdmin.Manager.Partners.Delete(id, accessToken);
        await ApiClients.Partners(dispath, PartnerSuccess);
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <div id='listPartner'>
            {
                accessToken ?
                    <Row>
                        {
                            ArrImages.map((partner, index) => {
                                return (
                                    <Col key={index} xs={2}>
                                        <Card>
                                            {
                                                edit === partner.id ?
                                                    <>
                                                        <Card.Img variant="top" src={preview} />
                                                        <Form.Group controlId="formFile" className="mb-3">
                                                            <Form.Control type="file" onChange={(e) => onImageChange(e)} />
                                                        </Form.Group>
                                                        <Card.Body>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-name">Partner</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Name"
                                                                    aria-label="name"
                                                                    aria-describedby="basic-name"
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    value={name}
                                                                />
                                                            </InputGroup>
                                                            <ButtonGroup aria-label="Basic example">
                                                                <Button onClick={() => handleEdit(partner.id)} variant="primary">Save</Button>
                                                                <Button onClick={() => {
                                                                    setEdit("");
                                                                    setPreview("");
                                                                    setPhoto("");
                                                                    setName("");
                                                                }
                                                                } variant="danger">Cancle</Button>
                                                            </ButtonGroup>
                                                        </Card.Body>
                                                    </>
                                                    :
                                                    <>
                                                        <Card.Img variant="top" src={partner.Image.url} />
                                                        <Card.Body>
                                                            <Card.Title>{partner.name}</Card.Title>
                                                            <ButtonGroup aria-label="Basic example">
                                                                <Button onClick={() => {
                                                                    setEdit(partner.id);
                                                                    setPreview(partner.Image.url);
                                                                    setName(partner.name)
                                                                }
                                                                } variant="primary">Edit</Button>
                                                                <Button onClick={() => handleDelete(partner.id)} variant="danger">Delete</Button>
                                                            </ButtonGroup>
                                                        </Card.Body>
                                                    </>
                                            }
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        <Button onClick={()=>setShow(true)}>Thêm Mới</Button>
                        <ModalPartners
                            setShow={setShow}
                            show={show}
                        />
                    </Row>
                    :
                    <Slider {...settings}>
                        {
                            ArrImages.map((partner, index) => {
                                return (
                                    <div key={index} className='partner_item'>
                                        <img src={partner.Image.url} alt={partner.name} />
                                    </div>
                                )
                            })
                        }
                    </Slider>
            }

        </div>
    );
}

export default ListPartner;
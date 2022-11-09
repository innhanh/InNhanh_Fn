import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ModalImages from '../modals/images';
import { AdminSelector } from '../redux/selector/admin';


function SlideBanner({ ArrImages }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [view, setView] = useState(ArrImages[0]);
    const accessToken = useSelector(AdminSelector.Admin).accessToken;

    const handleDelete = async (id) => {
        alert(id)
    }

    return (
        <div id='slideBanner'>
            {
                accessToken ?
                    <Row>
                        {
                            ArrImages.map((intro, index) => {
                                return (
                                    <Col key={index} xs={6}>
                                        <Card>
                                            <Card.Img variant="top" src={intro.url} />
                                            <Card.Body>
                                                <p>Name: {intro.name}</p>
                                                <p>Type: {intro.type}</p>
                                                <Button onClick={() => handleDelete(intro.id)} variant="danger">Delete</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        <Button onClick={() => handleShow(true)} variant="primary">Add</Button>
                        <ModalImages
                            show={show}
                            setShow={setShow}
                            type={"Intro"}
                            title={"Thêm Mới"}
                        />
                    </Row>
                    :
                    <>
                        <div className='showImg'>
                            <img src={view.url} alt={view.name} className='w-100 img-fluid' />
                        </div>
                        <div className='slide_content d-flex'>
                            {
                                ArrImages.map((img, index) => {
                                    return (
                                        <div key={index} className='slide_item'>
                                            <img onClick={() => setView(img)} src={img.url} alt={img.name} className='w-100 img-fluid' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
            }
        </div>
    );
}

export default SlideBanner;
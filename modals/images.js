import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ApiAdmin } from '../apiConfig/axiosAdmin';
import { ApiClients } from '../apiConfig/axiosClients';
import { CarouselSuccess } from '../redux/dataSlice';
import { AdminSelector } from '../redux/selector/admin';

function ModalImages({ show, setShow, type, title }) {
    const handleClose = () => setShow(false);
    const [name, setName] = useState("");
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

    const handleAddCarrousel = async () => {
        if (photo !== "") {
            await ApiAdmin.Manager.Carousels.Add(name, photo, accessToken);
            await ApiClients.Images.GetImageByType("carousel", dispath, CarouselSuccess);
            setPhoto("");
            setPreview("");
            setName("");
        } else {
            toast.error("Please choose image!");
        }

    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='img_preview'>
                    {
                        preview !== "" && <img src={preview} alt='preview' className='w-100 img-fluid' />
                    }

                </div>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={(e) => onImageChange(e)} />
                </Form.Group>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-name">Banner</InputGroup.Text>
                    <Form.Control
                        placeholder="Name"
                        aria-label="name"
                        aria-describedby="basic-name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-type">Type</InputGroup.Text>
                    <Form.Control
                        placeholder="Type"
                        aria-label="Type"
                        aria-describedby="basic-type"
                        value={type}
                        disabled
                    />
                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    handleClose();
                    setPreview("");
                    setPhoto("");
                }}>
                    Cancle
                </Button>
                <Button disabled={photo === ""} variant="primary" onClick={() => {
                    handleAddCarrousel();
                    handleClose();
                }}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalImages;
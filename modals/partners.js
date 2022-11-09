import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ApiAdmin } from '../apiConfig/axiosAdmin';
import { ApiClients } from '../apiConfig/axiosClients';
import { PartnerSuccess } from '../redux/dataSlice';
import { AdminSelector } from '../redux/selector/admin';


function ModalPartners({ show, setShow }) {
    const dispath = useDispatch();
    const accessToken = useSelector(AdminSelector.Admin).accessToken;
    const handleClose = () => setShow(false);
    const [photo, setPhoto] = useState("");
    const [preview, setPreview] = useState("");
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const [name, setName] = useState("");

    const handleAddPartner = async () => {
        if (photo !== "" || name !== "") {
            await ApiAdmin.Manager.Partners.Add(accessToken, name, photo);
            await ApiClients.Partners(dispath, PartnerSuccess);
            setName("");
            setPhoto("");
            setPreview("");
        } else {
            toast.error("Please choose image!")
        }

    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới Khách Hàng</Modal.Title>
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
                    <InputGroup.Text id="basic-name">Partner</InputGroup.Text>
                    <Form.Control
                        placeholder="Name"
                        aria-label="name"
                        aria-describedby="basic-name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    handleClose();
                    setPreview("");
                    setName("");
                    setPhoto("");
                }}>
                    Cancle
                </Button>
                <Button
                    variant="primary"
                    disabled={photo !== ""}
                    onClick={() => {
                        handleAddPartner();
                        handleClose();
                    }}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPartners;
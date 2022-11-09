import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ApiAdmin } from '../apiConfig/axiosAdmin';
import { ApiClients } from '../apiConfig/axiosClients';
import { ProductionSuccess } from '../redux/dataSlice';
import { AdminSelector } from '../redux/selector/admin';


function ModalProduction({ show, setShow }) {
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
    const [size, setSize] = useState("");
    const [quantitative, setQuantitative] = useState("");
    const [typePaper, setTypePaper] = useState("");
    const [tag, setTag] = useState("");

    const handleAddProduction = async () => {
        if (photo !== "") {
            await ApiAdmin.Manager.Productions.Add(accessToken, name, size, quantitative, typePaper, tag, photo);
            await ApiClients.Productions(dispath, ProductionSuccess);
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
                <Modal.Title>Thêm mới Sản Phẩm</Modal.Title>
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
                    <InputGroup.Text id="basic-name">Production</InputGroup.Text>
                    <Form.Control
                        placeholder="Name"
                        aria-label="name"
                        aria-describedby="basic-name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-size">Size</InputGroup.Text>
                    <Form.Control
                        placeholder="Size"
                        aria-label="size"
                        aria-describedby="basic-size"
                        onChange={(e) => setSize(e.target.value)}
                        value={size}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-quantitative">Định lượng</InputGroup.Text>
                    <Form.Control
                        placeholder="Định lượng"
                        aria-label="quantitative"
                        aria-describedby="basic-quantitative"
                        onChange={(e) => setQuantitative(e.target.value)}
                        value={quantitative}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-typePaper">Loại giấy</InputGroup.Text>
                    <Form.Control
                        placeholder="Loại giấy"
                        aria-label="typePaper"
                        aria-describedby="basic-typePaper"
                        onChange={(e) => setTypePaper(e.target.value)}
                        value={typePaper}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-tag">Tag</InputGroup.Text>
                    <Form.Control
                        placeholder="Tag"
                        aria-label="tag"
                        aria-describedby="basic-tag"
                        onChange={(e) => setTag(e.target.value)}
                        value={tag}
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
                disabled = {photo === ""}
                onClick={() => {
                    handleAddProduction();
                    handleClose();
                }}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalProduction;
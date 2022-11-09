import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ApiAdmin } from '../../../apiConfig/axiosAdmin';
import { EditAdminSuccess } from '../../../redux/adminSlice';
import { AdminSelector } from '../../../redux/selector/admin';

function Profile(props) {
    const dispath = useDispatch();

    const Admin = useSelector(AdminSelector.Admin).Admin;
    const accessToken = useSelector(AdminSelector.Admin).accessToken;

    const [userName, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [photo, setPhoto] = useState("");
    const [preview, setPreview] = useState("");
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const [edit, setEdit] = useState(false);

    const handleSetEdit = () => {
        setEdit(true);
        setUsername(Admin?.userName);
        setDisplayName(Admin?.displayName);
        setPhone(Admin?.phone);
        setEmail(Admin?.email);
        setPreview(Admin?.Image.url);
    };
    const handleCancleEdit = () => {
        setEdit(false);
        setUsername("");
        setDisplayName("");
        setPhone("");
        setEmail("");
        setPreview("");
        setPhoto("");
    };

    const handleEditAdmin = async () => {

        await ApiAdmin.Authen.Edit(Admin.id, accessToken, userName, displayName, phone, email, phone, dispath, EditAdminSuccess);
        setEdit(false);
        setPhoto("");

    };

    return (
        <div id='profile'>
            {
                edit ?
                    <Card >
                        {
                            preview !== "" && <Card.Img variant="top" src={preview} alt={Admin?.userName} />
                        }
                        <Card.Body>
                            <Card.Title>{Admin.displayName}</Card.Title>
                            <Card.Text>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" onChange={(e) => onImageChange(e)} />
                                </Form.Group>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-userName"><i className="fa fa-user"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-userName"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={userName}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-displayName"><i className="fa fa-user"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="DisplayName"
                                        aria-label="DisplayName"
                                        aria-describedby="basic-displayName"
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        value={displayName}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-phone"><i className="fa fa-mobile-alt"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Your Phone"
                                        aria-label="Your Phone"
                                        aria-describedby="basic-phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-email"><i className="fa fa-envelope"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Your Email"
                                        aria-label="Email"
                                        aria-describedby="basic-email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </InputGroup>
                            </Card.Text>
                            <ButtonGroup aria-label="Basic example">
                                <Button onClick={() => handleEditAdmin()} variant="secondary">Save</Button>
                                <Button onClick={() => handleCancleEdit()} variant="secondary">Cancle</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                    :
                    <Card >
                        <Card.Img variant="top" src={Admin?.Image.url} alt={Admin?.userName} />
                        <Card.Body>
                            <Card.Title>{Admin?.displayName}</Card.Title>
                            <Card.Text>
                                <p>UserName: {Admin?.userName}</p>
                                <p>Displayname: {Admin?.displayName}</p>
                                <p>Phone: {Admin?.phone}</p>
                                <p>Email: {Admin?.email}</p>
                                <p>Type: {Admin?.type}</p>
                            </Card.Text>
                            <Button onClick={() => handleSetEdit()} variant="primary">Edit</Button>
                        </Card.Body>
                    </Card>
            }



        </div>
    );
}

export default Profile;
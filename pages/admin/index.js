import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ApiAdmin } from '../../apiConfig/axiosAdmin';
import { LoginSuccess } from '../../redux/adminSlice';

function AdminLogin(props) {
    const [showPass, setShowPass] = useState("");

    const dispath = useDispatch();
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [key, setKey] = useState("");

    const handleAdminLogin = async () => {
        await ApiAdmin.Authen.Login(userName, pass, key, dispath, LoginSuccess, router)
    };

    return (
        <div id=' adminLogin'>
            <Container>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-userName"><i className="fa fa-user"></i></InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-userName"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-pass"><i className="fa fa-user-lock"></i></InputGroup.Text>
                    <Form.Control
                        type={showPass === "pass" ? "text" : "password"}
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-pass"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        id="pass"
                    />
                    {
                        showPass === "pass" ?
                            <Button
                                onClick={() => setShowPass("")}
                                variant="outline-secondary"
                                id="button-addon2">
                                Hide
                            </Button>
                            :
                            <Button
                                onClick={() => setShowPass("pass")}
                                variant="outline-secondary"
                                id="button-addon2">
                                Show
                            </Button>
                    }

                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-key"><i className="fa fa-key"></i></InputGroup.Text>
                    <Form.Control
                        type={showPass === "key" ? "text" : "password"}
                        placeholder="Admin Key"
                        aria-label="Key"
                        aria-describedby="basic-key"
                        onChange={(e) => setKey(e.target.value)}
                        value={key}
                        id="key"
                    />
                    {
                        showPass === "key" ?
                            <Button
                                onClick={() => setShowPass("")}
                                variant="outline-secondary"
                                id="button-addon2">
                                Hide
                            </Button>
                            :
                            <Button
                                onClick={() => setShowPass("key")}
                                variant="outline-secondary"
                                id="button-addon2">
                                Show
                            </Button>
                    }
                </InputGroup>

                <ButtonGroup aria-label="Basic example">
                    <Button onClick={() => handleAdminLogin()} variant="primary">Login</Button>
                    <Button variant="primary">
                        <Link href={"/admin/register"}>Register now</Link>
                    </Button>
                </ButtonGroup>

            </Container>
        </div>
    );
}

export default AdminLogin;
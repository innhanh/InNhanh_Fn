import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ApiAdmin } from '../../apiConfig/axiosAdmin';
import { LoginSuccess } from '../../redux/adminSlice';

function AdminLogin(props) {
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
                    <InputGroup.Text id="basic-userName">@</InputGroup.Text>
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
                    <InputGroup.Text id="basic-pass">@</InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-pass"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-key">@</InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="Admin Key"
                        aria-label="Key"
                        aria-describedby="basic-key"
                        onChange={(e) => setKey(e.target.value)}
                        value={key}
                    />
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
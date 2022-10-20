import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ApiClients } from '../apiConfig/axiosClients';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

function Hearder(props) {
    const [categorys, setCate] = useState([]);
    useEffect(() => {
        const GetHearder = async () => {
            await ApiClients.Categorys(setCate);
        };
        GetHearder();
    }, []);
    return (
        <div id='hearder'>
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="In Nhanh" id="basic-nav-dropdown">
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/innhanh/tuigiay">In Túi Giấy</NavDropdown.Item>
                                <NavDropdown.Item href="/innhanh/namecard">In Name Card</NavDropdown.Item>
                                <NavDropdown.Item href="/innhanh/brochure">In Brochure</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>

                            <NavDropdown title="In Quảng Cáo" id="basic-nav-dropdown">
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/inquangcao/pp">In PP</NavDropdown.Item>
                                <NavDropdown.Item href="/inquangcao/decal">In Decal</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>

                            <Nav.Item>
                                <Nav.Link href='/inbanve'>In Bản vẽ</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href='/thietke'>Dịch Vụ Thiết Kế</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href='/setupevents'>Setup Events</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}

export default Hearder;
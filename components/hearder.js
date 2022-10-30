import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ApiClients } from '../apiConfig/axiosClients';
import { Container, Navbar, Nav, NavDropdown, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AdminSelector } from '../redux/selector/admin';
import { LogoutSuccess } from '../redux/adminSlice';
import { toast } from 'react-toastify';
import { PagesSuccess } from '../redux/dataSlice';
import { DataSelector } from '../redux/selector/data';

function Hearder(props) {
    const [system, setSystem] = useState([]);
    const [scrollY, setScrollY] = useState();
    const admin = useSelector(AdminSelector.Admin);

    const dispath = useDispatch();

    useEffect(() => {
        const GetHearder = async () => {
            await ApiClients.Categorys(dispath, PagesSuccess);
        };
        GetHearder();
    }, []);

    useEffect(() => {
        const GetPagesSystem = async () => {
            await ApiClients.GetPagesByCate(1, setSystem)
        };
        GetPagesSystem();
    }, []);

    const handleLogout = async () => {
        toast.success("Logout successfully!")
        dispath(LogoutSuccess());
    };

    const Pages = useSelector(DataSelector.Pages);
    const PageSystem = Pages[0];
    const PagesNavs = Pages?.filter(page => page.id !== 1);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ScrollBar = () => {
            const hearderTop = window.document.getElementById("hearder_top");
            const hearderMain = window.document.getElementById("hearder_main");
            const btnScroll = window.document.getElementById("btn_scroll");

            if (scrollY > 173) {
                hearderTop.classList.add("hide");
                hearderMain.classList.add("scroll-to-top");
                // btnScroll.classList.add("btnShow");
            } else {
                hearderTop.classList.remove("hide");
                hearderMain.classList.remove("scroll-to-top");
                // btnScroll.classList.remove("btnShow");
            }
        };

        ScrollBar();
    }, [scrollY]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div id='hearder'>
            <Navbar className='nav_top' id='hearder_top'>
                <Container>
                    <Nav className="me-auto">
                        {
                            PageSystem?.Pages?.map((page, index) => {
                                return (
                                    <Nav.Item key={index}>
                                        <Nav.Link href={page.href}>
                                            <i className="fa fa-angle-right"></i>
                                            {page.name}
                                        </Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                    </Nav>
                </Container>

            </Navbar>

            <Navbar className='nav_main' bg="light" expand="lg" id='hearder_main'>
                <Container>
                    <Navbar.Brand className='logo' href="/">
                        <img src={"/logo/logo.png"} alt='logo' className='w-100 img-fluid' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="">
                            {
                                PagesNavs.map((page, index) => {
                                    return (
                                        page.Pages.length > 1 ?
                                            <NavDropdown key={index} title={page.name} id="basic-nav-dropdown">
                                                {
                                                    page.Pages.map((menu, i) => {
                                                        return (
                                                            <NavDropdown.Item href={`/${page.href}/${menu.href}`}>{menu.name}</NavDropdown.Item>
                                                        )
                                                    })
                                                }

                                            </NavDropdown>

                                            :

                                            <Nav.Item key={index}>
                                                <Nav.Link href={page.Pages[0].href}>{page.name}</Nav.Link>
                                            </Nav.Item>

                                    )

                                })
                            }

                            {/* <NavDropdown title="In Nhanh" id="basic-nav-dropdown">

                                <NavDropdown.Item href="/innhanh/tuigiay">In Túi Giấy</NavDropdown.Item>
                                <NavDropdown.Item href="/innhanh/namecard">In Name Card</NavDropdown.Item>
                                <NavDropdown.Item href="/innhanh/brochure">In Brochure</NavDropdown.Item>

                            </NavDropdown>

                           

                            <Nav.Item>
                                <Nav.Link href='/inbanve'>In Bản vẽ</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href='/thietke'>Dịch Vụ Thiết Kế</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href='/setupevents'>Setup Events</Nav.Link>
                            </Nav.Item> */}

                        </Nav>

                        {
                            admin.userName &&
                            <Nav className="ms-auto">
                                <Nav.Item>
                                    <ButtonGroup>
                                        <Button disabled>
                                            <span className='admin_avatar'>
                                                <img src={admin.avatar} alt={`${admin.userName}_avatar`} />
                                            </span>
                                            {admin.userName}
                                        </Button>
                                        <Button onClick={() => handleLogout()}>Logout</Button>
                                    </ButtonGroup>
                                </Nav.Item>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>
    );
}

export default Hearder;
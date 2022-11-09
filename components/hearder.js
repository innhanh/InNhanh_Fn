import React, { useEffect, useState } from 'react';
import { ApiClients } from '../apiConfig/axiosClients';
import { Container, Navbar, Nav, NavDropdown, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AdminSelector } from '../redux/selector/admin';
import { LogoutSuccess } from '../redux/adminSlice';
import { toast } from 'react-toastify';
import { CategorySuccess, PagesSuccess } from '../redux/dataSlice';
import { DataSelector } from '../redux/selector/data';
import { useRouter } from 'next/router';

function Hearder(props) {
    const Company = useSelector(DataSelector.Company);
    const [scrollY, setScrollY] = useState();
    const Admin = useSelector(AdminSelector.Admin).Admin;
    const accessToken = useSelector(AdminSelector.Admin).accessToken;

    const dispath = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const GetAllCategorys = async () => {
            await ApiClients.Categorys(dispath, CategorySuccess);
        };
        GetAllCategorys();
    }, []);

    const handleLogout = async () => {
        toast.success("Logout successfully!")
        dispath(LogoutSuccess());
        router.replace("/");
    };

    const Categorys = useSelector(DataSelector.Categorys);

    const PageSystem = Categorys?.filter(page => page.name === "PageSystem")[0];

    const PagesNavs = Categorys?.filter(page => page.name !== "PageSystem");
    console.log(PagesNavs)

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
                        <img src={Company.Image.url} alt={Company.Image.name} className='w-100 img-fluid' />
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

                        </Nav>

                        {
                            accessToken &&
                            <Nav className="ms-auto">
                                <Nav.Item>
                                    <ButtonGroup className='admin'>
                                        <Button disabled className='d-flex'>
                                            <span className='admin_avatar'>
                                                <img src={Admin?.Image.url} alt={`${Admin?.userName}_avatar`} />
                                            </span>
                                            {Admin?.userName}
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
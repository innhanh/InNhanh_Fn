import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiClients } from '../apiConfig/axiosClients';
import { BranchsSccess, CompanySuccess } from '../redux/dataSlice';
import { DataSelector } from '../redux/selector/data';

function Footer(props) {
    const dispath = useDispatch();
    useEffect(() => {
        const GetCompany = async () => {
            await ApiClients.Company(dispath, CompanySuccess)
        };
        GetCompany();
    }, []);

    const company = useSelector(DataSelector.Company);

    return (
        <div id='footer'>
            <Container>
                <Row>
                    <Col xs={12} sm={6} lg={6} xl={3}>
                        <div className='footer_company'>
                            <div className='footer_item'>
                                <img src={company?.Image.url} alt='logo' className='w-100 img-fluid' />
                                <p>{company?.website}</p>
                                <p>{company?.TimeWork.week}</p>
                                <p>Sáng: {company?.TimeWork.morning}</p>
                                <p>Chiều: {company?.TimeWork.afternoon}</p>
                            </div>
                        </div>
                    </Col>

                    {
                        company.Branchs?.map((branch, index) => {
                            return (
                                <Col key={index} xs={12} md={6} xl={3}>
                                    <div className='footer_item'>
                                        <div className='footer_hearder'>
                                            <h2>{branch.name}</h2>
                                        </div>
                                        <div className='footer_main'>
                                            <div className='branch_itro'>
                                                <p>
                                                    <i className="fa fa-map-marker-alt"></i>
                                                    {branch.adress}
                                                </p>
                                            </div>
                                            <div className='branch_itro'>
                                                <p>
                                                    <i className="fa fa-phone-volume"></i>
                                                    {branch.phone}
                                                </p>

                                            </div>
                                            <div className='branch_itro'>
                                                <p>
                                                    <i className="fa fa-envelope"></i>
                                                    {branch.email}
                                                </p>
                                            </div>
                                            <div className='branch_itro'>
                                                <p>
                                                    <i className="fa fa-mobile-alt"></i>
                                                    {branch.zalo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }

                    <Col xs={12} md={6} xl={3}>
                        <div className='footer_item'>
                            <div className='footer_hearder'>
                                <h2>Phản Hồi</h2>
                            </div>
                            <div>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="name@example.com" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Example textarea</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
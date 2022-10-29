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
            await ApiClients.Company(dispath, CompanySuccess, BranchsSccess)
        };
        GetCompany();
    }, []);

    const company = useSelector(DataSelector.Company);
    const branchs = useSelector(DataSelector.Branchs);

    const SlipeTime = (text) => {
        const arr = text?.split("&&");
        return (
            <div className='time_worlk'>
                <p>{arr[0]}</p>
                <p>{arr[1]}</p>
                <p>{arr[2]}</p>
            </div>
        )
    };

    const SlipePhone = (phone) => {
        const arr = phone.split("&&");
        return (
            <>
                <a href={`tel:${arr[0]}`}>{arr[0]}</a>
                <a href={`tel:${arr[1]}`}>{arr[1]}</a>
            </>

        )
    };

    return (
        <div id='footer'>
            <Container>
                <Row>
                    <Col xs={3}>
                        <div className='footer_company'>
                            <div className='footer_item'>
                                <img src={company?.logo} alt='logo' className='w-100 img-fluid' />
                                <p>{company?.website}</p>
                                {
                                    company?.time
                                }
                            </div>
                        </div>
                    </Col>

                    {
                        branchs?.map((branch, index) => {
                            return (
                                <Col key={index} xs={3}>
                                    <div className='footer_item'>
                                        <div className='footer_hearder'>
                                            <h2>{branch.name}</h2>
                                        </div>
                                        <div className='footer_main'>
                                            <div className='branch_itro'>
                                                <p>{branch.adress}</p>
                                            </div>
                                            <div className='branch_itro'>
                                                {SlipePhone(branch.phone)}
                                            </div>
                                            <div className='branch_itro'>
                                                <p>{branch.email}</p>
                                            </div>
                                            <div className='branch_itro'>
                                                <p>{branch.zalo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }

                    <Col xs={3}>
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
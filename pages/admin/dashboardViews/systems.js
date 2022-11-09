import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiAdmin } from '../../../apiConfig/axiosAdmin';
import { CompanySuccess } from '../../../redux/dataSlice';
import { DataSelector } from '../../../redux/selector/data';

function Systems(props) {

    const dispath = useDispatch();

    const [editCompany, setEditCompany] = useState(false);
    const [editBranch, setEditBranch] = useState("");

    const Company = useSelector(DataSelector.Company);

    const [photo, setPhoto] = useState("");
    const [website, setWebsite] = useState(Company.website);
    const [week, setWeek] = useState(Company.TimeWork.week);
    const [morning, setMorning] = useState(Company.TimeWork.morning);
    const [afternoon, setAfternoon] = useState(Company.TimeWork.afternoon);

    const [branchName, setBranchName] = useState("");
    const [branchAdress, setBranchAdress] = useState("");
    const [branchPhone, setBranchPhone] = useState("");
    const [branchEmail, setBranchEmail] = useState("");
    const [branchZalo, setBranchZalo] = useState("");

    const handleEditCompany = async (id) => {
        await ApiAdmin.Manager.UpdateCompany(id, website, time, photo, dispath, CompanySuccess);
        setEditCompany(false);
    }
    return (
        <div id='system'>
            <div className='company'>
                <Row>
                    <Col xs={3}>
                        <div className='company_item'>
                            {
                                editCompany ?
                                    <>
                                        <div className='company_logo'>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>Your Logo</Form.Label>
                                                <Form.Control type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                                            </Form.Group>
                                        </div>
                                        <div className='company_content'>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-website"><i class="fa fa-globe"></i></InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Website"
                                                    aria-label="Website"
                                                    aria-describedby="basic-website"
                                                    value={website}
                                                    onChange={(e) => setWebsite(e.target.value)}
                                                />
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-week">Week</InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Time worlk"
                                                    aria-label="time"
                                                    aria-describedby="basic-week"
                                                    value={week}
                                                    onChange={(e) => setWeek(e.target.value)}
                                                />
                                            </InputGroup>

                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-morning">Sáng</InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Time worlk"
                                                    aria-label="morning"
                                                    aria-describedby="basic-morning"
                                                    value={morning}
                                                    onChange={(e) => setMorning(e.target.value)}
                                                />
                                            </InputGroup>

                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-afternoon">Chiều</InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Time worlk"
                                                    aria-label="afternoon"
                                                    aria-describedby="basic-afternoon"
                                                    value={afternoon}
                                                    onChange={(e) => setAfternoon(e.target.value)}
                                                />
                                            </InputGroup>

                                        </div>
                                        <Button onClick={() => handleEditCompany(Company.id)}>Save</Button>
                                        <Button className='btn btn-danger' onClick={() => setEditCompany(false)}>Cancle</Button>
                                    </>
                                    :
                                    <>
                                        <div className='company_logo'>
                                            <img src={Company.Image.url} />
                                        </div>
                                        <div className='company_content'>
                                            <p>{Company.website}</p>
                                            <div className='time'>
                                                <p>{Company.TimeWork.week}</p>
                                                <p>Sáng: {Company.TimeWork.morning}</p>
                                                <p>Chiều: {Company.TimeWork.afternoon}</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => setEditCompany(!editCompany)}>Edit</Button>
                                    </>
                            }

                        </div>
                    </Col>
                    {
                        Company?.Branchs.map((branch, index) => {
                            return (
                                <Col key={index} xs={3}>
                                    <div className='branch_content'>
                                        {
                                            editBranch === branch.id ?
                                                <>
                                                    <div className='branch_hearder'>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-branch"><i class="fa fa-code-branch"></i></InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Tên chi nhánh"
                                                                aria-label="branch"
                                                                aria-describedby="basic-branch"
                                                                value={branchName}
                                                                onChange={(e) => setBranchName(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className='branch_item'>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-adress"><i class="fa fa-map-marker-alt"></i></InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Địa chỉ"
                                                                aria-label="adress"
                                                                aria-describedby="basic-adress"
                                                                value={branchAdress}
                                                                onChange={(e) => setBranchAdress(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-phone"><i class="fa fa-phone-volume"></i></InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Địa chỉ"
                                                                aria-label="phone"
                                                                aria-describedby="basic-phone"
                                                                value={branchPhone}
                                                                onChange={(e) => setBranchPhone(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-email"><i className="fa fa-envelope"></i></InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Email"
                                                                aria-label="email"
                                                                aria-describedby="basic-email"
                                                                value={branchEmail}
                                                                onChange={(e) => setBranchEmail(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-zalo"> <i className="fa fa-mobile-alt"></i></InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Zalo"
                                                                aria-label="zalo"
                                                                aria-describedby="basic-zalo"
                                                                value={branchZalo}
                                                                onChange={(e) => setBranchZalo(e.target.value)}
                                                            />
                                                        </InputGroup>

                                                    </div>
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Button variant="primary">Save</Button>
                                                        <Button onClick={() => setEditBranch("")} variant="danger">Cancle</Button>
                                                    </ButtonGroup>
                                                </>
                                                :
                                                <>
                                                    <div className='branch_hearder'>
                                                        <h4>{branch.name}</h4>
                                                    </div>
                                                    <div className='branch_item'>
                                                        <p>
                                                            <i className="fa fa-map-marker-alt"></i>
                                                            {branch.adress}
                                                        </p>
                                                        <p>
                                                            <i className="fa fa-phone-volume"></i>
                                                            {branch.phone}
                                                        </p>
                                                        <p>
                                                            <i className="fa fa-envelope"></i>
                                                            {branch.email}
                                                        </p>
                                                        <p>
                                                            <i className="fa fa-mobile-alt"></i>
                                                            {branch.zalo}
                                                        </p>
                                                    </div>
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Button
                                                            onClick={() => {
                                                                setEditBranch(branch.id);
                                                                setBranchName(branch.name);
                                                                setBranchAdress(branch.adress);
                                                                setBranchPhone(branch.phone);
                                                                setBranchEmail(branch.email);
                                                                setBranchZalo(branch.zalo);
                                                            }}
                                                            variant="primary">Edit</Button>
                                                    </ButtonGroup>
                                                </>
                                        }
                                    </div>
                                </Col>
                            )
                        })
                    }

                </Row>
            </div>

        </div>
    );
}

export default Systems;
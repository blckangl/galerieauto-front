import React from "react";
import './style.css';
import { AccessAlarm, ThreeDRotation, MailOutlined, PhoneOutlined, MapOutlined } from '@material-ui/icons';
import {

    Link
} from "react-router-dom";
import { Container, Row, Col, toast, ToastContainer } from '../../shared'
import 'react-toastify/dist/ReactToastify.css';
// import { StickyContainer, Sticky } from 'react-sticky';
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { useCookies } from "react-cookie";

const TopNav = (props) => {
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);
    const logout = () => {
        removeTokenCookie("token");
        removeTokenCookie("role");

        window.location.reload();

    }

    return (


        <div>
            <section id={"top-nav"}>
                <Container fluid>
                    <Row className={"justify-content-end align-items-center p-1"}>

                        <Col xs={12}>

                            <Row className={"justify-content-center justify-content-lg-end align-items-center"}>
                                <Col xs={12} md={4} lg={3} className={"text-center text-lg-right"}><MailOutlined
                                    style={{ color: '#c7081b' }} /> contact@galerieauto.fr</Col>
                                <Col xs={12} md={4} lg={2} className={"text-center text-lg-right"}><PhoneOutlined
                                    style={{ color: '#c7081b' }} /> 0176451125</Col>


                            </Row>
                            <Row className={"justify-content-end"}>
                                {props.role > 1 &&
                                    <Col xs={4} lg={2} className={"text-right p-2"}> <Link to={'/dashboard'}
                                    >Dashboard</Link></Col>
                                }

                                {props.token.token ?
                                    <Col xs={4} lg={2} className={"text-right p-2"}> <Link to={'/'}
                                        onClick={logout}>Logout</Link></Col> :
                                    <Col xs={4} lg={2} className={"text-right p-2"}> <Link
                                        to="/signin">Login</Link></Col>
                                }
                            </Row>

                        </Col>


                    </Row>

                </Container>

            </section>


        </div>
    )
};

export { TopNav };

import React from "react";
import './style.css';
import {AccessAlarm, ThreeDRotation, MailOutlined, PhoneOutlined, MapOutlined} from '@material-ui/icons';
import {

    Link
} from "react-router-dom";
import {Container, Row, Col, toast, ToastContainer} from '../../shared'
import 'react-toastify/dist/ReactToastify.css';
import {StickyContainer, Sticky} from 'react-sticky';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {useCookies} from "react-cookie";

const TopNav = (props) => {
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);
const logout=()=>{
    removeTokenCookie("token");
    removeTokenCookie("role");

    window.location.reload();

}

    return (


        <div>
            <section id={"top-nav"}>
                <Container fluid>
                    <Row className={"justify-content-center align-items-center"}>
                        <Col lg={{span: 7, offset: 5}} sm={12}>
                            <Container>
                                <Row className={"justify-content-center align-items-center"}>
                                    <Col xs={4} lg={2} className={"text-center"}><MailOutlined
                                        style={{color: '#c7081b'}}/> test@test.com</Col>
                                    <Col xs={4} lg={2} className={"text-center"}><PhoneOutlined
                                        style={{color: '#c7081b'}}/> 32145698</Col>
                                    <Col xs={4} lg={2} className={"text-center"}><MapOutlined
                                        style={{color: '#c7081b'}}/> france</Col>
                                    {props.token.token  ?
                                        <Col xs={12} lg={2} className={"text-right p-2"}> <Link to={'/dashboard'}
                                                                                               >Dashboard</Link></Col> :""
                                    }

                                    {props.token.token  ?
                                        <Col xs={12} lg={2} className={"text-right p-2"}> <Link to={'#'}
                                            onClick={logout}>Logout</Link></Col> :
                                        <Col xs={12} lg={2} className={"text-right p-2"}> <Link
                                            to="/signin">Login</Link></Col>
                                    }
                                </Row>
                            </Container>

                        </Col>

                    </Row>

                </Container>

            </section>


        </div>
    )
};

export {TopNav};

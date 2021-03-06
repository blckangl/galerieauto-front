import React, { useEffect } from "react";
import './style.css';
// import { AccessAlarm, ThreeDRotation, MailOutlined, PhoneOutlined, MapOutlined } from '@material-ui/icons';
import {

    Link
} from "react-router-dom";
// import { Container, Row, Col, toast, ToastContainer } from '../../shared'
import 'react-toastify/dist/ReactToastify.css';
// import { StickyContainer, Sticky } from 'react-sticky';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { logoorange } from '../../assets'
import { useCookies } from "react-cookie";


const StickyNav = (props) => {

    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);

    useEffect(() => {
        window.onscroll = function () {
            myFunction()
        };

        var navbar = document.getElementById("navbar");
        var sticky = navbar.offsetTop;

        function myFunction() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }, []);

    const style = { zIndex: 88 };
    return (
        <div style={{ backgroundColor: 'black' }}>
            <Navbar id={"navbar"} className={"p-0"} bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/"><img style={{ height: '38px' }} src={logoorange} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto ">

                        <span
                            className={"nav-link-container " + (props.path == "/" ? "active" : "")}> <Link
                                to="/">Accueil</Link></span>
                        <span className={"nav-link-container " + (props.path == "/acheteur" ? "active" : "")}> <Link
                            to="/acheteur">Annonces</Link></span>
                        {tokenCookie.role > 1 && <span className={"nav-link-container " + (props.path == "/vendeur" ? "active" : "")}> <Link
                            to="/vendeur">Déposer une annonce</Link></span>}

                        <span className={"nav-link-container " + (props.path == "/contact" ? "active" : "")}> <Link
                            to="/contact">Contact</Link></span>



                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        </div>


    )
};

export { StickyNav };

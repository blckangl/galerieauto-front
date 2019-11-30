import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import './style.css';
import * as logowhite from '../../assets/logowhitefooter.png';
import * as footercar from '../../assets/footercar.png';
const Footer = () => (
    <div>
        <section id="footer" style={{backgroundImage:`url('${footercar}')`}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12  d-flex align-items-center">
                        <div className="row">
                            <div className="col-12 pb-5">
                                <h3 className="desc text-center ">A propos nous</h3>

                            </div>
                            <div className="col-12">
                                <img className="img-fluid" src={logowhite}/>
                            </div>
                            <div className="col-12 mt-3">
                                <p className="text-justify desc">
                                    Petites annonces, vous trouverez tout l’univers automobile sur
                                    AutomobileOccasion. Les professionnels ne sont pas oubliés
                                    avec un service spécifique dont vous trouverez le détail en
                                    contactant le service client.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="row">
                            <div className="col-12 text-center pb-5 ">
                                <h3 className="desc">Contact</h3>
                            </div>
                            <div className="col-2 mt-1 text-left">
                                <FontAwesomeIcon icon={faPhone} style={{ width: 20 + "px" }} />
                            </div>
                            <div className="col-10 mt-1 d-flex align-items-end">
                                +xxxxxxxxx
                            </div>
                            <div className="col-2 mt-1 text-left">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    style={{ width: 20 + "px" }}
                                />
                            </div>
                            <div className="col-10 mt-1 d-flex align-items-end">
                                contact@elite.com
                            </div>
                            <div className="col-2 mt-1 text-left">
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    style={{ width: 20 + "px" }}
                                />
                            </div>
                            <div className="col-10 mt-1 d-flex align-items-end">
                                xxxx 2050 country{" "}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="row">
                            <div className="col-12  pt-5">
                                <div className="map-responsive">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167998.10803373056!2d2.206977064368058!3d48.858774103123785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2stn!4v1572267763252!5m2!1sen!2stn"
                                        width="600"
                                        height="450"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </div>
);

export default Footer;

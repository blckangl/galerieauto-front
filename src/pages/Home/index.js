import React, {useEffect, useState} from "react";
// import './style.css'
import {Container, Row, Col, toast, ToastContainer} from '../../shared'
import 'react-toastify/dist/ReactToastify.css';
import Carousel from "react-bootstrap/Carousel";
import cover from "../../assets/cover.jpg";
import {Announce} from '../../components'
import './style.css'
import {car1, car2, car3, hand, lock, shield, start, logoorange} from '../../assets';
import Fade from 'react-reveal/Fade';
import * as AOS from 'aos'
import * as CONSTANTS from "../../shared/constants";
import {Card, Icon, message, Result} from "antd";

const Home = (props) => {
    const [currentAnnonce, setCurrentAnnonces] = useState([]);

    const fetchVehicles = () => {
        fetch(CONSTANTS.API_URL + "vehicles/read.php?last=8")
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)

                if (data.records) {

                    setCurrentAnnonces(data.records)
                } else {
                    setCurrentAnnonces([])
                }
            })
            .catch(error => {
                setCurrentAnnonces([])
            });
    }


    useEffect(() => {
        AOS.init();
        fetchVehicles();
    }, []);
    return (

        <div>
            <section>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={cover}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            {/*<h3>First slide label</h3>*/}
                            {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>

                </Carousel>
            </section>
            <section id={"section"}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div id="recent">
                                <h1 className="text-center">ANNONCES RECENTES</h1>
                                <p className="desc">Voitures récemment ajoutées</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section data-aos="fade-up" id={"section"}>
                <Container fluid>

                    <Row className={"justify-content-center"}>

                        {currentAnnonce.map(entry => (
                            <Col
                                className={"p-2"}
                                key={entry.id}
                                xs={12} md={6} lg={3}
                            >

                                <Announce
                                    name={entry.name}
                                    type={entry.carburant}
                                    color={entry.color}
                                    chv={entry.chv}
                                    price={entry.price}
                                    img={entry.img_cover}
                                    id={entry.id}
                                />


                            </Col>
                        ))}


                    </Row>
                </Container>
            </section>
            <section className={"pt-5 pb-5 mt-2 mb-2"} id={"cars"}>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div data-aos="fade-down" className={"col-lg-3 col-md-6 col-12 mx-auto"}>
                            <Fade>
                                <p className={"text-center"}>
                                    <img className={"img-fluid"} src={car1} alt=""/>
                                </p>
                                <p className={"text-center"}>
                                    <strong>Notre sélection budget limité</strong>
                                </p>
                                <p className={"text-justify"}>
                                    Nos spécialistes ont sélectionné pour vous les véhicules les
                                    plus populaires et les plus vendus sur le marché… Des
                                    véhicules accessibles et correspondants à un petit budget ne
                                    dépassant pas les 7000€. Une sélection de qualité et un bon
                                    rapport qualité prix…
                                </p>
                            </Fade>
                        </div>

                        <div data-aos="fade-down" className={"col-lg-3 col-md-6 col-12 mx-auto"}>
                            <Fade>
                                <p className={"text-center"}>
                                    <img className={"img-fluid"} src={car2} alt=""/>
                                </p>
                                <p className={"text-center"}>
                                    <strong> Notre sélection véhicules First</strong>
                                </p>
                                <p className={"text-justify"}>
                                    Votre budget est situé entre 7000 et 15000 € ? Retrouvez ici
                                    les voitures hautes gammes qui correspondent parfaitement à
                                    votre besoin… Nous avons rassemblé pour vous des véhicules
                                    d’occasion de marque et en très bon état… Un excellent
                                    rapport qualité prix…
                                </p>
                            </Fade>
                        </div>

                        <div data-aos="fade-down" className={"col-lg-3 col-md-6 col-12 mx-auto"}>
                            <Fade>
                                <p className={"text-center"}>
                                    <img className={"img-fluid"} src={car3} alt=""/>
                                </p>
                                <p className={"text-center"}>
                                    <strong> Notre sélection véhicules luxe</strong>
                                </p>
                                <p className={"text-justify"}>
                                    Retrouvez ici les plus grandes marques de voitures. Une
                                    sélection de belles voitures de prestige. Luxe, élégance et
                                    raffinement sont au rendez-vous. Vous êtes à la recherche de
                                    la perfection et vous êtes prêts à payer plus de 15000 € ?
                                    Vous trouverez votre bonheur ici…
                                </p>
                            </Fade>
                        </div>
                    </div>
                </div>
            </section>
            <section data-aos="fade-up" className={"p-4"} id={"services"}>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-lg-3 col-md-6 col-12 p-3"}>
                            <Fade>
                                <div className={"customcard p-5"}>
                                    <p className={"text-center"}>
                                        <img className={"img-fluid"} src={lock} alt=""/>
                                    </p>
                                    <p className={"title"}>Sécurité</p>
                                    <p className={"text-center"}>
                                        Protection de vos données personnelles. Modération active
                                        et constante des annonces. Saisie automatique de votre
                                        annonce.
                                    </p>
                                    <p className={"text-center"}>
                                        Modération active et constante des annonces.
                                    </p>
                                    <p className={"text-center"}>
                                        Saisie automatique de votre annonce.
                                    </p>
                                </div>
                            </Fade>
                        </div>

                        <div className={"col-lg-3 col-md-6 col-12 p-3"}>
                            <Fade>
                                <div className={"customcard p-5"}>
                                    <p className={"text-center"}>
                                        <img className={"img-fluid"} src={hand} alt=""/>
                                    </p>
                                    <p className={"title"}>Engagement</p>
                                    <p className={"text-center"}>
                                        Un accompagnement jusqu’à la vente
                                    </p>
                                    <p className={"text-center"}>
                                        La garantie exclusive «vendu ou remboursé à 59€
                                    </p>
                                    <p className={"text-center"}>
                                        Saisie automatique de votre annonce.
                                    </p>
                                </div>
                            </Fade>
                        </div>

                        <div className={"col-lg-3 col-md-6 col-12 p-3"}>
                            <Fade>
                                <div className={"customcard p-5"}>
                                    <p className={"text-center"}>
                                        <img className={"img-fluid"} src={start} alt=""/>
                                    </p>
                                    <p className={"title"}>Qualité</p>
                                    <p className={"text-center"}>
                                        Valorisation à travers l’insertion de photos.
                                    </p>
                                    <p className={"text-center"}>
                                        La star des réseaux sociaux.
                                    </p>
                                </div>
                            </Fade>
                        </div>

                        <div className={"col-lg-3 col-md-6 col-12 p-3"}>
                            <Fade>
                                <div className={"customcard p-5"}>
                                    <p className={"text-center"}>
                                        <img
                                            className={"img-fluid"}
                                            src={shield}
                                            alt=""
                                        />
                                    </p>
                                    <p className={"title"}>Garantie</p>
                                    <p className={"text-center"}>
                                        Un délai moyen de vente de 2 semaines ouvrable
                                    </p>
                                    <p className={"text-center"}>
                                        Paiement sécurisée et données personnelles 100% protégées
                                    </p>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
            </section>
            <section data-aos="fade-down" id={"info"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-12 text-center"}>
                            <img
                                className={"img-fluid"}
                                src={logoorange}
                                alt=""
                            />
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-12 text-center"}>
                            <p className={"text-justify pt-5"}>
                                Galerie AUTO un des portails phares des annonces de vente et
                                d’achat de voitures d’occasion en France, vous propose des
                                véhicules de toute marques et modèles, selon tout type de
                                budget.
                                <br/>
                                <br/>
                                N’hésitez pas à utiliser les paramètre du moteur de
                                recherche pour choisir votre prochaine voiture d’occasion ou
                                camping-car à acheter.
                                <br/>
                                <br/>
                                Un large panel de véhicules d’occasion de tous types et la
                                possibilité d’obtenir une offre ferme et de vendre votre
                                véhicule à coup sûr en seulement 3 jours. Des annonces
                                automobile des plus pertinentes pour acheter ou vendre une
                                voiture occasion . Pour insérer votre annonce sur le portail
                                en vue de vendre votre voiture d’occasion, camping-car ou
                                moto, Rendez vous à la Annonce occasion ou Voiture occasion
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/*<Button variant="primary" onClick={handleShow}>*/}
            {/*    Launch demo modal*/}
            {/*</Button>*/}
            {/*<Modal className={"p-0"} show={show} onHide={handleClose}>*/}
            {/* */}
            {/*    <Modal.Body>*/}
            {/*        <SignUp></SignUp>*/}
            {/*    </Modal.Body>*/}

            {/*</Modal>*/}
        </div>
    )
};

export {Home};

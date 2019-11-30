import React from "react";
import './style.css';
import sdf from '../../assets/sdf.png'
import gear from '../../assets/gear.png'
import color from '../../assets/color.png'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from 'react-reveal/Fade';

const Announce = props => (
    <div style={{cursor: 'pointer'}}>
        <a href={`/annonces/annonce?id=${props.id}`}>

            <div style={{backgroundImage: `url(${props.img})`}} className="annonce">
                <div className="price-container">
                    <div className="price-bubble">{props.price} €</div>
                </div>
                <div className="description-container">
                    <Container fluid>
                        <Row>
                            <Col>
                                <p style={{
                                    fontWeight: 'bold',
                                    textOverflow: 'ellipsis',
                                    'width': 100 + '%',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}>{props.name}</p>
                            </Col>
                        </Row>
                        <Row className={"justify-content-center"}>
                            <Col xs={4} className={"mx-auto justify-content-center text-center"}>
                                <img src={sdf}/>

                            </Col>
                            <Col xs={4} className={"mx-auto justify-content-center text-center"}>
                                <img src={color}/>

                            </Col>
                            <Col xs={4} className={"mx-auto justify-content-center text-center"}>
                                <img src={gear}/>

                            </Col>

                        </Row>
                        <Row className={"justify-content-center"}>
                            <Col xs={4} className={"mx-auto justify-content-center text-center"}>

                                <p>{props.type}</p>
                            </Col>
                            <Col xs={4} className={"mx-auto justify-content-center text-center"}>

                                <p>{props.color}</p>
                            </Col>
                            <Col xs={4} className={"mx-auto justify-content-center text-center"}>

                                <p>{props.chv} chv</p>
                            </Col>

                        </Row>
                        <Row className={"show"}>
                            <Col className={"p-3"}>
                                <p className="text-center">en savoir plus</p>
                            </Col>

                        </Row>
                    </Container>

                </div>
            </div>

        </a>

    </div>
);

export {Announce};

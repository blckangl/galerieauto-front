import React from 'react';
import './style.css';
import {Col, Container, Row} from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import * as footercar from '../../assets/footercar.png';

import {logoorange} from '../../assets'
import CardMedia from "@material-ui/core/CardMedia";

const Contact = ()=>{

    return(
       <section id="contact-section">
           <Container className={"p-3"}>
               <Row>
                   <Col>

                       <Card color={'#c7081b'} className={"p-2"}>
                           <CardMedia
                               component="img"
                               alt="Contemplative Reptile"
                              height="200"
                               image={footercar}
                               title="Contemplative Reptile"
                           />
                           <CardContent>
                               <Container>
                                   <Row>
                                       <Col>
                                           <h3 style={{color:'#c7081b',textAlign:'center'}}> Contactez-nous</h3>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col>
                                           <TextField
                                               id="standard-basic"
                                               style={{width:'100%'}}
                                               label="Nom et prénom"
                                               margin="normal"
                                               required
                                           />
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col>
                                           <TextField
                                               id="standard-basic"
                                               style={{width:'100%'}}
                                               label="Email"
                                               margin="normal"
                                               type={"email"}
                                               required
                                           />
                                       </Col>
                                   </Row>

                                   <Row>
                                       <Col>
                                           <TextField
                                               id="standard-basic"
                                               style={{width:'100%'}}
                                               label="Sujet"
                                               margin="normal"
                                               required
                                           />
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col>
                                           <TextField
                                               id="standard-basic"
                                               style={{width:'100%'}}
                                               label="Message"
                                               margin="normal"
                                               multiline
                                               rows="8"
                                               required
                                           />
                                       </Col>
                                   </Row>
                               </Container>
                           </CardContent>
                           <CardActions style={{display:'flex',justifyContent:'center'}}>
                               <Button variant="contained" color="secondary" >
                                   Envoyer
                               </Button>
                           </CardActions>
                       </Card>

                   </Col>
               </Row>
           </Container>
       </section>
    )
}
export {Contact};

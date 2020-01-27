import React, { useState } from 'react';
import '../style.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Paper from "@material-ui/core/Paper";
import { Layout, Breadcrumb } from 'antd';
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";
import { message } from 'antd';
import * as CONSTANTS from "../../../shared/constants";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
}));
const Mailing = () => {
    const { Content } = Layout;
    const classes = useStyles();
    const [mailType, setMailType] = useState(0);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [fName, setfName] = useState("");
    const [isError, setIsError] = useState(false);


    const [mailTypeError, setMailTypeError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [fNameError, setfNameError] = useState(false);


    // VALUES
    const handleMailType = event => {
        setMailType(event.target.value);
        console.log(event.target.value);
    };
    const handleMailValue = event => {
        setEmail(event.target.value);
    };
    const handleNameValue = event => {
        setName(event.target.value);
    };
    const handlefNameValue = event => {
        setfName(event.target.value);
    };


    // SEND EMAIL
    const handleSend = () => {
        setIsError(false)
        setEmailError(false)
        setNameError(false)
        setfNameError(false)
        if (email.length < 6) {
            message.error('Le champ Email est obligatoire')
            setEmailError(true)
            setIsError(true)
        }
        // if (mailType.length === 0) {
        //     message.error('Choisir le type d\'Email')
        //     setMailTypeError(true)
        //     setIsError(true)

        // }

        // if (name.length < 2) {
        //     message.error('Le champ Nom est obligatoire')
        //     setNameError(true)
        //     await setIsError(true)



        // }
        // if (fName.length < 2) {
        //     message.error('Le champ Prénom est obligatoire')
        //     setfNameError(true)
        //     await setIsError(true)
        // }

        if (isError) {
            message.error("cannot send")
            console.log("error", isError)
        } else {
            fetch(CONSTANTS.MAILING  + mailType, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },  body: JSON.stringify({firstName:name,lastName:fName,email:email,password:email}) })
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    if (data.success) {

                        message.success("sent")
                    } else {
                       message.error(data.message);
                    }
                })
                .catch(error => {
                    message.error(error);

                });


        }
    }

    return (
        <Layout>
            <Content style={{ margin: '16px 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Mailing</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Paper className={"p-3"}>
                        <Row className="pt-3 justify-content-center">
                            <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                                <label className="radiocontainer ">
                                    <p>Welcome Mail</p>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="0"
                                        onChange={handleMailType}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                                <label className="radiocontainer">
                                    <p>Confirmation Mail</p>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="1"
                                        onChange={handleMailType}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                                <label className="radiocontainer">
                                    <p>Other</p>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="2"
                                        onChange={handleMailType}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </Row>
                        <Row className={"pt-3"}>
                            <Col>
                                <TextField
                                    type="email"
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    margin="normal"
                                    value={email}
                                    required
                                    onChange={handleMailValue}
                                    error={emailError}
                                />
                            </Col>
                        </Row>
                        <Row className={"pt-3"}>
                            <Col>
                                <TextField
                                    id="nameField"
                                    label="Nom"
                                    className={classes.textField}
                                    margin="normal"
                                    value={name}
                                    required
                                    onChange={handleNameValue}
                                    error={nameError}
                                />
                            </Col>
                        </Row>
                        <Row className={"pt-3"}>
                            <Col>
                                <TextField
                                    id="fNamefield"
                                    label="Prénom"
                                    className={classes.textField}
                                    margin="normal"
                                    value={fName}
                                    required
                                    onChange={handlefNameValue}
                                    error={fNameError}
                                />

                            </Col>
                        </Row>
                        <Row className={"pt-3 justify-content-center"}>
                            <Col>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SendIcon />}
                                    onClick={handleSend}
                                >
                                    Envoyer
                              </Button>
                            </Col>
                        </Row>
                    </Paper>
                </Container>
            </Content>
        </Layout>
    )
}

export default Mailing

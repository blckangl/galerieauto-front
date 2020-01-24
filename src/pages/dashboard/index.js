import React, { useEffect, useState } from 'react';
import './style.css';
import { Layout, Menu, Breadcrumb, Icon, Card, Meta, Result } from 'antd';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Announce } from "../../components/annonce";
import * as CONSTANTS from "../../shared/constants";
import { message } from 'antd';
import { useCookies } from "react-cookie";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CardActions from "@material-ui/core/CardActions";
import PersonIcon from '@material-ui/icons/Person';
import PermIdentity from '@material-ui/icons/PermIdentity';
import DeleteIcon from "@material-ui/icons/Delete";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhoneIcon from '@material-ui/icons/Phone';

import History from '@material-ui/icons/History';

import CardHeader from "@material-ui/core/CardHeader";
import Modal from "react-bootstrap/Modal";
import { SignUp } from "../../components/sign-up";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import MenuMAT from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Spinner from "react-bootstrap/Spinner";

const { Header, Content, Footer, Sider } = Layout;


const DashBoard = () => {
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);
    const [roleCookie, setRoleCookie, removeRoleCookie] = useCookies(['role']);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [isCollpased, setCollapsed] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState();
    const [announcesForUser, setAnnouncesForUser] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    const [currentAnnonce, setCurrentAnnonces] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [selectedType, setSelectedType] = useState({ _id: -1, title: "" });
    const [currentTypes, setCurrentTypes] = useState([]);
    const [selectedMarque, setSelectedMarque] = useState({ _id: -1, title: "" });
    const [currentMarques, setCurrentMarques] = useState([]);

    const [selectedModel, setSelectedModel] = useState({ _id: -1, title: "" });
    const [currentModels, setCurrentModels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newMaruqe, setNewMaruqe] = useState("");
    const [newModel, setNewModel] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchVehicles = () => {
        fetch(CONSTANTS.GET_UNCONFIRMED_ANNOUNCES)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)

                if (data.success) {

                    setCurrentAnnonces(data.body)
                } else {
                    setCurrentAnnonces([])
                }
            })
            .catch(error => {
                setCurrentAnnonces([])
            });
    }
    const fetchUsers = () => {
        fetch(CONSTANTS.USERS_LIST_URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)

                if (data.success) {
                    setUsersList(data.body)
                } else {
                    setUsersList([])
                }
            })
            .catch(error => {
                setUsersList([])
            });
    }
    const fetchAnnoncesForUser = (id) => {
        fetch(CONSTANTS.GET_ANNOUNCES_user + "?user=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)
                if (data.success) {
                    setAnnouncesForUser(data.body)
                } else {
                    setAnnouncesForUser([])
                }
            })
            .catch(error => {
                setAnnouncesForUser([])
            });
    }
    const setUserRole = (role) => {

        fetch(CONSTANTS.SET_USER_ROLE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": selectedUserId,
                "role": role
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)
                if (data.success) {
                    message.success("User role updated");
                    fetchUsers();
                } else {
                    message.error("Couldn't update user role");
                }
            })
            .catch(error => {
                message.error("Couldn't update user role");
            });
    }
    const fetchTypes = () => {
        fetch(CONSTANTS.GET_TYPES)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)
                if (data.success) {
                    setCurrentTypes(data.body)
                } else {
                    setCurrentTypes([])
                }
            })
            .catch(error => {
                setCurrentTypes([])
            });
    }

    const fetchMarques = (id) => {
        fetch(CONSTANTS.GET_MARQUES + "?typeid=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)

                if (data.success) {
                    setCurrentMarques(data.body)
                } else {
                    setCurrentMarques([])
                }
            })
            .catch(error => {
                setCurrentMarques([])
            });
    }
    const fetchModels = (id) => {
        fetch(CONSTANTS.GET_MODELS + "?marqueid=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)

                if (data.success) {
                    setCurrentModels(data.body)
                } else {
                    setCurrentModels([])
                }
            })
            .catch(error => {
                setCurrentModels([])
            });
    }

    useEffect(() => {
        fetchVehicles();
        fetchUsers();
        fetchTypes();
    }, []);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={isCollpased} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={() => {
                        setCurrentPage("home")
                    }}>
                        <Icon type="pie-chart" />
                        <span>Annonces</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => {
                        setCurrentPage("users")
                    }}>
                        <Icon type="user" />
                        <span>Users</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => {
                        setCurrentPage("models")
                    }}>
                        <Icon type="user" />
                        <span>Marques & Models</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            {isLoading ?

                <div className={"text-center p-3"}><Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner></div>

                : ""}
            {currentPage == "home" ? <Layout>
                <Content style={{ margin: '16px 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>annonces</Breadcrumb.Item>

                    </Breadcrumb>

                    <Container>

                        <Row className={"justify-content-center"}>


                            {currentAnnonce.length > 0 ? currentAnnonce.map(entry => (
                                <Col
                                    className={"p-2"}
                                    key={entry._id}
                                    xs={12} md={6} lg={4}
                                >
                                    <Card
                                        style={{ width: '100%' }}

                                        actions={[
                                            <Icon onClick={() => {

                                                fetch(CONSTANTS.CONFIRME_ANNOUNCES, {
                                                    crossDomain: true,
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        "announceid": entry._id,

                                                    })
                                                })
                                                    .then(response => {
                                                        return response.json();
                                                    })
                                                    .then(data => {
                                                        // let marquesFromApi =data.records.map(entry => entry)
                                                        if (data.success) {
                                                            message.success("Confirmed");
                                                            message.success("Confirmation Email sended");

                                                        } else {
                                                            message.error(data.message);
                                                        }
                                                        fetchVehicles();
                                                    })
                                                    .catch(error => {
                                                        message.error("Erreur");
                                                    });

                                            }} type="file-add" key="file-add" />,
                                        ]}
                                    >
                                        <Announce
                                            name={entry.name}
                                            type={entry.carburant}
                                            color={entry.color}
                                            chv={entry.chv}
                                            price={entry.price}
                                            img={entry.img_cover}
                                            id={entry._id}
                                        />
                                    </Card>


                                </Col>
                            )) : <Result
                                    icon={<Icon type="smile" theme="twoTone" />}
                                    title="Great, we have done all the operations!"
                                />}


                        </Row>
                    </Container>

                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout> : ""}
            {(currentPage == "users" && roleCookie.role >= 2) ? <Layout>
                <Content style={{ margin: '16px 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>users</Breadcrumb.Item>

                    </Breadcrumb>

                    <Container>

                        <Row className={"justify-content-left"}>


                            {usersList.length > 0 ? usersList.map(entry => (
                                <Col
                                    className={"p-2"}
                                    key={entry._id}
                                    xs={12} md={6} lg={4}
                                >
                                    <Card>
                                        <CardHeader

                                            title={entry.firstName + " " + entry.lastName}
                                            subheader={entry.email}
                                        />

                                        <CardContent>
                                            <p>Details</p>
                                            <Divider />
                                            <List component="nav" aria-label="main mailbox folders">

                                                <ListItem key={"phone"}>
                                                    <ListItemIcon>
                                                        <PhoneIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={entry.phone} />
                                                </ListItem>
                                                <ListItem key={entry._role[entry._role.length - 1]}>
                                                    <ListItemIcon>
                                                        <PersonIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={entry._role[entry._role.length - 1]} />

                                                </ListItem>


                                            </List>
                                            <Divider />


                                        </CardContent>
                                        <CardActions disableSpacing>
                                            {roleCookie.role == 3 ?
                                                <IconButton aria-controls="simple-menu" aria-haspopup="true"
                                                    onClick={(event) => {
                                                        setSelectedUserId(entry._id);
                                                        handleMenuClick(event);
                                                    }}>
                                                    <PermIdentity />
                                                </IconButton> : ""}

                                            <IconButton aria-label="share" onClick={() => {
                                                setSelectedUserId(entry._id);
                                                fetchAnnoncesForUser(entry._id);
                                                handleShow();
                                            }}>
                                                <History />
                                            </IconButton>

                                            {roleCookie.role == 3 ?
                                                <IconButton aria-controls="simple-menu" aria-haspopup="true"
                                                    onClick={(event) => {
                                                        fetch(CONSTANTS.DELETE_USER, {
                                                            method: "DELETE",
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'Accept': 'application/json',
                                                                'Authorization': `Bearer ${tokenCookie.token}`
                                                            },
                                                            body: JSON.stringify({ userid: entry._id }),
                                                        })
                                                            .then(response => {
                                                                return response.json();
                                                            })
                                                            .then(data => {
                                                                if (data.success) {
                                                                    message.success("Done ");
                                                                    fetchUsers();
                                                                } else {
                                                                    message.error(data.message);
                                                                }
                                                            })
                                                            .catch(error => {
                                                                message.error(error);
                                                            });
                                                    }}>
                                                    <DeleteIcon />
                                                </IconButton> : ""}

                                        </CardActions>

                                    </Card>


                                </Col>
                            )) : <Result
                                    icon={<Icon type="smile" theme="twoTone" />}
                                    title="Great, we have done all the operations!"
                                />}


                            <MenuMAT
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => {
                                    setUserRole('admin');
                                    handleMenuClose();
                                }}>Make Admin</MenuItem>
                                <MenuItem onClick={() => {
                                    setUserRole('agent');
                                    handleMenuClose();
                                }}>Make Agent</MenuItem>
                                <MenuItem onClick={() => {
                                    setUserRole('user');
                                    handleMenuClose();
                                }}>Make User</MenuItem>
                            </MenuMAT>
                        </Row>
                    </Container>

                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout> : ""}
            {(currentPage == "models" && roleCookie.role >= 2) ? <Layout>
                <Content style={{ margin: '16px 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>marques & models</Breadcrumb.Item>

                    </Breadcrumb>

                    <Container>

                        <Row className={"justify-content-left"}>
                            <Col xs={12} lg={4}>
                                <Paper className={"p-2"}>


                                    <List component="nav" aria-label="secondary mailbox folders">
                                        {currentTypes.map((x) =>
                                            (<ListItem key={x._id} button onClick={() => {
                                                setSelectedType(x);
                                                setSelectedModel({ _id: -1, title: "" });
                                                setSelectedMarque({ _id: -1, title: "" });
                                                fetchMarques(x._id);
                                                fetchModels(-1)
                                            }}>
                                                <ListItemText primary={x.title} />
                                            </ListItem>)
                                        )}

                                    </List>
                                </Paper>
                            </Col>
                            <Col xs={12} lg={4}>
                                <Paper className={"p-2"}>
                                    <div className={"text-center"}><Chip label={selectedType.title}
                                        variant="outlined" /></div>
                                    <form className={"d-flex justify-content-center"} noValidate autoComplete="off">
                                        <TextField id="standard-basic" label="Marque"
                                            disabled={selectedType._id == -1} onChange={(e) => {
                                                setNewMaruqe(e.target.value);
                                            }} />
                                        <Fab size="small" color="secondary" aria-label="add" disabled={isLoading}
                                            onClick={() => {
                                                setIsLoading(true);
                                                let body = {
                                                    type_id: selectedType._id,
                                                    title: newMaruqe
                                                }
                                                fetch(CONSTANTS.POST_MARQUES, {
                                                    method: "POST",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                        'Authorization': `Bearer ${tokenCookie.token}`
                                                    },
                                                    body: JSON.stringify(body),
                                                }).then(response => {
                                                    return response.json();
                                                }).then(result => {
                                                    setIsLoading(false);

                                                    if (result.success) {
                                                        message.success("Done");
                                                        fetchMarques(selectedType._id);
                                                    } else {
                                                        message.error("Fail");
                                                    }
                                                })
                                            }}>
                                            <AddIcon />
                                        </Fab>
                                    </form>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        {currentMarques.map((x) =>
                                            (<ListItem key={x._id} button onClick={() => {
                                                setSelectedMarque(x);
                                                setSelectedModel({ _id: -1, title: "" });

                                                fetchModels(x._id);
                                            }}>
                                                <ListItemText primary={x.title} />
                                            </ListItem>)
                                        )}
                                    </List>
                                </Paper>
                            </Col>

                            <Col xs={12} lg={4}>
                                <Paper className={"p-2"}>
                                    <div className={"text-center"}><Chip label={selectedMarque.title}
                                        variant="outlined" /></div>
                                    <form className={"d-flex justify-content-center"} noValidate autoComplete="off">
                                        <TextField id="standard-basic" disabled={selectedMarque._id == -1}
                                            label="Modèle" onChange={(e) => {
                                                setNewModel(e.target.value);
                                            }} />
                                        <Fab size="small" color="secondary" aria-label="add" disabled={isLoading}
                                            onClick={() => {
                                                setIsLoading(true);
                                                let body = {
                                                    marque_id: selectedMarque._id,
                                                    title: newModel
                                                }
                                                fetch(CONSTANTS.POST_MODELS, {
                                                    method: "POST",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                        'Authorization': `Bearer ${tokenCookie.token}`
                                                    },
                                                    body: JSON.stringify(body),
                                                }).then(response => {
                                                    return response.json();
                                                }).then(result => {
                                                    setIsLoading(false);

                                                    if (result.success) {
                                                        message.success("Done");
                                                        fetchModels(selectedMarque._id);
                                                    } else {
                                                        message.error("Fail");
                                                    }
                                                })
                                            }}>
                                            <AddIcon />
                                        </Fab>
                                    </form>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        {currentModels.map((x) =>
                                            (<ListItem key={x._id} button onClick={() => {
                                                setSelectedModel(x);
                                            }}>
                                                <ListItemText primary={x.title} />
                                            </ListItem>)
                                        )}
                                    </List>
                                </Paper>
                            </Col>


                        </Row>
                    </Container>

                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout> : ""}


            <Modal style={{ maxWidth: '90% !important' }} className={"p-0 historyModal"} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>

                        <Row className={"justify-content-center"}>


                            {announcesForUser.length > 0 ? announcesForUser.map(entry => (
                                <Col
                                    className={"p-2"}
                                    key={entry._id}
                                    xs={12} md={6} lg={4}
                                >
                                    <Card
                                        style={{ width: '100%' }}

                                        actions={[
                                            <Icon spin={true} onClick={() => {
                                                if (isLoading) {
                                                    message.warn("Loading");
                                                    return;
                                                }
                                                setIsLoading(true);
                                                fetch(CONSTANTS.CONFIRME_ANNOUNCES, {
                                                    crossDomain: true,
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        "announceid": entry._id,

                                                    })
                                                })
                                                    .then(response => {
                                                        return response.json();
                                                    })
                                                    .then(data => {
                                                        // let marquesFromApi =data.records.map(entry => entry)
                                                        setIsLoading(false);

                                                        if (data.success) {
                                                            message.success("Confirmed");
                                                            message.success("Confirmation Email sended");

                                                        } else {
                                                            message.error(data.message);
                                                        }
                                                        fetchVehicles();
                                                    })
                                                    .catch(error => {
                                                        message.error("Erreur");
                                                        setIsLoading(false);

                                                    });

                                            }} type="file-add" key="file-add" />,
                                        ]}
                                    >
                                        <Announce
                                            name={entry.name}
                                            type={entry.carburant}
                                            color={entry.color}
                                            chv={entry.chv}
                                            price={entry.price}
                                            img={entry.img_cover}
                                            id={entry._id}
                                        />
                                    </Card>


                                </Col>
                            )) : <Result

                                    title="No post for this user"
                                />}


                        </Row>
                    </Container>
                </Modal.Body>

            </Modal>
        </Layout>
    );

}


export default DashBoard


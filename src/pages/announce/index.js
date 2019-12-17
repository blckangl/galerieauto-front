import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as AOS from "aos";
import * as CONSTANTS from "../../shared/constants";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { useParams,useHistory} from "react-router";
import {message} from "antd";
import DeleteIcon from "@material-ui/icons/Delete";
import {useCookies} from "react-cookie";


const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        margin: 32
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {},
}));

export default function Announce(props) {
    let history = useHistory();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);
    const [selectedAnnounce, setSelectedAnnounce] = useState({announce: {}, user: {}});
    const [roleCookie, setRoleCookie, removeRoleCookie] = useCookies(['role']);
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);


    let { id } = useParams();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getAnnounce = (id) => {
        fetch(CONSTANTS.GET_ANNOUNCES + `?id=${id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // let marquesFromApi =data.records.map(entry => entry)
                if (data.success) {
                    setSelectedAnnounce(data.body)
                } else {
                    setSelectedAnnounce({announce: data.body.announce, user: data.body.user})
                }
            })
            .catch(error => {
                setSelectedAnnounce({announce: {}, user: {}})
            });
    }
    useEffect(() => {
        const {match: {params}} = props;
        getAnnounce(id);

    }, []);

    const name = selectedAnnounce.user.lastName;
    return (
        <Container>
            <Row>
                <Col>

                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {name ? name[0] : "A"}{selectedAnnounce.user.firstName ? selectedAnnounce.user.firstName[0] : "A"}
                                </Avatar>
                            }

                            title={(selectedAnnounce.user.lastName ? selectedAnnounce.user.lastName.toString().toUpperCase() : "") + " " + (selectedAnnounce.user.firstName ? selectedAnnounce.user.firstName.toString().toUpperCase() : "")}
                            subheader={<div><span>{selectedAnnounce.announce.created}</span><br/>

                            </div>}

                        />
                        <CardMedia
                            className={classes.media}
                            image={CONSTANTS.PUBLIC_UPLOAD_FOLDER_URL + selectedAnnounce.announce.img_cover}
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body1" color="textPrimary" component="h2">
                                {selectedAnnounce.announce.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {selectedAnnounce.announce.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>

                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>
                            {roleCookie.role >=2 ?
                                <IconButton aria-controls="simple-menu" aria-haspopup="true"
                                            onClick={(event) => {
                                                fetch(CONSTANTS.DELETE_ANNOUNCE, {
                                                    method: "DELETE",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                        'Authorization': `Bearer ${tokenCookie.token}`
                                                    },
                                                    body: JSON.stringify({id:selectedAnnounce.announce._id}),
                                                })
                                                    .then(response => {
                                                        return response.json();
                                                    })
                                                    .then(data => {
                                                        if (data.success) {

                                                            history.push("/");
                                                            message.success("Done ");

                                                        } else {
                                                            message.error(data.message);
                                                        }
                                                    })
                                                    .catch(error => {
                                                        message.error(error);
                                                    });
                                            }}>
                                    <DeleteIcon/>
                                </IconButton> : ""}
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon/>
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Paper className={classes.root}>
                                    <Table className={classes.table} aria-label="simple table">

                                        <TableBody>

                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Carburant
                                                </TableCell>
                                                <TableCell align="right">
                                                    {selectedAnnounce.announce.carburant}
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Nombre de chevaux
                                                </TableCell>
                                                <TableCell align="right">
                                                    {selectedAnnounce.announce.chv}
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Couleur
                                                </TableCell>
                                                <TableCell align="right">
                                                    {selectedAnnounce.announce.color}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    kilométrage
                                                </TableCell>
                                                <TableCell align="right">
                                                    {selectedAnnounce.announce.kilo}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Prix
                                                </TableCell>
                                                <TableCell align="right">
                                                    {selectedAnnounce.announce.price} €
                                                </TableCell>
                                            </TableRow>


                                        </TableBody>
                                    </Table>
                                </Paper>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

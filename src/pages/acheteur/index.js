import React, {useEffect, useState} from "react";
import './style.css';
import {

    Link
} from "react-router-dom";
import {Container, Row, Col, toast, ToastContainer} from '../../shared'
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Icon, Result} from 'antd';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import * as CONSTANTS from "../../shared/constants";
import {Announce} from '../../components'


export default function Products() {
    const [currentTypes, setCurrentTypes] = useState([]);
    const [selectedType, setSelectedType] = useState({title: '', _id: '0'});

    const [currentMarques, setCurrentMarquess] = useState([]);
    const [selectedMarque, setSelectedMarque] = useState({title: '', _id: '0'});

    const [currentModels, setCurrentModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState({title: '', _id: '0'});

    const [currentAnnonces, setCurrentAnnonces] = useState([]);

    useEffect(() => {
        fetChTypes()
    }, []);

    const fetChTypes = () => {

        fetch(CONSTANTS.GET_TYPES)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setCurrentTypes(data.body);
                } else {
                    setCurrentTypes([]);
                }
            })
            .catch(error => {
                setCurrentTypes([]);
            });
    }
    const fetchMarques = (id) => {
        if (id == 0) {
            return;
        }
        setSelectedMarque({title: '', _id: '0'});
        setCurrentMarquess([]);
        setSelectedModel({title: '', _id: '0'});
        setCurrentModels([]);
        fetch(CONSTANTS.GET_MARQUES + "?typeid=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setCurrentMarquess(data.body);
                } else {
                    setCurrentMarquess([]);

                }
            })
            .catch(error => {
                setCurrentMarquess([]);

            });
    };

    const fetchModels = (id) => {
        if (id == 0) {
            return;
        }

        fetch(CONSTANTS.GET_MODELS + "?marqueid=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setCurrentModels(data.body);
                } else {
                    setCurrentModels([]);
                }
            })
            .catch(error => {
                setCurrentModels([]);

            });
    }

    const fetchVehicles = (typeid, markid, modelid) => {
        if (typeid == 0) {
            return;
        }
        fetch(
            `${CONSTANTS.GET_ANNOUNCES}${queryGenerator(typeid,markid,modelid)}`
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setCurrentAnnonces(data.body);
                } else {
                    setCurrentAnnonces([]);

                }
            })
            .catch(error => {
            });
    }
    return (

        <Container fluid style={{minHeight: '100vh'}}>
            <Row>
                <Col xs={12} md={5} lg={4}>
                    <Card title="Filtres" bordered={false} style={{width: '100%'}}>
                        <Container fluid>
                            <Row className={"pt-3"}>
                                <Col xs={12}>
                                    <Autocomplete
                                        id="combo-box-marques"
                                        options={currentTypes}
                                        getOptionLabel={option => option.title}
                                        value={selectedType}
                                        style={{width: '100%'}}
                                        autoComplete={false}
                                        disableClearable
                                        onChange={(ev, value) => {
                                            if (value) {
                                                setSelectedType(value);
                                                fetchMarques(value._id);
                                                fetchVehicles(value._id, 0, 0);

                                            }
                                        }}
                                        renderInput={params => (
                                            <TextField autoComplete="new-password" {...params} label="Select Type"
                                                       variant="outlined" fullWidth/>
                                        )}

                                    />
                                </Col>
                            </Row>

                            <Row className={"pt-3"}>
                                <Col xs={12}>
                                    <Autocomplete
                                        id="combo-box-marques"
                                        options={currentMarques}
                                        getOptionLabel={option => option.title}
                                        value={selectedMarque}
                                        style={{width: '100%'}}
                                        disableClearable
                                        autoComplete={false}
                                        onChange={(ev, val) => {
                                            if (val) {
                                                setSelectedMarque(val);
                                                fetchModels(val._id);
                                                fetchVehicles(selectedType._id, val._id, selectedModel._id);

                                            }

                                        }}
                                        renderInput={params => (
                                            <TextField autoComplete="new-password" {...params} label="Select Marque"
                                                       variant="outlined" fullWidth/>
                                        )}

                                    />
                                </Col>
                            </Row>
                            <Row className={"pt-3"}>
                                <Col xs={12}>
                                    <Autocomplete
                                        id="combo-box-models"
                                        options={currentModels}
                                        getOptionLabel={option => option.title}
                                        value={selectedModel}
                                        style={{width: '100%'}}
                                        disableClearable

                                        onChange={(ev, val) => {
                                            if (val) {
                                                setSelectedModel(val);
                                                fetchVehicles(selectedType._id, selectedMarque._id, val._id);
                                            }
                                        }}
                                        renderInput={params => (
                                            <TextField autoComplete="new-password" {...params} label="Select Model"
                                                       variant="outlined" fullWidth/>
                                        )}

                                    />
                                </Col>
                            </Row>

                        </Container>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={8}>
                    <Container fluid>
                        <Row style={{justifyContent: 'center'}}>
                            {currentAnnonces.length > 0 ? currentAnnonces.map(entry => (
                                <div
                                    key={entry._id}
                                    className="col-lg-4 col-md-6 col-12 p-2 mx-auto"
                                >
                                    <Announce
                                        name={entry.title}
                                        type={entry.carburant}
                                        color={entry.color}
                                        chv={entry.chv}
                                        price={entry.price}
                                        img={entry.img_cover}
                                        id={entry._id}
                                    />
                                </div>
                            )) : <Result
                                icon={<Icon type="smile" theme="twoTone"/>}
                                title="No annonces for this category"
                            />}
                        </Row>
                    </Container>
                </Col>

            </Row>
        </Container>
    )
};


function queryGenerator(type,marque,model) {
    let query="?"
    if(type){
        if(type!=0){
            query+="typeid="+type;
        }
    }
    if(marque){
        if(marque!=0){
            query+="&marqueid="+marque;
        }
    }
    if(model){
        if(model!=0){
            query+="&modelid="+model;
        }
    }

    return query;
}

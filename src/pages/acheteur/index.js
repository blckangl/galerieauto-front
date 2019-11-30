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
    const [selectedType, setSelectedType] = useState({name: '', id: 0});

    const [currentMarques, setCurrentMarquess] = useState([]);
    const [selectedMarque, setSelectedMarque] = useState({name: '', id: 0});

    const [currentModels, setCurrentModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState({name: '', id: 0});

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
                console.log(data.body);
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
        setSelectedMarque({name: '', id: '0'});
        setCurrentModels([]);
        fetch(CONSTANTS.API_URL + "marques/read.php?id=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {

                if (data.records) {

                    setCurrentMarquess(data.records);
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
        setSelectedModel({name: '', id: '0'});

        fetch(CONSTANTS.API_URL + "models/read.php?id=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.records) {
                    setCurrentModels(data.records);
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
            `${CONSTANTS.API_URL}vehicles/read.php?type_id=${typeid}&marque_id=${markid}&model_id=${modelid}`
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.records) {
                    setCurrentAnnonces(data.records);
                } else {
                    setCurrentAnnonces([]);

                }
            })
            .catch(error => {
            });
    }
    console.log(currentTypes);
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
                                                fetchMarques(value.id);
                                                fetchVehicles(value.id, selectedMarque.id, selectedModel.id);

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
                                        getOptionLabel={option => option.name}
                                        value={selectedMarque}
                                        style={{width: '100%'}}
                                        disableClearable

                                        onChange={(ev, val) => {
                                            if (val) {
                                                setSelectedMarque(val);
                                                fetchModels(val.id);
                                                fetchVehicles(selectedType.id, val.id, selectedModel.id);

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
                                        id="combo-box-marques"
                                        options={currentModels}
                                        getOptionLabel={option => option.name}
                                        value={selectedModel}
                                        style={{width: '100%'}}
                                        disableClearable

                                        onChange={(ev, val) => {
                                            if (val) {
                                                setSelectedModel(val);
                                                fetchVehicles(selectedType.id, selectedMarque.id, val.id);

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
                      <Row style={{justifyContent:'center'}}>
                          {currentAnnonces.length > 0 ? currentAnnonces.map(entry => (
                              <div
                                  key={entry.id}
                                  className="col-lg-4 col-md-6 col-12 p-2 mx-auto"
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



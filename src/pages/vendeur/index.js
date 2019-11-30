import React, {useCallback, useEffect, useState} from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from "@material-ui/core/Paper";
import {Upload, Icon, Result} from 'antd';
import {message} from 'antd';

import * as CONSTANTS from '../../shared/constants';
import Modal from 'react-bootstrap/Modal'
import {DatePicker} from 'antd';

import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import {SignUp} from "../../components/sign-up";
import * as AOS from "aos";
import {Car, Loisir, Suv, Moto} from '../../assets';
import {useCookies} from "react-cookie";

const {RangePicker} = DatePicker;

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

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function Vendeur() {
    useEffect(() => {
        if (!tokenCookie) {
            handleShow();
            return;
        }
        if (!tokenCookie.token) {
            handleShow();
        }
    }, []);

    const [show, setShow] = useState(false);
const [isDone,setIsDone] = useState(false);

    const classes = useStyles();

    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);

    const [currentModels, setCurrentModels] = useState([]);
    const [currentMarques, setCurrentMarques] = useState([]);

    const [fileList, setList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [title, setTitle] = useState('');
    const [isTitleError, setTitleError] = useState(false);

    const [description, setDescription] = useState('');
    const [isDescriptionError, setDescriptionError] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneError, setPhoneError] = useState(false);

    const [selectedType, setSelectedType] = useState('');
    const [isSelectedTypeError, setSelectedTypeError] = useState(false);

    const [selectedModel, setSelectedModel] = useState({name: '', id: -1});
    const [isSelectedModelError, setSelectedModelError] = useState(false);

    const [selectedMarque, setSelectedMarque] = useState({name: '', id: -1});
    const [isSelectedMarqueError, setSelectedMarqueError] = useState(false);

    const [dateCirculation, setDateCiruclation] = useState('');
    const [isDateCirculationError, setDateCircuationError] = useState(false);

    const [kilometrage, setKilometrage] = useState('');
    const [isKilometrageError, setKilometrageError] = useState(false);

    const [nbChv, setNbChv] = useState('');
    const [isnbChvError, setNbhChvError] = useState(false);

    const [carburant, setCarburant] = useState('');
    const [isCarburantError, setCarburantError] = useState(false);

    const [selectedColor, setSelectedColor] = useState('');
    const [isColorError, setColorError] = useState(false);

    const [price, setPrice] = useState('');
    const [isPriceError, setPriceError] = useState(false);

    const [transmission, setTransmission] = useState('');
    const [isTransError, setTransError] = useState(false);

    const handleClose = () => setShow(true);
    const handleShow = () => setShow(true);
    const handleCancel = () => setPreviewVisible(false);

    const fetchMarques = (id) => {
        if (id == 0) {
            return;
        }
        fetch(CONSTANTS.API_URL + "marques/read.php?id=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {

                if (data.records) {

                    setCurrentMarques(data.records);
                } else {
                    setCurrentMarques([]);

                }
            })
            .catch(error => {
                setCurrentMarques([]);

            });
    };

    const fetchModels = (id) => {
        if (id == 0) {
            return;
        }
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

    const handlePreview = async file => {
        console.log("preview");
        console.log(file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);

    };
    const handleChange = ({fileList}) => {
        setList(fileList);
        console.log(fileList)
    };
    const uploadButton = (
        <div>
            <Icon type="plus"/>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const handleSubmitAnnonce = (event) => {
        if (!tokenCookie) {
            handleShow();
            return;
        }
        if (!tokenCookie.token) {
            handleShow();
        }
        let isError = false;
        setTitleError(false);
        setDescriptionError(false);
        setPhoneError(false);
        setSelectedMarqueError(false);
        setSelectedModelError(false);
        setDateCircuationError(false);
        setKilometrageError(false);
        setNbhChvError(false);
        setColorError(false);
        setCarburantError(false)
        setTransError(false);
        setPriceError(false);
        if (title.length < 2) {
            message.error('Le champ Titre est obligatoire');
            setTitleError(true);
            isError = true;
        }
        if (description.length < 2) {
            message.error('Le champ description est obligatoire');
            setDescriptionError(true);
            isError = true;
        }
        if (phoneNumber.length < 8) {
            message.error('Le champ Numéro de contact est obligatoire');
            setPhoneError(true);
            isError = true;
        }
        if (selectedMarque === '' || selectedMarque.id == -1) {
            message.error('Le champ Marque est obligatoire');
            setSelectedMarqueError(true);
            isError = true;
        }
        if (selectedModel === '' || selectedModel.id == -1) {
            message.error('Le champ Model est obligatoire');
            setSelectedModelError(true);
            isError = true;
        }

        if (dateCirculation.length < 2) {
            message.error('Le champ Date de circulation est obligatoire');
            setDateCircuationError(true);
            isError = true;
        }
        if (kilometrage === '') {
            message.error('Le champ Kilométrage est obligatoire');
            setKilometrageError(true);
            isError = true;
        }
        if (nbChv === '') {
            message.error('Le champ Nmbre de cheavaux est obligatoire');
            setNbhChvError(true);
            isError = true;
        }
        if (selectedColor === '') {
            message.error('Le champ Couleur est obligatoire');
            setColorError(true);
            isError = true;
        }
        if (transmission === '') {
            message.error('Le champ Transmission est obligatoire');
            setTransError(true);
            isError = true;
        }
        if (carburant.length < 2) {
            message.error('Le champ Carburant est obligatoire');
            setCarburantError(true);
            isError = true;
        }
        if (price === '') {
            message.error('Le champ Prix est obligatoire');
            setPriceError(true);
            isError = true;
        }
        if (fileList.length < 1) {
            message.error('une image est obligatoire');

            isError = true;
        }

        if (isError) {
            message.error('Fail');
            return;

        }

        let body = {
            token: tokenCookie.token,
            name: title,
            description: description,
            color: selectedColor,
            chv: nbChv,
            carburant: carburant,
            price: price,
            circulation_date: dateCirculation[0] + "/" + dateCirculation[1],
            Transmission: transmission,
            kilo: kilometrage,
            nb_port: 4,
            model_id: selectedModel.id,
            marque_id: selectedMarque.id,
            type_id: selectedType,
            img_cover: CONSTANTS.API_URL + "public/img/" + fileList[0].response.FileName,
            contact_phone: phoneNumber
        };
        console.log(body);
        fetch(CONSTANTS.API_URL + "vehicles/create.php", {
            method: "post",
            body: JSON.stringify(body)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.success){
                    message.success("Done ");
                    setIsDone(true);
                }else{
                    setIsDone(false);
                    message.error(data.message);
                }
            })
            .catch(error => {
                message.error(error);
            });


    }
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        console.log(selectedType);
        fetchMarques(e.target.value);
        setSelectedModel({name: '', id: -1});
        setSelectedMarque({name: '', id: -1});

    }
    const handleModelChange = (e, value) => {
        setSelectedModel(value);

    }
    const handleMarqueChange = (e, value) => {
        setSelectedMarque(value);
        setSelectedModel({name: '', id: -1});
        fetchModels(value.id);

    }
    const handleTitleChange = (e) => {

        setTitle(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleDate1Change = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setDateCiruclation(dateString);
    }
    const handleDate2Change = (value) => {
        console.log('Selected Time ok: ', value);
    }
    const handleCarburantChange = (e) => {
        setCarburant(e.target.value);
    }
    const handleNbChvChange = (e) => {
        setNbChv(e.target.value);
    }
    const handleKiloChange = (e) => {
        setKilometrage(e.target.value);
    }
    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }
    const handleTransmissionChange = (e) => {
        console.log(transmission);
        setTransmission(e.target.value);
    }
    return (
     <div>
         {isDone? <Result
             status="success"
             title="Success :)"
             subTitle="Votre annonces est ajoutée"
             // extra={[
             //     <Button type="primary" key="console">
             //         Go Console
             //     </Button>,
             //     {/*<Button key="buy">Buy Again</Button>,*/}
             // ]}
         />:  <form className={classes.container} noValidate autoComplete="off">

             <Container>
                 <Paper className={"p-3"}>

                     <Row className={"pt-3"}>

                         <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                             <label className="radiocontainer">
                                 <img
                                     style={{height: 60 + "px"}}
                                     src={Moto}
                                 />
                                 <p>Moto</p>
                                 <input
                                     type="radio"
                                     name="type"
                                     value="2"
                                     onChange={handleTypeChange}
                                 />
                                 <span className="checkmark"></span>
                             </label>
                         </div>
                         <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                             <label className="radiocontainer">
                                 <img style={{height: 60 + "px"}} src={Suv}/>
                                 <p>Utilitaire</p>
                                 <input
                                     type="radio"
                                     name="type"
                                     value="3"
                                     onChange={handleTypeChange}
                                 />
                                 <span className="checkmark"></span>
                             </label>
                         </div>
                         <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                             <label className="radiocontainer">
                                 <img style={{height: 60 + "px"}} src={Car}/>
                                 <p>Voiture</p>
                                 <input
                                     type="radio"
                                     name="type"
                                     value="1"
                                     onChange={handleTypeChange}

                                 />
                                 <span className="checkmark"></span>
                             </label>
                         </div>
                         <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                             <label className="radiocontainer">
                                 <img
                                     style={{height: 60 + "px"}}
                                     src={Loisir}
                                 />
                                 <p>Loisir </p>
                                 <input
                                     type="radio"
                                     name="type"
                                     value="4"
                                     onChange={handleTypeChange}
                                 />
                                 <span className="checkmark"/>
                             </label>
                         </div>

                     </Row>

                     <Row className={"pt-3"}>
                         <Col>

                             <TextField
                                 id="titlefield"
                                 label="Title"
                                 className={classes.textField}
                                 margin="normal"
                                 required
                                 onChange={handleTitleChange}
                                 error={isTitleError}
                             />

                         </Col>

                     </Row>
                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="descriptionField"
                                 label="Description"
                                 className={classes.textField}
                                 margin="normal"
                                 required
                                 multiline
                                 onChange={handleDescriptionChange}
                                 error={isDescriptionError}
                             />
                         </Col>
                     </Row>
                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="numfield"
                                 label="Numéro de contact"
                                 className={classes.textField}
                                 margin="normal"
                                 type="number"
                                 required
                                 onChange={handlePhoneNumberChange}
                                 error={isPhoneError}
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
                                 onChange={handleMarqueChange}
                                 renderInput={params => (
                                     <TextField {...params} label="Select Marque" variant="outlined" fullWidth/>
                                 )}

                             />
                         </Col>
                     </Row>
                     <Row className={"pt-3"}>
                         <Col xs={12}>
                             <Autocomplete
                                 id="combo-box-models"
                                 options={currentModels}
                                 getOptionLabel={option => option.name}
                                 style={{width: '100%'}}
                                 onChange={handleModelChange}
                                 value={selectedModel}
                                 renderInput={params => (
                                     <TextField {...params} label="Select Model" variant="outlined" fullWidth/>
                                 )}

                             />
                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <RangePicker
                                 style={{width: '100%'}}
                                 format="YYYY-MM-DD"
                                 placeholder={['Date de mise en circulation (Début)', 'Date de mise en circulation(Fin)']}
                                 onChange={handleDate1Change}
                                 onOk={handleDate2Change}

                             />

                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="kmfield"
                                 label="Kilométrage"
                                 className={classes.textField}
                                 margin="normal"
                                 type="number"
                                 required
                                 onChange={handleKiloChange}
                                 error={isKilometrageError}
                             />

                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="nbcgvfield"
                                 label="Nombre de cheavaux"
                                 className={classes.textField}
                                 margin="normal"
                                 type="number"
                                 required
                                 onChange={handleNbChvChange}
                                 error={isnbChvError}
                             />

                         </Col>
                     </Row>
                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="nbcgvfield"
                                 label="Carburant"
                                 className={classes.textField}
                                 margin="normal"
                                 required
                                 onChange={handleCarburantChange}
                                 error={isCarburantError}
                             />

                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="transfield"
                                 label="Transmission"
                                 className={classes.textField}
                                 margin="normal"
                                 required
                                 onChange={handleTransmissionChange}
                                 error={isTransError}
                             />

                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="colorfield"
                                 label="Couleur"
                                 className={classes.textField}
                                 margin="normal"
                                 required
                                 onChange={handleColorChange}
                                 error={isColorError}
                             />
                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <TextField
                                 id="prixfiled"
                                 label="Prix"
                                 className={classes.textField}
                                 margin="normal"
                                 required
                                 onChange={handlePriceChange}
                                 error={isPriceError}
                                 type={"number"}
                             />
                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <div className="clearfix">
                                 <Upload
                                     action={`${CONSTANTS.API_URL}upload.php`}
                                     listType="picture-card"
                                     fileList={fileList}
                                     onPreview={handlePreview}
                                     onChange={handleChange}
                                     name={"upfile"}
                                 >
                                     {fileList.length >= 8 ? null : uploadButton}
                                 </Upload>
                                 <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                     <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                 </Modal>
                             </div>
                         </Col>
                     </Row>

                     <Row className={"pt-3"}>
                         <Col>
                             <Button
                                 variant="contained"
                                 color="primary"
                                 size="large"
                                 className={classes.button}
                                 startIcon={<SaveIcon/>}
                                 onClick={(event) => {
                                     handleSubmitAnnonce();
                                 }}
                             >
                                 Save
                             </Button>
                         </Col>
                     </Row>
                 </Paper>

                 <Modal className={"p-0"} show={show} onHide={handleClose}>

                     <Modal.Body>
                         <SignUp></SignUp>
                     </Modal.Body>

                 </Modal>
             </Container>

         </form>}


     </div>
    );


}

import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from "@material-ui/core/Paper";
import { Upload, Icon, Result } from 'antd';
import { message } from 'antd';

import * as CONSTANTS from '../../shared/constants';
import Modal from 'react-bootstrap/Modal'
import { DatePicker } from 'antd';

import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import { SignUp } from "../../components/sign-up";
import * as AOS from "aos";
import { Car, Loisir, Suv, Moto } from '../../assets';
import { useCookies } from "react-cookie";
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const { RangePicker } = DatePicker;

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
    const [isDone, setIsDone] = useState(false);

    const classes = useStyles();

    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);
    const [currentModels, setCurrentModels] = useState([]);
    const [currentMarques, setCurrentMarques] = useState([]);
    const [fileList, setList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [title, setTitle] = useState('');
    const [isTitleError, setTitleError] = useState(false);

    const [email, setEmail] = useState('');
    const [isEmailError, setEmailError] = useState(false);

    const [description, setDescription] = useState('');
    const [isDescriptionError, setDescriptionError] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneError, setPhoneError] = useState(false);

    const [selectedType, setSelectedType] = useState('');
    const [isSelectedTypeError, setSelectedTypeError] = useState(false);

    const [selectedModel, setSelectedModel] = useState({ name: '', id: -1 });
    const [isSelectedModelError, setSelectedModelError] = useState(false);

    const [selectedMarque, setSelectedMarque] = useState({ name: '', id: -1 });
    const [isSelectedMarqueError, setSelectedMarqueError] = useState(false);

    const [dateCirculation, setDateCiruclation] = useState('');
    const [isDateCirculationError, setDateCircuationError] = useState(false);

    const [kilometrage, setKilometrage] = useState('');
    const [isKilometrageError, setKilometrageError] = useState(false);

    const [nbChv, setNbChv] = useState('');
    const [isnbChvError, setNbhChvError] = useState(false);

    const [carburant, setCarburant] = useState({ title: 'carburant', value: 'carburant' });
    const [isCarburantError, setCarburantError] = useState(false);

    const [selectedColor, setSelectedColor] = useState('');
    const [isColorError, setColorError] = useState(false);

    const [price, setPrice] = useState('');
    const [isPriceError, setPriceError] = useState(false);

    const [isTransError, setTransError] = useState(false);

    const handleClose = () => setShow(true);
    const handleShow = () => setShow(true);
    const handleCancel = () => setPreviewVisible(false);

    const fetchMarques = (id) => {
        if (id == 0) {
            return;
        }
        fetch(CONSTANTS.GET_MARQUES + "?typeid=" + id)
            .then(response => {
                return response.json();
            })
            .then(data => {

                if (data.success) {

                    setCurrentMarques(data.body);
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
        setSelectedModel({ title: '', _id: '0' });

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

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const customprops = {
        name: 'image',
        action: `${CONSTANTS.UPLOAD}`,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setList([...info.fileList]);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const uploadButton = (
        <div>
            <Icon type="plus" />
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
        setEmailError(false);
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
        if (email.length < 6) {
            message.error('Le champ Email est obligatoire');
            setEmailError(true);
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

        if (carburant.value == "carburant") {
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
            title: title,
            email: email,
            description: description,
            color: selectedColor,
            chv: nbChv,
            carburant: carburant.value,
            price: price,
            circulation_date: dateCirculation[0],
            kilo: kilometrage,
            model_id: selectedModel._id,
            marque_id: selectedMarque._id,
            type_id: selectedType,
            img_cover: fileList[0]['response'].body.filename,
            contact_phone: phoneNumber
        };


        fetch(CONSTANTS.POST_ANNOUNCES, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenCookie.token}`
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    message.success("Done ");
                    setIsDone(true);
                } else {
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

        setSelectedModel({ title: '', _id: -1 });
        setSelectedMarque({ title: '', _id: -1 });
        fetchMarques(e.target.value);
    }

    const carburantoptions = [{ title: 'ESSENCE', value: 'ESSENCE' }, {
        title: 'DIESEL',
        value: 'DIESEL'
    }, { title: 'ELECTRICITY', value: 'ELECTRICITY' }, { title: 'OTHER', value: 'OTHER' }]
    const handleModelChange = (e, value) => {
        setSelectedModel(value);
    }
    const handleMarqueChange = (e, value) => {
        setSelectedMarque(value);
        setSelectedModel({ title: '', _id: -1 });
        fetchModels(value._id);
    }
    const handleTitleChange = (e) => {

        setTitle(e.target.value);
    }
    const handleEmailChange = e => {
        setEmail(e.target.value);

    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleDate1Change = (value, dateString) => {

        setDateCiruclation(dateString);
    }
    const handleDate2Change = (value) => {
    }
    const handleCarburantChange = (e, value) => {
        setCarburant(value);
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

    return (
        <div>
            {isDone ? <Result
                status="success"
                title="Success :)"
                subTitle="Votre annonces est ajoutée"
            // extra={[
            //     <Button type="primary" key="console">
            //         Go Console
            //     </Button>,
            //     {/*<Button key="buy">Buy Again</Button>,*/}
            // ]}
            /> : <form className={classes.container} noValidate autoComplete="off">

                    <Container>
                        <Paper className={"p-3"}>

                            <Row className={"pt-3"}>

                                <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                                    <label className="radiocontainer">
                                        <img
                                            style={{ height: 60 + "px" }}
                                            src={Moto}
                                        />
                                        <p>Moto</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="5e1c39ce4581ad51c71345f5"
                                            onChange={handleTypeChange}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                                    <label className="radiocontainer">
                                        <img style={{ height: 60 + "px" }} src={Suv} />
                                        <p>Utilitaire</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="5e1c39d44581ad51c71345f6"
                                            onChange={handleTypeChange}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                                    <label className="radiocontainer">
                                        <img style={{ height: 60 + "px" }} src={Car} />
                                        <p>Voiture</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="5e1c2e92ef85847aeccd70f0"
                                            onChange={handleTypeChange}

                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="col-6 col-md-3 text-center d-flex justify-content-center">
                                    <label className="radiocontainer">
                                        <img
                                            style={{ height: 60 + "px" }}
                                            src={Loisir}
                                        />
                                        <p>Loisir </p>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="5e1c39ee4581ad51c71345f7"
                                            onChange={handleTypeChange}
                                        />
                                        <span className="checkmark" />
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
                                        type="email"
                                        id="email"
                                        label="Email"
                                        className={classes.textField}
                                        margin="normal"
                                        required
                                        onChange={handleEmailChange}
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
                                        getOptionLabel={option => option.title}
                                        value={selectedMarque}
                                        style={{ width: '100%' }}
                                        onChange={handleMarqueChange}
                                        renderInput={params => (
                                            <TextField {...params} label="Select Marque" variant="outlined" fullWidth />
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
                                        style={{ width: '100%' }}
                                        onChange={handleModelChange}
                                        value={selectedModel}
                                        renderInput={params => (
                                            <TextField {...params} label="Select Model" variant="outlined" fullWidth />
                                        )}

                                    />
                                </Col>
                            </Row>

                            <Row className={"pt-3"}>
                                <Col>
                                    <RangePicker
                                        style={{ width: '100%' }}
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

                                    <Autocomplete
                                        id="combo-box-models"
                                        options={carburantoptions}
                                        getOptionLabel={option => option.title}
                                        style={{ width: '100%' }}
                                        onChange={handleCarburantChange}
                                        value={carburant}
                                        renderInput={params => (
                                            <TextField {...params} label="Carburant" variant="outlined" fullWidth />
                                        )}

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
                                        {/*<Upload*/}
                                        {/*    action={`${CONSTANTS.UPLOAD}`}*/}
                                        {/*    listType="picture-card"*/}
                                        {/*    fileList={fileList}*/}
                                        {/*    previewFile={handlePreview}*/}
                                        {/*    onChange={handleChange}*/}
                                        {/*    name={"image"}*/}
                                        {/*    beforeUpload={beforeUpload}*/}
                                        {/*>*/}
                                        {/*    {fileList.length >= 8 ? null : uploadButton}*/}
                                        {/*</Upload>*/}
                                        {/*<Upload*/}
                                        {/*    action={`${CONSTANTS.UPLOAD}`}*/}
                                        {/*    fileList={fileList}*/}
                                        {/*    onChange={handleChange}*/}
                                        {/*    name={"image"}*/}
                                        {/*    beforeUpload={beforeUpload}*/}
                                        {/*>*/}
                                        {/*    <Button>*/}
                                        {/*        <Icon type="upload" /> Click to Upload*/}
                                        {/*    </Button>*/}
                                        {/*</Upload>*/}

                                        <Upload {...customprops}>
                                            <Button>
                                                <Icon type="upload" /> Click to Upload
                                        </Button>
                                        </Upload>
                                        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
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
                                        startIcon={<SaveIcon />}
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

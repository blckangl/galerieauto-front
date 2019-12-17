// const API_URL="https://api.crakenagency.space/";
const API_URL = "https://api.galerieauto.fr/";
// const API_URL = "http://localhost:8080/";
//

const PUBLIC_UPLOAD_FOLDER_URL = API_URL+"public/uploads/";
const GET_TYPES = API_URL + "api/types/get";
const GET_MARQUES = API_URL + "api/marques/get";
const GET_MODELS = API_URL + "api/models/get";
const GET_ANNOUNCES = API_URL + "api/announce/get";
const GET_UNCONFIRMED_ANNOUNCES = API_URL + "api/announce/unconfirmed/get";
const GET_ANNOUNCES_user = API_URL + "api/announce/get/byuser";
const SET_USER_ROLE = API_URL + "users/setrole";

const POST_MARQUES = API_URL + "api/marques/add";
const POST_MODELS = API_URL + "api/models/add";

const POST_ANNOUNCES = API_URL + "api/announce/add";
const CONFIRME_ANNOUNCES = API_URL + "api/announce/confirme";

const DELETE_USER = API_URL + "users/delete";
const DELETE_ANNOUNCE = API_URL + "api/announce/delete";


const LOGIN = API_URL + "users/signin";
const SIGNUP = API_URL + "users/signup";
const UPLOAD =API_URL+"api/upload";
const USERS_LIST_URL=API_URL+"api/users/get";
export {API_URL,DELETE_ANNOUNCE,DELETE_USER,SET_USER_ROLE,POST_MODELS,PUBLIC_UPLOAD_FOLDER_URL,POST_MARQUES,GET_TYPES,GET_MARQUES,GET_MODELS,GET_ANNOUNCES,GET_UNCONFIRMED_ANNOUNCES,POST_ANNOUNCES,CONFIRME_ANNOUNCES,LOGIN,SIGNUP,UPLOAD,USERS_LIST_URL,GET_ANNOUNCES_user};

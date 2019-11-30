// const API_URL="https://api.crakenagency.space/";
const API_URL = "http://localhost:8080/";
const GET_TYPES = API_URL + "api/types/get";
const GET_MARQUES = API_URL + "api/marques/get";
const GET_MODELS = API_URL + "api/models/get";
const GET_ANNOUNCES = API_URL + "api/announce/get";
const GET_UNCONFIRMED_ANNOUNCES = API_URL + "api/announce/unconfirmed/get";

const POST_ANNOUNCES = API_URL + "api/types/get";
const CONFIRME_ANNOUNCES = API_URL + "api/announce/confirme";

const LOGIN = API_URL + "users/signin";
const SIGNUP = API_URL + "users/signup";

export {API_URL,GET_TYPES,GET_MARQUES,GET_MODELS,GET_ANNOUNCES,GET_UNCONFIRMED_ANNOUNCES,POST_ANNOUNCES,CONFIRME_ANNOUNCES,LOGIN,SIGNUP};

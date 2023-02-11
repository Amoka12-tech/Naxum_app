import apiRoute from "../utils/apiConfig";

const API = apiRoute;

export const login = (data) => API.post('/login', data);
export const logout = () => API.get('/logout');
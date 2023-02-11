import apiRoute from "../utils/apiConfig";

const API = apiRoute;

export const login = (data) => API.post('/login', data);
export const logout = () => API.get('/logout');
export const profile = () => API.get('/me/profile');
export const edit_profile = (data) => API.patch('/me/profile', data);
import apiRoute from "../utils/apiConfig";

const API = apiRoute;

export const get_contacts = () => API.get('/contacts');
export const search_contact = (query) => API.get(`/contacts/search/search/${query}`);
export const create_contact = (data) => API.post('/contacts', data);
export const api_edit_contact = (id, data) => API.patch(`/contacts/${id}`, data);
export const api_delete_contact = (id) => API.delete(`/contacts/${id}`);
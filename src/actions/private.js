import { api_delete_contact, api_edit_contact, create_contact, get_contacts, search_contact } from "../api/private";
import { add_contact, all_contacts, delete_contact, edit_contact } from "../reducers/contacts";
import { show } from "../reducers/message";
import { clear_login } from "./auth";

const messageData = {
    type: null,
    message: null,
};

const check_error_type = (error, action) => {
    console.log(error?.response?.data);
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        const errorResponse = {
            status,
            message
        };
        if (message === "Unauthenticated") {
            clear_login(action);
        } else {
            const messageObject = {
                type: 'failed',
                message: message
            };
            action(show(messageObject))
        }
};

const get_user_contacts = async (action, setProcessing) => {
    setProcessing(true);
    try {
        const { data } = await get_contacts();
        setProcessing(false);
        // console.log(data);
        action(all_contacts(data));
    } catch (error) {
        setProcessing(false);
        check_error_type(error, action);
    }
};

const search_user_contacts = async (query, action, setProcessing) => {
    setProcessing(true);
    try {
        const { data } = await search_contact(query);
        setProcessing(false);
        action(all_contacts(data))
    } catch (error) {
        setProcessing(false);
        check_error_type(error, action)
    }
};

const create_user_contact = async (payload, action, setProcessing, navigation) => {
    setProcessing(true);
    try {
        const { data } = await create_contact(payload);
        const result = data?.result;
        action(add_contact(result));
        setProcessing(false);
        messageData.type = 'successful',
        messageData.message = 'Contact added!'
        navigation.goBack();
        action(show(messageData));
    } catch (error) {
        setProcessing(false);
        check_error_type(error, action);
    }
};

const edit_user_contact = async (contact, payload, action, setProcessing) => {
    setProcessing(true);
    try {
        const updatedContact = {...contact, ...payload};
        await api_edit_contact(contact.id, payload);
        action(edit_contact(updatedContact));
        setProcessing(false);
        messageData.type = 'successful'
        messageData.message = 'Contact updated!'
        action(show(messageData));
    } catch (error) {
        setProcessing(false);
        check_error_type(error);
    }
};

const delete_user_contact = async (payload, action, setProcessing, navigation) => {
    setProcessing(true);
    try {
        await api_delete_contact(payload.id);
        action(delete_contact(payload));
        setProcessing(false);
        navigation.goBack();
        messageData.type = 'successful'
        messageData.message = 'Contact removed!'
        action(show(messageData));
    } catch (error) {
        setProcessing(false);
        check_error_type(error);
    }
};

export {create_user_contact, get_user_contacts, edit_user_contact, delete_user_contact, search_user_contacts};
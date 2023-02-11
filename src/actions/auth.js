
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { edit_profile, login, logout, profile } from '../api/auth';
import { authenticate, initLogout, logOut, update_user } from '../reducers/auth';
import { toggleDrawer } from '../reducers/drawer';
import { show } from '../reducers/message';

const messageData = {
    type: null,
    message: null,
};

const login_user = async (payload, action, setProcessing) => {
    setProcessing(true)
    try {
        const { data } = await login(payload);
        // console.log(data?.token);
        const jsonData = JSON.stringify(data);
        await SecureStore.setItemAsync('_user', jsonData);
        action(authenticate(data));
        setProcessing(false)
    } catch (error) {
        console.log(error?.response);
        const status = error?.response?.status;
        const message = error?.response?.data?.error
        const errorResponse = {
            status,
            message
        };
        setProcessing(false)
        Alert.alert('Wrong username/password');
    }
};

const update_user_storage = async (payload) => {
    try {
        const data = await SecureStore.getItemAsync('_user');
        const jsonData = JSON.parse(data);
        const dataToStore = {
            token: jsonData?.token,
            user: {...jsonData?.user, ...payload}
        };
        const jsonDataToStore = JSON.stringify(dataToStore);
        await SecureStore.setItemAsync('_user', jsonDataToStore);
        return;
    } catch (error) {
        return error;
    }
};

const get_user_profile = async (action) => {
    //get user data and send to auth redux state
    try {
        const { data } = await profile();
        // console.log('Get profile: ', data);
        await update_user_storage(data);
        action(update_user(data));
    } catch (error) {
        console.log(error?.response);
        const status = error?.response?.status;
        const message = error?.response?.data?.message
        const errorResponse = {
            status,
            message
        };
        if (message === "Unauthenticated") {
            clear_login(action);
        }
    }
};

const update_user_profile = async (payload, action, setProcessing) => {
    setProcessing(true);
    try {
        const { data } = await edit_profile(payload);
        await update_user_storage(payload);
        action(update_user(payload));
        // console.log('Request data: ', payload);
        console.log('Updated user: ', data);
        setProcessing(false);
        messageData.type = 'success';
        messageData.message = 'Profile updated!';
        action(show(messageData));
    } catch (error) {
        setProcessing(false);
        console.log(error?.response);
        const status = error?.response?.status;
        const message = error?.response?.data?.message
        const errorResponse = {
            status,
            message
        };
        if (message === "Unauthenticated") {
            clear_login(action);
        }
    }
};

const clear_login = async (action) => {
    try {
        await SecureStore.deleteItemAsync('@user');
        action(logOut());
        Alert.alert('You have been logout, please login again!')
        return {message: 'Session Expired! please login.'}
    } catch (error) {
        return error
    }
}

const logout_user = async (setIsLoading, action) => {
    setIsLoading(true);
    try {
        await logout();
        await SecureStore.deleteItemAsync('_user');
        action(logOut());
        action(toggleDrawer(false));
        action(initLogout(false));
        setIsLoading(false)
        return {message: 'Session Expired! please login.'}
        
    } catch (error) {
        setIsLoading(false)
        console.log(error?.response?.data?.message);
        const status = error?.response?.status;
        const message = error?.response?.data?.message
        const errorResponse = {
            status,
            message
        };
        if (message === "Unauthenticated") {
            clear_login(action);
        }
        return errorResponse;
    }
};

export {login_user, get_user_profile, update_user_profile, logout_user, clear_login};
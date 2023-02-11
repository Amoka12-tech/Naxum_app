
import * as SecureStore from 'expo-secure-store';
import { login, logout } from '../api/auth';
import { logOut } from '../reducers/auth';

const login_user = async (data) => {
    try {
        const { data } = await login(data);
        console.log(data);
    } catch (error) {
        return error;
    }
};

const get_user_profile = async () => {};

const update_user_profile = async (data) => {};

const clear_login = async () => {
    try {
        await SecureStore.deleteItemAsync('@user');
        logOut();
        return {message: 'Session Expired! please login.'}
    } catch (error) {
        return error
    }
}

const logout_user = async () => {
    try {
        await logout();
        await SecureStore.deleteItemAsync('@user');
        logOut();
        return {message: 'Session Expired! please login.'}
        
    } catch (error) {
        if (error?.message === "Unauthenticated") {
            clear_login();
        }
        return error;
    }
};

export {login_user, get_user_profile, update_user_profile, logout_user, clear_login};
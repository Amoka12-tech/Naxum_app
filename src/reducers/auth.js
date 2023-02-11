import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    isLoggedIn: false,
    user: null,
    token: null,
    initLogout: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        authenticate: (state, action) => {
            state.isLoading = false,
            state.isLoggedIn = true,
            state.user = action.payload?.user,
            state.token = action.payload?.token
        },
        update_user: (state, action) => {
            state.user = {...state.user, ...action.payload}
        },
        logOut: (state) => {
            state.isLoading = false,
            state.isLoggedIn = false,
            state.user = null,
            state.token = null
        },
        initLogout: (state, action) => {
            state.initLogout = action.payload
        },
    },
});

export const { authenticate, update_user, logOut, initLogout } = authSlice.actions;

export default authSlice.reducer;
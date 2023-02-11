import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageType: null,
    message: null,
};

const messageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        show: (state, action) => {
            console.log(action.payload);
            state.messageType = action.payload?.type,
            state.message = action.payload?.message
        },
        hide: (state, action) => {
            state.messageType = null,
            state.message = null
        },
    },
});

export const { show, hide } = messageSlice.actions;

export default messageSlice.reducer;
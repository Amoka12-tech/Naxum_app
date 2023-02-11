import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: initialState,
    reducers: {
        toggleDrawer: (state, action) => {
            state.open = action.payload
        },
    },
});

export const {toggleDrawer} = drawerSlice.actions;

export default drawerSlice.reducer;
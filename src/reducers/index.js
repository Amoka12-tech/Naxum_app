import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import messageReducer from "./message";
import drawerReducer from "./drawer";
import contactsReducer from "./contacts";

const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    drawer: drawerReducer,
    contacts: contactsReducer,
});


export default rootReducer;
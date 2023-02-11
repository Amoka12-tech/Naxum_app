import { createSlice } from "@reduxjs/toolkit";

const dummyData = [
    {
        id: 1,
        firstname: 'Abdulmutalib',
        lastname: 'Amoka',
        email: 'amokamutalibfut@gmail.com',
        phone: '+2348034329120',
        created_at: '2013-06-10',
    },
    {
        id: 1,
        firstname: 'Abdullahi',
        lastname: 'Amina',
        email: 'abdullahiamina95@gmail.com',
        phone: '+2348137741441',
        created_at: '2013-02-11',
    },
];

const initialData = {
    contacts: null,
    count: 0
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState: initialData,
    reducers: {
        all_contacts: (state, action) => {
            state.contacts = action.payload?.results,
            state.count = action.payload?.count
        },
        edit_contact: (state, action) => {
            const contactIndex = state.contacts.findIndex(c => c.id === action.payload?.id);
            state.contacts = state.contacts.map((contact, i) => {
                if(i === contactIndex) {
                    return action.payload;
                }
                return contact;
            });
        },
        add_contact: (state, action) => {
            state.contacts = [action.payload, ...state.contacts];
        },
        delete_contact: (state, action) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload?.id);
        },
    },
});

export const { all_contacts, edit_contact, add_contact, delete_contact } = contactSlice.actions;


export default contactSlice.reducer;
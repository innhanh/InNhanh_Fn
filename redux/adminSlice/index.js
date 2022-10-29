import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name: "admin",
    initialState: {
        Admin: []
    },
    reducers: {
        LoginSuccess: (state, actions) => {
            state.Admin = actions.payload;
        },
        LogoutSuccess: (state, actions) => {
            state.Admin = [];
        },
    }
});
export const {
    LoginSuccess,
    LogoutSuccess
} = AdminSlice.actions;

export default AdminSlice;
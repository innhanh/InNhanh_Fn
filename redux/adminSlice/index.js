import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name: "admin",
    initialState: {
        Admin: [],
    },
    reducers: {
        LoginSuccess: (state, actions) => {
            state.Admin = actions.payload;
        },
        LogoutSuccess: (state, actions) => {
            state.Admin = [];
        },
        EditAdminSuccess: (state, actions) => {
            state.Admin.Admin = actions.payload;
        }
    }
});
export const {
    LoginSuccess,
    LogoutSuccess,
    EditAdminSuccess
} = AdminSlice.actions;

export default AdminSlice;
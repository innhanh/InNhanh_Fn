import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        Pages: [],
        Carousels: [],
        Productions: [],
        Company: [],
        Branchs: []
    },
    reducers: {
        PagesSuccess: (state, actions) => {
            state.Pages = actions.payload;
        },
        CarouselSuccess: (state, actions) => {
            state.Carousels = actions.payload;
        },
        ProductionSuccess: (state, actions) => {
            state.Productions = actions.payload;
        },
        CompanySuccess: (state, actions) => {
            state.Company = actions.payload;
        },
        BranchsSccess: (state, actions) => {
            state.Branchs = actions.payload;
        }
    }
});
export const {
    PagesSuccess,
    CarouselSuccess,
    ProductionSuccess,
    CompanySuccess,
    BranchsSccess
} = DataSlice.actions;

export default DataSlice;
import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        Maintances: false,
        Categorys: [],
        Carousels: [],
        Productions: [],
        Partners: [],
        Company: [],
        Branchs: [],
        IntroImages: []
    },
    reducers: {
        MaintanceSuccess: (state, actions) => {
            state.Maintances = actions.payload
        },
        CategorySuccess: (state, actions) => {
            state.Categorys = actions.payload;
        },
        CarouselSuccess: (state, actions) => {
            state.Carousels = actions.payload;
        },
        ProductionSuccess: (state, actions) => {
            state.Productions = actions.payload;
        },
        PartnerSuccess: (state, actions) => {
            state.Partners = actions.payload;
        },
        CompanySuccess: (state, actions) => {
            state.Company = actions.payload;
        },
        BranchsSccess: (state, actions) => {
            state.Branchs = actions.payload;
        },
        IntroImageSuccess: (state, actions) => {
            state.IntroImages = actions.payload
        }

    }
});
export const {
    MaintanceSuccess,
    CategorySuccess,
    CarouselSuccess,
    ProductionSuccess,
    PartnerSuccess,
    CompanySuccess,
    BranchsSccess,
    IntroImageSuccess
} = DataSlice.actions;

export default DataSlice;
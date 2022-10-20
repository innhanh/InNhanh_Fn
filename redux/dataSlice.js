import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        Categorys: [],
        Carousels: [],
        Productions: []
    },
    reducers: {
        CategorySuccess: (state, actions) => {
            state.Categorys = actions.payload;
        },
        CarouselSuccess: (state, actions) => {
            state.Carousels = actions.payload;
        },
        ProductionSuccess: (state, actions) => {
            state.Productions = actions.payload;
        }
    }
});
export const {
    CategorySuccess,
    CarouselSuccess,
    ProductionSuccess
} = DataSlice.actions;

export default DataSlice;
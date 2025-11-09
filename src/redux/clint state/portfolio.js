import { createSlice } from "@reduxjs/toolkit";

const portfolioFilterInitialState = { cat: "all", search: "", page: 0};

const portfolioFilterSlice = createSlice({
    name: "portfolioFilter",
    initialState: portfolioFilterInitialState,
    reducers: {
        changeCategory: (state, action) => {
            state.cat = action.payload.cat;
        },
        search: (state, action) => {
            state.search = action.payload.search;
        },
        // nextItems: (state) => {
        //     state.page = state.page + 1;
        // },
        resetFilters: (state) => {
            state.cat = "all";
            state.search = "";
        }
    }
    
});

export const portfolioFilterSliceActions = portfolioFilterSlice.actions;
export default portfolioFilterSlice;
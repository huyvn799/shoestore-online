import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "~/requestMethod";

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        const res = await publicRequest.get("/products");
        return res?.data;
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // GET ALL 
        getProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductsSuccess: (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
    extraReducers: { 
        [productsFetch.pending]: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.items = action.payload;
            state.error = false;
        },
        [productsFetch.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { getProductsStart,
    getProductsSuccess,
    getProductsFailure } = productsSlice.actions;

export default productsSlice.reducer;
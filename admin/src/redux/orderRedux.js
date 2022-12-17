import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMethod";
import { toast } from "react-toastify";

export const ordersFetch = createAsyncThunk(
    "orders/ordersFetch",
    async () => {
        const res = await userRequest.get("/orders");
        return res?.data;
    }
)

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        items: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // GET ALL 
        getOrdersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getOrdersSuccess: (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getOrdersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
    extraReducers: { 
        [ordersFetch.pending]: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        [ordersFetch.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.items = action.payload;
            state.error = false;
        },
        [ordersFetch.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure, } = ordersSlice.actions;

export default ordersSlice.reducer;
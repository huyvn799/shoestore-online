import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "~/requestMethod";

export const ordersFetch = createAsyncThunk(
    "orders/ordersFetch",
    async (user) => {
        const res = await publicRequest.get(`/orders/${user._id}`, {
            headers: {
                token: `Bearer ${user.accessToken}`
            }
        });

        // console.log(res);
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
        [ordersFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const { getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure } = ordersSlice.actions;

export default ordersSlice.reducer;
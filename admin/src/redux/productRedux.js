import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethod";
import { toast } from "react-toastify";

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
        // DECREASE ALL 
        decreaseProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        decreaseProductsSuccess: (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        decreaseProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // DELETE PRODUCT 
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {

            state.items = state.items.filter(item => item._id !== action.payload);
            state.isFetching = false;
            state.error = false;
            toast.success(`Delete product ${action.payload} successfully`, {
                position: "bottom-right"
            })
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            toast.error(`Error from Api system.`, {
                position: "bottom-right"
            })
        },
        // UPDATE PRODUCT 
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess: (state, action) => {
            state.items = state.items.map(item => {
                if (item._id === action.payload.id) {
                    return action.payload.product
                } else {
                    return item;
                }
            })
            state.isFetching = false;
            state.error = false;
            toast.success(`Update product ${action.payload.id} successfully`, {
                position: "bottom-right"
            })
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            toast.error(`Error from Api system.`, {
                position: "bottom-right"
            })
        },
        // ADD PRODUCT 
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.items.push(action.payload);            
            toast.success(`Add product ${action.payload.id} successfully`, {
                position: "bottom-right"
            })
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            toast.error(`Error from Api system.`, {
                position: "bottom-right"
            })
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
    getProductsFailure, 
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
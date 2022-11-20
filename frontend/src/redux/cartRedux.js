import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { 
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: { 
        addProduct: (state, action) => {
            // action.payload là sản phẩm được chọn và số lượng của chúng
            // quantity là số loại sản phẩm trong cart
            state.total += action.payload.price * action.payload.quantity;
            
            const productIndex = state.products.findIndex((product) => {
                if (product._id === action.payload._id 
                    && product.color === action.payload.color
                    && product.size === action.payload.size) {
                        return true;
                    } 
            })

            if (productIndex !== -1) {
                state.products[productIndex].quantity += action.payload.quantity;
            } else {
                state.quantity += 1
                state.products.push(action.payload);
            }


        }
    }
});

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
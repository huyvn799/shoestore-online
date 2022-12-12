import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { publicRequest } from "~/requestMethod";


export const cartFetch = createAsyncThunk(
    "cart/cartFetch",
    async (user) => {
        const res = await publicRequest.get(`/carts/${user._id}`,{
            headers: { 
                token: `Bearer ${user.accessToken}`
            }
        });
        // console.log(res.data);
        return res?.data;
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: { 
        // cartItems: localStorage.getItem("cartItems") 
        //             ? JSON.parse(localStorage.getItem("cartItems"))
        //             : [] ,
        cartItems: [],
        cartQuantity: 0,
        cartTotal: 0
    },
    reducers: { 
        addToCart: (state, action) => {
            // action.payload là sản phẩm được chọn và số lượng của chúng
            // quantity là số loại sản phẩm trong cart
            state.cartTotal += action.payload.price * action.payload.quantity;
            
            const productIndex = state.cartItems.findIndex((product) => {
                if (product._id === action.payload._id 
                    && product.color === action.payload.color
                    && product.size === action.payload.size) {
                        return true;
                    } else {
                        return false;
                    }
            })

            if (productIndex !== -1) {
                state.cartItems[productIndex].quantity += action.payload.quantity;
                toast.success(`Increase ${state.cartItems[productIndex].title} successfully`, {
                    position: "bottom-right"
                })
            } else {
                toast.success(`Add ${action.payload.title} to cart successfully`, {
                    position: "bottom-right"
                })
                state.cartQuantity += 1
                state.cartItems.push(action.payload);
            }

            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeItemFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter(item => 
                item._id !== action.payload._id
            );
            state.cartItems = nextCartItems;
            state.cartQuantity -= 1;
            
            state.cartTotal = nextCartItems.reduce((total, item) => total + item.price * item.quantity, 0)

            toast.success(`Delete ${action.payload.title} from cart successfully`, {
                position: "bottom-right"
            })
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => {
                if (item._id === action.payload._id 
                    && item.color === action.payload.color
                    && item.size === action.payload.size) {
                        return true;
                    } 
            })

            if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
                toast.success(`Decrease ${action.payload.title} successfully`, {
                    position: "bottom-right"
                })
            } else if (state.cartItems[itemIndex].quantity === 1) {
                const nextCartItems = state.cartItems.filter(item => 
                    item._id !== action.payload._id
                );
                state.cartItems = nextCartItems;
                state.cartQuantity -= 1;
                
                toast.success(`Delete ${action.payload.title} from cart successfully`, {
                    position: "bottom-right"
                })
            }

            state.cartTotal = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        resetCart: (state, action) => {
            state.cartItems = [];
            state.cartQuantity = 0;
            state.cartTotal = 0;

            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
    },
    extraReducers: { 
        [cartFetch.fulfilled]: (state, action) => {
            state.cartItems = action.payload.products;
            state.cartQuantity = action.payload.quantity;
            state.cartTotal = action.payload.total;
        }
    }
});

export const { addToCart, resetCart, removeItemFromCart, decreaseCart } = cartSlice.actions;

export default cartSlice.reducer;
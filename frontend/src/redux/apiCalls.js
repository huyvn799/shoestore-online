import { messageCall } from "~/messageApi";
import { publicRequest } from "~/requestMethod";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from "./authRedux";
import { resetCart } from "./cartRedux";
import { getOrdersFailure, getOrdersStart, getOrdersSuccess } from "./orderRedux";
import { getProductsFailure, getProductsStart, getProductsSuccess } from "./productRedux";

export const login = async (dispatch, user, navigate, messageApi) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));

        messageCall(messageApi, "success", "Login successfully");

        setTimeout(() => {
            navigate("/");
        }, 1500);

    } catch (err) {
        console.log(err);
        dispatch(loginFailure(err.response.data));

        messageCall(messageApi, "error", err.response.data);
    }
}

export const logoutUser = async (accessToken, userId, dispatch, navigate) => {
    dispatch(logoutStart());
    try { 
        await publicRequest.post("/auth/logout", userId, {
            headers: {
                token: "Bearer " + accessToken,
            }
        })

        dispatch(resetCart());
        dispatch(logoutSuccess());

        navigate("/login");
    } catch (err) {
        dispatch(logoutFailure());
    }
}

export const registerUser = async(user, dispatch, navigate, messageApi) => {
    dispatch(registerStart());
    
    try { 
        const resUser = await publicRequest.post("/auth/register", user);

        const resCart = await publicRequest.post("/carts", {
            userId: resUser.data._id,
            products: [],
        })

        console.log(resUser.data);
        console.log(resCart.data);

        dispatch(registerSuccess());
        
        messageCall(messageApi, "success", "Register successfully");
        setTimeout(() => {
            navigate("/login");
        }, 1500)
    } catch (err) {
        console.log(err);
        dispatch(registerFailure(err.response.data));

        messageCall(messageApi, "error", err.response.data);
    }
}

export const updateCart = async(cart, dispatch, accessToken, userId) => {
    
    try {
        // dispatch(resetCart());
        if (userId) {
            const res = await publicRequest.put(`/carts/${userId}`, {
                products: cart?.cartItems,
                quantity: cart?.cartQuantity,
                total: cart?.cartTotal
            }, { 
                headers: { 
                    token: `Bearer ${accessToken}`
                }
            });
        } 
        
        // console.log(accessToken, userId);
        // console.log(res.data);
    } catch (err) {
        console.log(err);
    }

}

export const getLatestOrder = async (accessToken, userId, dispatch) => {
    dispatch(getOrdersStart());
    
    try {
        const res = await publicRequest.get(`/orders/${userId}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }});

        console.log(res);
        dispatch(getOrdersSuccess(res.data));

    } catch (err) {
        dispatch(getOrdersFailure());
    }
}


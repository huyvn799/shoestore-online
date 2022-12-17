import messageApi, { messageCall } from "../messageApi";
import { publicRequest, userRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from "./authRedux";
import { getOrdersFailure, getOrdersStart, getOrdersSuccess } from "./orderRedux";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductsFailure, getProductsStart, getProductsSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";

export const login = async (dispatch, user, navigate, messageApi) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);

        const resUser = res.data;
        if (resUser.isAdmin) {
            dispatch(loginSuccess(res.data));
    
            messageCall(messageApi, "success", "Login successfully");
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } else {
            console.log("Only admin has a permission to access");
            dispatch(loginStart());

            messageCall(messageApi, "error", "Only admin has a permission to access");
        }

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

export const getAllProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductsSuccess(res.data))
    } catch (err) {
        console.log(err);
        dispatch(getProductsFailure());
    }
}

export const deleteProduct = async (dispatch, productId) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${productId}`);
        dispatch(deleteProductSuccess(productId))
    } catch (err) {
        console.log(err);
        dispatch(deleteProductFailure());
    }
}

export const updateProduct = async (dispatch, productId, updatedProduct) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${productId}`, updatedProduct);
        dispatch(updateProductSuccess({id: productId, product: res.data}));
    } catch (err) {
        console.log(err);
        dispatch(updateProductFailure());
    }
}

export const addProduct = async (dispatch, newProduct) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products`, newProduct);
        dispatch(addProductSuccess(res.data));
        
    } catch (err) {
        console.log(err);
        dispatch(addProductFailure());
    }
    finally {
        return {hello: "baby"};
    }
}

export const validateAddProduct = (messageApi, product) => {
    const checkEmpty = Object.entries(product).find(([attr, value]) => {
        console.log("[attr]", attr);
        console.log("[value]", value);
        if (value === 0) {
            return false;
        } else {
            return !value;
        }
    })
    if (checkEmpty) {
        messageCall(messageApi, "error", "All fields are not empty")
        return false;
    }
    return true;
}

export const getAllOrders = async (dispatch) => {
    dispatch(getOrdersStart());
    try {
        const res = await userRequest.get("/orders");
        dispatch(getOrdersSuccess(res.data))
    } catch (err) {
        console.log(err);
        dispatch(getOrdersFailure());
    }
}

export const addSizeAndStock = async (messageApi, product, dispatch) => {
    messageCall(messageApi, "error", "Size must be number");

}
import { messageCall } from "../messageApi";
import { publicRequest, userRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from "./authRedux";
import { getOrdersFailure, getOrdersStart, getOrdersSuccess } from "./orderRedux";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductsFailure, getProductsStart, getProductsSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { addUserFailure, addUserStart, addUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";

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
}

export const validateAddProduct = (messageApi, product, file) => {
    const checkEmpty = Object.entries(product).find(([attr, value]) => {
        console.log("[attr]", attr);
        console.log("[value]", value);
        if (value === 0) {
            return false;
        } else {
            return !value;
        }
    })
    if (checkEmpty || !file) {
        messageCall(messageApi, "error", "All fields are not empty")
        return false;
    }
    return true;
}

export const validateAddUser = (messageApi, user) => {
    const checkEmpty = Object.entries(user).find(([attr, value]) => {
        // console.log("[attr]", attr);
        // console.log("[value]", value);
        if (value === 0 || attr === "isAdmin" || attr === "img") {
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

export const addSizeAndStock = (messageApi, product, size, stock) => {
    if (!Number.isInteger(Number(size))) {
        messageCall(messageApi, "error", "Size must be number");
        return;
    } else {

        console.log(product);
        const updatedProduct = JSON.parse(JSON.stringify(product));
        console.log(size);
        console.log(stock);
    
        const sizeArr = Object.entries(updatedProduct.size);
        const sizeIndex = sizeArr.findIndex(([s, q]) => s === size)
    
        if (sizeIndex !== -1) {
            updatedProduct.size[size] += stock
        } else {
            updatedProduct.size = {
                ...updatedProduct.size,
                [size]: stock 
            };
        }
        console.log((new Date()).toISOString());
        
        updatedProduct.updates.push({
            updateTime: (new Date()).toISOString(),
            quantity: stock
        })
        // console.log(updatedProduct);

        return updatedProduct;
    }
}

export const getAllUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await userRequest.get("/users");
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        console.log(err);
        dispatch(getUsersFailure());
    }
}

export const deleteUser = async (dispatch, userId) => {
    dispatch(deleteUserStart());
    try {
        const res = await userRequest.delete(`/users/${userId}`);
        dispatch(deleteUserSuccess(userId))
    } catch (err) {
        console.log(err);
        dispatch(deleteUserFailure());
    }
}

export const updateUser = async (dispatch, userId, updatedUser, messageApi) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/users/${userId}`, updatedUser);
        dispatch(updateUserSuccess({id: userId, user: res.data}));
    } catch (err) {
        messageCall(messageApi, "error", err.response.data);
        dispatch(updateUserFailure());
    }
}

export const addUser = async (dispatch, newUser) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post(`/users`, newUser);
        dispatch(addUserSuccess(res.data));
        
    } catch (err) {
        console.log(err);
        dispatch(addUserFailure());
    }
}
import { messageCall } from "~/messageApi";
import { publicRequest } from "~/requestMethod";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from "./authRedux";

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

        dispatch(logoutSuccess());

        navigate("/login");
    } catch (err) {
        dispatch(logoutFailure());
    }
}

export const registerUser = async(user, dispatch, navigate, messageApi) => {
    dispatch(registerStart());
    
    try { 
        await publicRequest.post("/auth/register", user);
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
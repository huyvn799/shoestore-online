import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { 
        login: { 
            currentUser: null,
            isFetching: false,
            error: false,
            errMsg: "",
        },
        register: { 
            isFetching: false, 
            error: false,
            success: false,    
            errMsg: "",
        }
    },
    reducers: { 
        loginStart: (state) => {
            state.login.isFetching = true;
            state.login.error = false;
            state.login.errMsg = "";
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.login.errMsg = "";
        },
        loginFailure: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.errMsg = action.payload;
        },
        registerStart: (state, action) => {
            state.register.isFetching = true;
            state.register.success = false;
            state.register.error = false;
            state.register.errMsg = "";
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailure: (state, action) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
            state.register.errMsg = action.payload;
        },
        logoutStart: (state, action) => {
            state.login.isFetching = true;
            state.login.error = false;
            state.login.errMsg = "";
        },
        logoutSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
            state.login.errMsg = "";
        },
        logoutFailure: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.errMsg = action.payload;
        },
    }
});

export const { 
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
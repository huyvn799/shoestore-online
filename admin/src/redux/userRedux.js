import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethod";
import { toast } from "react-toastify";

export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async () => {
        const res = await publicRequest.get("/users");
        return res?.data;
    }
)

const UsersSlice = createSlice({
    name: "users",
    initialState: {
        items: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // GET ALL 
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // DELETE User 
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {

            state.items = state.items.filter(item => item._id !== action.payload);
            state.isFetching = false;
            state.error = false;
            toast.success(`Delete User ${action.payload} successfully`, {
                position: "bottom-right"
            })
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            toast.error(`Error from Api system.`, {
                position: "bottom-right"
            })
        },
        // UPDATE User 
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.items = state.items.map(item => {
                if (item._id === action.payload.id) {
                    return action.payload.User
                } else {
                    return item;
                }
            })
            state.isFetching = false;
            state.error = false;
            toast.success(`Update User ${action.payload.id} successfully`, {
                position: "bottom-right"
            })
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            toast.error(`Error from Api system.`, {
                position: "bottom-right"
            })
        },
        // ADD User 
        addUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.items.push(action.payload);            
            toast.success(`Add new user successfully`, {
                position: "bottom-right"
            })
        },
        addUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            toast.error(`Error from Api system.`, {
                position: "bottom-right"
            })
        },
    },
    extraReducers: { 
        [usersFetch.pending]: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        [usersFetch.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.items = action.payload;
            state.error = false;
        },
        [usersFetch.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { getUsersStart,
    getUsersSuccess,
    getUsersFailure, 
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
} = UsersSlice.actions;

export default UsersSlice.reducer;
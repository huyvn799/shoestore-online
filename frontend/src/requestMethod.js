import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let TOKEN = "";
if (localStorage.getItem("persist:root")) {
    const authStorage = JSON.parse(localStorage.getItem("persist:root")).auth;
    const loginStorage = JSON.parse(authStorage).login;
    if (loginStorage.currentUser) {
        TOKEN = loginStorage.currentUser.accessToken;
    }
}

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${TOKEN}`
    }
})
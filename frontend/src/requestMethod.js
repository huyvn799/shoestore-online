import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzEzMTk5NjljZWM4NGYzZjE2MDg1NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2ODg1NDExNSwiZXhwIjoxNjY4OTQwNTE1fQ.nR7Y7npb9eTEoQpEA-vEqslSI3BpspDRlSUT74dfxl4";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {
        token: `Bearer ${TOKEN}`
    }
})
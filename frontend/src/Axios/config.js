import axios from "axios";

const axInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type" : "application/json"
    },
})

const { token } = JSON.parse(localStorage.getItem("token"))

axInstance.defaults.headers.common["authorization"] = `Bearer ${token}`


export default axInstance
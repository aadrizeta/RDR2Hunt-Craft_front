import axios from "axios";

const ApiDelivery = axios.create({
    baseURL: "http://rdr2-h-c-back2-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
    },
})

export {ApiDelivery};

import axios from "axios";

export default axios.create({
    baseURL: "https://ap-south-1.aws.data.mongodb-api.com/app/bbtsquare-uvsaq/endpoint",
    headers: {
        "Content-type": "application/json"
    }
})
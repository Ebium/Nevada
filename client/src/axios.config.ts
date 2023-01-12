import { configLocal } from "./config"
import axios from "axios"

export const ConfigureAxios = () => { 
    axios.defaults.baseURL = configLocal.baseURL
    axios.defaults.withCredentials = true
    axios.defaults.maxRedirects = 0
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"
    axios.defaults.headers.put["Access-Control-Allow-Origin"] = "*"
}
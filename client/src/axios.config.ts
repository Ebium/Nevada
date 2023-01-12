import { configLocal } from "./config"
import axios from "axios"

export const ConfigureAxios = () => { 
    axios.defaults.baseURL = configLocal.baseURL
}
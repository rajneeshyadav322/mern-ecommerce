import axios from "axios";
import { Navigate } from "react-router-dom";
import {BASE_URL} from './constant'

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(response => response, (error) => {
  console.log(error)
  if(error?.response?.status ===  401 || error?.response?.status === 403) 
    window.location.pathname = (`/login`)
})

export default api;

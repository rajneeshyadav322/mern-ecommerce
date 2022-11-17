import axios from "axios";
import api from "../apiclient";
import { BASE_URL } from "../constant";

export const login = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, data);
  localStorage.setItem("token", res?.data?.accessToken);
};

export const register = (data) => {
  return api.post("/api/auth/register", data);
};

export const logout = (data) => {
  // return await api.
};

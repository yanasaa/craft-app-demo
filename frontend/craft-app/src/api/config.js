import axios from "axios";
import { REFRESH_ENDPOINT } from "../constants/endpoints";
export const BASE_URL = "http://84.201.140.115/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});


api.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = localStorage.getItem("token");
    if (ACCESS_TOKEN) {
      config.headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      const response = await axios.post(`${BASE_URL}/${REFRESH_ENDPOINT}`, {
        refresh: localStorage.getItem("refresh"),
      });
      localStorage.setItem("token", response.data.access);
      //  localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default api;

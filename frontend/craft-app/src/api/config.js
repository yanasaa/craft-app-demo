import axios from "axios";
const BASE_URL = "http://84.201.140.115/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.clear();

      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;

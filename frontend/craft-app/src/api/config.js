import axios from "axios";
const BASE_URL = "http://84.201.140.115/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

const ACCESS_TOKEN = localStorage.getItem("token");

api.interceptors.request.use(
  function (config) {
    if (ACCESS_TOKEN) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
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

import axios from "axios";

const AxiosClient = axios.create();

AxiosClient.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      const paresedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${paresedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default AxiosClient;

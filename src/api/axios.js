import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginPage = window.location.pathname.includes("/login");

    if (error.response && error.response.status === 401) {
      // ONLY redirect if we are NOT on the login page
      if (!isLoginPage) {
        localStorage.removeItem("token");
        // Use Zustand logout if you want to be even cleaner
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;

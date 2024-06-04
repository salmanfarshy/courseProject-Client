import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://course-project-backend-api.onrender.com",
  withCredentials: true,
});

apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;

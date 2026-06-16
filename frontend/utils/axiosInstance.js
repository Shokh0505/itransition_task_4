import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/proxy",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }
        if (
            typeof window !== "undefined" &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            window.dispatchEvent(new CustomEvent("unauthorized"));
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;

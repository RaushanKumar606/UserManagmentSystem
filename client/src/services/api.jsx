import axios from "axios";

const API_URL = "https://usermanagmentsystem-hfjz.onrender.com/api";

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
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

// Auth API
export const authAPI = {
    signup: (userData) => api.post("/auth/signup", userData),
    login: (credentials) => api.post("/auth/login", credentials),
};

// Software API
export const softwareAPI = {
    getAll: () => api.get("/software"),
    getById: (id) => api.get(`/software/${id}`),
    create: (softwareData) => api.post("/software", softwareData),
    update: (id, softwareData) => api.put(`/software/${id}`, softwareData),
    delete: (id) => api.delete(`/software/${id}`),
};

// Request API
export const requestAPI = {
    create: (requestData) => api.post("/requests", requestData),
    getPending: () => api.get("/requests/pending"),
    getUserRequests: () => api.get("/requests/user"),
    updateStatus: (id, statusData) => api.patch(`/requests/${id}`, statusData),
};

export default api; 
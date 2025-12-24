import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Extract Data & Handle Errors
api.interceptors.response.use(
    (response) => {
        // If response has a 'data' field (expert-level wrapper), extract it
        if (response.data && response.data.success) {
            return response.data.data !== undefined ? response.data.data : response.data;
        }
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.error || error.message || 'Something went wrong';
        return Promise.reject(message);
    }
);

export default api;

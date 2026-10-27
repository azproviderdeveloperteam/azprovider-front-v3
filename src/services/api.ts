// src/services/api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'https://mpsgroup.ir/api/v2/logistics',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
import axios from 'axios';
import { signout } from '@/utils/apis/auth.api';
import refreshToken from '../utils/tokenRefreshService';

let accessToken: string | null = sessionStorage.getItem('accessToken');

export const setAccessToken = (token: string | null) => {
    accessToken = token;
    if (token) {
        sessionStorage.setItem('accessToken', token);
    } else {
        sessionStorage.removeItem('accessToken');
    }
};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    setAccessToken(newAccessToken);
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('Refresh failed:', refreshError);
                document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                sessionStorage.removeItem('authUser');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        } else if (error.response?.status === 403) {
            signout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
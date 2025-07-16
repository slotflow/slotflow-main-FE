import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

export const realtimeAxiosInstance = axios.create({
    baseURL: 'https://localhost:30001/api',
    withCredentials: true,
})
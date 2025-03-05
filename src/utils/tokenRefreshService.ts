// import { AxiosError } from "axios";
// import axiosInstance, { setAccessToken } from "../lib/axios";
// import { toast } from "react-toastify";

// let isRefreshing = false;
// let refreshSubscribers: ((accessToken: string) => void)[] = [];

// const setAccessToken = (token: string | null) => {
//     if (token) {
//         sessionStorage.setItem("accessToken", token);
//     } else {
//         sessionStorage.removeItem("accessToken");
//     }
// };

// const refreshToken = async () => {
//     if (isRefreshing) {
//         return new Promise((resolve) => {
//             refreshSubscribers.push((accessToken) => {
//                 resolve(accessToken);
//             }); 
//         });
//     }

//     isRefreshing = true;

//     try {
//         const response = await axiosInstance.post('/auth/refresh');
//         const { accessToken } = response.data;
//         setAccessToken(accessToken);
//         isRefreshing = false;
//         refreshSubscribers.forEach((subscriber) => subscriber(accessToken));
//         refreshSubscribers = [];
//         return accessToken;
//     } catch (error: unknown) {
//         console.log("error : ", error);
//         if (error instanceof AxiosError) {
//           toast.error(error?.response?.data?.message || "Please login.");
//         } else {
//           toast.error("An unexpected error occurred.");
//         }
//         isRefreshing = false;
//         setAccessToken(null);
//         window.location.href = '/login';
//         return null;
//     }
// };

// export default refreshToken;


import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

const setAccessToken = (token: string | null) => {
    if (token) {
        sessionStorage.setItem("accessToken", token);
    } else {
        sessionStorage.removeItem("accessToken");
    }
};

const refreshToken = async () => {
    if (isRefreshing) {
        return new Promise((resolve) => {
            refreshSubscribers.push((accessToken) => {
                resolve(accessToken);
            });
        });
    }

    isRefreshing = true;

    try {
        const response = await axiosInstance.post('/auth/refresh', {
            refreshToken: sessionStorage.getItem('refreshToken')
        });
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        isRefreshing = false;
        refreshSubscribers.forEach((subscriber) => subscriber(accessToken));
        refreshSubscribers = [];
        return accessToken;
    } catch (error: unknown) {
        console.log("error : ", error);
        if (error instanceof AxiosError) {
            toast.error(error?.response?.data?.message || "Please login.");
        } else {
            toast.error("An unexpected error occurred.");
        }
        isRefreshing = false;
        setAccessToken(null);
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("authUser");
        window.location.href = '/login';
        return null;
    }
};

export default refreshToken;
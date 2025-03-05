// import axios from "axios";
// import refreshToken from "../utils/tokenRefreshService";
// import { signout } from "@/utils/apis/auth.api";

// // let accessToken: string | null = null;

// let accessToken: string | null = sessionStorage.getItem("accessToken");


// export const setAccessToken = (token: string | null) => {
//     accessToken = token;
//     if (token) {
//         sessionStorage.setItem("accessToken", token);
//     } else {
//         sessionStorage.removeItem("accessToken");
//     }
// };

// // export const setAccessToken = (token: string | null) => {
// //     accessToken = token;
// // };

// // const storedAccessToken = localStorage.getItem("accessToken");
// // if (storedAccessToken) {
// //     setAccessToken(storedAccessToken);
// // }

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api',
//     withCredentials: true,
// });

// // axiosInstance.interceptors.request.use(
// //     (config) => {
// //         if (accessToken) {
// //             config.headers.Authorization = `Bearer ${accessToken}`;
// //         }
// //         return config;
// //     },
// //     (error) => Promise.reject(error)
// // );

// axiosInstance.interceptors.request.use((config) => {
//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         console.log("error.response : ",error.response);
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const newAccessToken = await refreshToken();
//             if (newAccessToken) {
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return axiosInstance(originalRequest);
//             }
//         }else if (error.response?.status === 403) {
//             signout();
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;




import axios from "axios";
import refreshToken from "../utils/tokenRefreshService";
import { signout } from "@/utils/apis/auth.api";

let accessToken: string | null = sessionStorage.getItem("accessToken");

export const setAccessToken = (token: string | null) => {
    accessToken = token;
    if (token) {
        sessionStorage.setItem("accessToken", token);
    } else {
        sessionStorage.removeItem("accessToken");
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
        console.log("error.response : ",error.response);
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            }
        } else if (error.response?.status === 403) {
            signout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
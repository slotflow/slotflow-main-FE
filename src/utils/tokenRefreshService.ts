import { AxiosError } from "axios";
import axiosInstance, { setAccessToken } from "../lib/axios";
import { toast } from "react-toastify";

let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

const refreshToken = async () => {
    console.log("Refresh");
    if (isRefreshing) {
        console.log("refreshing");
        return new Promise((resolve) => {
            console.log("array : ", refreshSubscribers);
            refreshSubscribers.push((accessToken) => {
                resolve(accessToken);
            }); 
        });
    }

    isRefreshing = true;

    try {
        const response = await axiosInstance.post('/auth/refresh');
        console.log("refresh response : ", response);
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
        window.location.href = '/login';
        return null;
    }
};

export default refreshToken;
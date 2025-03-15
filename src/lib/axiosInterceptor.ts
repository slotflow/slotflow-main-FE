import axiosInstance from "./axios";
import { toast } from "react-toastify";
import { appStore } from "@/utils/redux/appStore";
import { setAuthUser } from "@/utils/redux/slices/authSlice";

export const setupAxiosInterceptors = () => {

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("instance error", error);
            if(error.response?.status === 400) {
                console.log("Throwing error 400 from backend")
                toast.error(error.response?.data?.message || "Unexpected Error");
                return;
            }
            if (error.response?.status === 401) {
                console.log("token expired")
                appStore.dispatch(setAuthUser(null));
                toast.error("Session expired. Please log in again.");
                return;
            }
            if (error.response?.status === 403) {
                console.log("user blokced")
                appStore.dispatch(setAuthUser(null));
                toast.error("Your account has been blocked.");
                return;
            }
            if(error.response?.status){
                toast.error(error.response?.status, error.response?.data.message || "Unexpected Error");
            }
            console.log("error rejct", error);
            return Promise.reject(error);
        }
    );
};
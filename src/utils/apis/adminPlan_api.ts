import axiosInstance from "@/lib/axios";
import axios from "axios";

export const fetchPlans = async () => {
    try{
        const response = await axiosInstance.get("/admin/plans");
        return response.data.plans;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.message;
        }
    }
};
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProviders = async () => {
    const response = await axiosInstance.get("/admin/providers");
    return response.data.providers;
};


export const approveProvider = createAsyncThunk('/admin/approve/provider/',
    async (providerId: string) => {
        const response = await axiosInstance.put(`/admin/provider/approve/${providerId}`);
        const res = response.data;
        if (res.success) {
            toast.success(res.message);
            return { providerId, updatedProvider: res.updatedProvider };
        } else {
            toast.error(res.message);
            return;
        }
    }
)

export const changeProviderBlockStatus = createAsyncThunk('/admin/changeProviderStatus',
    async (statusData: { providerId: string, status: boolean }) => {
        const { providerId, status } = statusData;
        const response = await axiosInstance.put(`/admin/provider/changeStatus/${providerId}?status=${status}`);
        const res = response.data;
        if (res.success) {
            toast.success(res.message);
            return { providerId, updatedProvider: res.updatedProvider };
        } else {
            toast.error(res.message);
            return;
        }
    }
)

export const fetchProviderDetails = async (providerId: string) => {
    console.log("Provider details Api call")
    const response = await axiosInstance.get(`/admin/fetchProviderDetails/${providerId}`);
    return response.data.provider;
}

export const fetchProviderAddress = async (providerId: string) => {
    console.log("Provider address api call")
    const response = await axiosInstance.get(`/admin/fetchProviderAddress/${providerId}`);
    return response.data.address;
}
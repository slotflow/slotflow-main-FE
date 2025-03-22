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
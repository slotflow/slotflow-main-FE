import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProviders = async () => {
    try{
        const response = await axiosInstance.get("/admin/providers");
        return response.data.providers;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.message;
        }
    }
};

export const approveProvider = createAsyncThunk('/admin/approve/provider/',
    async (providerId: string) => {
        try {
            const response = await axiosInstance.put(`/admin/provider/approve/${providerId}`);
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
            return { providerId, updatedProvider: res.updatedProvider };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data.message;
            } else {
                throw "An unexpected error occurred.";
            }
        }
    }
)

export const changeProviderBlockStatus = createAsyncThunk('/admin/changeProviderStatus',
    async (statusData: { providerId: string, status: boolean }) => {
        try {
            const { providerId, status } = statusData;
            const response = await axiosInstance.put(`/admin/provider/changeStatus/${providerId}?status=${status}`);
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
            return { providerId, updatedProvider: res.updatedProvider };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data.message;
            } else {
                throw "An unexpected error occurred.";
            }
        }
    }
)
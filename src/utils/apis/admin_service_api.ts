import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServices = async () => {;
    try{
        const response = await axiosInstance.get("/admin/services");
        return response.data.services;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.message);
        }
    }
}

export const addNewService = createAsyncThunk('/admin/addNewService',
    async (serviceName: string) => {
        try {
            const response = await axiosInstance.post('/admin/addNewService', { serviceName });
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
                return res;
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data.message;
            } else {
                throw "An unexpected error occurred.";
            }
        }
    }
)


export const chnageServiceBlockStatus = createAsyncThunk('/admin/changeServiceStatus',
    async (statusData: { serviceId: string, status: boolean }) => {
        try {
            const { serviceId, status } = statusData;
            const response = await axiosInstance.put(`/admin/changeServiceStatus/${serviceId}?status=${status}`);
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
            return { serviceId, updatedService: res.updatedService };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data.message;
            } else {
                throw "An unexpected error occurred.";
            }
        }
    }
)
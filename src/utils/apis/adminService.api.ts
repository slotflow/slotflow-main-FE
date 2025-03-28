import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    AdminAddNewServiceRequestPayload, 
    AdminAddNewServiceResponseProps, 
    AdminFetchAllServicesResponseProps, 
    AdminChangeServiceBlockStatusRequestPayload, 
    AdminChnageServicesBlockStatusResponseProps, 
} from "../interface/api/adminServiceApiInterface";

export const fetchServices = async (): Promise<AdminFetchAllServicesResponseProps[]> => {
    const response = await axiosInstance.get("/admin/services");
    return response.data.services;
}

export const addNewService = createAsyncThunk<AdminAddNewServiceResponseProps,AdminAddNewServiceRequestPayload>('/admin/addNewService',
    async (payload: AdminAddNewServiceRequestPayload) => {
        const response = await axiosInstance.post('/admin/addNewService', { serviceName: payload.appServiceName });
        toast.success(response.data.message);
        return response.data.service;
    }
)

export const chnageServiceBlockStatus = createAsyncThunk<AdminChnageServicesBlockStatusResponseProps, AdminChangeServiceBlockStatusRequestPayload>('/admin/changeServiceStatus',
    async (statusData: AdminChangeServiceBlockStatusRequestPayload) => {
        const { serviceId, status } = statusData;
        const response = await axiosInstance.put(`/admin/changeServiceStatus/${serviceId}?status=${status}`);
        toast.success(response.data.message);
        return response.data.updatedService;
    }
)
import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Service } from "../interface/appServiceInterface";
import { AdminAddNewServiceRequestPayload, AdminAddNewServiceResponse, AdminChangeServiceBlockStatusRequestPayload, AdminChangeServiceBlockStatusResponse } from "../interface/api/adminServiceApiInterface";

export const fetchServices = async (): Promise<Service[]> => {
    const response = await axiosInstance.get("/admin/services");
    return response.data.services;
}

export const addNewService = createAsyncThunk<AdminAddNewServiceResponse,AdminAddNewServiceRequestPayload>('/admin/addNewService',
    async (payload: AdminAddNewServiceRequestPayload) => {
        const response = await axiosInstance.post('/admin/addNewService', { serviceName: payload.serviceName });
        return response.data;
    }
)

export const chnageServiceBlockStatus = createAsyncThunk<AdminChangeServiceBlockStatusResponse, AdminChangeServiceBlockStatusRequestPayload>('/admin/changeServiceStatus',
    async (statusData: AdminChangeServiceBlockStatusRequestPayload) => {
        const { serviceId, status } = statusData;
        const response = await axiosInstance.put(`/admin/changeServiceStatus/${serviceId}?status=${status}`);
        return response.data;
    }
)
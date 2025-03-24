import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminApproveProviderRequestPayload, AdminApproveProviderResponse, 
    AdminChangeProviderBlockStatusRequestPayload, AdminChangeProviderBlockStatusResponse, 
    AdminFetchAllProvidersRequestPayload, AdminFetchProviderAddressResponse, 
    AdminFetchProviderDetailsResponse, AdminFetchProviderServiceAvailabilityResponse, 
    AdminFetchProviderServiceResponse } from "../interface/api/adminProviderApiInterface";

export const fetchProviders = async (): Promise<AdminFetchAllProvidersRequestPayload[]> => {
    const response = await axiosInstance.get("/admin/providers");
    return response.data.providers;
};

export const approveProvider = createAsyncThunk<AdminApproveProviderResponse,AdminApproveProviderRequestPayload>('/admin/approve/provider/',
    async (payload: AdminApproveProviderRequestPayload) => {
        const { providerId } = payload;
        const response = await axiosInstance.put(`/admin/provider/approve/${providerId}`);
        return response.data;
    }
)

export const changeProviderBlockStatus = createAsyncThunk<AdminChangeProviderBlockStatusResponse,AdminChangeProviderBlockStatusRequestPayload>('/admin/changeProviderStatus',
    async (payload: AdminChangeProviderBlockStatusRequestPayload) => {
        const { providerId, status } = payload;
        const response = await axiosInstance.put(`/admin/provider/changeStatus/${providerId}?status=${status}`);
        return response.data;
    }
)

export const fetchProviderDetails = async (providerId: string): Promise<AdminFetchProviderDetailsResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderDetails/${providerId}`);
    return response.data;
}

export const fetchProviderAddress = async (providerId: string): Promise<AdminFetchProviderAddressResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderAddress/${providerId}`);
    return response.data;
}

export const fetchProviderService = async (providerId: string): Promise<AdminFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderService/${providerId}`);
    return response.data;
}

export const fetchProviderServiceAvailability = async (providerId: string): Promise<AdminFetchProviderServiceAvailabilityResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderServiceAvailability/${providerId}`);
    return response.data;
}
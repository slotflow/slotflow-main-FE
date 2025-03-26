import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { 
    AdminApproveProviderResponseProps,
    AdminApproveProviderRequestPayload, 
    AdminFetchAllProvidersResponseProps,
    AdminChangeProviderBlockStatusResponse,  
    AdminFetchProviderDetailsResponseProps,
    AdminFetchProviderAddressResponseProps,
    AdminFetchProviderServiceResponseProps,
    AdminFetchProviderAvailabilityResponseProps, 
    AdminChangeProviderBlockStatusRequestPayload, 
} from "../interface/api/adminProviderApiInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProviders = async (): Promise<AdminFetchAllProvidersResponseProps[]> => {
    const response = await axiosInstance.get("/admin/providers");
    return response.data.providers;
};

export const approveProvider = createAsyncThunk<AdminApproveProviderResponseProps,AdminApproveProviderRequestPayload>('/admin/approve/provider/',
    async (payload: AdminApproveProviderRequestPayload) => {
        const { providerId } = payload;
        const response = await axiosInstance.put(`/admin/provider/approve/${providerId}`);
        toast.success(response.data.message);
        return response.data.updatedProvider;
    }
)

export const changeProviderBlockStatus = createAsyncThunk<AdminChangeProviderBlockStatusResponse,AdminChangeProviderBlockStatusRequestPayload>('/admin/changeProviderStatus',
    async (payload: AdminChangeProviderBlockStatusRequestPayload) => {
        const { providerId, status } = payload;
        const response = await axiosInstance.put(`/admin/provider/changeStatus/${providerId}?status=${status}`);
        toast.success(response.data.message);
        return response.data.updatedProvider;
    }
)

export const fetchProviderDetails = async (providerId: string): Promise<AdminFetchProviderDetailsResponseProps | null> => {
    const response = await axiosInstance.get(`/admin/fetchProviderDetails/${providerId}`);
    return response.data.provider;
}

export const fetchProviderAddress = async (providerId: string): Promise<AdminFetchProviderAddressResponseProps | null> => {
    const response = await axiosInstance.get(`/admin/fetchProviderAddress/${providerId}`);
    return response.data.address;
}

export const fetchProviderService = async (providerId: string): Promise<AdminFetchProviderServiceResponseProps | null> => {
    const response = await axiosInstance.get(`/admin/fetchProviderService/${providerId}`);
    return response.data.service;
}

export const adminFetchProviderServiceAvailability = async (providerId: string): Promise<AdminFetchProviderAvailabilityResponseProps | null> => {
    const response = await axiosInstance.get(`/admin/fetchProviderServiceAvailability/${providerId}`);
    return response.data.availability;
}
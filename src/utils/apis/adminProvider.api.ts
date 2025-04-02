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
    AdminChangeProviderTrustedTagRequestPayload,
    AdminChangeProviderTrustedTagResponse,
} from "../interface/api/adminProviderApiInterface";


export const fetchProviders = async (): Promise<AdminFetchAllProvidersResponseProps[]> => {
    const response = await axiosInstance.get("/admin/providers");
    return response.data.providers;
};

export const approveProvider = async (data: AdminApproveProviderRequestPayload): Promise<AdminApproveProviderResponseProps> => {
    const response = await axiosInstance.put(`/admin/approveProvider`, data);
    return response.data;
}

export const changeProviderBlockStatus = async (data: AdminChangeProviderBlockStatusRequestPayload): Promise<AdminChangeProviderBlockStatusResponse> => {
    const response = await axiosInstance.put(`/admin/changeProviderStatus`, data);
    return response.data;
}

export const changeProviderTrustTag = async (data: AdminChangeProviderTrustedTagRequestPayload): Promise<AdminChangeProviderTrustedTagResponse> => {
    const response = await axiosInstance.post(`/admin/changeProvidertrustedTag`, data);
    return response.data;
}

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
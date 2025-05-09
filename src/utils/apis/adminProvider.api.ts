import axiosInstance from "@/lib/axios";
import {
    AdminApproveProviderResponseProps,
    AdminApproveProviderRequestPayload,
    AdminFetchAllProvidersResponseProps,
    AdminChangeProviderBlockStatusResponse,
    AdminFetchProviderAddressResponseProps,
    AdminFetchProviderServiceResponseProps,
    AdminFetchProviderAvailabilityResponseProps,
    AdminChangeProviderBlockStatusRequestPayload,
    AdminChangeProviderTrustedTagRequestPayload,
    AdminFetchProviderProfileDetailsResponseProps,
    AdminChangeProviderTrustedTagResponse,
    AdminFetchProviderSubscriptionsResponseProps,
    AdminFetchProviderPaymentsResponseProps,
} from "../interface/api/adminProviderApiInterface";


export const fetchProviders = async (): Promise<Array<AdminFetchAllProvidersResponseProps>> => {
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

export const fetchProviderDetails = async (providerId: string): Promise<AdminFetchProviderProfileDetailsResponseProps> => {
    const response = await axiosInstance.get(`/admin/fetchProviderDetails/${providerId}`);
    return response.data.provider;
}

export const fetchProviderAddress = async (providerId: string): Promise<AdminFetchProviderAddressResponseProps> => {
    const response = await axiosInstance.get(`/admin/fetchProviderAddress/${providerId}`);
    return response.data.address;
}

export const fetchProviderService = async (providerId: string): Promise<AdminFetchProviderServiceResponseProps> => {
    const response = await axiosInstance.get(`/admin/fetchProviderService/${providerId}`);
    return response.data.service;
}

export const adminFetchProviderServiceAvailability = async (date: Date, providerId: string): Promise<AdminFetchProviderAvailabilityResponseProps> => {
    console.log("api calling")
    const response = await axiosInstance.get(`/admin/fetchProviderServiceAvailability/${providerId}`, {
        params : {
            date : date.toISOString()
        }
    });
    return response.data.availabilities;
}

export const adminFetchProviderSubscriptions = async (providerId: string) : Promise<Array<AdminFetchProviderSubscriptionsResponseProps>> => {
    const response = await axiosInstance.get(`/admin/fetchProviderSubscriptions/${providerId}`);
    return response.data.subscriptions;
}

export const adminFetchProviderPayments = async (providerId: string): Promise<Array<AdminFetchProviderPaymentsResponseProps>> => {
    const response = await axiosInstance.get(`/admin/fetchProviderPayments/${providerId}`);
    return response.data.payments;
}


import axiosInstance from "@/lib/axios";
import { AddProviderAddressPayload, AddProviderServiceAvailabilityPayload, AddProviderServiceDetailsPayload, ApiCommonResponse, FetchAllServicesResponse, ProviderFetchAddressResponseProps, ProviderFetchProfileDetailsResponseProps } from "../interface/api/providerApiInterface";


export const addProviderAddress = async ({ formData }: AddProviderAddressPayload): Promise<ApiCommonResponse> => {
    const response = await axiosInstance.post(`/provider/addAddress`, formData);
    return response.data;
}

export const fetchAllServices = async (): Promise<FetchAllServicesResponse> => {
    const response = await axiosInstance.get('/provider/fetchAllServices');
    return response.data;
}

export const addProviderServiceDetails = async ({ formData }: AddProviderServiceDetailsPayload): Promise<ApiCommonResponse> => {
    const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
    return response.data;
}

export const addProviderServiceAvailability = async ({ data }: AddProviderServiceAvailabilityPayload): Promise<ApiCommonResponse> => {
    const response = await axiosInstance.post(`/provider/addProviderServiceAvailability`, data);
    return response.data;
}

export const fetchProviderProfileDetails = async (): Promise<ProviderFetchProfileDetailsResponseProps | null> => {
    const response = await axiosInstance.get('/provider/getProfileDetails');
    return response.data.provider;
}

export const fetchProviderAddress = async (): Promise<ProviderFetchAddressResponseProps | null> => {
    const response = await axiosInstance.get('/provider/getAddress');
    return response.data.address;
}

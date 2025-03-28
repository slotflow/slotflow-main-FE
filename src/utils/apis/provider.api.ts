import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ApiCommonResponse,
    FetchAllServicesResponse,
    AddProviderAddressPayload,
    AddProviderServiceDetailsPayload,
    ProviderFetchAddressResponseProps,
    AddProviderServiceAvailabilityPayload,
    ProviderUpdateProfileImageResponseProps,
    ProviderFetchProfileDetailsResponseProps,
    ProviderFetchServiceDetailsResponseProps,
    ProviderFetchServiceAvailabilityResponseProps,
} from "../interface/api/providerApiInterface";


export const addProviderAddress = createAsyncThunk<ApiCommonResponse, AddProviderAddressPayload>("/provider/addAddress", 
    async ({ formData }: AddProviderAddressPayload) => {
        const response = await axiosInstance.post(`/provider/addAddress`, formData);
        return response.data;
    }
)

export const fetchAllServices = async (): Promise<FetchAllServicesResponse> => {
    const response = await axiosInstance.get('/provider/fetchAllAppServices');
    return response.data;
}

export const addProviderServiceDetails = createAsyncThunk<ApiCommonResponse,AddProviderServiceDetailsPayload>("/provider/addServiceDetails",
    async ({ formData }: AddProviderServiceDetailsPayload) => {
        const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
        return response.data;
    }
)

export const addProviderServiceAvailability = createAsyncThunk<ApiCommonResponse,AddProviderServiceAvailabilityPayload>("/provider/addServiceAvailability",
    async ({ data }: AddProviderServiceAvailabilityPayload) => {
        const response = await axiosInstance.post(`/provider/addProviderServiceAvailability`, data);
        return response.data;
    }
)

export const fetchProviderProfileDetails = async (): Promise<ProviderFetchProfileDetailsResponseProps> => {
    const response = await axiosInstance.get('/provider/getProfileDetails');
    return response.data.profileDetails;
}

export const fetchProviderAddress = async (): Promise<ProviderFetchAddressResponseProps> => {
    const response = await axiosInstance.get('/provider/getAddress');
    return response.data.address;
}

export const fetchProviderServiceDetails = async (): Promise<ProviderFetchServiceDetailsResponseProps> => {
    const response = await axiosInstance.get('/provider/getServiceDetails');
    return response.data.service;
}

export const fetchProviderServiceAvailability = async (): Promise<ProviderFetchServiceAvailabilityResponseProps> => {
    const response = await axiosInstance.get('/provider/getServiceAvailability');
    return response.data.availability;
}

export const updateProviderProfileImage = createAsyncThunk<ProviderUpdateProfileImageResponseProps, FormData>('/provider/UpdateProfileImage',
    async (formData: FormData) => {
        const response = await axiosInstance.post('/provider/updateProfileImage', formData);
        return response.data;
    }
)
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
    ProviderFetchPlansResponseProps,
    ProviderFetchSubscriptionHistoryResponseProps,
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

export const addProviderServiceDetails = createAsyncThunk<ApiCommonResponse, AddProviderServiceDetailsPayload>("/provider/addServiceDetails",
    async ({ formData }: AddProviderServiceDetailsPayload) => {
        const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
        return response.data;
    }
)

export const addProviderServiceAvailability = createAsyncThunk<ApiCommonResponse, AddProviderServiceAvailabilityPayload>("/provider/addServiceAvailability",
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

export const fetchProviderPlans = async () : Promise<ProviderFetchPlansResponseProps[]> => {
    const response = await axiosInstance.get('/provider/getPlans');
    return response.data.plans;
}

export const subscribeToPlan = async (data: {planId: string, planDuration: string}) : Promise<{success: boolean, message: string, sessionId: string}> => {
    const response = await axiosInstance.post('/provider/create-checkout-session', data)
    return response.data;
}

export const fetchProviderSubscriptions = async () : Promise<ProviderFetchSubscriptionHistoryResponseProps[]> => {
    const response = await axiosInstance.get('/provider/getSubscriptions');
    return response.data.subscriptions;
}
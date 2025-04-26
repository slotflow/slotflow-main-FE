import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    FetchAllServicesResponse,
    AddProviderServiceDetailsPayload,
    ProviderFetchAddressResponseProps,
    AddProviderServiceAvailabilityPayload,
    ProviderUpdateProfileImageResponseProps,
    ProviderFetchProfileDetailsResponseProps,
    ProviderFetchServiceDetailsResponseProps,
    ProviderFetchServiceAvailabilityResponseProps,
    ProviderFetchPlansResponseProps,
    ProviderFetchSubscriptionHistoryResponseProps,
    ProviderFetchPaymentsResponseProps,
    AddProviderAddressPayload,
} from "../interface/api/providerApiInterface";
import { CommonResponse } from "../interface/commonInterface";

// Create asyn thunk for updating the authSlice with address: true
export const addProviderAddress = createAsyncThunk<CommonResponse, AddProviderAddressPayload>("/provider/addAddress",
    async ({ formData }: AddProviderAddressPayload) => {
        const response = await axiosInstance.post(`/provider/addAddress`, formData);
        return response.data;
    }
)

export const fetchAllAppServices = async (): Promise<FetchAllServicesResponse> => {
    const response = await axiosInstance.get('/provider/fetchAllAppServices');
    return response.data;
}

// Create async thunk for upating authSlice serviceDetails: true
export const addProviderServiceDetails = createAsyncThunk<CommonResponse, AddProviderServiceDetailsPayload>("/provider/addServiceDetails",
    async ({ formData }: AddProviderServiceDetailsPayload) => {
        const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
        return response.data;
    }
)

// Create async thunk for updating authSlice serviceAvailability: true
export const addProviderServiceAvailability = createAsyncThunk<CommonResponse, AddProviderServiceAvailabilityPayload>("/provider/addServiceAvailability",
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

// This api will create the stripe session and return the session id 
export const subscribeToPlan = async (data: {planId: string, planDuration: string}) : Promise<{success: boolean, message: string, sessionId: string}> => {
    const response = await axiosInstance.post('/provider/createSubscriptionCheckoutSession', data)
    return response.data;
}

// This api will send the session id to backend and validate the sessionid and retrieve the subscription details
export const saveSubscription = async (sessionId: string): Promise<CommonResponse> => {
    const response = await axiosInstance.post('/provider/saveSubscription',{ sessionId });
    return response.data;
}

export const fetchProviderSubscriptions = async () : Promise<ProviderFetchSubscriptionHistoryResponseProps[]> => {
    const response = await axiosInstance.get('/provider/getSubscriptions');
    return response.data.subscriptions;
}

export const subscribeToTrialPlan = async (): Promise<CommonResponse> => {
    const response = await axiosInstance.post('/provider/subscribeToTrialPlan');
    return response.data;
}

export const fetchProviderPayments = async (): Promise<ProviderFetchPaymentsResponseProps[]> => {
    const response = await axiosInstance.get('/provider/getPayments');
    return response.data.payments;
}
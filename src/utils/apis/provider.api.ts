import axiosInstance from "@/lib/axios";
import {
    ProviderFetchPlansResponse,
    ProviderFetchAddressResponse,
    ProviderSubscribeToPlanRequest,
    ProviderSubscribeToPlanResponse,
    ProviderFetchAllServicesResponse,
    ProviderAddProviderAddressRequest,
    ProviderUpdateProviderInfoRequest,
    ProviderUpdateProviderInfoResponse,
    ProviderUpdateProfileImageResponse,
    ProviderFetchProfileDetailsResponse,
    ProviderFetchServiceDetailsResponse,
    AddProviderServiceAvailabilitiesRequest,
    ProviderFetchServiceAvailabilityResponse,
    ProviderFetchBookingAppointmentsResponse,
} from "../interface/api/providerApiInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { CommonResponse, FetchFunctionParams, NewCommonResponse } from "../interface/commonInterface";
import { FetchPaymentsResponse, FetchProviderSubscriptionsResponse } from "../interface/api/commonApiInterface";

// Create asyn thunk for updating the authSlice with address: true
export const providerAddProviderAddress = createAsyncThunk<CommonResponse, ProviderAddProviderAddressRequest>("/provider/addAddress",
    async ({ formData }: ProviderAddProviderAddressRequest) => {
        const response = await axiosInstance.post(`/provider/addAddress`, formData);
        return response.data;
    }
)

export const providerFetchProviderAddress = async (): Promise<ProviderFetchAddressResponse> => {
    const response = await axiosInstance.get('/provider/getAddress');
    return response.data.address;
}

export const providerFetchAllAppServices = async (): Promise<ProviderFetchAllServicesResponse> => {
    const response = await axiosInstance.get('/provider/fetchAllAppServices');
    return response.data.data;
}

// Create async thunk for upating authSlice serviceDetails: true
export const providerAddProviderServiceDetails = createAsyncThunk<CommonResponse, { formData: FormData }>("/provider/addServiceDetails",
    async ({ formData }: { formData: FormData }) => {
        const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
        return response.data;
    }
)

export const providerFetchProviderServiceDetails = async (): Promise<ProviderFetchServiceDetailsResponse> => {
    const response = await axiosInstance.get('/provider/getServiceDetails');
    return response.data.service;
}

// Create async thunk for updating authSlice serviceAvailability: true
export const providerAddProviderServiceAvailabilities = createAsyncThunk<CommonResponse, AddProviderServiceAvailabilitiesRequest>("/provider/addServiceAvailability",
    async ({ data }: AddProviderServiceAvailabilitiesRequest) => {
        const response = await axiosInstance.post(`/provider/addProviderServiceAvailability`, data);
        return response.data;
    }
)

export const providerFetchProviderProfileDetails = async (): Promise<ProviderFetchProfileDetailsResponse> => {
    const response = await axiosInstance.get('/provider/getProfileDetails');
    return response.data.profileDetails;
}

export const providerFetchProviderServiceAvailability = async (date: Date): Promise<ProviderFetchServiceAvailabilityResponse> => {
    const response = await axiosInstance.get('/provider/getServiceAvailability', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data.availability;
}

export const providerUpdateProviderProfileImage = createAsyncThunk<ProviderUpdateProfileImageResponse, FormData>('/provider/UpdateProfileImage',
    async (formData: FormData) => {
        const response = await axiosInstance.post('/provider/updateProfileImage', formData);
        return response.data;
    }
)

export const providerFetchProviderPlans = async (): Promise<ProviderFetchPlansResponse[]> => {
    const response = await axiosInstance.get('/provider/getPlans');
    return response.data.plans;
}

// This api will create the stripe session and return the session id 
export const providerSubscribeToPlan = async (data: ProviderSubscribeToPlanRequest): Promise<ProviderSubscribeToPlanResponse> => {
    const response = await axiosInstance.post('/provider/createSubscriptionCheckoutSession', data)
    return response.data;
}

// This api will send the session id to backend and validate the sessionid and retrieve the subscription details
export const providerSaveSubscription = async (sessionId: string): Promise<CommonResponse> => {
    const response = await axiosInstance.post('/provider/saveSubscription', { sessionId });
    return response.data;
}

export const providerFetchProviderSubscriptions = async (params?: FetchFunctionParams): Promise<NewCommonResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/getSubscriptions${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data);
}

export const providerSubscribeToTrialPlan = async (): Promise<CommonResponse> => {
    const response = await axiosInstance.post('/provider/subscribeToTrialPlan');
    return response.data;
}

export const providerFetchProviderPayments = async (params?: FetchFunctionParams): Promise<NewCommonResponse<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/getPayments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}

export const providerFetchBookingAppoinments = async (params?: FetchFunctionParams): Promise<NewCommonResponse<ProviderFetchBookingAppointmentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/getBookingAppointments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<ProviderFetchBookingAppointmentsResponse>(response.data);
}

export const providerUpdateProviderInfo = async (data: ProviderUpdateProviderInfoRequest): Promise<ProviderUpdateProviderInfoResponse> => {
    const response = await axiosInstance.put('/provider/updaterUserInfo', data);
    return response.data;
}
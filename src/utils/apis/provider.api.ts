import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ProviderFetchPlansApiResponse,
    ProviderFetchAddressApiResponseProps,
    ProviderFetchPaymentsApiResponse,
    ProviderSubscribeToPlanApiResponse,
    ProviderFetchAllServicesApiResponse,
    ProviderSubscribeToPlanApiRequestPayload,
    ProviderUpdateProfileImageApiResponse,
    ProviderFetchProfileDetailsApiResponse,
    ProviderFetchServiceDetailsApiResponse,
    ProviderAddProviderAddressApiRequestPayload,
    ProviderFetchServiceAvailabilityApiResponse,
    ProviderFetchBookingAppointmentsApiResponse,
    AddProviderServiceAvailabilitiesApiRequestPayload,
    ProviderUpdateProviderInfoResponse,
    ProviderUpdateProviderInfoRequestPayload,
} from "../interface/api/providerApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchProviderSubscriptionsResponse } from "../interface/api/commonApiInterface";
import { CommonResponse, FetchFunctionParams, NewCommonResponse } from "../interface/commonInterface";

// Create asyn thunk for updating the authSlice with address: true
export const providerAddProviderAddress = createAsyncThunk<CommonResponse, ProviderAddProviderAddressApiRequestPayload>("/provider/addAddress",
    async ({ formData }: ProviderAddProviderAddressApiRequestPayload) => {
        const response = await axiosInstance.post(`/provider/addAddress`, formData);
        return response.data;
    }
)

export const providerFetchProviderAddress = async (): Promise<ProviderFetchAddressApiResponseProps> => {
    const response = await axiosInstance.get('/provider/getAddress');
    return response.data.address;
}

export const providerFetchAllAppServices = async (): Promise<ProviderFetchAllServicesApiResponse> => {
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

export const providerFetchProviderServiceDetails = async (): Promise<ProviderFetchServiceDetailsApiResponse> => {
    const response = await axiosInstance.get('/provider/getServiceDetails');
    return response.data.service;
}

// Create async thunk for updating authSlice serviceAvailability: true
export const providerAddProviderServiceAvailabilities = createAsyncThunk<CommonResponse, AddProviderServiceAvailabilitiesApiRequestPayload>("/provider/addServiceAvailability",
    async ({ data }: AddProviderServiceAvailabilitiesApiRequestPayload) => {
        const response = await axiosInstance.post(`/provider/addProviderServiceAvailability`, data);
        return response.data;
    }
)

export const providerFetchProviderProfileDetails = async (): Promise<ProviderFetchProfileDetailsApiResponse> => {
    const response = await axiosInstance.get('/provider/getProfileDetails');
    return response.data.profileDetails;
}



export const providerFetchProviderServiceAvailability = async (date: Date): Promise<ProviderFetchServiceAvailabilityApiResponse> => {
    const response = await axiosInstance.get('/provider/getServiceAvailability', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data.availability;
}

export const providerUpdateProviderProfileImage = createAsyncThunk<ProviderUpdateProfileImageApiResponse, FormData>('/provider/UpdateProfileImage',
    async (formData: FormData) => {
        const response = await axiosInstance.post('/provider/updateProfileImage', formData);
        return response.data;
    }
)

export const providerFetchProviderPlans = async (): Promise<ProviderFetchPlansApiResponse[]> => {
    const response = await axiosInstance.get('/provider/getPlans');
    return response.data.plans;
}

// This api will create the stripe session and return the session id 
export const providerSubscribeToPlan = async (data: ProviderSubscribeToPlanApiRequestPayload): Promise<ProviderSubscribeToPlanApiResponse> => {
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

export const providerFetchProviderPayments = async (): Promise<ProviderFetchPaymentsApiResponse[]> => {
    const response = await axiosInstance.get('/provider/getPayments');
    return response.data.payments;
}

export const providerFetchBookingAppoinments = async (): Promise<ProviderFetchBookingAppointmentsApiResponse[]> => {
    const response = await axiosInstance.get('/provider/getBookingAppointments');
    return response.data.bookingAppointments;
}

export const providerUpdateProviderInfo = async (data: ProviderUpdateProviderInfoRequestPayload): Promise<ProviderUpdateProviderInfoResponse> => {
    const response = await axiosInstance.put('/provider/updaterUserInfo', data);
    return response.data;
}
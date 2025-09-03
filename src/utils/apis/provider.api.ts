import { axiosInstance } from "@/lib/axios";
import {
    ProviderFetchPlansResponse,
    ProviderFetchAddressResponse,
    ProviderSubscribeToPlanRequest,
    ProviderDashboardGraphResponse,
    ProviderSubscribeToPlanResponse,
    ProviderFetchAllServicesResponse,
    ProviderSaveSubscriptionResponse,
    ProviderAddProviderAddressRequest,
    ProviderUpdateProviderInfoRequest,
    ProviderUpdateProviderInfoResponse,
    ProviderUpdateProfileImageResponse,
    ProviderFetchProfileDetailsResponse,
    ProviderFetchServiceDetailsResponse,
    ProviderChangeAppointmentStatusRequest,
    AddProviderServiceAvailabilitiesRequest,
    ProviderFetchDashboardStatsDataResponse,
    ProviderFetchUsersForChatSidebarResponse,
    ProviderFetchServiceAvailabilityResponse,
} from "../interface/api/providerApiInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { ApiBaseResponse, FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchBookingsResponse, FetchPaymentsResponse, FetchProviderSubscriptionsResponse, UpdateAddressRequest, UpdateAddressResponse, ValidateRoomId } from "../interface/api/commonApiInterface";

// **** Address apis
export const providerAddProviderAddress = createAsyncThunk<ApiBaseResponse, ProviderAddProviderAddressRequest>("/provider/addAddress",
    async (data: ProviderAddProviderAddressRequest) => {
        const response = await axiosInstance.post(`/provider/addresses`, data);
        return response.data;
    }
)

export const providerFetchProviderAddress = async (): Promise<ProviderFetchAddressResponse> => {
    const response = await axiosInstance.get('/provider/addresses');
    return response.data.data;
}

export const providerUpdateProviderAddress = async (data: UpdateAddressRequest): Promise<UpdateAddressResponse> => {
    const response = await axiosInstance.patch(`/provider/addresses/${data._id}`, data);
    return response.data;
}

export const providerFetchAllAppServices = async (): Promise<ProviderFetchAllServicesResponse> => {
    const response = await axiosInstance.get('/provider/fetchAllAppServices');
    return response.data.data;
}

// Create async thunk for upating authSlice serviceDetails: true
export const providerAddProviderServiceDetails = createAsyncThunk<ApiBaseResponse, { formData: FormData }>("/provider/addServiceDetails",
    async ({ formData }: { formData: FormData }) => {
        const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
        return response.data;
    }
)

export const providerFetchProviderServiceDetails = async (): Promise<ProviderFetchServiceDetailsResponse> => {
    const response = await axiosInstance.get('/provider/getServiceDetails');
    return response.data.data;
}

// Create async thunk for updating authSlice serviceAvailability: true
export const providerAddProviderServiceAvailabilities = createAsyncThunk<ApiBaseResponse, AddProviderServiceAvailabilitiesRequest>("/provider/addServiceAvailability",
    async ({ data }: AddProviderServiceAvailabilitiesRequest) => {
        const response = await axiosInstance.post(`/provider/addProviderServiceAvailability`, data);
        return response.data;
    }
)

export const providerFetchProviderProfileDetails = async (): Promise<ProviderFetchProfileDetailsResponse> => {
    const response = await axiosInstance.get('/provider/getProfileDetails');
    return response.data.data;
}

export const providerFetchProviderServiceAvailability = async (date: Date): Promise<ProviderFetchServiceAvailabilityResponse> => {
    const response = await axiosInstance.get('/provider/getServiceAvailability', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data.data;
}

export const providerUpdateProviderProfileImage = createAsyncThunk<ProviderUpdateProfileImageResponse, FormData>('/provider/UpdateProfileImage',
    async (formData: FormData) => {
        const response = await axiosInstance.post('/provider/updateProfileImage', formData);
        return response.data;
    }
)

export const providerFetchProviderPlans = async (): Promise<ProviderFetchPlansResponse[]> => {
    const response = await axiosInstance.get('/provider/getPlans');
    return response.data.data;
}

// This api will create the stripe session and return the session id 
export const providerSubscribeToPlan = async (data: ProviderSubscribeToPlanRequest): Promise<ProviderSubscribeToPlanResponse> => {
    const response = await axiosInstance.post('/provider/createSubscriptionCheckoutSession', data)
    return response.data;
}

// This api will send the session id to backend and validate the sessionid and retrieve the subscription details
export const providerSaveSubscription = async (sessionId: string): Promise<ProviderSaveSubscriptionResponse> => {
    const response = await axiosInstance.post('/provider/saveSubscription', { sessionId });
    return response.data;
}

export const providerFetchProviderSubscriptions = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/getSubscriptions${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data);
}

export const providerSubscribeToTrialPlan = async (): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/provider/subscribeToTrialPlan');
    return response.data;
}

export const providerFetchProviderPayments = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/getPayments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}


export const providerUpdateProviderInfo = createAsyncThunk<ProviderUpdateProviderInfoResponse, ProviderUpdateProviderInfoRequest>('/provider/updaterUserInfo',
    async (data: ProviderUpdateProviderInfoRequest) => {
        const response = await axiosInstance.patch('/provider/updaterUserInfo', data);
        return response.data;
    }
)

export const providerFetchUsersFroChatSideBar = async () : Promise<ProviderFetchUsersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/provider/getUsersForCahtSidebar');
    return response.data.data
}

export const providerFetchDashboardStatsData = async () : Promise<ProviderFetchDashboardStatsDataResponse> => {
    const response = await axiosInstance.get('/provider/getDashboardStats');
    return response.data.data;
}

export const providerFetchDashboardGraphData = async () : Promise<ProviderDashboardGraphResponse> => {
    const response = await axiosInstance.get('/provider/getDashboardGraphData');
    return response.data.data;
}

// **** Booking apis
export const providerFetchBookingAppoinments = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchBookingsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/provider/bookings/${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchBookingsResponse>(response.data);
}

export const providerChangeAppointmentStatus = async (data: ProviderChangeAppointmentStatusRequest) : Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/provider/bookings/${data.appointmentId}`,data);
    return response.data;
}

export const providerValidateRoomId = async (data: ValidateRoomId): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.get(`/provider/bookings/${data._id}/can-join?roomId=${data.videoCallRoomId}`);
    return response.data;
} 
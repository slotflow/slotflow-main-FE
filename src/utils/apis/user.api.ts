import axiosInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommonResponse, FetchFunctionParams, ApiResponsePaginated } from "../interface/commonInterface";
import { 
    UserCancelBookingResponse, 
    UserFetchBookingsResponse, 
    UserBookAppointmentResponse, 
    AddUserAddressRequest, 
    UserFetchUserAddressResponse, 
    UserFetchUserProfileResponse, 
    UpdateUserProfileImageResponse, 
    UserFetchProviderAddressResponse, 
    UserFetchProviderServiceResponse, 
    UserFetchServiceProvidersResponse, 
    UserBookAnAppointmentRequest, 
    UserFetchProviderAvailabilityResponse, 
    UserFetchProviderProfileDetailsResponse,
    UserUpdateUserInfoRequest,
    UserUpdateUserInfoResponse,
} from "../interface/api/userApiInterface";
import { Provider } from "../interface/entityInterface/providerInterface";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { FetchPaymentsResponse } from "../interface/api/commonApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";


export const userFetchUserProfileDetails = async (): Promise<UserFetchUserProfileResponse> => {
    const response = await axiosInstance.get('/user/getProfileDetails');
    return response.data.profileDetails;
}

export const userUpdateUserProfileImage = createAsyncThunk<UpdateUserProfileImageResponse, FormData>("/user/updateProfileImage",
    async (payload: FormData) => {
        const response = await axiosInstance.post('/user/updateProfileImage', payload);
        return response.data;
    }
)

export const userUpdateUserInfo = async (data: UserUpdateUserInfoRequest) : Promise<UserUpdateUserInfoResponse> => {
    const response = await axiosInstance.put(`/user/updateUserInfo`, data);
    return response.data;
}

export const userFetchUserAddress = async (): Promise<UserFetchUserAddressResponse> => {
    const response = await axiosInstance.get('/user/getAddress');
    return response.data.address;
}

export const userAddUserAddress = async ({ formData }: AddUserAddressRequest): Promise<CommonResponse> => {
    const response = await axiosInstance.post('/user/addAddress', formData);
    return response.data;
}

export const userSearchServiceProviders = async (selectedServices: string[]): Promise<UserFetchServiceProvidersResponse[]> => {
    const response = await axiosInstance.get(`/user/getServiceProviders/${selectedServices.join(",")}`);
    return response.data.providers;
};

export const userFetchProviderDetails = async (providerId : Provider["_id"]) : Promise<UserFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderProfileDetails/${providerId}`);
    return response.data.provider;
}

export const userFetchProviderAddress = async (providerId : Provider["_id"]) : Promise<UserFetchProviderAddressResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderAddress/${providerId}`);
    return response.data.address;
}

export const userFetchProviderService = async (providerId : Provider["_id"]) : Promise<UserFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceDetails/${providerId}`);
    return response.data.service;
}

export const userFetchProviderServiceAvailability = async (data : {providerId : Provider["_id"], date : Date}) : Promise<UserFetchProviderAvailabilityResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceAvailability/${data.providerId}`, {
        params : {
            date : data.date.toISOString()
        }
    });
    return response.data.availability;
}

export const userBookAnAppointment = async (data : UserBookAnAppointmentRequest) : Promise<UserBookAppointmentResponse>  => {
    const response = await axiosInstance.post('/user/createBookingCheckoutSession', data);
    return response.data;
}

export const userSaveAppointmentBooking = async (sessionId: string) : Promise<CommonResponse> => {
    const response = await axiosInstance.post('/user/saveAppointmentBooking', { sessionId });
    return response.data;
}

export const userFetchBookings = async (params?: FetchFunctionParams) : Promise<ApiResponsePaginated<UserFetchBookingsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/user/getBookings${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<UserFetchBookingsResponse>(response.data);
}


export const userCancelBooking = async (bookingId: Booking["_id"]) : Promise<UserCancelBookingResponse> => {
    const response = await axiosInstance.put(`/user/cancelBooking/${bookingId}`);
    return response.data;
}

export const userFetchPayments = async (params?: FetchFunctionParams) : Promise<ApiResponsePaginated<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/user/getPayments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}
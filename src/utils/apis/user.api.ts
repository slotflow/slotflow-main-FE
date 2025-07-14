import axiosInstance from "@/lib/axios"
import { 
    AddUserAddressRequest, 
    UserUpdateUserInfoRequest,
    UserUpdateUserInfoResponse,
    UserBookAppointmentResponse, 
    UserFetchUserAddressResponse, 
    UserBookAnAppointmentRequest, 
    UserFetchAllServicesResponse,
    UpdateUserProfileImageResponse, 
    UserFetchProviderAddressResponse, 
    UserFetchProviderServiceResponse, 
    UserFetchServiceProvidersResponse, 
    UserFetchUserProfileDetailsResponse, 
    UserFetchProviderAvailabilityResponse, 
    UserFetchProviderProfileDetailsResponse,
    UserFetchProvidersForChatSidebarResponse,
} from "../interface/api/userApiInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Booking } from "../interface/entityInterface/bookingInterface";
import { Provider } from "../interface/entityInterface/providerInterface";
import { FetchBookingsResponse, FetchPaymentsResponse } from "../interface/api/commonApiInterface";
import { ApiBaseResponse, FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";

export const userFetchUserProfileDetails = async (): Promise<UserFetchUserProfileDetailsResponse> => {
    const response = await axiosInstance.get('/user/getProfileDetails');
    return response.data.data;
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

export const userAddUserAddress = async ({ formData }: AddUserAddressRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user/addAddress', formData);
    return response.data;
}

export const userFetchUserAddress = async (): Promise<UserFetchUserAddressResponse> => {
    const response = await axiosInstance.get('/user/getAddress');
    return response.data.data;
}

export const userFetchAllServicesForServiceSelectPage = async (): Promise<Array<UserFetchAllServicesResponse>> => {
    const response = await axiosInstance.get(`/user/getAllServices`);
    return response.data.data;
}

export const userSearchServiceProviders = async (selectedServices: string[]): Promise<UserFetchServiceProvidersResponse[]> => {
    const response = await axiosInstance.get(`/user/getServiceProviders/${selectedServices.join(",")}`);
    return response.data.data;
};

export const userFetchProviderDetails = async (providerId : Provider["_id"]) : Promise<UserFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderProfileDetails/${providerId}`);
    return response.data.data;
}

export const userFetchProviderAddress = async (providerId : Provider["_id"]) : Promise<UserFetchProviderAddressResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderAddress/${providerId}`);
    return response.data.data;
}

export const userFetchProviderService = async (providerId : Provider["_id"]) : Promise<UserFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceDetails/${providerId}`);
    return response.data.data;
}

export const userFetchProviderServiceAvailability = async (data : {providerId : Provider["_id"], date : Date}) : Promise<UserFetchProviderAvailabilityResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceAvailability/${data.providerId}`, {
        params : {
            date : data.date.toISOString()
        }
    });
    return response.data.data;
}

export const userBookAnAppointment = async (data : UserBookAnAppointmentRequest) : Promise<UserBookAppointmentResponse>  => {
    const response = await axiosInstance.post('/user/createBookingCheckoutSession', data);
    return response.data;
}

export const userSaveAppointmentBooking = async (sessionId: string) : Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/user/saveAppointmentBooking', { sessionId });
    return response.data;
}

export const userFetchBookings = async (params?: FetchFunctionParams) : Promise<ApiPaginatedResponse<FetchBookingsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/user/getBookings${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchBookingsResponse>(response.data);
}

export const userCancelBooking = async (bookingId: Booking["_id"]) : Promise<ApiBaseResponse> => {
    const response = await axiosInstance.put(`/user/cancelBooking/${bookingId}`);
    return response.data;
}

export const userFetchPayments = async (params?: FetchFunctionParams) : Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/user/getPayments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}

export const UserFetchProvidersForChatSideBar = async () : Promise<UserFetchProvidersForChatSidebarResponse> => {
    const response = await axiosInstance.get('/user/getProvidersForChatSidebar');
    return response.data.data;
}
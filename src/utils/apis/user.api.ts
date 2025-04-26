import axiosInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommonResponse } from "../interface/commonInterface";
import { AddUserAddressPayload, 
    FetchUserAddressResponse, 
    FetchUserProfileResponse, 
    UpdateUserProfileImageResponse, 
    UserBookAnAppointmentRequestProps, 
    UserFetchProviderAddressResponseProps, 
    UserFetchProviderAvailabilityResponseProps, 
    UserFetchProviderProfileDetailsResponse, 
    UserFetchProviderServiceResponseProps, 
    UserFetchServiceProvidersResponse 
} from "../interface/api/userApiInterface";

export const fetchUserProfileDetails = async (): Promise<FetchUserProfileResponse> => {
    const response = await axiosInstance.get('/user/getProfileDetails');
    return response.data.profileDetails;
}

export const updateUserProfileImage = createAsyncThunk<UpdateUserProfileImageResponse, FormData>("/user/updateProfileImage",
    async (payload: FormData) => {
        const response = await axiosInstance.post('/user/updateProfileImage', payload);
        return response.data;
    }
)

export const addUserAddress = async ({ formData }: AddUserAddressPayload): Promise<CommonResponse> => {
    const response = await axiosInstance.post('/user/addAddress', formData);
    return response.data;
}

export const fetchUserAddress = async (): Promise<FetchUserAddressResponse> => {
    const response = await axiosInstance.get('/user/getAddress');
    return response.data.address;
}

export const userSearchServiceProviders = async (selectedServices: string[]): Promise<Array<UserFetchServiceProvidersResponse>> => {
    const response = await axiosInstance.get(`/user/getServiceProviders/${selectedServices.join(",")}`);
    return response.data.providers;
};

export const userFetchProviderDetails = async (providerId : string) : Promise<UserFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderProfileDetails/${providerId}`);
    return response.data.provider;
}

export const userFetchProviderAddress = async (providerId : string) : Promise<UserFetchProviderAddressResponseProps> => {
    const response = await axiosInstance.get(`/user/getServiceProviderAddress/${providerId}`);
    return response.data.address;
}

export const userFetchProviderService = async (providerId : string) : Promise<UserFetchProviderServiceResponseProps> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceDetails/${providerId}`);
    return response.data.service;
}

export const userFetchProviderServiceAvailability = async (providerId : string) : Promise<UserFetchProviderAvailabilityResponseProps> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceAvailability/${providerId}`);
    return response.data.availability;
}

export const userBookAnAppointment = async (data : UserBookAnAppointmentRequestProps) : Promise<{success: boolean, message: string, sessionId: string}>  => {
    const response = await axiosInstance.post('/user/createBookingCheckoutSession', data);
    return response.data;
}

export const saveAppointmentBooking = async (sessionId: string) : Promise<CommonResponse> => {
    const response = await axiosInstance.post('/user/saveAppointmentBooking', { sessionId });
    return response.data;
}
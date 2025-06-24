import axiosInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommonResponse } from "../interface/commonInterface";
import { 
    UserCancelBookingApiResponse, 
    UserFetchBookingsApiResponse, 
    UserFetchPaymentsApiResponse, 
    UserBookAppointmentApiResponse, 
    AddUserAddressApiRequestPayload, 
    UserFetchUserAddressApiResponse, 
    UserFetchUserProfileApiResponse, 
    UpdateUserProfileImageApiResponse, 
    UserFetchProviderAddressApiResponse, 
    UserFetchProviderServiceApiResponse, 
    UserFetchServiceProvidersApiResponse, 
    UserBookAnAppointmentApiRequestPayload, 
    UserFetchProviderAvailabilityApiResponse, 
    UserFetchProviderProfileDetailsApiResponse,
    UserUpdateUserInfoApiRequestPayload,
    UserUpdateUserInfoApiResponse,
} from "../interface/api/userApiInterface";
import { Provider } from "../interface/entityInterface/providerInterface";
import { Booking } from "../interface/entityInterface/bookingInterface";


export const userFetchUserProfileDetails = async (): Promise<UserFetchUserProfileApiResponse> => {
    const response = await axiosInstance.get('/user/getProfileDetails');
    return response.data.profileDetails;
}

export const userUpdateUserProfileImage = createAsyncThunk<UpdateUserProfileImageApiResponse, FormData>("/user/updateProfileImage",
    async (payload: FormData) => {
        const response = await axiosInstance.post('/user/updateProfileImage', payload);
        return response.data;
    }
)

export const userUpdateUserInfo = async (data: UserUpdateUserInfoApiRequestPayload) : Promise<UserUpdateUserInfoApiResponse> => {
    const response = await axiosInstance.put(`/user/updateUserInfo`, data);
    return response.data;
}

export const userFetchUserAddress = async (): Promise<UserFetchUserAddressApiResponse> => {
    const response = await axiosInstance.get('/user/getAddress');
    return response.data.address;
}

export const userAddUserAddress = async ({ formData }: AddUserAddressApiRequestPayload): Promise<CommonResponse> => {
    const response = await axiosInstance.post('/user/addAddress', formData);
    return response.data;
}

export const userSearchServiceProviders = async (selectedServices: string[]): Promise<UserFetchServiceProvidersApiResponse[]> => {
    const response = await axiosInstance.get(`/user/getServiceProviders/${selectedServices.join(",")}`);
    return response.data.providers;
};

export const userFetchProviderDetails = async (providerId : Provider["_id"]) : Promise<UserFetchProviderProfileDetailsApiResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderProfileDetails/${providerId}`);
    return response.data.provider;
}

export const userFetchProviderAddress = async (providerId : Provider["_id"]) : Promise<UserFetchProviderAddressApiResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderAddress/${providerId}`);
    return response.data.address;
}

export const userFetchProviderService = async (providerId : Provider["_id"]) : Promise<UserFetchProviderServiceApiResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceDetails/${providerId}`);
    return response.data.service;
}

export const userFetchProviderServiceAvailability = async (data : {providerId : Provider["_id"], date : Date}) : Promise<UserFetchProviderAvailabilityApiResponse> => {
    const response = await axiosInstance.get(`/user/getServiceProviderServiceAvailability/${data.providerId}`, {
        params : {
            date : data.date.toISOString()
        }
    });
    return response.data.availability;
}

export const userBookAnAppointment = async (data : UserBookAnAppointmentApiRequestPayload) : Promise<UserBookAppointmentApiResponse>  => {
    const response = await axiosInstance.post('/user/createBookingCheckoutSession', data);
    return response.data;
}

export const userSaveAppointmentBooking = async (sessionId: string) : Promise<CommonResponse> => {
    const response = await axiosInstance.post('/user/saveAppointmentBooking', { sessionId });
    return response.data;
}

export const userFetchBookings = async () : Promise<Array<UserFetchBookingsApiResponse>> => {
    const response = await axiosInstance.get('/user/getBookings');
    return response.data.bookings;
}

export const userFetchPayments = async () : Promise<Array<UserFetchPaymentsApiResponse>> => {
    const response = await axiosInstance.get('/user/getPayments');
    return response.data.payments;
}

export const userCancelBooking = async (bookingId: Booking["_id"]) : Promise<UserCancelBookingApiResponse> => {
    const response = await axiosInstance.put(`/user/cancelBooking/${bookingId}`);
    return response.data;
}


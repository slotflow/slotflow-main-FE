import axiosInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    UserUpdateProfileImageResponseProps,
    UserFetchProfileDetailsResponseProps,
    UserFetchAddressResponseProps,
    AddUserAddressPayload,
    ApiCommonResponse,
} from "../interface/api/userApi.Interface";


export const fetchUserProfileDetails = async (): Promise<UserFetchProfileDetailsResponseProps> => {
    const response = await axiosInstance.get('/user/getProfileDetails');
    return response.data.profileDetails;
}

export const updateUserProfileImage = createAsyncThunk<UserUpdateProfileImageResponseProps, FormData>("/user/updateProfileImage",
    async (payload: FormData) => {
        const response = await axiosInstance.post('/user/updateProfileImage', payload);
        return response.data;
    }
)

export const fetchUserAddress = async (): Promise<UserFetchAddressResponseProps> => {
    const response = await axiosInstance.get('/user/getAddress');
    return response.data.address;
}

export const addUserAddress = async ({ formData }: AddUserAddressPayload): Promise<ApiCommonResponse> => {
    const response = await axiosInstance.post('/user/addAddress', formData);
    return response.data;
}

export interface UserFetchServiceProviders {
    _id: string,
    provider: {
        _id: string,
        username: string,
        profileImage: string | null,
        trustedBySlotflow: boolean,
    },
    service: {
        serviceCategory: string,
        serviceName: string,
        servicePrice: number,
        categoryName: string
    }
}


export const userSearchServiceProviders = async (selectedServices: string[]): Promise<Array<UserFetchServiceProviders>> => {
    const response = await axiosInstance.get(`/user/getServiceProviders/${selectedServices.join(",")}`);
    return response.data.providers;
};
import axiosInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    UserUpdateProfileImageResponseProps,
    UserFetchProfileDetailsResponseProps, 
 } from "../interface/api/userApi.Interface";


export const fetchUserProfileDetails = async (): Promise<UserFetchProfileDetailsResponseProps> => {
    const response = await axiosInstance.get('/user/getProfileDetails');
    return response.data.profileDetails;
}

export const updateUserProfileImage = createAsyncThunk<UserUpdateProfileImageResponseProps, FormData>("/user/updateProfileImage",
    async (payload: FormData) => {
        const response = await axiosInstance.post('/user/updateProfileImage',payload);
        return response.data;
    }
)
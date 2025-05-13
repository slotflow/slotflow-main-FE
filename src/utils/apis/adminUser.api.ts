import axiosInstance from "../../lib/axios";
import {
    AdminfetchAllUsersApiResponse,
    AdminChnageUserBlockStatusApiResponse,
    AdminChangeUserStatusApiRequestPayload,
} from "../interface/api/adminUserApiInterface";


export const adminFetchAllUsers = async (): Promise<AdminfetchAllUsersApiResponse[]> => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}

export const adminChangeUserBlockStatus = async (data: AdminChangeUserStatusApiRequestPayload): Promise<AdminChnageUserBlockStatusApiResponse> => {
    const response = await axiosInstance.put(`/admin/changeUserStatus`, data);
    return response.data;
}



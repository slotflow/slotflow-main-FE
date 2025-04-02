import axiosInstance from "../../lib/axios";
import {
    AdminChnageUserStatusResponse,
    AdminfetchAllUsersResponseProps,
    AdminChangeUserStatusRequestPayload,
} from "../interface/api/adminUserApiInterface";


export const fetchUsers = async (): Promise<AdminfetchAllUsersResponseProps[]> => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}

export const changeUserBlockStatus = async (data: AdminChangeUserStatusRequestPayload): Promise<AdminChnageUserStatusResponse> => {
    const response = await axiosInstance.put(`/admin/changeUserStatus`, data);
    return response.data;
}



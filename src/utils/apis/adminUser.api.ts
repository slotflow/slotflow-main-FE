import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios";
import { 
    AdminChnageUserStatusResponse, 
    AdminfetchAllUsersResponseProps, 
    AdminChangeUserStatusRequestPayload, 
} from "../interface/api/adminUserApiInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUsers = async (): Promise<AdminfetchAllUsersResponseProps[]> => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}

export const changeUserBlockStatus = createAsyncThunk<AdminChnageUserStatusResponse, AdminChangeUserStatusRequestPayload>('/admin/changeUserStatus',
    async (statusData: AdminChangeUserStatusRequestPayload) => {
        const { userId, status } = statusData;
        const response = await axiosInstance.put(`/admin/user/changeStatus/${userId}?status=${status}`);
        toast.success(response.data.message)
        return response.data.updatedUser;
    }
)



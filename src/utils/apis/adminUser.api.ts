import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminChangeUserStatusRequestPayload, AdminChnageUserStatusResponse, AdminFetchAllUsersResponse } from "../interface/api/adminUserApiInterface";

export const fetchUsers = async (): Promise<AdminFetchAllUsersResponse> => {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
}

export const changeUserBlockStatus = createAsyncThunk<AdminChnageUserStatusResponse, AdminChangeUserStatusRequestPayload>('/admin/changeUserStatus',
    async (statusData: AdminChangeUserStatusRequestPayload) => {
        const { userId, status } = statusData;
        const response = await axiosInstance.put(`/admin/user/changeStatus/${userId}?status=${status}`);
        return response.data;
    }
)



import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminChangeUserStatusRequestPayload, AdminChnageUserStatusResponse } from "../interface";

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}


export const changeUserBlockStatus = createAsyncThunk<AdminChnageUserStatusResponse,AdminChangeUserStatusRequestPayload>('/admin/changeUserStatus',
    async (statusData: AdminChangeUserStatusRequestPayload) => {
            const { userId, status } = statusData;
            const response = await axiosInstance.put(`/admin/user/changeStatus/${userId}?status=${status}`);
            return response.data
    }
)



import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}

export const changeUserBlockStatus = createAsyncThunk('/admin/changeUserStatus',
    async (statusData: { userId: string, status: boolean }) => {
            const { userId, status } = statusData;
            const response = await axiosInstance.put(`/admin/user/changeStatus/${userId}?status=${status}`);
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
            return { userId, updatedUser: res.updatedUser };
    }
)



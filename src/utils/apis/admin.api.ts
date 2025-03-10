import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserBlocked } from "../redux/slices/authSlice";

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}

export const changeUserBlockStatus = createAsyncThunk('/admin/changeUserStatus',
    async (statusData: { userId: string, status: boolean }, thunkAPI) => {
        try {
            console.log("statusData : ", statusData)
            const { userId, status } = statusData;
            const response = await axiosInstance.put(`/admin/user/changeStatus/${userId}?status=${status}`);
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
                console.log("userBlocking status : ", res.updatedUser.isBlocked);
                thunkAPI.dispatch(setUserBlocked(res.updatedUser.isBlocked));
            } else {
                toast.error(res.message);
            }
            console.log("response : ", res);
            return { userId, updatedUser: res.updatedUser };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
                return;
            }
        }
    }
)



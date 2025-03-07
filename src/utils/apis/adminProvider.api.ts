import axios from "axios";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setProviderBlocked } from "../redux/slices/authSlice";

export const fetchProviders = async () => {
    const response = await axiosInstance.get("/admin/providers");
    return response.data.providers;
};

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}

export const approveProvider = createAsyncThunk('/admin/approve/provider/',
    async (providerId: string, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/admin/provider/approve/${providerId}`);
            const res = response.data;
            if(res.success){
                toast.success(res.message);
            }else{
                toast.error(res.message);
            }
            return { providerId, updatedProvider: res.updatedProvider };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

export const changeProviderBlockStatus = createAsyncThunk('/admin/changeProviderStatus',
    async (statusData: {providerId: string, status: boolean}, thunkAPI) => {
        try {
            const { providerId, status } = statusData;
            const response = await axiosInstance.put(`/admin/provider/changeStatus/${providerId}?status=${status}`);
            const res = response.data;
            if(res.success){
                toast.success(res.message);
                thunkAPI.dispatch(setProviderBlocked(res.updatedProvider.isBlocked));
            }else{
                toast.error(res.message);
            }
            return { providerId, updatedProvider: res.updatedProvider };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

import axios from "axios";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProviders = async () => {
    console.log("calling api providers");
    const response = await axiosInstance.get("/admin/providers");
    console.log("provider response : ",response);
    return response.data.providers;
};

export const fetchUsers = async () => {
    console.log("calling api users");
    const response = await axiosInstance.get('/admin/users');
    console.log("user response : ",response);
    return response.data.users;
}

export const approveProvider = createAsyncThunk('/auth/approve/provider/',
    async (providerId: string, thunkAPI) => {
        try {
            console.log("Approving : ",providerId);
            const response = await axiosInstance.put(`/admin/provider/approve/${providerId}`);
            const res = response.data;
            return { providerId, updatedProvider: res.updatedProvider };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

export const changeBlockStatus = createAsyncThunk('/auth/changeProviderStatus',
    async (statusData: {providerId: string, status: boolean}, thunkAPI) => {
        try {
            const { providerId, status } = statusData;
            const response = await axiosInstance.put(
                `/admin/provider/changeStatus/${providerId}?status=${status}`
            );
            const res = response.data;
            return { providerId, updatedProvider: res.updatedProvider };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

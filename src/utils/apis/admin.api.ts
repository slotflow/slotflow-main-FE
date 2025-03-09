import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProviderBlocked, setUserBlocked } from "../redux/slices/authSlice";

export const fetchProviders = async () => {
    const response = await axiosInstance.get("/admin/providers");
    return response.data.providers;
};

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.users;
}

export const fetchServices = async () => {
    const response = await axiosInstance.get("/admin/services");
    return response.data.services;
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


export const changeUserBlockStatus = createAsyncThunk('/admin/changeUserStatus',
    async (statusData: {userId: string, status: boolean}, thunkAPI) => {
        try {
            console.log("statusData : ",statusData)
            const { userId, status } = statusData;
            const response = await axiosInstance.put(`/admin/user/changeStatus/${userId}?status=${status}`);
            const res = response.data;
            if(res.success){
                toast.success(res.message);
                console.log("userBlocking status : ",res.updatedUser.isBlocked);
                thunkAPI.dispatch(setUserBlocked(res.updatedUser.isBlocked));
            }else{
                toast.error(res.message);
            }
            console.log("response : ",res);
            return { userId, updatedUser: res.updatedUser };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)


export const addNewService = createAsyncThunk('/admin/addNewService',
    async (serviceName: string, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/admin/addNewService', { serviceName });
            const res = response.data;
            console.log("response : ",res);
            if (res.success) {
              toast.success(res.message);
              return res;
            } else {
              toast.error(res.message);
              return thunkAPI.rejectWithValue(res.message);
            }
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)


export const chnageServiceBlockStatus = createAsyncThunk('/admin/changeServiceStatus',
    async (statusData: {serviceId: string, status: boolean}, thunkAPI) => {
        try {
            console.log("statusData : ",statusData)
            const { serviceId, status } = statusData;
            const response = await axiosInstance.put(`/admin/changeServiceStatus/${serviceId}?status=${status}`);
            const res = response.data;
            if(res.success){
                toast.success(res.message);
                console.log("serviceBlocking status : ",res.updatedService.isBlocked);
            }else{
                toast.error(res.message);
            }
            console.log("response : ",res);
            return { serviceId, updatedService : res.updatedService };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)
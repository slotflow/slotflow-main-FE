import axios from "axios";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProviders = async () => {
    const response = await axiosInstance.get("/admin/providers");
    return response.data.providers;
};

export const approveProvider = createAsyncThunk('/auth/approve/provider/',
    async (providerId: string, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/admin/provider/approve/${providerId}`);
            const res = response.data;
            console.log("res : ", res);
            return { providerId, updatedProvider: res.updatedProvider };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)
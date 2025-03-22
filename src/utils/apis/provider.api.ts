import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddProviderAddressPayload, AddProviderServiceAvailabilityPayload, AddProviderServiceDetailsPayload, ApiCommonResponse } from "../interface";

export const addProviderAddress = createAsyncThunk<ApiCommonResponse,AddProviderAddressPayload>('/provider/addAddress',
    async ({ formData }) => {
        const response = await axiosInstance.post(`/provider/addAddress`, formData);
        return response.data;
    }
)

export const fetchAllServices = createAsyncThunk('/provider/fetchAllServices', 
    async () => {
        const response = await axiosInstance.get('/provider/fetchAllServices');
        return response.data;
    }
)

export const addProviderServiceDetails = createAsyncThunk<ApiCommonResponse,AddProviderServiceDetailsPayload>('/provider/addAddress',
    async ({ formData }) => {
        const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
        return response.data;
    }
)

export const addProviderServiceAvailability = createAsyncThunk<ApiCommonResponse,AddProviderServiceAvailabilityPayload>('/provider/addProviderServiceAvailability',
    async ({ data }) => {
        const response = await axiosInstance.post(`/provider/addProviderServiceAvailability`,data);
        return response.data;
    }
)
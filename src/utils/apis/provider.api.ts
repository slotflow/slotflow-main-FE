import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AddProviderAddressPayload {
    formData: {
        addressLine: string;
        phone: string;
        place: string;
        city: string;
        district: string;
        pincode: string;
        state: string;
        country: string;
        googleMapLink: string;
    };
}

interface AddProviderAddressResponse {
    success: boolean; 
    message: string; 
}


export const addProviderAddress = createAsyncThunk<AddProviderAddressResponse,AddProviderAddressPayload>('/provider/addAddress',
    async ({ formData }) => {
        console.log("calling api")
        const response = await axiosInstance.post(`/provider/addAddress`, formData);
        console.log("Response : ",response)
        return response.data;
    }
)

export const fetchAllServices = createAsyncThunk('/provider/fetchAllServices', 
    async () => {
        const response = await axiosInstance.get('/provider/fetchAllServices');
        return response.data;
    }
)

interface AddProviderServiceDetailsPayload {
    formData:FormData
}

interface AddProviderServiceDetailsResponse {
    success: boolean; 
    message: string; 
}

export const addProviderServiceDetails = createAsyncThunk<AddProviderServiceDetailsResponse,AddProviderServiceDetailsPayload>('/provider/addAddress',
    async ({ formData }) => {
        const response = await axiosInstance.post(`/provider/addServiceDetails`, formData);
        return response.data;
    }
)

interface Availability {
    day: string;
    duration: string;
    startTime: string;
    endTime: string;
    modes: string[];
    slots: string[];
  }

interface AddProviderServiceAvailabilityPayload {
    data: Availability[];
}

interface AddProviderServiceAvailabilityResponse {
    success: boolean;
    message: string;
}

export const addProviderServiceAvailability = createAsyncThunk<AddProviderServiceAvailabilityResponse,AddProviderServiceAvailabilityPayload>('/provider/addProviderServiceAvailability',
    async ({ data }) => {
        console.log("data : ",data);
        const response = await axiosInstance.post(`/provider/addProviderServiceAvailability`,data);
        console.log("Response : ",response);
        return response.data;
    }
)
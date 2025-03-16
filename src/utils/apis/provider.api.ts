import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AddProviderAddressPayload {
    providerId: string;
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

interface addressAddingResponse {
    success: boolean; 
    message: string; 
    address: boolean;
}

export const addProviderAddress = createAsyncThunk<addressAddingResponse,AddProviderAddressPayload>('/provider/addAddress',
    async ({ providerId, formData }) => {
        console.log("ProviderId : ",providerId,"formData : ",formData);
        const response = await axiosInstance.post(`/provider/addAddress/${providerId}`, formData);
        console.log("response : ",response);
        return response.data;
    }
)
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

interface AddressAddingResponse {
    success: boolean; 
    message: string; 
    address: boolean;
}

interface AddProviderServiceDetailsPayload {
    providerId: string;
    formData:FormData
}

interface ServiceDetailsAddingResponse {
    success: boolean; 
    message: string; 
    service: boolean;
}

export const addProviderAddress = createAsyncThunk<AddressAddingResponse,AddProviderAddressPayload>('/provider/addAddress',
    async ({ providerId, formData }) => {
        console.log("ProviderId : ",providerId,"formData : ",formData);
        const response = await axiosInstance.post(`/provider/addAddress/${providerId}`, formData);
        console.log("response : ",response);
        return response.data;
    }
)

export const fetchAllServices = createAsyncThunk('/provider/fetchAllServices', 
    async () => {
        const response = await axiosInstance.get('/provider/fetchAllServices');
        console.log("response : ",response);
        return response.data;
    }
)

export const addProviderServiceDetails = createAsyncThunk<ServiceDetailsAddingResponse,AddProviderServiceDetailsPayload>('/provider/addAddress',
    async ({ providerId, formData }) => {
        console.log("ProviderId : ",providerId,"formData : ",formData);
        formData.forEach((data) => {
            console.log(data, " ", typeof data);
        })
        const response = await axiosInstance.post(`/provider/addServiceDetails/${providerId}`, formData);
        console.log("response : ",response);
        return response.data;
    }
)
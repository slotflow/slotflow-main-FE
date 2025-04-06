import axiosInstance from "@/lib/axios";
import {
    AdminFetchAllServices,
    AdminAddNewServiceRequestPayload,
    AdminAddNewServiceResponseProps,
    AdminChangeServiceBlockStatusRequestPayload,
    AdminChangeServiceBlockStatusResponseProps,
} from "../interface/api/adminServiceApiInterface";

export const fetchServices = async (): Promise<Array<AdminFetchAllServices>> => {
    const response = await axiosInstance.get("/admin/services");
    return response.data.services;
}

export const addNewService = async (payload: AdminAddNewServiceRequestPayload): Promise<AdminAddNewServiceResponseProps> => {
    const response = await axiosInstance.post('/admin/addNewService', { serviceName: payload.appServiceName });
    return response.data;
}

export const chnageServiceBlockStatus = async (statusData: AdminChangeServiceBlockStatusRequestPayload): Promise<AdminChangeServiceBlockStatusResponseProps> => {
    const { serviceId, status } = statusData;
    const response = await axiosInstance.put(`/admin/changeServiceStatus/${serviceId}?status=${status}`);
    return response.data;
}
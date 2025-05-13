import axiosInstance from "@/lib/axios";
import {
    AdminFetchAllServicesApiResponse,
    AdminAddNewServiceApiResponse,
    AdminChangeServiceBlockStatusApiRequestPayload,
    AdminChangeServiceBlockStatusApiResponse,
} from "../interface/api/adminServiceApiInterface";
import { Service } from "../interface/entityInterface/appServiceInterface";

export const adminFetchAllServices = async (): Promise<AdminFetchAllServicesApiResponse[]> => {
    const response = await axiosInstance.get("/admin/services");
    return response.data.services;
}

export const adminAddNewService = async (data : {serviceName: Service["serviceName"]}): Promise<AdminAddNewServiceApiResponse> => {
    const response = await axiosInstance.post('/admin/addNewService', { data });
    return response.data;
}

export const adminChangeServiceBlockStatus = async (data: AdminChangeServiceBlockStatusApiRequestPayload): Promise<AdminChangeServiceBlockStatusApiResponse> => {
    const response = await axiosInstance.put(`/admin/changeServiceStatus/${data.serviceId}?status=${data.isBlocked}`);
    return response.data;
}
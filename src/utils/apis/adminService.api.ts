import axiosInstance from "@/lib/axios";
import {
    AdminAddNewServiceResponse,
    AdminFetchAllServicesResponse,
    AdminChangeServiceBlockStatusRequest,
    AdminChangeServiceBlockStatusResponse,
} from "../interface/api/adminServiceApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Service } from "../interface/entityInterface/appServiceInterface";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllServices = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminFetchAllServicesResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/services${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllServicesResponse>(response.data);
}

export const adminAddNewService = async (data : {appServiceName: Service["serviceName"]}): Promise<AdminAddNewServiceResponse> => {
    const response = await axiosInstance.post('/admin/addNewService', data );
    return response.data;
}

export const adminChangeServiceBlockStatus = async (data: AdminChangeServiceBlockStatusRequest): Promise<AdminChangeServiceBlockStatusResponse> => {
    const response = await axiosInstance.patch(`/admin/changeServiceBlockStatus`, data);
    return response.data;
}
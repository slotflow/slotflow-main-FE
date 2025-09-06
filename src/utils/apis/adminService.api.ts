import { axiosInstance } from "@/lib/axios";
import {
    AdminFetchAllServicesResponse,
    AdminChangeServiceBlockStatusRequest,
} from "../interface/api/adminServiceApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Service } from "../interface/entityInterface/appServiceInterface";
import { FetchFunctionParams, ApiPaginatedResponse, ApiBaseResponse } from "../interface/commonInterface";

export const adminFetchAllServices = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminFetchAllServicesResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/services${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllServicesResponse>(response.data);
}

export const adminAddNewService = async (data : {appServiceName: Service["serviceName"]}): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.post('/admin/services', data );
    return response.data;
}

export const adminChangeServiceBlockStatus = async (data: AdminChangeServiceBlockStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/services/${data.serviceId}`, { blockStatus: data.isBlocked });
    return response.data;
}
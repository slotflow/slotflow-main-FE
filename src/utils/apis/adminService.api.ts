import axiosInstance from "@/lib/axios";
import {
    AdminFetchAllServicesApiResponse,
    AdminAddNewServiceApiResponse,
    AdminChangeServiceBlockStatusApiRequestPayload,
    AdminChangeServiceBlockStatusApiResponse,
} from "../interface/api/adminServiceApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Service } from "../interface/entityInterface/appServiceInterface";
import { FetchFunctionParams, NewCommonResponse } from "../interface/commonInterface";

export const adminFetchAllServices = async (params?: FetchFunctionParams): Promise<NewCommonResponse<AdminFetchAllServicesApiResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/services${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllServicesApiResponse>(response.data);
}

export const adminAddNewService = async (data : {appServiceName: Service["serviceName"]}): Promise<AdminAddNewServiceApiResponse> => {
    const response = await axiosInstance.post('/admin/addNewService', data );
    return response.data;
}

export const adminChangeServiceBlockStatus = async (data: AdminChangeServiceBlockStatusApiRequestPayload): Promise<AdminChangeServiceBlockStatusApiResponse> => {
    const response = await axiosInstance.patch(`/admin/changeServiceBlockStatus`, data);
    return response.data;
}
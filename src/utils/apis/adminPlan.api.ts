import axiosInstance from "@/lib/axios";
import {
    AdminAddNewPlanRequest,
    AdminAddNewPlanResponse,
    AdminFetchAllPlansResponse,
    AdminChangePlanBlockStatusResponse,
    AdminChangePlanBlockStatusRequest,
} from "../interface/api/adminPlanApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllPlans = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminFetchAllPlansResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/plans${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllPlansResponse>(response.data);
};

export const adminAddNewPlan = async (formData: AdminAddNewPlanRequest): Promise<AdminAddNewPlanResponse> => {
    const response = await axiosInstance.post('/admin/addNewPlan', formData);
    return response.data;
}

export const adminChangePlanBlockStatus = async (data: AdminChangePlanBlockStatusRequest): Promise<AdminChangePlanBlockStatusResponse> => {
    const response = await axiosInstance.patch(`/admin/changePlanBlockStatus`,data);
    return response.data;
}
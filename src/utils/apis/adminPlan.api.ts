import axiosInstance from "@/lib/axios";
import {
    AdminFetchAllPlansResponse,
    AdminAddNewPlanResponse,
    AdminAddNewPlanRequest,
    AdminChangePlanBlockStatusApiResponse,
    AdminChangePlanBlockStatusApiRequestPayload,
} from "../interface/api/adminPlanApiInterface";
import { FetchFunctionParams, PaginatedResponse } from "../interface/commonInterface";
import { buildQueryParams, parsePaginatedResponse } from "../helper";

export const adminFetchAllPlans = async (params?: FetchFunctionParams): Promise<PaginatedResponse<AdminFetchAllPlansResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/plans${query ? `?${query}` : ''}`);
    return parsePaginatedResponse<AdminFetchAllPlansResponse>(response.data);
};

export const adminAddNewPlan = async (formData: AdminAddNewPlanRequest): Promise<AdminAddNewPlanResponse> => {
    const response = await axiosInstance.post('/admin/addNewPlan', formData);
    return response.data;
}

export const adminChangePlanBlockStatus = async (data: AdminChangePlanBlockStatusApiRequestPayload): Promise<AdminChangePlanBlockStatusApiResponse> => {
    const response = await axiosInstance.patch(`/admin/changePlanBlockStatus`,data);
    return response.data;
}
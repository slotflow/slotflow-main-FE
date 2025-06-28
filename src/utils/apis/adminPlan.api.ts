import axiosInstance from "@/lib/axios";
import {
    AdminAddNewPlanRequest,
    AdminAddNewPlanResponse,
    AdminFetchAllPlansResponse,
    AdminChangePlanBlockStatusApiResponse,
    AdminChangePlanBlockStatusApiRequestPayload,
} from "../interface/api/adminPlanApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchFunctionParams, NewCommonResponse } from "../interface/commonInterface";

export const adminFetchAllPlans = async (params?: FetchFunctionParams): Promise<NewCommonResponse<AdminFetchAllPlansResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/plans${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllPlansResponse>(response.data);
};

export const adminAddNewPlan = async (formData: AdminAddNewPlanRequest): Promise<AdminAddNewPlanResponse> => {
    const response = await axiosInstance.post('/admin/addNewPlan', formData);
    return response.data;
}

export const adminChangePlanBlockStatus = async (data: AdminChangePlanBlockStatusApiRequestPayload): Promise<AdminChangePlanBlockStatusApiResponse> => {
    const response = await axiosInstance.patch(`/admin/changePlanBlockStatus`,data);
    return response.data;
}
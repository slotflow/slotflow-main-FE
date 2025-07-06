import axiosInstance from "../../lib/axios";
import {
    AdminfetchAllUsersResponse,
    AdminChangeUserStatusRequest,
    AdminChnageUserBlockStatusResponse,
} from "../interface/api/adminUserApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllUsers = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminfetchAllUsersResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/users${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminfetchAllUsersResponse>(response.data);
}

export const adminChangeUserBlockStatus = async (data: AdminChangeUserStatusRequest): Promise<AdminChnageUserBlockStatusResponse> => {
    const response = await axiosInstance.patch(`/admin/changeUserBlockStatus`, data);
    return response.data;
}



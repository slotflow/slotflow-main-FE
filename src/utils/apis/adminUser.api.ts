import { axiosInstance } from "../../lib/axios";
import {
    AdminfetchAllUsersResponse,
    AdminChangeUserStatusRequest,
} from "../interface/api/adminUserApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchFunctionParams, ApiPaginatedResponse, ApiBaseResponse } from "../interface/commonInterface";

export const adminFetchAllUsers = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminfetchAllUsersResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/users${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminfetchAllUsersResponse>(response.data);
}

export const adminChangeUserBlockStatus = async (data: AdminChangeUserStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/changeUserBlockStatus`, data);
    return response.data;
}



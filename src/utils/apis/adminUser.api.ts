import axiosInstance from "../../lib/axios";
import { buildQueryParams, parsePaginatedResponse } from "../helper";
import {
    AdminfetchAllUsers,
    AdminChnageUserBlockStatusApiResponse,
    AdminChangeUserStatusApiRequestPayload,
} from "../interface/api/adminUserApiInterface";
import { FetchFunctionParams, PaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllUsers = async (params?: FetchFunctionParams): Promise<PaginatedResponse<AdminfetchAllUsers>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/users${query ? `?${query}` : ''}`);
    return parsePaginatedResponse<AdminfetchAllUsers>(response.data);
}

export const adminChangeUserBlockStatus = async (data: AdminChangeUserStatusApiRequestPayload): Promise<AdminChnageUserBlockStatusApiResponse> => {
    const response = await axiosInstance.patch(`/admin/changeUserBlockStatus`, data);
    return response.data;
}



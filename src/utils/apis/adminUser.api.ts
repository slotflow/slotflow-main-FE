import axiosInstance from "../../lib/axios";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import {
    AdminfetchAllUsersResponse,
    AdminChnageUserBlockStatusApiResponse,
    AdminChangeUserStatusApiRequestPayload,
} from "../interface/api/adminUserApiInterface";
import { FetchFunctionParams, NewCommonResponse } from "../interface/commonInterface";

export const adminFetchAllUsers = async (params?: FetchFunctionParams): Promise<NewCommonResponse<AdminfetchAllUsersResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/users${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminfetchAllUsersResponse>(response.data);
}

export const adminChangeUserBlockStatus = async (data: AdminChangeUserStatusApiRequestPayload): Promise<AdminChnageUserBlockStatusApiResponse> => {
    const response = await axiosInstance.patch(`/admin/changeUserBlockStatus`, data);
    return response.data;
}



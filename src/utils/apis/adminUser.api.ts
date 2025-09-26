import { axiosInstance } from "../../lib/axios";
import {
    AdminfetchAllUsersResponse,
    AdminChangeUserStatusRequest,
    AdminFetchUserProfileDetailsResponse,
} from "../interface/api/adminUserApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchFunctionParams, ApiPaginatedResponse, ApiBaseResponse } from "../interface/commonInterface";
import { User } from "../interface/entityInterface/userInterface";
import { AdminFetchddressResponse, FetchPaymentsResponse } from "../interface/api/commonApiInterface";

export const adminFetchAllUsers = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminfetchAllUsersResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/users${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminfetchAllUsersResponse>(response.data);
}

export const adminChangeUserBlockStatus = async (data: AdminChangeUserStatusRequest): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/users/${data.userId}`, { blockStatus: data.isBlocked });
    return response.data;
}

export const adminFetchUserProfileDetails = async (userId: User["_id"]): Promise<AdminFetchUserProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/admin/users/${userId}/profile`);
    return response.data.data;
}

export const adminFetchUserAddress = async (userId: User["_id"]): Promise<AdminFetchddressResponse> => {
    const response = await axiosInstance.get(`/admin/users/${userId}/address`);
    return response.data.data;
}

export const adminFetchUserPayments = async (params: FetchFunctionParams<User["_id"]>): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const { id, pagination } = params;
    const query = buildQueryParams({ pagination });
    const response = await axiosInstance.get(`/admin/users/${id}/payments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}


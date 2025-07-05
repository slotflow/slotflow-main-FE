import axiosInstance from "@/lib/axios"
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { FetchPaymentsResponse } from "../interface/api/commonApiInterface";
import { FetchFunctionParams, ApiResponsePaginated } from "../interface/commonInterface";

export const adminFetchAllPayments = async (params?: FetchFunctionParams): Promise<ApiResponsePaginated<FetchPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/getPayments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}
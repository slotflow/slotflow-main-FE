import axiosInstance from "@/lib/axios"
import { buildQueryParams, parsePaginatedResponse } from "../helper";
import { AdminFetchAllPaymentsResponse } from "../interface/api/adminPaymentInterfac";
import { FetchFunctionParams, PaginatedResponse } from "../interface/commonInterface";

export const adminFetchAllPayments = async (params?: FetchFunctionParams): Promise<PaginatedResponse<AdminFetchAllPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/getPayments${query ? `?${query}` : ''}`);
    return parsePaginatedResponse<AdminFetchAllPaymentsResponse>(response.data);
}
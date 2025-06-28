import axiosInstance from "@/lib/axios"
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { AdminFetchAllPaymentsResponse } from "../interface/api/adminPaymentInterfac";
import { FetchFunctionParams, NewCommonResponse } from "../interface/commonInterface";

export const adminFetchAllPayments = async (params?: FetchFunctionParams): Promise<NewCommonResponse<AdminFetchAllPaymentsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/getPayments${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllPaymentsResponse>(response.data);
}
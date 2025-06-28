import axiosInstance from "@/lib/axios"
import { buildQueryParams, parsePaginatedResponse } from "../helper";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { FetchFunctionParams, PaginatedResponse } from "../interface/commonInterface";
import { FetchProviderSubscriptionsResponse } from "../interface/api/commonApiInterface";
import { AdminFetchSubscriptionDetailsApiResponse } from "../interface/api/adminSubscription.interface";

export const adminFetchAllSubscriptions = async (params?: FetchFunctionParams): Promise<PaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/getSubscriptions${query ? `?${query}` : ''}`);
    return parsePaginatedResponse<FetchProviderSubscriptionsResponse>(response.data);
}

export const adminFetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<AdminFetchSubscriptionDetailsApiResponse> => {
    const response = await axiosInstance.get(`/admin/getSubscription/${subscriptionId}`);
    return response.data.subscriptionDetails;
}






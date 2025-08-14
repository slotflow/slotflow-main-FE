import { axiosInstance } from "@/lib/axios"
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchProviderSubscriptionsResponse } from "../interface/api/commonApiInterface";
import { AdminFetchSubscriptionDetailsResponse } from "../interface/api/adminSubscription.interface";

export const adminFetchAllSubscriptions = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/getSubscriptions${query ? `?${query}` : ''}`);
    console.log("response : ",response);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data);
}

export const adminFetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<AdminFetchSubscriptionDetailsResponse> => {
    const response = await axiosInstance.get(`/admin/getSubscription/${subscriptionId}`);
    return response.data.subscriptionDetails;
}






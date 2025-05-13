import axiosInstance from "@/lib/axios"
import { Subscription } from "../interface/entityInterface/subscriptionInterface";
import { AdminFetchSubscriptionDetailsApiResponse, AdminFetchAllSubscriptionsApiResponse } from "../interface/api/adminSubscription.interface";

export const adminFetchAllSubscriptions = async (): Promise<AdminFetchAllSubscriptionsApiResponse[]> => {
    const response = await axiosInstance.get('/admin/getSubscriptions');
    return response.data.subscriptions;
}

export const adminFetchSubscriptionDetails = async (subscriptionId: Subscription["_id"]): Promise<AdminFetchSubscriptionDetailsApiResponse> => {
    const response = await axiosInstance.get(`/admin/getSubscription/${subscriptionId}`);
    return response.data.subscriptionDetails;
}






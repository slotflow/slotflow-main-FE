import axiosInstance from "@/lib/axios"
import { Plan } from "../interface/planInterface";
import { Payment } from "../interface/paymentInterface";
import { Subscription } from "../interface/subscriptionInterface";

type AdminFetchAllSubscriptionsResponseProps = Pick<Subscription, "_id" | "createdAt" | "providerId" | "startDate" | "endDate" | "subscriptionStatus">;
export const adminFetchAllSubscriptions = async (): Promise<Array<AdminFetchAllSubscriptionsResponseProps>> => {
    const response = await axiosInstance.get('/admin/getSubscriptions');
    return response.data.subscriptions;
}

type SubscriptionProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "createdAt">;
type PaymentsProps = Pick<Payment, "transactionId" | "discountAmount" | "initialAmount" | "paymentFor" | "paymentGateway" | "paymentMethod" | "paymentStatus" | "totalAmount">;
type PlanProps = Pick<Plan, "planName" | "price" | "adVisibility" | "maxBookingPerMonth">;
interface AdminFEetchSubscriptionResponseProps extends SubscriptionProps {
    subscriptionPlanId: PlanProps,
    paymentId: PaymentsProps,
}
export const adminFetchSubscriptionDetails = async (subscriptionId: string): Promise<AdminFEetchSubscriptionResponseProps> => {
    const response = await axiosInstance.get(`/admin/getSubscription/${subscriptionId}`);
    return response.data.subscriptionDetails;
}






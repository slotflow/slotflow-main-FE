import { Plan } from "../entityInterface/planInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";


// **** 1.  Interfaces for adminFetchAllSubscriptions api is in common interface api file


// **** 2. Used as the response interface for the adminFetchSubscriptionDetails api  
type SubscriptionProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "createdAt">;
type PaymentsProps = Pick<Payment, "transactionId" | "discountAmount" | "initialAmount" | "paymentFor" | "paymentGateway" | "paymentMethod" | "paymentStatus" | "totalAmount">;
type PlanProps = Pick<Plan, "planName" | "price" | "adVisibility" | "maxBookingPerMonth">;
export interface AdminFetchSubscriptionDetailsResponse extends SubscriptionProps {
    subscriptionPlanId: PlanProps,
    paymentId: PaymentsProps,
}
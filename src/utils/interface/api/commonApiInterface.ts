import { Plan } from "../entityInterface/planInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";

// **** 1. Used as the response type of fetch provider subscriptions for admin side and provider side
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName" | "price">;


// **** 2. Used as the return type of fetch payments for admin side, provider side
export type FetchPaymentsResponse = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">


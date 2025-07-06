import { Plan } from "../entityInterface/planInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";

// **** 1. Common return type of fetch provider subscriptions for admin and provider
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName" | "price">;



// **** 2. Common return type of fetch payments for admin, provider
export type FetchPaymentsResponse = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">


import { Plan } from "../entityInterface/planInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";

// **** common return type of fetch provider subscriptions for admin and provider
// Used as the return type for Fetching a specific providers subscriptons API,
// and in ProviderSubscriptionsTableColumns, AdminProviderApi, AdminProviderSubscriptions
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName" | "price">;



// **** common return type of fetch payments
export type FetchPaymentsResponse = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">


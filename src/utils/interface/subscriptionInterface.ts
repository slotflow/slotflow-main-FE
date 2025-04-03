import { Plan } from "./planInterface";

// Provider subscription interface
export interface Subscription {
    _id: string,
    providerId: string,
    subscriptionPlanId: string,
    startDate: Date,
    endDate: Date,
    subscriptionStatus: string,
    paymentId: string,
    createdAt: Date,
    updatedAt: Date,
}

// Provider subscription History Table props for provider
type SubscriptionTableInterfacePropsForProvider = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus">;
export interface ProviderSubscriptionTableInterfaceProps extends SubscriptionTableInterfacePropsForProvider , Partial<Plan> {};

// Provider subscriptions Table props for admin
type SubscriptionTableInterfacePropsForAdmin = Pick<Subscription, "_id" | "createdAt" | "providerId" | "startDate" | "endDate" | "subscriptionStatus">;
export interface AdminProviderSubscriptionTableInterfaceProps extends SubscriptionTableInterfacePropsForAdmin , Partial<Pick<Plan, "planName" | "price">> {};

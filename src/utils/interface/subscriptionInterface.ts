import { Plan } from "./planInterface";

// Provider subscription interface
export interface Subscription {
    _id: string,
    providerId: string,
    subscriptionPlanId: string,
    subscriptionDurationInDays: number,
    startDate: Date,
    endDate: Date,
    subscriptionStatus: string,
    paymentId: string,
    createdAt: Date,
    updatedAt: Date,
}

type SubscriptionTableInterfaceProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "subscriptionDurationInDays">;
export interface ProviderSubscriptionTableInterfaceProps extends SubscriptionTableInterfaceProps , Partial<Plan> {};


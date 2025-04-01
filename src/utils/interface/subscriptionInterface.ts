import { Payment } from "./paymentInterface";
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

// Provider subscription History Table props
type SubscriptionTableInterfaceProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus">;
export interface ProviderSubscriptionTableInterfaceProps extends SubscriptionTableInterfaceProps , Partial<Plan> {};



export type ProviderPaymentsTableInterfaceProps = Pick<Payment, "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">
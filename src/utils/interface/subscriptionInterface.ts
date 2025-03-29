export enum PaymentStatus {
    Cancelled = "Cancelled",
    Pending = "Pending",
    Paid = "Paid",
}

export enum SubscriptionStatus {
    Active = "Active",
    Expired = "Expired",
    Cancelled = "Cancelled",
}

export enum PaymentMethod {
    Card = "Card",
    UPI = "UPI",
    Wallet = "Wallet",
    NetBanking = "NetBanking"   
}

export interface Subscription {
    _id: string;
    providerId: string,
    subscriptionPlanId: string,
    startDate: Date,
    endDate: Date,
    paymentStatus: PaymentStatus,
    paymentMethod: PaymentMethod,
    transactionId: string,
    subscriptionStatus: SubscriptionStatus,
    createdAt: string;
    updatedAt: string;
}

export type AdminSubscriptionTableInterfaceProps = Pick<Subscription, "startDate" | "endDate" | "paymentStatus" | "paymentMethod" | "subscriptionStatus" | "transactionId" > & {
    providerId?: string;
    plan: string
}

export type UserSubscriptionTableInterfaceProps = Pick<Subscription, "startDate" | "endDate" | "paymentStatus" | "paymentMethod" | "subscriptionStatus" | "transactionId" > & {
    plan: string
}
export type Provider = {
    _id: string
    isAdminVerified: boolean
    isBlocked: boolean
    username: string
    email: string
}

export type User = {
    _id: string
    isEmailVerified: boolean
    isBlocked: boolean
    username: string
    email: string
}

export type Serivce = {
    _id: string
    name: string
    isBlocked: boolean
}

export interface Route {
    path: string;
    name: string;
}

export enum BillingCycle {
    Monthly = "monthly",
    Yearly = "yearly",
}

export interface Plan {
    _id: string;
    planName: string;
    description: string;
    price: number;
    features: [string];
    billingCycle: BillingCycle[];
    maxBookingPerMonth: number;
    adVisibility: boolean;
    isBlocked: boolean;
}
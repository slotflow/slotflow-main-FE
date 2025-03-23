//  Admin Plans
export enum BillingCycle {
    Monthly = "monthly",
    Yearly = "yearly",
}

export interface Plan {
    _id: string;
    planName: string;
    description: string;
    price: number;
    features: string[];
    billingCycle: BillingCycle;
    maxBookingPerMonth: number;
    adVisibility: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}


//  Admin Plans

export interface Plan {
    _id: string;
    planName: string;
    description: string;
    price: number;
    features: string[];
    maxBookingPerMonth: number;
    adVisibility: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}


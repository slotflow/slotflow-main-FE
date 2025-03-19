// Common Response Type
export interface ApiCommonResponse {
    success: boolean; 
    message: string; 
}



// Provider address adding
export interface AddProviderAddressPayload {
    formData: {
        addressLine: string;
        phone: string;
        place: string;
        city: string;
        district: string;
        pincode: string;
        state: string;
        country: string;
        googleMapLink: string;
    };
}



//  Provider add service details
export interface AddProviderServiceDetailsPayload {
    formData:FormData
}



// Provider service availability adding
interface Availability {
    day: string;
    duration: string;
    startTime: string;
    endTime: string;
    modes: string[];
    slots: string[];
  }

export interface AddProviderServiceAvailabilityPayload {
    data: Availability[];
}



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
}

// Route
export interface Route {
    path: string;
    name: string;
}
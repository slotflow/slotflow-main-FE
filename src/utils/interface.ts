//  User
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isEmailVerified: boolean;
    phone: string;
    profileImage: string;
    addressId: string;
    bookingsId: string;
    verificationToken: string;
}

// Provider
export interface Provider {
    _id: string;
    username: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isEmailVerified: boolean;
    isAdminVerified: boolean;
    phone: string;
    profileImage: string;
    addressId: string;
    serviceId: string;
    serviceAvailabilityId: string;
    subscription: [string];
    verificationToken: string;
    createdAt: string;
}

export interface ProviderService {
    providerId: string,
    serviceCategory: string,
    serviceName: string,
    serviceDescription: string,
    servicePrice: number,
    providerAdhaar: string,
    providerExperience: string,
    providerCertificateUrl: string,
    _id: string,
}

// Admin Adding Service
export interface Service {
    _id: string;
    serviceName: string;
    isBlocked: boolean;
}


export interface Address {
    _id: string;
    userId: string,
    addressLine: string,
    phone: string,
    place: string,
    city: string,
    district: string,
    pincode: string,
    state: string,
    country: string,
    googleMapLink: string,
}


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
    formData: FormData
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


//  Admin change user block status
export interface AdminChangeUserStatusRequestPayload {
    userId: string;
    status: boolean;
}

export interface AdminChnageUserStatusResponse extends ApiCommonResponse {
    updatedUser: Partial<User>
}
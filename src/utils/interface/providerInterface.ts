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

// Provider service availability interface used in the AdminProviderServiceAvailability compoenent
export interface Availability {
    day: string;
    duration: string;
    startTime: string;
    endTime: string;
    modes: string[];
    slots: string[];
}

// Provider service availability slot interface that is coming from the server with updation, used in AdminProviderServiceAvailability component
export interface Slot {
    slot: string;
    available: boolean;
    _id: string;
}

// This is the interface of a right side showing compoenent in the provider address adding, service adding and availability adding page
export interface RightSideBoxProps {
    props: {
      pageNumber: number;
    };
  }

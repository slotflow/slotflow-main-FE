// User or Provider Address interface
export interface Address {
    _id: string;
    userId: string;
    addressLine: string;
    phone: string;
    place: string;
    city: string;
    district: string;
    pincode: string;
    state: string;
    country: string;
    googleMapLink: string;
    createdAt: string;
    updatedAt: string;
}
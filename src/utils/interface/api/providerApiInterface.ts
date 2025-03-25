import { Address } from "../addressInterface";
import { Service } from "../appServiceInterface";
import { Provider } from "../providerInterface";
import { Availability } from "../serviceAvailabilityInterface";

// Common Response Type
export interface ApiCommonResponse {
    success: boolean;
    message: string;
}

// Provider address adding request payload interface used in provider api
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

// Fetch all services api request response 
export interface FetchAllServicesResponse extends ApiCommonResponse{
    services: Service[]
}

//  Provider service details adding request payload used in provider api
export interface AddProviderServiceDetailsPayload {
    formData: FormData
}

// Provider service availability adding request payload used in provider api
export interface AddProviderServiceAvailabilityPayload {
    data: Availability[];
}

// Profile profile details fetching api response 
export type ProviderFetchProfileDetailsResponseProps = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "profileImage" | "createdAt">;

// Profile profile details fetching api response 
export type ProviderFetchAddressResponseProps = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;
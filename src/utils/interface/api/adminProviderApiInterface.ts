import { Address } from "../addressInterface";
import { Provider } from "../providerInterface";
import { ProviderService } from "../providerServiceInterface";
import { ServiceAvailability } from "../serviceAvailabilityInterface";

// **** Admin Provider Api Interface **** \\

// **** Api Common Response
export interface ApiCommonResponse { 
    success: boolean; 
    message: string; 
}



// Admin providers table interface props used in use admin providers action custom hook and the column.tsx
export type ProvidersTableInterfaceProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified">;



// **** Fetch all Providers
// Admin fetch all providers api response provider type, used also in the admin sevice providers data listing tables coloums props in colomns.tsx
export type AdminFetchAllProvidersResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified">;



// **** Admin approove Provider
// Admin approve provider api request payload interface
export interface AdminApproveProviderRequestPayload { 
    providerId: string; 
}
// Admin approve aprovider api response interface
export type AdminApproveProviderResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified">;



// **** Admin change Provider block status
// Admin Change provider block status request payload interface
export interface AdminChangeProviderBlockStatusRequestPayload {
    providerId: string;
    status: boolean;
}

// Admin change Provider block status response interface
export type AdminChangeProviderBlockStatusResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified">;



// **** Admin fetch provider details api response interface
export type AdminFetchProviderDetailsResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified" | "isAdminVerified" | "phone" | "profileImage" | "createdAt">;

// **** Admin fetch provider Address api response interface
export type AdminFetchProviderAddressResponseProps = Pick<Address, "userId" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;

// **** Admin fetch provider service details api response
export type AdminFetchProviderServiceResponseProps = Pick<ProviderService, "providerId" | "serviceCategory" | "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;

// **** Admin fetch provider service availability api response
export type AdminFetchProviderAvailabilityResponseProps = Pick<ServiceAvailability, "availability" >;



// **** Admin Provider Custom Hook Interface **** \\
export interface UseAdminProviderActionReturnType {
    handleApproveProvider: (providerId: string) => void;
    hanldeChangeProviderBlockStatus: (providerId: string, status: boolean) => void;
}
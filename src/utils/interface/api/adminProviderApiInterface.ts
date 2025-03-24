import { Address } from "../addressInterface";
import { Provider } from "../providerInterface";
import { ProviderService } from "../providerServiceInterface";
import { ServiceAvailability } from "../serviceAvailabilityInterface";

// **** Admin Provider Api Interface **** \\

// Api Common Response
interface ApiCommonResponse {
    success: boolean;
    message: string;
}


// Admin fetch all providers api response provider type, used also in the admin sevice providers data listing tables coloums props in colomns.tsx
export type FetchAllProvidersResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified">
// Admin fetch all providers api response interface
export interface AdminFetchAllProvidersResponse extends ApiCommonResponse {
    providers: FetchAllProvidersResponseProps[];
}



// Admin approve provider api request payload interface
export interface AdminApproveProviderRequestPayload {
    providerId: string;
}

// Admin approve aprovider api response interface
type ApproveProviderResponseProps = Pick<Provider, "_id" | "isAdminVerified">;
export interface AdminApproveProviderResponse extends ApiCommonResponse{
    updatedProvider: ApproveProviderResponseProps
}





// Admin Change provider block status request payload interface
export interface AdminChangeProviderBlockStatusRequestPayload {
    providerId: string;
    status: boolean;
}

// Admin change Provider block status response interface
type ChangeProviderBlockStatusProps = Pick<Provider, "_id" | "isBlocked">;
export interface AdminChangeProviderBlockStatusResponse extends ApiCommonResponse{
    updatedProvider : ChangeProviderBlockStatusProps
}





// Admin fetch provider details api response interface
type FetchProviderDetailsResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified" | "isAdminVerified" | "phone" | "profileImage" | "createdAt">;
export interface AdminFetchProviderDetailsResponse extends ApiCommonResponse{
    provider: FetchProviderDetailsResponseProps
}





// Admin fetch provider Address api response interface
type FetchProviderAddressResponseProps = Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;
export interface AdminFetchProviderAddressResponse extends ApiCommonResponse{
    address: FetchProviderAddressResponseProps
}





// Admin fetch provider service details api response
type FetchProviderServiceResponseProps = Pick<ProviderService, "providerId" | "serviceCategory" | "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface AdminFetchProviderServiceResponse extends ApiCommonResponse {
    service: FetchProviderServiceResponseProps
}





// Admin fetch provider service availability api response
type fetchProviderAvailabilityResponseProps = Omit<ServiceAvailability, "createdAt" | "updatedAt">
export interface AdminFetchProviderServiceAvailabilityResponse extends ApiCommonResponse {
    availability: fetchProviderAvailabilityResponseProps[];
}





// **** Admin Provider Custom Hook Interface **** \\
export interface UseAdminProviderActionReturnType {
    handleApproveProvider: (providerId: string) => void;
    hanldeChangeProviderBlockStatus: (providerId: string, status: boolean) => void;
  }
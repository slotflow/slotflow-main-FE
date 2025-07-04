import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

type AdminProviderBasicInfo = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;

// **** adminFetchAllProviders
// Used as the return type for Admin Fetch All Providers
// Used in adminProviderApi, AdminProvidersTableColumns, AdminProvidersPage, useAdminProviderActions
export type AdminFetchAllProvidersResponse = AdminProviderBasicInfo;




// **** adminApproveProvider
// Used as the return type for Admin approve a provider
// Used in adminProviderApi
export interface AdminApproveProviderResponse  {
    updatedProvider: AdminProviderBasicInfo;
}




// **** adminChangeProviderBlockStatus
// Used as the request type for Admin change provider block status
// Used in adminProviderApi
export type AdminChangeProviderBlockStatusRequest = {
    providerId: Provider["_id"];
    isBlocked: Provider["isBlocked"];
}
// Used as the return type for Admin change provider block status
// Used in adminProviderApi
export interface AdminChangeProviderBlockStatusResponse {
    updatedProvider: AdminProviderBasicInfo
}




// **** adminChangeProviderTrustTagStatus
// Used as the request type for Admin change provider trust tag status
// Used in adminProviderApi
export type AdminChangeProviderTrustTagRequest = {
    providerId: Provider["_id"];
    trustedBySlotflow: Provider["trustedBySlotflow"];
}
// Used as the return type for Admin change provider trust tag status
// Used in adminProviderApi
export interface AdminChangeProviderTrustTagResponse {
    updatedProvider: AdminProviderBasicInfo
}




// **** adminFetchProviderProfileDetails
// Used as the return type for Admin fetch provider profile details
// Used in adminProviderApi, UserOrProviderProfileDetails
export type AdminFetchProviderProfileDetailsResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified" | "isAdminVerified" | "phone" | "profileImage" | "createdAt" | "trustedBySlotflow">;




// **** adminFetchProviderAddressDetails
// Used as the return type for Admin fetch provider address details
// Used in adminProviderApi, UserOrProviderAddressDetails
export type AdminFetchProviderAddressResponse = Pick<Address, "userId" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;




// **** adminFetchProviderServiceDetails
// Used as the return type for Admin fetch provider service details
// Used in adminProviderApi, ProviderServiceDetails
type FetchProviderServiceApiResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface AdminFetchProviderServiceResponse extends FetchProviderServiceApiResponse {
    serviceCategory: Pick<Service, "serviceName">
}




// **** adminFetchProviderServiceAvailability
// Used as the request type for Admin fetch provider service availability
// Used in adminProviderApi
export type AdminFetchProviderAvailabilityRequest = {
    providerId: Provider["_id"]
    date: Date
}
// Used as the return type for Admin fetch provider service availability
// Used in adminProviderApi
export type AdminFetchProviderAvailabilityResponse = AvailabilityForResponse;








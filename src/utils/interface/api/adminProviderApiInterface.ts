import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

// **** 1.  Used as the response type of admin fetch all providers api
export type AdminFetchAllProvidersResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "isEmailVerified" | "trustedBySlotflow">;


// **** 2.  Inline interfaces used for the adminApproveProvider api


// **** 3.  Used as the request type for the admin change provider block status api
export type AdminChangeProviderBlockStatusRequest = {
    providerId: Provider["_id"];
    isBlocked: Provider["isBlocked"];
}


// **** 4.  Used as the request type for the admin change provider trust tag api
export type AdminChangeProviderTrustTagRequest = {
    providerId: Provider["_id"];
    trustedBySlotflow: Provider["trustedBySlotflow"];
}


// **** 5.  Used as the response type of the admin fetch provider profile profile details api
export type AdminFetchProviderProfileDetailsResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified" | "isAdminVerified" | "phone" | "profileImage" | "createdAt" | "trustedBySlotflow">;


// **** 6.  Interface for the admin fetch provider address is in common interface file


// **** 7.  Used as the response type of the admin fetch provider serivde details api
type FetchProviderServiceApiResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface AdminFetchProviderServiceResponse extends FetchProviderServiceApiResponse {
    serviceCategory: Pick<Service, "serviceName">
}


// **** 8.1  Used as the request type of the admin fetch provider service availability api
export type AdminFetchProviderAvailabilityRequest = {
    providerId: Provider["_id"]
    date: Date
}
// **** 8.2  Used as the response type of the admin fetch provider service availability api
export type AdminFetchProviderAvailabilityResponse = AvailabilityForResponse;


// **** 9.  Interface for adminFetchProviderSubscriptions api is in common interface file


// **** 10.  Interface for adminFetchProviderPayments api is in common interface file




import { CommonResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { Address } from "../entityInterface/addressInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

// Used as the return type for Admin Fetch All Providers API,
// and in AdminProvidersTableColumns, AdminProvidersPage, useAdminProviderActions
export type AdminFetchAllProviders = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;


// Admin approve aprovider api response interface
type ApproveProviderApiResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;
export interface AdminApproveProviderApiResponse extends CommonResponse {
    updatedProvider: ApproveProviderApiResponse
}


// Admin change provider isBlocked status api request payload type
export type AdminChangeProviderBlockStatusApiRequestPayload = {
    providerId: Provider["_id"];
    isBlocked: Provider["isBlocked"];
}
// Admin change Provider isBlock status api response interface
type ChangeProviderBlockStatusApiResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;
export interface AdminChangeProviderBlockStatusApiResponse extends CommonResponse {
    updatedProvider: ChangeProviderBlockStatusApiResponse
}




// Admin Change provider trustedBySlotfloe api request payload type
export type AdminChangeProviderTrustTagApiRequestPayload = {
    providerId: Provider["_id"];
    trustedBySlotflow: Provider["trustedBySlotflow"];
}
// Admin change ProvidertrustedBySlotflow api response interface
type ChangeProviderTrustTagApiResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;
export interface AdminChangeProviderTrustTagApiResponse extends CommonResponse {
    updatedProvider: ChangeProviderTrustTagApiResponse
}




// Admin fetch provider details api response type
export type AdminFetchProviderProfileDetailsApiResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified" | "isAdminVerified" | "phone" | "profileImage" | "createdAt" | "trustedBySlotflow">;




// Admin fetch provider Address api response type
export type AdminFetchProviderAddressApiResponse = Pick<Address, "userId" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;




// Admin fetch provider service details api response type
type FetchProviderServiceApiResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface AdminFetchProviderServiceApiResponse extends FetchProviderServiceApiResponse {
    serviceCategory: Pick<Service, "serviceName">
}




// Admin fetch provider service availability request payload interface
export type AdminFetchProviderAvailabilityApiRequestPayload = {
    providerId: Provider["_id"]
    date: Date
}
// Admin fetch provider service availability api response type
export type AdminFetchProviderAvailabilityApiResponse = AvailabilityForResponse;




// Admin fetch Provider subscriptions api response type
type FetchProviderSubscriptionsApiResponse = Pick<Subscription, | "startDate" | "endDate" | "subscriptionStatus">;
export interface AdminFetchProviderSubscriptionsApiResponse extends FetchProviderSubscriptionsApiResponse , Partial<Pick<Plan , "_id" | "planName" >> {
}




// Admin fetch Provider payments api response type
export type AdminFetchProviderPaymentsApiResponse = Pick<Payment,  "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">;



import { Address } from "../addressInterface";
import { Payment } from "../paymentInterface";
import { Plan } from "../planInterface";
import { Provider } from "../providerInterface";
import { ProviderService } from "../providerServiceInterface";
import { ServiceAvailability } from "../serviceAvailabilityInterface";
import { Subscription } from "../subscriptionInterface";

// **** Admin Provider Api Interface **** \\

// **** Api Common Response
export interface ApiCommonResponse { 
    success: boolean; 
    message: string; 
}



// Admin providers table interface props used in use admin providers action custom hook and the column.tsx
export type ProvidersTableInterfaceProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;



// **** Fetch all Providers
// Admin fetch all providers api response provider type, used also in the admin sevice providers data listing tables coloums props in colomns.tsx
export type AdminFetchAllProvidersResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;



// **** Admin approove Provider
// Admin approve provider api request payload interface
export interface AdminApproveProviderRequestPayload { 
    providerId: string; 
}
// Admin approve aprovider api response interface
type ApproveProviderResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;
export interface AdminApproveProviderResponseProps extends ApiCommonResponse {
    updatedProvider: ApproveProviderResponseProps
}


// **** Admin change Provider block status
// Admin Change provider block status request payload interface
export interface AdminChangeProviderBlockStatusRequestPayload {
    providerId: string;
    status: boolean;
}
// Admin change Provider block status response interface
type ChangeProviderBlockStatusResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;
export interface AdminChangeProviderBlockStatusResponse extends ApiCommonResponse {
    updatedProvider: ChangeProviderBlockStatusResponse
}


// **** Admin change Provider trusted tag
// Admin Change provider trusted tag request payload interface
export interface AdminChangeProviderTrustedTagRequestPayload {
    providerId: string;
    trustedBySlotflow: boolean;
}

// Admin change Provider block status response interface
type ChangeProviderTrustedTagResponse = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;
export interface AdminChangeProviderTrustedTagResponse extends ApiCommonResponse {
    updatedProvider: ChangeProviderTrustedTagResponse
}


// **** Admin fetch provider details api response interface
export type AdminFetchProviderDetailsResponseProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified" | "isAdminVerified" | "phone" | "profileImage" | "createdAt" | "trustedBySlotflow">;

// **** Admin fetch provider Address api response interface
export type AdminFetchProviderAddressResponseProps = Pick<Address, "userId" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;

// **** Admin fetch provider service details api response
export type AdminFetchProviderServiceResponseProps = Pick<ProviderService, "providerId" | "serviceCategory" | "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;

// **** Admin fetch provider service availability api response
export type AdminFetchProviderAvailabilityResponseProps = Pick<ServiceAvailability, "availability" >;

// **** Admin fetch Provider subscriptions api response props
type SubscripionsResProps = Pick<Subscription, | "startDate" | "endDate" | "subscriptionStatus">;
export interface AdminFetchProviderSubscriptionsResponseProps extends SubscripionsResProps , Partial<Pick<Plan , "planName" >>{
    
}

// **** Admin fetch Provider payments api response props
export type AdminFetchProviderPaymentsResponseProps = Pick<Payment,  "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">;


// **** Admin Provider Custom Hook Interface **** \\
export interface UseAdminProviderActionReturnType {
    handleApproveProvider: (providerId: string) => void;
    hanldeChangeProviderBlockStatus: (providerId: string, status: boolean) => void;
    hanldeProviderTrustTag: (providerId: string, trustedBySlotflow: boolean) => void;
}
import { Plan } from "../planInterface";
import { Address } from "../addressInterface";
import { Provider } from "../providerInterface";
import { Service } from "../appServiceInterface";
import { Subscription } from "../subscriptionInterface";
import { ProviderService } from "../providerServiceInterface";
import { Availability, ServiceAvailability } from "../serviceAvailabilityInterface";
import { Payment } from "../paymentInterface";

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
    services: Array<Pick<Service, "_id" | "serviceName">>
}

//  Provider service details adding request payload used in provider api
export interface AddProviderServiceDetailsPayload {
    formData: FormData
}

// Provider service availability adding request payload used in provider api
export interface AddProviderServiceAvailabilitiesPayload {
    data: Availability[];
}

// Provider profile details fetching api response 
export type ProviderFetchProfileDetailsResponseProps = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt">;

// Provider details fetching api response 
export type ProviderFetchAddressResponseProps = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;

// Provider service details api response 
type FetchServiceDetailsProps = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface ProviderFetchServiceDetailsResponseProps extends FetchServiceDetailsProps {
    serviceCategory: Pick<Service, "serviceName">
}

// Provider service availability api response
export type ProviderFetchServiceAvailabilityResponseProps = Pick<ServiceAvailability, "_id" |  "availability" >;

// Provider profile image updating api request
export interface ProviderUpdateProfileImageResponseProps extends ApiCommonResponse {
    profileImage: string;
}

// Provider fetch plans api response 
export type ProviderFetchPlansResponseProps = Pick<Plan, "_id" | "planName" | "price" | "features" | "description">;

// Provider fetch subscription history api response props
type SubscripionsResProps = Pick<Subscription, | "startDate" | "endDate" | "subscriptionStatus">;
export interface ProviderFetchSubscriptionHistoryResponseProps extends SubscripionsResProps , Partial<Plan>{
    
}

// Provider fetch all payments response
export type ProviderFetchPaymentsResponseProps = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">

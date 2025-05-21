import { CommonResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { Address } from "../entityInterface/addressInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { Availability, AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

// Provider address adding request payload interface
export interface ProviderAddProviderAddressApiRequestPayload {
    formData: Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;
}


// Provider Fetch all services api request response interface
export interface ProviderFetchAllServicesApiResponse extends CommonResponse{
    services: Array<Pick<Service, "_id" | "serviceName">>
}


// Provider service availability adding request payload interface
export interface AddProviderServiceAvailabilitiesApiRequestPayload {
    data: Availability[];
}


// Provider profile details fetching api response type
export type ProviderFetchProfileDetailsApiResponse = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "trustedBySlotflow">;


// Provider details fetching api response type
export type ProviderFetchAddressApiResponseProps = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;


// Provider service details api response interface
type FetchServiceDetailsApiResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface ProviderFetchServiceDetailsApiResponse extends FetchServiceDetailsApiResponse {
    serviceCategory: Pick<Service, "serviceName">
}


// Provider service availability api response type
export type ProviderFetchServiceAvailabilityApiResponse = AvailabilityForResponse;


// Provider profile image updating api request payload interface
export interface ProviderUpdateProfileImageApiResponse extends CommonResponse, Pick<Provider, "profileImage"> {
}


// Provider fetch plans api response  type
export type ProviderFetchPlansApiResponse = Pick<Plan, "_id" | "planName" | "price" | "features" | "description">;


// Provider subscribe to a plan api request payload
export type ProviderSubscribeToPlanApiRequestPayload = {
    planId: Plan["_id"];
    planDuration: string
}
// Provider subscribe to a plan api response interface
export interface ProviderSubscribeToPlanApiResponse extends CommonResponse {
    sessionId: string
}


// Provider fetch subscription history api response interface
type SubscripionsResProps = Pick<Subscription, | "startDate" | "endDate" | "subscriptionStatus">;
export interface ProviderFetchSubscriptionHistoryApiResponse extends SubscripionsResProps , Partial<Plan>{    
}


// Provider fetch all payments response type
export type ProviderFetchPaymentsApiResponse = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">


// Provider fetch all appointmets response type
export type ProviderFetchBookingAppointmentsApiResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt">;


// Provider update providerInfo [username and phone] request payload
export type ProviderUpdateProviderInfoRequestPayload = Pick<Provider, "username" | "phone">
// Provider update providerInfo [username and phone] response interface 
export interface ProviderUpdateProviderInfoResponse extends CommonResponse {
    username: Provider["username"];
    phone: Provider["phone"];
}
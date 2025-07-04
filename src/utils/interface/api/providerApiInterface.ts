import { CommonResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { Address } from "../entityInterface/addressInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { Availability, AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

// Provider address adding request payload interface
export interface ProviderAddProviderAddressRequest {
    formData: Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;
}


// Provider Fetch all services api request response interface
export type ProviderFetchAllServicesResponse =  Array<Pick<Service, "_id" | "serviceName">>;


// Provider service availability adding request payload interface
export interface AddProviderServiceAvailabilitiesRequest {
    data: Availability[];
}


// Provider profile details fetching api response type
export type ProviderFetchProfileDetailsResponse = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "trustedBySlotflow">;


// Provider details fetching api response type
export type ProviderFetchAddressResponse = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;


// Provider service details api response interface
type FetchServiceDetailsResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface ProviderFetchServiceDetailsResponse extends FetchServiceDetailsResponse {
    serviceCategory: Pick<Service, "serviceName">
}


// Provider service availability api response type
export type ProviderFetchServiceAvailabilityResponse = AvailabilityForResponse;


// Provider profile image updating api request payload interface
export interface ProviderUpdateProfileImageResponse extends CommonResponse, Pick<Provider, "profileImage"> {
}


// Provider fetch plans api response  type
export type ProviderFetchPlansResponse = Pick<Plan, "_id" | "planName" | "price" | "features" | "description">;


// Provider subscribe to a plan api request payload
export type ProviderSubscribeToPlanRequest = {
    planId: Plan["_id"];
    planDuration: string
}
// Provider subscribe to a plan api response interface
export interface ProviderSubscribeToPlanResponse extends CommonResponse {
    sessionId: string
}







// Provider fetch all appointmets response type
export type ProviderFetchBookingAppointmentsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt">;


// Provider update providerInfo [username and phone] request payload
export type ProviderUpdateProviderInfoRequest = Pick<Provider, "username" | "phone">
// Provider update providerInfo [username and phone] response interface 
export interface ProviderUpdateProviderInfoResponse extends CommonResponse, ProviderUpdateProviderInfoRequest {

}
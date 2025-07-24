import { ApiBaseResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { User } from "../entityInterface/userInterface";
import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { Availability, AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";

// **** 1.  Used as the request interface for adding address api
export interface ProviderAddProviderAddressRequest {
    formData: Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;
}


// **** 2.  Used as the response type of provider fetch address api
export type ProviderFetchAddressResponse = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;


// **** 3.  Used as the response type of fetch all services api
export type ProviderFetchAllServicesResponse = Array<Pick<Service, "_id" | "serviceName">>;


// **** 4.  Inline interface used for providerAddProviderServiceDetails api


// **** 5.  Used as the response type for provider fetch self service details
type FetchServiceDetailsResponse = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerAdhaar" | "providerExperience" | "providerCertificateUrl">;
export interface ProviderFetchServiceDetailsResponse extends FetchServiceDetailsResponse {
    serviceCategory: Pick<Service, "serviceName">
}


// **** 6.  Used as the request interface for provider service availability adding api
export interface AddProviderServiceAvailabilitiesRequest {
    data: Availability[];
}


// **** 7.  Used as the response type for provider fetch self profile details api
export type ProviderFetchProfileDetailsResponse = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "trustedBySlotflow">;


// **** 8.  Used as the response type for provider fetch self service availability
export type ProviderFetchServiceAvailabilityResponse = AvailabilityForResponse;


// **** 9.  Used as the response type for Provider profile image updating api
export interface ProviderUpdateProfileImageResponse extends ApiBaseResponse {
    data: Provider["profileImage"]
}


// **** 10.  Used as the response type for Provider fetch plans api
export type ProviderFetchPlansResponse = Pick<Plan, "_id" | "planName" | "price" | "features" | "description">;


// **** 11.1  Used as the request type for Provider subscribe to a plan api
export type ProviderSubscribeToPlanRequest = {
    planId: Plan["_id"];
    planDuration: string
}
// **** 11.2  Used as the response interface for Provider subscribe to a plan api
export interface ProviderSubscribeToPlanResponse extends ApiBaseResponse {
    data: string
}


// **** 12.  Inline interfaces used for the providerSaveSubscription api


// **** 13.  Interfaces for providerFetchProviderSubscriptions api is in common interface api file


// **** 14.  Inline interfaces used for the providerSubscribeToTrialPlan api


// **** 15.  Interfaces for providerFetchProviderPayments api is in common interface api file


// **** 16.  Interfaces for providerFetchProviderBookingAppointments api is in common interface api file


// **** 17.1 Used as the request type for Provider update providerInfo [username and phone]
export type ProviderUpdateProviderInfoRequest = Pick<Provider, "username" | "phone">
// **** 17.2 Used as the response interface for Provider update providerInfo [username and phone]
export interface ProviderUpdateProviderInfoResponse extends ApiBaseResponse {
    data: ProviderUpdateProviderInfoRequest
}


// **** 18. Used as the return type for the provider fetch users for the chat side bar
export type ProviderFetchUsersForChatSidebarResponse = Array<Pick<User, "_id" | "username" | "profileImage">>


// **** 18. Used as the return interface for the provider fetch dashboard data
export interface ProviderFetchDashboardStatsDataResponse {
    totalAppointments: number;
    completedAppointments: number;
    missedAppointments: number;
    cancelledAppointmentsByUser: number;
    rejectedAppointmentsByProvider: number;
    todaysAppointments: number;

    totalSubscriptionPaidAmount: number;
    totalEarnings: number;
    totalEarningsThroughStripe: number;
    totalEarningsThroughRazorpay: number;
    totalEarningsThroughPaypal: number;
    todaysEarnings: number;
    totalPayoutsMade: number;
    pendingPayout: number;
}

export interface ProviderDashboardGraphResponse {
  appointmentsOvertime: Array<{
    date: string; // e.g., "2025-07-24"
    completed: number;
    missed: number;
    cancelled: number;
  }>;

  earningsOverTime: Array<{
    date: string;
    stripe: number;
    razorpay: number;
    paypal: number;
  }>;

  peakBookingHours: Array<{
    hour: string; // e.g., "10:00", "14:00"
    count: number;
  }>;

  appointmentMode: Array<{
    date: string;
    online: number;
    offline: number;
  }>;

  completionBreakdown: Array<{
    status: 'completed' | 'missed' | 'cancelled' | 'rejected';
    count: number;
  }>;

  newVsReturningUsers: Array<{
    date: string;
    newUsers: number;
    returningUsers: number;
  }>;

  topBookingDays: Array<{
    day: string; // e.g., "Monday"
    count: number;
  }>;
}
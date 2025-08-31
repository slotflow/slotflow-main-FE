import { ApiBaseResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";
import { User } from "../entityInterface/userInterface";
import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { Availability, AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";
import { Booking } from "../entityInterface/bookingInterface";

// **** 1.  Used as the request interface for adding address api
export type ProviderAddProviderAddressRequest = Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;

// **** 2.  Used as the response type of provider fetch address api
export type ProviderFetchAddressResponse = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink" | "updatedAt">;


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
export type ProviderFetchProfileDetailsResponse = Pick<Provider, "username" | "email" | "isAdminVerified" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "trustedBySlotflow" | "updatedAt">;


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
export interface ProviderSaveSubscriptionResponse extends ApiBaseResponse{
  planName: Plan["planName"]
}; 

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


// **** 19. Used as the return interface for the provider fetch dashboard data
export interface ProviderFetchDashboardStatsDataResponse extends Record<string, number> {
  totalAppointments: number;
  completedAppointments: number;
  missedAppointments: number;
  cancelledAppointmentsByUser: number;
  rejectedAppointmentsByProvider: number;
  todaysAppointments: number;
  totalSubscriptionPaidAmount: number;
  totalEarnings: number;
  todaysEarnings: number;
  totalPayoutsMade: number;
  pendingPayout: number;
}


// **** 20. Used as the return interface for the provider fetch dashboard graph data
export interface ProviderDashboardGraphResponse {
  appointmentsOvertimeChartData: Array<{
    date: string;
    completed: number;
    missed: number;
    cancelled: number;
  }>;

  peakBookingHoursChartData: Array<{
    date: string;
    hour: string;
    bookings: number;
  }>;

  appointmentModeChartData: Array<{
    date: string;
    online: number;
    offline: number;
  }>;

  completionBreakdownChartData: Array<{
    status: 'completed' | 'missed' | 'cancelled' | 'rejected';
    value: number;
  }>;

  newVsReturningUsersChartData: Array<{
    date: string;
    newUsers: number;
    returningUsers: number;
  }>;

  topBookingDaysChartData: Array<{
    day: string;
    count: number;
  }>;

}


// **** 20. Used as the request interface for the provider change booking appointment status
export interface ProviderChangeAppointmentStatusRequest {
  appointmentId: Booking["_id"];
  appointmentStatus: Booking["appointmentStatus"];
}


// **** 21. Address updating interfaces are in common interface file

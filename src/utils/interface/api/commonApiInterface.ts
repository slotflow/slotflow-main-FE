import { Plan } from "../entityInterface/planInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";
import { Address } from "../entityInterface/addressInterface";
import { ApiBaseResponse, FetchFunctionParams } from "../commonInterface";
import { User } from "../entityInterface/userInterface";

// **** 1.  Used as the response type of fetch provider subscriptions for admin side and provider side
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName">;


// **** 2.  Used as the return type of fetch payments for admin side, provider side
export type FetchPaymentsResponse = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">


// **** 3.  Used as the response type fetch all bookings for provider side and user side
// used as the ProviderAppointmentsBookingTableColumns type
// used as the userAllBookingsTableColumns type
// used in the ProviderAppointmentsPage CommonTable type
// used in the UserBookingsPage CommonTable type
// used as the providerFetchBookingAppoinments api response type
// used as the userFetchBookings api response type
export type FetchBookingsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt">;

// **** 3.  Used as the request and response type and interface fetch all online bookings for provider side and user side
export type FetchOnlineBookingParams = FetchFunctionParams & { online?: boolean, raw?: boolean };
export type FetchOnlineBookingsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentStatus" | "appointmentTime" | "videoCallRoomId" | "createdAt"> & Pick<User, "username">;


// **** 4. AddressUpdating request type and response interface used by user and provider
export type UpdateAddressRequest = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;
export interface UpdateAddressResponse extends ApiBaseResponse {
  data: Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink" | "updatedAt">;
} 


// **** 4. Validate booking video call room id request interface used by the provider and the user
export interface ValidateRoomId {
  appointmentId: Booking["_id"];
  roomId: Booking["videoCallRoomId"];
}



// **** 5. Used as the response interface for the adminFetchSubscriptionDetails api  
type SubscriptionProps = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus" | "createdAt">;
type PaymentsProps = Pick<Payment, "transactionId" | "discountAmount" | "initialAmount" | "paymentFor" | "paymentGateway" | "paymentMethod" | "paymentStatus" | "totalAmount">;
type PlanProps = Pick<Plan, "planName" | "price" | "adVisibility" | "maxBookingPerMonth">;
export interface FetchSubscriptionDetailsResponse extends SubscriptionProps {
    subscriptionPlanId: PlanProps,
    paymentId: PaymentsProps,
}
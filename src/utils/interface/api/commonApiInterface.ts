import { Plan } from "../entityInterface/planInterface";
import { Payment } from "../entityInterface/paymentInterface";
import { Booking } from "../entityInterface/bookingInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";

// **** 1.  Used as the response type of fetch provider subscriptions for admin side and provider side
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName" | "price">;


// **** 2.  Used as the return type of fetch payments for admin side, provider side
export type FetchPaymentsResponse = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">


// **** 3.  Used as the response type of user fetch all bookings for provider side and user side
// used as the ProviderAppointmentsBookingTableColumns type
// used as the userAllBookingsTableColumns type
// used in the ProviderAppointmentsPage CommonTable type
// used in the UserBookingsPage CommonTable type
// used as the providerFetchBookingAppoinments api response type
// used as the userFetchBookings api response type
export type FetchBookingsResponse = Pick<Booking, "_id" | "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt">;
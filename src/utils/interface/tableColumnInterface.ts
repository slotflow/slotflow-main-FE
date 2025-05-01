import { User } from "./userInterface";
import { Plan } from "./planInterface";
import { Payment } from "./paymentInterface";
import { Provider } from "./providerInterface";
import { Service } from "./appServiceInterface";
import { Subscription } from "./subscriptionInterface";
import { Booking } from "./bookingInterface";

// **** Admin Table **** \\

// **** Admin side Providers listing table columns props
export type AdminProvidersTableColumnsProps = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified" | "trustedBySlotflow">;

// **** Admin side users listing table columns props
export type AdminUsersTableColumnsProps = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;

// **** Admin side app services listing table columns props
export type AdminAppServicesTableColumnsProps = Pick<Service, "_id" | "serviceName" | "isBlocked">;

// **** Admin side plans listing table columns props
export type AdminPlansTableColumnsProps = Pick<Plan , "_id" | "planName" | "isBlocked">;

// **** Admin providers subscriptions listing table columns props
type SubscriptionTableInterfacePropsForAdmin = Pick<Subscription, "_id" | "createdAt" | "providerId" | "startDate" | "endDate" | "subscriptionStatus">;
export interface AdminProvidersSubscriptionsTableColumnsProps extends SubscriptionTableInterfacePropsForAdmin , Partial<Pick<Plan, "planName" | "price">> {};

// **** Admin all payments listing table columns props
export type AdminAllPaymentsTableColumnsProps = Pick<Payment, "createdAt" | "totalAmount" | "paymentFor" | "paymentGateway" | "paymentStatus" | "paymentMethod">;





// **** Provider Table **** \\

// **** Provider subscriptions listing table columns props
type SubscriptionTableInterfacePropsForProvider = Pick<Subscription, "startDate" | "endDate" | "subscriptionStatus">;
export interface ProviderSubscriptionsTableColumnsProps extends SubscriptionTableInterfacePropsForProvider , Partial<Plan> {};

// **** Provider payments listing table columns props
export type ProviderPaymentsTableColumnsProps = Pick<Payment, "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">;





// **** User Table **** \\
export type UserBookingsTableColumnsProps = Pick<Booking, "appointmentMode" | "appointmentStatus" | "appointmentTime" | "appointmentDate" | "appointmentDay" | "createdAt" >
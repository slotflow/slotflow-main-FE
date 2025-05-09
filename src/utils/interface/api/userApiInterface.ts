import { User } from "../userInterface";
import { Address } from "../addressInterface";
import { Provider } from "../providerInterface";
import { CommonResponse } from "../commonInterface";
import { ProviderService } from "../providerServiceInterface";
import { Service } from "../appServiceInterface";
import { AvailabilityForResponse } from "../serviceAvailabilityInterface";
import { Booking } from "../bookingInterface";
import { Payment } from "../paymentInterface";

// User Fetch profile details api response
export type UserFetchUserProfileResponse = Pick<User, "username" | "email" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt">;

// User update profile Image api response
export interface UpdateUserProfileImageResponse extends CommonResponse {
    profileImage: string;
}

// user address adding request payload interface used in user api
export interface AddUserAddressPayload {
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

// User Fetch address api response
export type UserFetchUserAddressResponse = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;

// User Fetch service providers response
export interface UserFetchServiceProvidersResponse {
    _id: string,
    provider: {
        _id: string,
        username: string,
        profileImage: string | null,
        trustedBySlotflow: boolean,
    },
    service: {
        serviceCategory: string,
        serviceName: string,
        servicePrice: number,
        categoryName: string
    }
}

// User fetch service provider detials api response
export type UserFetchProviderProfileDetailsResponse = Pick<Provider, "_id" | "username" | "email" | "phone" | "profileImage" | "trustedBySlotflow">;

// User fetch service provider address api response
export type UserFetchProviderAddressResponseProps = Pick<Address, "userId" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;

// User fetch provider service details api response
type FetchServiceDetailsProps = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerExperience" >;
export interface UserFetchProviderServiceResponseProps extends FetchServiceDetailsProps {
    serviceCategory: Pick<Service, "serviceName">
}

// User fetch provider service availability api response
export type UserFetchProviderAvailabilityResponseProps = AvailabilityForResponse;

//User book an appoint api request props
export interface UserBookAnAppointmentRequestProps {
    providerId : string,
    slotId : string,
    date : Date,
    selectedServiceMode : string,
}

// User fetch bookings response props
export type UserFetchBookingsResponseProps = Pick<Booking, "_id" | "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt">;

// user fetch payments response props
export type UserFetchPaymentsResponseProps = Pick<Payment, "_id" | "createdAt" | "totalAmount" | "paymentFor" | "paymentMethod" | "paymentGateway" | "paymentStatus" | "discountAmount">;

// user cancel booking response props
export interface UserCancelBookingResponseProps extends CommonResponse {
    updatedBooking : Pick<Booking, "_id" | "appointmentDate" | "appointmentMode" | "appointmentStatus" | "appointmentTime" | "createdAt">;
}
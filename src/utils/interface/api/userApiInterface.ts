import { User } from "../userInterface";
import { Address } from "../addressInterface";
import { Provider } from "../providerInterface";
import { CommonResponse } from "../commonInterface";
import { ProviderService } from "../providerServiceInterface";
import { Service } from "../appServiceInterface";
import { ServiceAvailability } from "../serviceAvailabilityInterface";

// User Fetch profile details api response
export type FetchUserProfileResponse = Pick<User, "username" | "email" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt">;

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
export type FetchUserAddressResponse = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;

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
export type UserFetchProviderAvailabilityResponseProps = Pick<ServiceAvailability, "availability" >;
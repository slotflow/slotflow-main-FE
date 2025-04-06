import { Address } from "./addressInterface";
import { Service } from "./appServiceInterface";
import { CommonResponse } from "./commonInterface";

//  User
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isEmailVerified: boolean;
    phone: string;
    profileImage: string;
    addressId: string;
    bookingsId: string;
    verificationToken: string;
    createdAt: string;
    updatedAt: string;
}


// **** USER API INTERFACES START **** //

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

// **** USER API INTERFACES END **** //





// **** INTERFACES USED IN USER PAGES START **** //

// User Select app services, used in userServiceSelectPage
export type UserSelectService = Pick<Service, "_id" | "serviceName" | "isBlocked" >;

// **** INTERFACES USED IN USER PAGES END **** //

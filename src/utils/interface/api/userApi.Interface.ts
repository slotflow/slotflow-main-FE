import { Address } from "../addressInterface";
import { User } from "../userInterface";

// Common Response Type
export interface ApiCommonResponse {
    success: boolean;
    message: string;
}


// Fetch user profile details api response
export type UserFetchProfileDetailsResponseProps = Pick<User, "username" | "email" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt">;

// User update profile Image api response
export interface UserUpdateProfileImageResponseProps extends ApiCommonResponse {
    profileImage: string;
}

// Fetch user address api response
export type UserFetchAddressResponseProps = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;


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
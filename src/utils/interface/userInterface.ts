import { Service } from "./appServiceInterface";

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





// **** INTERFACES USED IN USER PAGES START **** //

// User Select app services, used in userServiceSelectPage
export type UserSelectService = Pick<Service, "_id" | "serviceName" | "isBlocked" >;

// **** INTERFACES USED IN USER PAGES END **** //

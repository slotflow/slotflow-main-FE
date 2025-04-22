import { Service } from "./appServiceInterface";
import { Provider } from "./providerInterface";

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

//user fetch service provider profile used in UserProviderProfileDetails.tsx
export interface UserProviderProfileDetailsProps extends Pick<Provider, "_id">{
    setProfileImage : (image : string) => void,
} 

//user fetch service provider Address  used in UserProviderAddress.tsx
export type UserProviderAddressProps = Pick<Provider, "_id">

//user fetch service provider Service  used in UserProviderService.tsx
export type UserProviderServiceProps = Pick<Provider, "_id">

// User service provider availability used in UserProviderServiceAvailability.tsx
export type UserProviderServiceAvailabilityProps = Pick<Provider, '_id'>;

// **** INTERFACES USED IN USER PAGES END **** //

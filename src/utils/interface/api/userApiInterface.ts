import { ApiBaseResponse } from "../commonInterface";
import { User } from "../entityInterface/userInterface";
import { Address } from "../entityInterface/addressInterface";
import { Provider } from "../entityInterface/providerInterface";
import { Service } from "../entityInterface/appServiceInterface";
import { ProviderService } from "../entityInterface/providerServiceInterface";
import { AvailabilityForResponse } from "../entityInterface/serviceAvailabilityInterface";
import { Review } from "../entityInterface/reviewInterface";

// **** 1.  Used as the response type of the user profile details fetching api
export type UserFetchUserProfileDetailsResponse = Pick<User, "username" | "email" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt" | "updatedAt">;


// **** 2.  Used as the response type of the user profile image updating api
export interface UpdateUserProfileImageResponse extends ApiBaseResponse {
    data: User["profileImage"]
}


// **** 3  Used as the request type of user update userInfo api
export type UserUpdateUserInfoRequest = Pick<User, "username" | "phone">;
// **** 3  Used as the response interface of user update userInfo api
export interface UserUpdateUserInfoResponse extends ApiBaseResponse {
    data: UserUpdateUserInfoRequest
}


// **** 4  Used as the request interface of the user add address api
export type AddUserAddressRequest = Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;
export interface UserAddUserAddressResponse extends ApiBaseResponse {
  data: Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink" | "updatedAt">;
}



// **** 5  Used as the response type of the user fetching api
export type UserFetchUserAddressResponse = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;


// **** 6  Used as the response type of the user fetch all services for the service selecting page fetching api
export type UserFetchAllServicesResponse = Pick<Service, "_id" | "serviceName"> ;


// **** 7  Used as the response interface of the user fetching service providers for the dashboard fetching api
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


// **** 8  Used as the response type of the user fetching service providers details fetching api
export type UserFetchProviderProfileDetailsResponse = Pick<Provider, "_id" | "username" | "email" | "phone" | "profileImage" | "trustedBySlotflow">;


// **** 9  Used as the response type of the user fetching service providers address fetching api
export type UserFetchProviderAddressResponse = Pick<Address, "userId" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">;


// **** 10  Used as the response interface of the user fetching service providers service details fetching api
type FetchServiceDetailsProps = Pick<ProviderService, "serviceName" | "serviceDescription" | "servicePrice" | "providerExperience" >;
export interface UserFetchProviderServiceResponse extends FetchServiceDetailsProps {
    serviceCategory: Pick<Service, "serviceName">
}


// **** 11  Used as the response type of the user fetching service providers service availability fetching api
export type UserFetchProviderAvailabilityResponse = AvailabilityForResponse;


// **** 12.1  Used as the request type of the user book an appointment api
export type UserBookAnAppointmentRequest = {
    providerId: Provider["_id"];
    slotId : string;
    date : Date;
    selectedServiceMode : string;
}
// **** 12.1  Used as the response interface of the user book an appointment api
export interface UserBookAppointmentResponse extends ApiBaseResponse {
    data : string
}


// **** 13.  Inline interface used for userSaveAppointmentBooking api


// **** 14.  Interfaces for userFetchBooking api is in common interface api file


// **** 15.  Inline interface used for userCancelBooking api


// **** 16.  Interfaces for userFetchPayments api is in common interface api file


// **** 17. Used as the return type of the user fetch providers for the chat side bar
export type UserFetchProvidersForChatSidebarResponse = Array<Pick<Provider, "_id" | "username" | "profileImage" >>;


// **** 18. Address updating interfaces are in common interface file


// **** 19. Used as the request type of the user adding review
export type UserAddReviewRequest = Pick<Review, "reviewText" | "rating" | "bookingId" | "providerId" >;
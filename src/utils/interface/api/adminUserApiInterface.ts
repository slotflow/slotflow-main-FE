import { User } from "../entityInterface/userInterface";


// **** 1  Used as the response type of the adminFetchAllUsers api
export type AdminfetchAllUsersResponse = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;;


// **** 2  Used as the request type of the adminChangeUserBlockStatus api
export type AdminChangeUserStatusRequest = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}

// **** 3 Used as the response type of admin fetch user profile details
export type AdminFetchUserProfileDetailsResponse = Pick<User, "username" | "phone" | "profileImage" | "isEmailVerified" | "isBlocked" | "email" | "createdAt">;

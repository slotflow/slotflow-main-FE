import { CommonResponse } from "../commonInterface";
import { User } from "../entityInterface/userInterface";

// Admin fetch all users api response type
export type AdminfetchAllUsers = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;


//  Admin change user block status request payload type
export type AdminChangeUserStatusApiRequestPayload = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}


// Admin change user block status response interface
type ChnageUserStatusResponse = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;
export interface AdminChnageUserBlockStatusApiResponse extends CommonResponse {
    updatedUser: ChnageUserStatusResponse
}
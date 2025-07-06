import { ApiBaseResponse } from "../commonInterface";
import { User } from "../entityInterface/userInterface";

// Used as the return type for Admin Fetch All Users API,
// and in AdminUsersTableColumns, AdminUsersPage, useAdminUserActions
export type AdminfetchAllUsersResponse = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;


//  Admin change user block status request payload type
export type AdminChangeUserStatusRequest = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}


// Admin change user block status response interface
type ChnageUserStatusResponse = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;
export interface AdminChnageUserBlockStatusResponse extends ApiBaseResponse {
    updatedUser: ChnageUserStatusResponse
}
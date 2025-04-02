import { User } from "../userInterface";

export interface ApiCommonResponse {
    success: boolean;
    message: string;
}



// Admin users table interface props used in  use Admin action custom hook and the column.tsx
export type UsersTableInterfaceProps = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;



// Admin fetch all users api response type for the user listing also used as table column props in column.tsx
export type AdminfetchAllUsersResponseProps = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;



//  Admin change user block status request payload interface
export interface AdminChangeUserStatusRequestPayload {
    userId: string;
    status: boolean;
}

// Admin change user block status response interface
type ChnageUserStatusResponse = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;
export interface AdminChnageUserStatusResponse extends ApiCommonResponse {
    updatedUser: ChnageUserStatusResponse
}
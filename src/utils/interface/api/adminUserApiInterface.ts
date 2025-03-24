import { User } from "../userInterface";

export interface ApiCommonReponse {
    success: boolean;
    message: string;
}

// Admin fetch all users api response type for the user listing also used as table column props in column.tsx
export type fetchAllUsersResponseProps = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;
// Admin fetch all users api response interface
export interface AdminFetchAllUsersResponse extends ApiCommonReponse {
    users: fetchAllUsersResponseProps[];
}



//  Admin change user block status request payload interface
export interface AdminChangeUserStatusRequestPayload {
    userId: string;
    status: boolean;
}

// Admin change user block status response interface
export interface AdminChnageUserStatusResponse extends ApiCommonReponse{
    updatedUser: Partial<User>
}
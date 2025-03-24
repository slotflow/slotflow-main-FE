import { User } from "../userInterface";

export interface ApiCommonReponse {
    success: boolean;
    message: string;
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
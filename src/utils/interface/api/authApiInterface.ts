import { ApiBaseResponse } from "../commonInterface";


// ****************** UserBaseInterface ******************
interface UserBaseInterface {
    username: string;
    email: string;
    password: string;
    role: string;
    verificationToken: string;
    otp: string;
}


// **** 1.1  Used as the request type of the user or provider sign up api
export type SignupRequest = Pick<UserBaseInterface, "username" | "email" | "password" | "role">;
// **** 1.1  Used as the response interface of the user or provider sign up api
export interface SignupResponse extends ApiBaseResponse {
    authUser: {
        verificationToken: string;
        role: string;
    };
}


// **** 2.  Used as the request type of the otp verification api
export type VerifyOtpRequest = Pick<UserBaseInterface, "otp" | "verificationToken" | "role">;


// **** 3.1  Used as the request type of the resend otp api
export type ResendOtpRequest = Pick<UserBaseInterface, "role"> & Partial<Pick<UserBaseInterface, "verificationToken" | "email">>;
// **** 3.2  Used as the response interface of the resend otp api
export interface ResendOtpResponse extends ApiBaseResponse {
    authUser: {
        verificationToken: string;
        role: string;
    };
}


// **** 4.1  Used as the request type of user or provider or admin sign in api
export type SigninRequest = Pick<UserBaseInterface, "email" | "password" | "role">;
// **** 4.2  Used as the response interface of user or provider or admin sign in api
export interface SigninResponse extends ApiBaseResponse {
    authUser: {
        username: string;
        profileImage: string;
        role: string;
        isLoggedIn: boolean;
        address?: boolean;
        serviceDetails?: undefined;
        serviceAvailability?: undefined;
        approved?: undefined;
    };
}


// **** 5.  Used as the Request type of update password api
export type UpdatePasswordRequest = Pick<UserBaseInterface, "password" | "role" | "verificationToken">;
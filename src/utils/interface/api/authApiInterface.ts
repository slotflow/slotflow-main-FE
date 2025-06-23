import { CommonResponse } from "../commonInterface";

// ****************** Common Interface ******************
interface CommonInterface {
    username: string;
    email: string;
    password: string;
    role: string;
    verificationToken: string;
    otp: string;
}





// ****************** Sign Up ******************
// Sign up API request payload interface 
export type SignupApiRequestPayload = Pick<CommonInterface, "username" | "email" | "password" | "role">;

// Sign up response interface
export interface SignupApiResponse extends CommonResponse {
    authUser: {
        verificationToken: string;
        role: string;
    };
}





// ****************** OTP Verification ******************
// OTP verification API request payload interface
export type VerifyOtpApiRequestPayload = Pick<CommonInterface, "otp" | "verificationToken" | "role">;





// ****************** Resend OTP ******************
// Resend OTP API request payload interface
export type ResendOtpApiRequestPayload = Pick<CommonInterface, "role"> & Partial<Pick<CommonInterface, "verificationToken" | "email">>;

// Resend OTP API response interface
export interface ResendOtpApiResponse extends CommonResponse {
    authUser: {
        verificationToken: string;
        role: string;
    };
}





// ****************** Sign In ******************
// Sign in API request payload interface
export type SigninApiRequestPayload = Pick<CommonInterface, "email" | "password" | "role">;

// Sign in API response interface
export interface SigninApiResponse extends CommonResponse {
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





// ****************** Update Password ******************
// Update password API request payload interface
export type UpdatePasswordApiRequestPayload = Pick<CommonInterface, "password" | "role" | "verificationToken">;
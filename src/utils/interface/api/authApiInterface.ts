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
export type SignupRequest = Pick<CommonInterface, "username" | "email" | "password" | "role">;

// Sign up response interface
export interface SignupResponse extends CommonResponse {
    authUser: {
        verificationToken: string;
        role: string;
    };
}





// ****************** OTP Verification ******************
// OTP verification API request payload interface
export type VerifyOtpRequest = Pick<CommonInterface, "otp" | "verificationToken" | "role">;





// ****************** Resend OTP ******************
// Resend OTP API request payload interface
export type ResendOtpRequest = Pick<CommonInterface, "role"> & Partial<Pick<CommonInterface, "verificationToken" | "email">>;

// Resend OTP API response interface
export interface ResendOtpResponse extends CommonResponse {
    authUser: {
        verificationToken: string;
        role: string;
    };
}





// ****************** Sign In ******************
// Sign in API request payload interface
export type SigninRequest = Pick<CommonInterface, "email" | "password" | "role">;

// Sign in API response interface
export interface SigninResponse extends CommonResponse {
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
export type UpdatePasswordRequest = Pick<CommonInterface, "password" | "role" | "verificationToken">;
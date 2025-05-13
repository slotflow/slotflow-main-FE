import { CommonResponse } from "../commonInterface";

// Sign up api request payload interface 
export interface SignupApiRequestPayload {
    username: string;
    email: string;
    password: string;
    role: string;
}
// Sign up  response interface
export interface SignupApiResponse extends CommonResponse {
    authUser: {
        verificationToken: string;
        role: string;
    }
}



// Otp verification api request payload interface
export interface VerifyOtpApiRequestPayload {
    otp: string;
    verificationToken: string;
    role: string
}



// Resend Otp api request payload interface
export interface ResendOtpApiRequestPayload {
    role: string;
    verificationToken?: string;
    email?: string;
}
// Resend otp api response interface
export interface ResendOtpApiResponse extends CommonResponse{
    authUser: {
        verificationToken: string;
        role: string;
    }
}



// Sign in api request payload interface
export interface SigninApiRequestPayload {
    email: string;
    password: string;
    role: string;
}
// Sign in api response interface
export interface SigninApiResponse extends CommonResponse{
    authUser: {
        username: string;
        profileImage: string;
        role: string;
        isLoggedIn: boolean;
        address?: boolean;
        serviceDetails?: undefined,
        serviceAvailability?: undefined,
        approved?: undefined
    }
}



// Update password api request payload interface
export interface UpdatePasswordApiRequestPayload {
    role: string;
    verificationToken: string;
    password: string;
}
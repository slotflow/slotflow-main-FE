export interface CommonResponse {
    success: boolean;
    message: string;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface SignupResponse extends CommonResponse {
    authUser: {
        verificationToken: string;
        role: string;
    }
}

export interface VerifyOtpRequestPayload {
    otp: string;
    verificationToken: string;
    role: string
}

export interface ResendOtpRequestPayload {
    role: string;
    verificationToken?: string;
    email?: string;
}

export interface ResendOtpResponse extends CommonResponse{
    authUser: {
        verificationToken: string;
        role: string;
    }
}

export interface SigninRequestPayload {
    email: string;
    password: string;
    role: string;
}

export interface SigninResponse extends CommonResponse{
    authUser: {
        username: string;
        profileImage?: string;
        role: string;
        isLoggedIn: boolean;
        address?: boolean;
        service?: boolean;
        approved?: boolean;
    }
}

export interface UpdatePasswordRequestPayload {
    role: string;
    verificationToken: string;
    password: string;
}
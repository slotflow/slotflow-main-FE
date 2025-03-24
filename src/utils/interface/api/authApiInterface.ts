export interface CommonResponse {
    success: boolean;
    message: string;
}

// Sign up api request payload interface 
export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    role: string;
}

// Sign up  response interface
export interface SignupResponse extends CommonResponse {
    authUser: {
        verificationToken: string;
        role: string;
    }
}



// Otp verification api request payload interface
export interface VerifyOtpRequestPayload {
    otp: string;
    verificationToken: string;
    role: string
}



// Resend Otp api request payload interface
export interface ResendOtpRequestPayload {
    role: string;
    verificationToken?: string;
    email?: string;
}

//  Resend otp api response interface
export interface ResendOtpResponse extends CommonResponse{
    authUser: {
        verificationToken: string;
        role: string;
    }
}



// Sign in api request payload interface
export interface SigninRequestPayload {
    email: string;
    password: string;
    role: string;
}

// Sign in api response interface
export interface SigninResponse extends CommonResponse{
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




export interface UpdatePasswordRequestPayload {
    role: string;
    verificationToken: string;
    password: string;
}
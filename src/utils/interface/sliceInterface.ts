// **** Auth slice state **** \\
export interface UserData {
    username?: string;
    profileImage?: string;
    email?: string;
    verificationToken?: string;
    role?: string;
    isBlocked?: boolean;
    isLoggedIn: boolean;
    address?: boolean;
    serviceDetails?: boolean;
    serviceAvailability?: boolean;
    approved?: boolean;
}

export interface AuthState {
    authUser: UserData | null;
}



// **** Sign Form Interface **** \\
export interface stateVariables {
    signInForm: boolean;
    signUpForm: boolean;
    verifyOtpForm: boolean;
    verifyEmailForm: boolean;
    resetPasswordForm: boolean;
    forgotPassword: boolean;
    otpRemainingTime: number;
    otpTimerIsRunning: boolean;
    loading: boolean;
}
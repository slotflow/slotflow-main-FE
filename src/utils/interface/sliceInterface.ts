import { Availability } from "./entityInterface/serviceAvailabilityInterface";

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
    profileImageUpdating: boolean;
    dataUpdating: boolean;
}



// **** Sign Form Interface **** \\
export interface SignUpFormStateVariables {
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



// **** App state slice **** \\
export interface appStateVariables {
    lightTheme: boolean;
    signinForm: boolean;
    sidebarOpen: boolean;
}



// **** Provider slice interfaces **** \\
export interface ProviderState {
  availabilities: Availability[];
  planId: string | null;
  planDuration: string | null;
  paymentSelectionOpen: boolean;
  isTrialPlan: boolean;
  paymentPageOpen: boolean;
}



// **** User slice interface **** \\
export interface UserStateVariables {
  selectedServices: string[];
}

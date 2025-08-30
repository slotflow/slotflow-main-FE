import { Role } from "./commonInterface";
import { Plan } from "./entityInterface/planInterface";
import { Availability } from "./entityInterface/serviceAvailabilityInterface";

// **** Auth slice state **** \\
export interface UserData {
    uid?: string;
    username?: string;
    profileImage?: string;
    phone?: string;
    email?: string;
    verificationToken?: string;
    role: Role;
    isBlocked: boolean;
    isLoggedIn: boolean;
    isAddressAdded?: boolean;
    isServiceDetailsAdded?: boolean;
    isServiceAvailabilityAdded?: boolean;
    isAdminApproved?: boolean;
    providerSubscription?: Plan["planName"];
    googleId?: string;
    updatedAt: string
}

export interface AuthState {
    authUser: UserData | null;
    profileImageUpdating: boolean;
    dataUpdating: boolean; // used for the data update loading state in provider add address, provider add service availability, provider add service details, profile info updating
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
    filterSideBarOpen: boolean;
}



// **** Provider slice interfaces **** \\
export interface ProviderState {
  availabilities: Availability[] | null;
  planId: string | null;
  planDuration: string | null;
  paymentSelectionOpen: boolean;
  isTrialPlan: boolean;
  paymentPageOpen: boolean;
}



// **** User slice interface **** \\
export interface UserStateVariables {
  selectedServices: string[] | null;
}

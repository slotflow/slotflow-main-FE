import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resendOtp, signin, signup, verifyOtp } from "../apis/auth.api";

interface stateVariables {
    loginForm: boolean;
    signUpForm: boolean;
    verifyEmailForm: boolean;
    verifyOtpForm: boolean;
    adminForm: boolean;
    changePassword: boolean;
    changePasswordForm: boolean;
    otpRemainingTime: number;
    otpTimerIsRunning: boolean;
    loading: boolean;
}

const initialState: stateVariables = {
    loginForm: true,
    signUpForm: false,
    verifyEmailForm: false,
    verifyOtpForm: false,
    adminForm: false,
    changePassword: false,
    changePasswordForm: false,
    otpRemainingTime: 0,
    otpTimerIsRunning: false,
    loading: false,
}

const signFormSlice = createSlice({
    name: "signForm",
    initialState,
    reducers: {
        setLoginForm: (state, action: PayloadAction<boolean>) => {
            state.loginForm = action.payload;
        },
        setSignUpForm: (state, action: PayloadAction<boolean>) => {
            state.signUpForm = action.payload;
        },
        setVerifyEmailForm: (state, action: PayloadAction<boolean>) => {
            state.verifyEmailForm = action.payload;
        },
        setVerifyOtpForm: (state, action: PayloadAction<boolean>) => {
            state.verifyOtpForm = action.payload;
        },
        setAdminForm: (state, action: PayloadAction<boolean>) => {
            state.adminForm = action.payload;
        },
        setChangePassword: (state, action: PayloadAction<boolean>) => {
            state.changePassword = action.payload;
        },
        setChangePasswordForm: (state, action: PayloadAction<boolean>) => {
            state.changePasswordForm = action.payload;
        },
        toggleForm: (state) => {
            state.loginForm = !state.loginForm;
            state.signUpForm = !state.signUpForm;
        },
        startTimer: (state, action: PayloadAction<number>) => {
            state.otpRemainingTime = action.payload;
            state.otpTimerIsRunning = true;
        },
        updateTimer: (state) => {
            if (state.otpRemainingTime > 0 && state.otpTimerIsRunning) {
                state.otpRemainingTime -= 1;
            } else {
                state.otpTimerIsRunning = false;
            }
        },
        stopTimer: (state) => {
            state.otpTimerIsRunning = false;
        }
    },
        extraReducers: (builder) => {
            builder
                .addCase(signup.pending, (state) => {
                    state.loading = true;
                })
                .addCase(signup.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(signup.rejected, (state) => {
                    state.loading = false;
                })
                .addCase(signin.pending, (state) => {
                    state.loading = true;
                })
                .addCase(signin.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(signin.rejected, (state) => {
                    state.loading = false;
                })
                .addCase(verifyOtp.pending, (state) => {
                    state.loading = true;
                })
                .addCase(verifyOtp.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(verifyOtp.rejected, (state) => {
                    state.loading = false;
                })
                .addCase(resendOtp.pending, (state) => {
                    state.loading = true;
                })
                .addCase(resendOtp.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(resendOtp.rejected, (state) => {
                    state.loading = false;
                });
        },
});

const persistConfig = {
    key: "signForm",
    storage,
};

const persistedSignFormReducer = persistReducer(persistConfig, signFormSlice.reducer);

export const {  
    startTimer, 
    updateTimer, 
    stopTimer, 
    setLoginForm,
    setSignUpForm,
    setVerifyEmailForm,
    setVerifyOtpForm,
    setAdminForm, 
    toggleForm,
    setChangePassword,
    setChangePasswordForm
} = signFormSlice.actions;
export default persistedSignFormReducer;
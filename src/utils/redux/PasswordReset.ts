import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resendOtp, signin, signup, verifyOtp } from "../apis/auth.api";

interface stateVariables {
    verifyEmailForm: boolean;
    verifyOtpForm: boolean;
    changePasswordForm: boolean;
    otpRemainingTime: number;
    otpTimerIsRunning: boolean;
    loading: boolean;
}

const initialState: stateVariables = {
    verifyEmailForm: true,
    verifyOtpForm: false,
    changePasswordForm: false,
    otpRemainingTime: 0,
    otpTimerIsRunning: false,
    loading: false,
}

const passwordResetSlice = createSlice({
    name: "passwordReset",
    initialState,
    reducers: {
        setVerifyEmailForm: (state, action: PayloadAction<boolean>) => {
            state.verifyEmailForm = action.payload;
        },
        setVerifyOtpForm: (state, action: PayloadAction<boolean>) => {
            state.verifyOtpForm = action.payload;
        },
        setChangePasswordForm: (state, action: PayloadAction<boolean>) => {
            state.changePasswordForm = action.payload;
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
    key: "verifyEmail",
    storage,
};

const persistedPasswordResetReducer = persistReducer(persistConfig, passwordResetSlice.reducer);

export const {  
    startTimer, 
    updateTimer, 
    stopTimer, 
    setVerifyEmailForm,
    setVerifyOtpForm,
    setChangePasswordForm
} = passwordResetSlice.actions;

export default persistedPasswordResetReducer;
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    lightTheme: boolean;
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
    lightTheme: true,
}

const stateSlice = createSlice({
    name: "state",
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
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
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
    }
});

const persistConfig = {
    key: "state",
    storage,
};

const persistedStateReducer = persistReducer(persistConfig, stateSlice.reducer);

export const { 
    toggleTheme, 
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
} = stateSlice.actions;
export default persistedStateReducer;
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateVariables {
    otpForm: boolean;
    otpRemainingTime: number;
    otpTimerIsRunning: boolean;
    lightTheme: boolean;
    loginForm: boolean;
    forgotPassword: boolean;
}

const initialState: stateVariables = {
    otpForm: false,
    otpRemainingTime: 0,
    otpTimerIsRunning: false,
    lightTheme: true,
    loginForm: true,
    forgotPassword: false,
}

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        changeToOtpSend: (state, action: PayloadAction<boolean>) => {
            state.otpForm = action.payload;
        },
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
        },
        toggleSigninForm: (state) => {
            state.loginForm = !state.loginForm;
        },
        changeToSigninForm: (state) => {
            state.loginForm = true;
        },
        changeToSignupForm: (state) => {
            state.loginForm = false;
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
        },
        changeForgotPassword: (state, action) => {
            state.forgotPassword = action.payload;
        }
    }
});

const persistConfig = {
    key: "state",
    storage,
};

const persistedStateReducer = persistReducer(persistConfig, stateSlice.reducer);

export const { changeToOtpSend, toggleTheme, toggleSigninForm, changeToSigninForm, changeToSignupForm, startTimer, updateTimer, stopTimer, changeForgotPassword } = stateSlice.actions;
export default persistedStateReducer;
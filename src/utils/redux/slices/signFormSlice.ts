import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stateVariables } from "@/utils/interface/sliceInterface";
import { resendOtp, signin, signup, verifyOtp, updatePassword } from '../../apis/auth.api'

const initialState: stateVariables = {
    signInForm: true,
    signUpForm: false,
    verifyOtpForm: false,
    verifyEmailForm: false,
    resetPasswordForm: false,
    forgotPassword: false,
    otpRemainingTime: 0,
    otpTimerIsRunning: false,
    loading: false,
}

const signFormSlice = createSlice({
    name: "signForm",
    initialState,
    reducers: {
        setSignUpForm: (state, action: PayloadAction<boolean>) => {
            state.signUpForm = action.payload;
        },
        setsignInForm: (state, action: PayloadAction<boolean>) => {
            state.signInForm = action.payload;
        },
        toggleForm: (state) => {
            state.signInForm = !state.signInForm;
            state.signUpForm = !state.signUpForm;
        },
        setVerifyOtpForm: (state, action: PayloadAction<boolean>) => {
            state.verifyOtpForm = action.payload;
        },
        setVerifyEmailForm: (state, action: PayloadAction<boolean>) => {
            state.verifyEmailForm = action.payload;
        },
        setResetPasswordForm: (state, action: PayloadAction<boolean>) => {
            state.resetPasswordForm = action.payload;
        },
        setForgotPassword: (state, action: PayloadAction<boolean>) => {
            state.forgotPassword = action.payload;
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
        extraReducers: (signLoader) => {
            signLoader
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
                })
                .addCase(updatePassword.pending, (state) => {
                    state.loading = true;
                })
                .addCase(updatePassword.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(updatePassword.rejected, (state) => {
                    state.loading = false;
                })
        },
});

export const {  
    stopTimer, 
    startTimer, 
    toggleForm,
    updateTimer, 
    setSignUpForm,
    setsignInForm,
    setVerifyOtpForm,
    setForgotPassword,
    setVerifyEmailForm,
    setResetPasswordForm,
} = signFormSlice.actions;

export default signFormSlice.reducer;
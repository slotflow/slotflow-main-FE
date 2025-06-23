import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpFormStateVariables } from "@/utils/interface/sliceInterface";
import { resendOtp, signin, signup, verifyOtp, updatePassword } from '../../apis/auth.api'

const initialState: SignUpFormStateVariables = {
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
        setSignUpForm: (state: SignUpFormStateVariables, action: PayloadAction<boolean>) => {
            state.signUpForm = action.payload;
        },
        setsignInForm: (state: SignUpFormStateVariables, action: PayloadAction<boolean>) => {
            state.signInForm = action.payload;
        },
        toggleForm: (state: SignUpFormStateVariables) => {
            state.signInForm = !state.signInForm;
            state.signUpForm = !state.signUpForm;
        },
        setVerifyOtpForm: (state: SignUpFormStateVariables, action: PayloadAction<boolean>) => {
            state.verifyOtpForm = action.payload;
        },
        setVerifyEmailForm: (state: SignUpFormStateVariables, action: PayloadAction<boolean>) => {
            state.verifyEmailForm = action.payload;
        },
        setResetPasswordForm: (state: SignUpFormStateVariables, action: PayloadAction<boolean>) => {
            state.resetPasswordForm = action.payload;
        },
        setForgotPassword: (state: SignUpFormStateVariables, action: PayloadAction<boolean>) => {
            state.forgotPassword = action.payload;
        },
        startTimer: (state: SignUpFormStateVariables, action: PayloadAction<number>) => {
            state.otpRemainingTime = action.payload;
            state.otpTimerIsRunning = true;
        },
        updateTimer: (state: SignUpFormStateVariables) => {
            if (state.otpRemainingTime > 0 && state.otpTimerIsRunning) {
                state.otpRemainingTime -= 1;
            } else {
                state.otpTimerIsRunning = false;
            }
        },
        stopTimer: (state: SignUpFormStateVariables) => {
            state.otpTimerIsRunning = false;
        }
    },
        extraReducers: (signLoader) => {
            signLoader
                .addCase(signup.pending, (state: SignUpFormStateVariables) => {
                    state.loading = true;
                })
                .addCase(signup.fulfilled, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(signup.rejected, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(signin.pending, (state: SignUpFormStateVariables) => {
                    state.loading = true;
                })
                .addCase(signin.fulfilled, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(signin.rejected, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(verifyOtp.pending, (state: SignUpFormStateVariables) => {
                    state.loading = true;
                })
                .addCase(verifyOtp.fulfilled, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(verifyOtp.rejected, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(resendOtp.pending, (state: SignUpFormStateVariables) => {
                    state.loading = true;
                })
                .addCase(resendOtp.fulfilled, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(resendOtp.rejected, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(updatePassword.pending, (state: SignUpFormStateVariables) => {
                    state.loading = true;
                })
                .addCase(updatePassword.fulfilled, (state: SignUpFormStateVariables) => {
                    state.loading = false;
                })
                .addCase(updatePassword.rejected, (state: SignUpFormStateVariables) => {
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
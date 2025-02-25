import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateVariables {
    otpForm: boolean;
    lightTheme: boolean;
    loginForm: boolean;
}

const initialState : stateVariables = {
    otpForm : false,
    lightTheme : true,
    loginForm: true,
}

const stateSlice = createSlice({
    name : "state",
    initialState,
    reducers : {
        changeToOtpSend: (state, action: PayloadAction<boolean>) => {
            state.otpForm = action.payload;
        },
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
        },
        toggleLoginForm: (state) => {
            state.loginForm = !state.loginForm;
        }
    }
})

export const {changeToOtpSend, toggleTheme, toggleLoginForm} = stateSlice.actions;
export default stateSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateVariables {
    otpForm: boolean;
    lightTheme: boolean;
}

const initialState : stateVariables = {
    otpForm : false,
    lightTheme : true,
}

const stateSlice = createSlice({
    name : "state",
    initialState,
    reducers : {
        changeToOtpSend: (state, action: PayloadAction<boolean>) => {
            state.otpForm = action.payload
        },
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme
        }
    }
})

export const {changeToOtpSend, toggleTheme} = stateSlice.actions;
export default stateSlice.reducer;
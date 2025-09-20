import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GoogleSliceState {
    googleConnectionLoding: boolean;
}

const initialState: GoogleSliceState = {
    googleConnectionLoding: false,
};

const googleSlice = createSlice({
    name: "googleSlice",
    initialState,
    reducers: {
        setGoogleConnectionLoading: (state, action: PayloadAction<boolean>) => {
            state.googleConnectionLoding = action.payload;
        }
    },
});

export const {
    setGoogleConnectionLoading
} = googleSlice.actions;
export default googleSlice.reducer;

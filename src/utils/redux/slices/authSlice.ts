import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
    username?: string;
    profileImage?: string;
    email?: string;
    verificationToken?: string;
    role?: string;
    isBlocked?: boolean;
    isLoggedIn: boolean;
    address?: boolean;
    serviceDetails?: boolean;
    serviceAvailability?: boolean;
    approved?: boolean;
}

interface AuthState {
    authUser: UserData | null;
}

const initialState: AuthState = {
    authUser: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<UserData | null>) => {
            state.authUser = action.payload;
        },
        setAddress: (state, action: PayloadAction<boolean>) => {
            if(state.authUser){
                state.authUser.address = action.payload;
            }
        },
        setServiceDetails: (state, action: PayloadAction<boolean>) => {
            if(state.authUser){
                state.authUser.serviceDetails = action.payload;
            }
        },
        setServiceAvailability: (state, action: PayloadAction<boolean>) => {
            if(state.authUser){
                state.authUser.serviceAvailability = action.payload;
            }
        },
    },
});

export const { 
    setAuthUser, 
    setAddress,
    setServiceDetails,
    setServiceAvailability,
} = authSlice.actions;

export default authSlice.reducer;

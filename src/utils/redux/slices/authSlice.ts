import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserData } from "@/utils/interface/sliceInterface";

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
        setProfileImage: (state, action: PayloadAction<string>) => {
            if(state.authUser){
                state.authUser.profileImage = action.payload;
            }
        }
    },
});

export const { 
    setAuthUser, 
    setAddress,
    setServiceDetails,
    setServiceAvailability,
    setProfileImage,
} = authSlice.actions;

export default authSlice.reducer;

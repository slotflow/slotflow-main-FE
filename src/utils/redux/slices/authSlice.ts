import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
    username?: string;
    profileImage?: string;
    email?: string;
    verificationToken?: string;
    token?: string;
    role?: string;
    isBlocked?: boolean;
    isLoggedIn: boolean;
    _id?: string;
    address?: boolean;
    service?: boolean;
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
        }
    },
});

export const { 
    setAuthUser, 
    setAddress,
} = authSlice.actions;

export default authSlice.reducer;

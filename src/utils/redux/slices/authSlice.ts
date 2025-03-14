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
        }
    },
});

export const { 
    setAuthUser, 
} = authSlice.actions;

export default authSlice.reducer;

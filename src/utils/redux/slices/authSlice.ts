import { persistReducer } from "redux-persist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/lib/storage/session";

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

const persistConfig = {
    key: "auth",
    storage: sessionStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { 
    setAuthUser, 
} = authSlice.actions;

export default persistedAuthReducer;

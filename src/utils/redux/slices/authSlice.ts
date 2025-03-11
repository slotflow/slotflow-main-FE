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
        setUserBlocked: (state, action: PayloadAction<boolean>) => {
            console.log("status changing");
            console.log("authUser : ",state.authUser);
            if (state.authUser?.username) {
                console.log("state.authUser : ",state.authUser);
                console.log("action.payload : ",action.payload);
                state.authUser.isBlocked = action.payload;
            }
        },
    },
});

const persistConfig = {
    key: "auth",
    storage: sessionStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { 
    setAuthUser, 
    setUserBlocked,
} = authSlice.actions;

export default persistedAuthReducer;

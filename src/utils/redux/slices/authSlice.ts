import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
    authUser: {username?: string, profileImage?: string, emal?: string, verificationToken?: string, role?: string,} | null;
    authProvider: {username?: string, profileImage?: string, emal?: string, verificationToken?: string, role?: string,} | null;
    authAdmin: {username?: string, profileImage?: string, emal?: string, verificationToken?: string, role?: string,} | null;
}

const initialState: AuthState = {
    authUser: null,
    authProvider: null,
    authAdmin: null,
};

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setAuthProvider: (state,action) => {
            state.authProvider = action.payload;
        },
        setAuthAdmin: (state, action) => {
            state.authAdmin = action.payload;
        }
    }
});

const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { 
    setAuthUser, 
    setAuthProvider,
    setAuthAdmin 
} = authSlice.actions;

export default persistedAuthReducer;

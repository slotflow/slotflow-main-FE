import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
    user: boolean;
    provider: boolean;
    admin: boolean;
    authData: { role?: string, verificationToken?: string } | null;
}

const initialState: AuthState = {
    user: false,
    provider: false,
    admin: false,
    authData: null
};

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUser: (state, action) => {
            state.user = action.payload;
        },
        changeProvider: (state, action) => {
            state.provider = action.payload;
        },
        changeAdmin: (state, action) => {
            state.admin = action.payload;
        },
        setAuthData: (state, action) => {
            state.authData = action.payload;
        }
    }
});

const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { setAuthData, changeUser, changeAdmin, changeProvider } = authSlice.actions;
export default persistedAuthReducer;

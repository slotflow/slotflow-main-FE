import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
    username?: string;
    profileImage?: string;
    email?: string;
    verificationToken?: string;
    role?: string;
    isBlocked?: boolean;
}

interface AuthState {
    authUser: UserData | null;
    authProvider: UserData | null;
    authAdmin: Omit<UserData, 'isBlocked'> | null;
}

const initialState: AuthState = {
    authUser: null,
    authProvider: null,
    authAdmin: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<UserData | null>) => {
            state.authUser = action.payload;
        },
        setAuthProvider: (state, action: PayloadAction<UserData | null>) => {
            state.authProvider = action.payload;
        },
        setAuthAdmin: (state, action: PayloadAction<Omit<UserData, 'isBlocked'> | null>) => {
            state.authAdmin = action.payload;
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
        setProviderBlocked: (state, action: PayloadAction<boolean>) => {
            if (state.authProvider) {
                state.authProvider.isBlocked = action.payload;
            }
        },
    },
});

const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { 
    setAuthUser, 
    setAuthProvider,
    setAuthAdmin,
    setUserBlocked,
    setProviderBlocked 
} = authSlice.actions;

export default persistedAuthReducer;

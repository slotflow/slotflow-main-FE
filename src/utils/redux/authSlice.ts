import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { resendOtp, signin, signup, verifyOtp } from "./authHandler";

interface AuthState {
    authUser: { username?: string, email?: string, profileImage?: string } | null;
    user: boolean;
    provider: boolean;
    admin: boolean;
    loading: boolean;
    authData: { role?: string, verificationToken?: string, email?: string } | null;
}

const initialState: AuthState = {
    authUser: null,
    user: false,
    provider: false,
    admin: false,
    loading: false,
    authData: null
};

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUserTrue: (state) => {
            state.user = true;
        },
        changeUserFalse: (state) => {
            state.user = false;
        },
        changeProviderTrue: (state) => {
            state.provider = true;
        },
        changeProviderFalse: (state) => {
            state.provider = false;
        },
        changeAdminTrue: (state) => {
            state.admin = true;
        },
        changeAdminFalse: (state) => {
            state.admin = false;
        },
        setAuthData: (state, action) => {
            state.authData = action.payload;
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state) => {
                state.loading = false;
            })
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            .addCase(signin.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signin.rejected, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.rejected, (state) => {
                state.loading = false;
            });
    },
});

const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { changeUserTrue, changeUserFalse, changeProviderTrue, changeProviderFalse, changeAdminTrue, changeAdminFalse, setAuthData, setAuthUser } = authSlice.actions;
export default persistedAuthReducer;

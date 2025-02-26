import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { signin, signup, verifyOtp } from "./authHandler";

interface AuthState {
    authUser: { username?: string, email?: string, phone?: string, profileImage?: string, role?: string } | null;
    user: boolean;
    provider: boolean;
    admin: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    authUser: null,
    user: true,
    provider: false,
    admin: false,
    loading: false,
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
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
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
            });
    },
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { changeUserTrue, changeUserFalse, changeProviderTrue, changeProviderFalse, changeAdminTrue, changeAdminFalse, setAuthUser } = authSlice.actions;
export default persistedAuthReducer;

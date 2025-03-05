import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
    user: boolean;
    provider: boolean;
    admin: boolean;
}

const initialState: AuthState = {
    user: false,
    provider: false,
    admin: false,
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
        }
    }
});

const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { changeUser, changeAdmin, changeProvider } = authSlice.actions;
export default persistedAuthReducer;

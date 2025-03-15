import authReducer from "./slices/authSlice";
import userReducer from './slices/userSlice';
import stateReducer from './slices/stateSlice';
import adminReducer from './slices/adminSlice';
import signFormReducer from "./slices/signFormSlice";
import localStorage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupAxiosInterceptors } from "@/lib/axiosInterceptor";

const persistConfig = {
    key: "root",
    storage: localStorage,
};

const rootReducers = {
    auth: authReducer,
    signform: signFormReducer,
    state: stateReducer,
    admin: adminReducer,
    user: userReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducers));

export const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistAppStore = persistStore(appStore);

setupAxiosInterceptors();

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
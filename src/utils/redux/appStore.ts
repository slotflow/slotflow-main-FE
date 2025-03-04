import { persistStore } from 'redux-persist';
import persistedAuthReducer from "./authSlice";
import persistedAdminReducer from './adminSlice';
import persistedStateReducer from "./stateSlice";
import alertReducer from './alertSlice';
import { configureStore } from "@reduxjs/toolkit";

 export const appStore = configureStore({
    reducer : {
        state : persistedStateReducer,
        auth: persistedAuthReducer,
        admin: persistedAdminReducer,
        alert: alertReducer,
    },
});

export const persistAppStore = persistStore(appStore)
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
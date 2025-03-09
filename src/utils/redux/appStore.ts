import { persistStore } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import persistedAuthReducer from "./slices/authSlice";
import persistedStateReducer from './slices/stateSlice';
import persistedAdminReducer from './slices/adminSlice';
import persistedSignFormReducer from "./slices/signFormSlice";

 export const appStore = configureStore({
    reducer : {
        auth: persistedAuthReducer,
        signform:  persistedSignFormReducer,
        state : persistedStateReducer,
        admin: persistedAdminReducer,
    },
});

export const persistAppStore = persistStore(appStore)
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
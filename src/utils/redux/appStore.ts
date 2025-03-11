import { persistStore } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import persistedAuthReducer from "./slices/authSlice";
import persistedUserReducer from './slices/userSlice';
import persistedStateReducer from './slices/stateSlice';
import persistedAdminReducer from './slices/adminSlice';
import persistedSignFormReducer from "./slices/signFormSlice";

 export const appStore = configureStore({
    reducer : {
        auth: persistedAuthReducer,
        signform:  persistedSignFormReducer,
        state : persistedStateReducer,
        admin: persistedAdminReducer,
        user: persistedUserReducer,
    },
});

export const persistAppStore = persistStore(appStore)
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
import { persistStore } from 'redux-persist';
import persistedAuthReducer from "./authSlice";
import persistedStateReducer from './stateSlice';
import { configureStore } from "@reduxjs/toolkit";
import persistedSignupFormReducer from "./signupFormSlice";
import persistedPasswordResetReducer from './PasswordReset';

 export const appStore = configureStore({
    reducer : {
        auth: persistedAuthReducer,
        signupform:  persistedSignupFormReducer,
        state : persistedStateReducer,
        passWordReset: persistedPasswordResetReducer
    },
});

export const persistAppStore = persistStore(appStore)
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
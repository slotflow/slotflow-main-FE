import stateReducer from "./stateSlice";
import authReducer from "./authSlice";
import adminReducer from './adminSlice';
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
    reducer : {
        state : stateReducer,
        auth: authReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
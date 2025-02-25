import stateReducer from "./stateSlice";
import authReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
    reducer : {
        state : stateReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
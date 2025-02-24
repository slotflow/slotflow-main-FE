import stateReducer from "./stateSlice";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
    reducer : {
        state : stateReducer
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
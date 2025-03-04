import { persistStore } from 'redux-persist';
import persistedAuthReducer from "./authSlice";
import persistedStateReducer from "./stateSlice";
import { configureStore } from "@reduxjs/toolkit";

 export const appStore = configureStore({
    reducer : {
        state : persistedStateReducer,
        auth: persistedAuthReducer,
    },
});

export const persistAppStore = persistStore(appStore)
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
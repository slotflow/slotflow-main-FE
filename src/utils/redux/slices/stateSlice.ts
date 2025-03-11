import { persistReducer } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/lib/storage/session";

interface stateVariables {
    lightTheme: boolean;
    signinForm: boolean;
}

const initialState: stateVariables = {
    lightTheme: true,
    signinForm: true,
}

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
        },
    }
});

const persistConfig = {
    key: "state",
    storage: sessionStorage,
};

const persistedStateReducer = persistReducer(persistConfig, stateSlice.reducer);

export const { 
    toggleTheme, 
} = stateSlice.actions;

export default persistedStateReducer;
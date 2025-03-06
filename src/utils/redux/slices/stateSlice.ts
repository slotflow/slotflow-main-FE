import { persistReducer } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

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
    storage,
};

const persistedStateReducer = persistReducer(persistConfig, stateSlice.reducer);

export const { 
    toggleTheme, 
} = stateSlice.actions;

export default persistedStateReducer;
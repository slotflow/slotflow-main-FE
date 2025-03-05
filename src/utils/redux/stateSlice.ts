import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";

interface stateVariables {
    lightTheme: boolean;
}

const initialState: stateVariables = {
    lightTheme: true,
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
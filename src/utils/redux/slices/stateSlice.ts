import { persistReducer } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/lib/storage/session";

interface stateVariables {
    lightTheme: boolean;
    signinForm: boolean;
    sidebarOpen: boolean;
}

const initialState: stateVariables = {
    lightTheme: true,
    signinForm: true,
    sidebarOpen: true,
}

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        }
    }
});

const persistConfig = {
    key: "state",
    storage: sessionStorage,
};

const persistedStateReducer = persistReducer(persistConfig, stateSlice.reducer);

export const { 
    toggleTheme, 
    toggleSidebar,
} = stateSlice.actions;

export default persistedStateReducer;
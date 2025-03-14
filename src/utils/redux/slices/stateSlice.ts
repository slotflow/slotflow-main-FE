import { createSlice } from "@reduxjs/toolkit";

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

export const { 
    toggleTheme, 
    toggleSidebar,
} = stateSlice.actions;

export default stateSlice.reducer;
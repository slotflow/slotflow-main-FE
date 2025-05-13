import { createSlice } from "@reduxjs/toolkit";
import { appStateVariables } from "@/utils/interface/sliceInterface";

const initialState: appStateVariables = {
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
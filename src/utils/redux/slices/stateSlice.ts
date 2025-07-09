import { createSlice } from "@reduxjs/toolkit";
import { appStateVariables } from "@/utils/interface/sliceInterface";

const initialState: appStateVariables = {
    lightTheme: true,
    signinForm: true,
    sidebarOpen: true,
    filterSideBarOpen: true,
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
        },
        toggleFilterSideBar: (state) => {
            state.filterSideBarOpen = !state.filterSideBarOpen;
        }
    }
});

export const { 
    toggleTheme, 
    toggleSidebar,
    toggleFilterSideBar,
} = stateSlice.actions;

export default stateSlice.reducer;
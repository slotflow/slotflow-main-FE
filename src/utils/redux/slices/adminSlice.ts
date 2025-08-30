import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: null,
    reducers: {
        clearAdminSlice: () => {

        }
    },
});


export const { clearAdminSlice } = adminSlice.actions;

export default adminSlice.reducer;
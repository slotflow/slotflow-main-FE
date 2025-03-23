import { createSlice } from "@reduxjs/toolkit";
import { addNewService } from "@/utils/apis/adminService.api";
import { stateVariables } from "@/utils/interface/adminInterface";

const initialState: stateVariables = {
    adminFormloading: false,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewService.pending, (state) => {
                state.adminFormloading = true;
            })
            .addCase(addNewService.fulfilled, (state) => {
                state.adminFormloading = false;
            })
            .addCase(addNewService.rejected, (state) => {
                state.adminFormloading = false;
            })
    },
});


// export const {} = adminSlice.actions;

export default adminSlice.reducer;
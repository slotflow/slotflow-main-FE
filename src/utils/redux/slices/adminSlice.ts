import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";
import { addNewService } from "@/utils/apis/admin.api";

interface stateVariables {
    loading: boolean;
}

const initialState: stateVariables = {
    loading: false,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        
    },
        extraReducers: (builder) => {
            builder
                .addCase(addNewService.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addNewService.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(addNewService.rejected, (state) => {
                    state.loading = false;
                })
        },
});

const persistConfig = {
    key: "adminSlice",
    storage,
};

const persistedAdminReducer = persistReducer(persistConfig, adminSlice.reducer);

// export const {} = adminSlice.actions;

export default persistedAdminReducer;
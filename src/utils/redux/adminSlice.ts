import { AdminState } from "../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: AdminState = {
    sample: true
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
    },
    extraReducers: () => {
        
    }
});

const persistConfig = {
    key: "admin",
    storage
};

const persistedAdminReducer = persistReducer(persistConfig, adminSlice.reducer);

// export const { } = adminSlice.actions;
export default persistedAdminReducer;
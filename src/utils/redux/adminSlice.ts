import { UserProviderList } from "../types";
import { AdminState } from "../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: AdminState = {
    serviceProviders: [],
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers : {
        addProviders: (state, action) => {
            action.payload.forEach((provider : UserProviderList) => {
                const exists = state.serviceProviders.some(p => p._id === provider._id);
                if (!exists) {
                    state.serviceProviders.push(provider);
                }
            });
        }
    }
});

const persistConfig = {
    key: "admin",
    storage
};

const persistedAdminReducer = persistReducer(persistConfig, adminSlice.reducer);

export const { addProviders } = adminSlice.actions;
export default persistedAdminReducer;
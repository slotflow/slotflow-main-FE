import { Provider, User } from "../types";
import { AdminState } from "../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: AdminState = {
    serviceProviders: [],
    users: [],
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers : {
        addProviders: (state, action) => {
            action.payload.forEach((provider : Provider) => {
                const exists = state.serviceProviders.some(p => p._id === provider._id);
                if (!exists) {
                    state.serviceProviders.push(provider);
                }
            });
        },
        addUsers: (state, action) => {
            action.payload.forEach((user : User) => {
                const exist = state.users.some(p => p._id === user._id);
                if(!exist){
                    state.users.push(user);
                }
            })
        }
    }
});

const persistConfig = {
    key: "admin",
    storage
};

const persistedAdminReducer = persistReducer(persistConfig, adminSlice.reducer);

export const { addProviders, addUsers } = adminSlice.actions;
export default persistedAdminReducer;
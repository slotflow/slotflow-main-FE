import { createSlice } from "@reduxjs/toolkit";

export interface User {
    _id: string;
    username: string;
    profileImage: string | null;
    createdAt: string;
}

interface AdminState {
    serviceProviders: User[];
    users: User[];
}

const initialState: AdminState = {
    serviceProviders: [],
    users: [],
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers : {
        addProviders: (state, action) => {
            action.payload.forEach((provider : User) => {
                const exists = state.serviceProviders.some(p => p._id === provider._id);
                if (!exists) {
                    state.serviceProviders.push(provider);
                }
            })
        },
        addUsers: (state, action) => {
            action.payload.forEach((user : User) => {
                const exists = state.users.some(u => u._id === user._id);
                if (!exists) {
                    state.users.push(user);
                }
            })
        }
    }
});

export const { addProviders, addUsers } = adminSlice.actions;
export default adminSlice.reducer;
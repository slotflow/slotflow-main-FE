import { persistReducer } from "redux-persist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/lib/storage/session";

interface stateVariables {
    loading: boolean;
    selectedServices: number[];
  }
  
  const initialState: stateVariables = {
    loading: false,
    selectedServices: [],
  };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addService: (state, action: PayloadAction<number[]>) => {
            state.selectedServices = action.payload;
          },
    },
    
});

const persistConfig = {
    key: "userSlice",
    storage: sessionStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { addService } = userSlice.actions;

export default persistedUserReducer;
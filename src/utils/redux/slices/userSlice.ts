import { persistReducer } from "redux-persist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

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
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { addService } = userSlice.actions;

export default persistedUserReducer;
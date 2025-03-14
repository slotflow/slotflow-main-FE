import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateVariables {
    selectedServices: number[];
  }
  
  const initialState: stateVariables = {
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

export const { addService } = userSlice.actions;

export default userSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateVariables {
    selectedServices: string[];
  }
  
  const initialState: stateVariables = {
    selectedServices: [],
  };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addService: (state, action: PayloadAction<string[]>) => {
            state.selectedServices = action.payload;
          },
    },
    
});

export const { addService } = userSlice.actions;

export default userSlice.reducer;
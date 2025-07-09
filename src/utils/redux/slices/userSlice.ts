import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateVariables } from "@/utils/interface/sliceInterface";

const initialState: UserStateVariables = {
  selectedServices: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<string[]>) => {
      state.selectedServices = action.payload;
    },
    clearSelection: (state) => {
      state.selectedServices = []
    }
  },

});

export const {
  addService,
  clearSelection
} = userSlice.actions;

export default userSlice.reducer;
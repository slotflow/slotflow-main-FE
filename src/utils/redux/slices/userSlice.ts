import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateVariables } from "@/utils/interface/sliceInterface";

const initialState: UserStateVariables = {
  selectedServices: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<Array<string> | null>) => {
      state.selectedServices = action.payload;
    },
    clearUserSlice: (state) => {
      state.selectedServices = null;
    }
  },

});

export const {
  addService,
  clearUserSlice
} = userSlice.actions;

export default userSlice.reducer;
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
    }
  },

});

export const {
  addService,
} = userSlice.actions;

export default userSlice.reducer;
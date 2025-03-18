import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Availability {
  day: string;
  duration: string;
  startTime: string;
  endTime: string;
  slots: string[];
}

interface ProviderState {
  availabilities: Availability[];
}

const initialState: ProviderState = {
  availabilities: [],
};

const providerSlice = createSlice({
  name: "providerSlice",
  initialState,
  reducers: {
    addAvailability: (state, action: PayloadAction<Availability>) => {
        console.log("Adding availability.");
        const newAvailability = action.payload;
        const existingIndex = state.availabilities.findIndex(
          (item) => item.day === newAvailability.day
        );
  
        if (existingIndex !== -1) {
          state.availabilities.splice(existingIndex, 1);
        }
        console.log("newAvailability : ",newAvailability);
        state.availabilities.push(newAvailability);
      },
  },
});

export const {
  addAvailability,
} = providerSlice.actions;

export default providerSlice.reducer;
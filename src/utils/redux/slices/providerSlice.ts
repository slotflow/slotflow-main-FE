import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Availability {
  day: string;
  duration: string;
  startTime: string;
  endTime: string;
  modes: string[];
  slots: string[];
}


interface ProviderState {
  availabilities: Availability[];
  planId: string | null;
  planPrice: number | null;
  paymentSelectionOpen: boolean;
  paymentPageOpen: boolean;
}

const initialState: ProviderState = {
  availabilities: [],
  planId: null,
  planPrice: null,
  paymentSelectionOpen: false,
  paymentPageOpen: false,
};

const providerSlice = createSlice({
  name: "providerSlice",
  initialState,
  reducers: {
    addAvailability: (state, action: PayloadAction<Availability>) => {
        const newAvailability = action.payload;
        const existingIndex = state.availabilities.findIndex(
          (item) => item.day === newAvailability.day
        );
  
        if (existingIndex !== -1) {
          state.availabilities.splice(existingIndex, 1);
        }
        state.availabilities.push(newAvailability);
      },
      setSubscribingData: (state, action) => {
        state.planId = action.payload.planId;
        state.planPrice = action.payload.planPrice;
      },
      setPaymentSelectionPage: (state, action) => {
        state.paymentSelectionOpen = action.payload;
      },
      setPaymentPageOpen: (state, action) => {
        state.paymentPageOpen = action.payload;
      }
  },
});

export const {
  addAvailability,
  setSubscribingData,
  setPaymentSelectionPage,
  setPaymentPageOpen,
} = providerSlice.actions;

export default providerSlice.reducer;
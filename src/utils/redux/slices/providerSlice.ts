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
  planDuration: string | null;
  paymentSelectionOpen: boolean;
  isTrialPlan: boolean;
  paymentPageOpen: boolean;
}

const initialState: ProviderState = {
  availabilities: [],
  planId: null,
  planDuration: null,
  paymentSelectionOpen: false,
  isTrialPlan: false,
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
      setSubscriptionPlanId: (state, action) => {
        // console.log("planId : ",action.payload);
        state.planId = action.payload;
      },
      setSubscriptionPlanDuration: (state, action) => {
        // console.log("plan duration : ",action.payload);
        state.planDuration = action.payload;
      },
      setSubscriptionIsTrailPlan: (state, action) => {
        // console.log("isTrailPlan : ",action.payload);
        state.isTrialPlan = action.payload;
      },
      setPaymentSelectionPage: (state, action) => {
        // console.log("paymentPage : ",action.payload);
        state.paymentSelectionOpen = action.payload;
      }
  },
});

export const {
  addAvailability,
  setSubscriptionPlanId,
  setSubscriptionPlanDuration,
  setPaymentSelectionPage,
  setSubscriptionIsTrailPlan,
} = providerSlice.actions;

export default providerSlice.reducer;
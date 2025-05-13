import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProviderState } from "@/utils/interface/sliceInterface";
import { Availability } from "@/utils/interface/entityInterface/serviceAvailabilityInterface";

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
        state.planId = action.payload;
      },
      setSubscriptionPlanDuration: (state, action) => {
        state.planDuration = action.payload;
      },
      setSubscriptionIsTrailPlan: (state, action) => {
        state.isTrialPlan = action.payload;
      },
      setPaymentSelectionPage: (state, action) => {
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
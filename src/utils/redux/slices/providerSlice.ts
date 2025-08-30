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
    addAvailability: (state, action: PayloadAction<Availability | null>) => {
      const newAvailability = action.payload;

      if (newAvailability === null) {
        state.availabilities = null;
        return;
      }

      if (state.availabilities === null) {
        state.availabilities = [];
      }

      const existingIndex = state.availabilities.findIndex(
        (item) => item.day === newAvailability.day
      );

      if (existingIndex !== -1) {
        state.availabilities.splice(existingIndex, 1);
      }

      state.availabilities.push(newAvailability);
    },
    setSubscriptionPlanId: (state, action: PayloadAction<string | null>) => {
      state.planId = action.payload;
    },
    setSubscriptionPlanDuration: (state, action: PayloadAction<string | null>) => {
      state.planDuration = action.payload;
    },
    setSubscriptionIsTrailPlan: (state, action: PayloadAction<boolean>) => {
      state.isTrialPlan = action.payload;
    },
    setPaymentSelectionPage: (state, action: PayloadAction<boolean>) => {
      state.paymentSelectionOpen = action.payload;
    },
    clearProviderSlice: (state) => {
      state.availabilities = [];
      state.planId = null;
      state.planDuration = null;
      state.paymentSelectionOpen = false;
      state.isTrialPlan = false;
      state.paymentPageOpen = false;
    }
  },
});

export const {
  addAvailability,
  setSubscriptionPlanId,
  setSubscriptionPlanDuration,
  setPaymentSelectionPage,
  setSubscriptionIsTrailPlan,
  clearProviderSlice,
} = providerSlice.actions;

export default providerSlice.reducer;
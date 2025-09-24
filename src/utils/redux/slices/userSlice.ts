import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateVariables } from "@/utils/interface/sliceInterface";

const initialState: UserStateVariables = {
  selectedServices: null,
  isReviewAddFormOpen: false,
  selectedBookingId: null,
  selectedBookingProviderId: null,
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
    },
    toggleReviewAddForm: (state, action: PayloadAction<{ isOpen: boolean, id: string| null, providerId: string| null }>) => {
      state.isReviewAddFormOpen = action.payload.isOpen;
      state.selectedBookingId = action.payload.id;
      state.selectedBookingProviderId = action.payload.providerId;
    }
  },

});

export const {
  addService,
  clearUserSlice,
  toggleReviewAddForm
} = userSlice.actions;

export default userSlice.reducer;
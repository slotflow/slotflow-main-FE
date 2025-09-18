import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCalendarEvents } from "@/utils/apis/google.api";
import { GoogleCalendarEvent } from "@/utils/interface/commonInterface";
import { fetchCalendarEventsResponse } from "@/utils/interface/api/googleApi.interface";

interface GoogleSliceState {
    calendarEvents: GoogleCalendarEvent[];
    loading: boolean;
    error: string | null;
    googleConnectionLoding: boolean;
}

const initialState: GoogleSliceState = {
    calendarEvents: [],
    loading: false,
    error: null,
    googleConnectionLoding: false,
};

const googleSlice = createSlice({
    name: "googleSlice",
    initialState,
    reducers: {
        setCalendarEvents: (state, action: PayloadAction<GoogleCalendarEvent[]>) => {
            state.calendarEvents = action.payload;
        },
        clearCalendarEvents: (state) => {
            state.calendarEvents = [];
            state.loading = false;
            state.error = null;
        },
        setGoogleConnectionLoading: (state, action: PayloadAction<boolean>) => {
            state.googleConnectionLoding = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendarEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCalendarEvents.fulfilled, (state, action: PayloadAction<fetchCalendarEventsResponse>) => {
                state.loading = false;
                state.calendarEvents = action.payload.data;
                state.error = null;
            })
            .addCase(fetchCalendarEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch calendar events";
            });
    },
});

export const {
    setCalendarEvents,
    clearCalendarEvents,
    setGoogleConnectionLoading
} = googleSlice.actions;
export default googleSlice.reducer;

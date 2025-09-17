import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCalendarEvents } from "@/utils/apis/google.api";
import { fetchCalendarEventsResponse } from "@/utils/interface/api/googleApi.interface";
import { GoogleCalendarEvent } from "@/utils/interface/componentInterface/commonComponentInterface";

interface GoogleSliceState {
    calendarEvents: GoogleCalendarEvent[];
    loading: boolean;
    error: string | null;
}

const initialState: GoogleSliceState = {
    calendarEvents: [],
    loading: false,
    error: null,
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
        },
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
            })
            .addCase(fetchCalendarEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch calendar events";
            });
    },
});

export const {
    setCalendarEvents,
    clearCalendarEvents
} = googleSlice.actions;
export default googleSlice.reducer;

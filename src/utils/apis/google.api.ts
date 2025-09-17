import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCalendarEventsResponse } from "../interface/api/googleApi.interface";

export const fetchCalendarEvents = createAsyncThunk<fetchCalendarEventsResponse>('google/calendar',
    async () => {
        const response = await axiosInstance.get(`/google/calendar`);
        return response.data;
    }
)
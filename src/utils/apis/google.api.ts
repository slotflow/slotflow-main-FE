import { axiosInstance } from "@/lib/axios";
import { BookingFetchingFromCalendar } from "../interface/api/googleApi.interface";

export const fetchCalendarEvents = async (): Promise<BookingFetchingFromCalendar> => {
    const response = await axiosInstance.get(`/google/calendar`);
    return response.data.data;
}

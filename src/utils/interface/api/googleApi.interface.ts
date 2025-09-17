import { ApiBaseResponse } from "../commonInterface";
import { GoogleCalendarEvent } from "../componentInterface/commonComponentInterface";

export interface fetchCalendarEventsResponse extends ApiBaseResponse {
    data: GoogleCalendarEvent[]
}
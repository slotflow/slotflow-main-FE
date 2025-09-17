import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchCalendarEvents } from "@/utils/apis/google.api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppDispatch, RootState } from "@/utils/redux/appStore";

const localizer = momentLocalizer(moment);

const VideoCallPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { calendarEvents, loading, error } = useSelector((state: RootState) => state.google);

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, [dispatch]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Google Calendar</h1>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default VideoCallPage;

import FullCalendar from '@fullcalendar/react';
import { useNavigate } from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid';
import { CreditCard, Unplug } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDispatch, useSelector } from "react-redux";
import GoogleButton from "@/components/form/GoogleButton";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FeatureLocked from "@/components/common/FeatureLocked";
import { fetchCalendarEvents } from "@/utils/apis/google.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { handleConnectGoogle } from "@/utils/helper/googleConnect";

const CalendarPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { calendarEvents, loading, error } = useSelector((state: RootState) => state.google);

    const handleUpgradeSubscription = () => {
        navigate('/provider/subscriptions');
    }

    const canUseCalendar = useMemo(() => {
        if (!authUser) return false;
        if (authUser.role === "PROVIDER") {
            return ["Professional", "Enterprise"].includes(authUser.providerSubscription ?? "");
        }
        return true;
    }, [authUser]);

    useEffect(() => {
        if (!authUser) return;

        if (calendarEvents.length !== 0) return;

        if (authUser.role === "PROVIDER") {
            if (["Professional", "Enterprise"].includes(authUser.providerSubscription ?? "")) {
                dispatch(fetchCalendarEvents());
            }
        } else if (authUser.role === "USER") {
            dispatch(fetchCalendarEvents());
        }
    }, [dispatch, authUser, calendarEvents]);


    if (loading) return <p>Loading events...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 h-full">
            <>
                {!canUseCalendar ? (
                    <FeatureLocked
                        message="Sorry, your current subscription does not include the calendar feature."
                        buttonText="Upgrade Subscription"
                        buttonVariant="outline"
                        onButtonClick={handleUpgradeSubscription}
                        icon={CreditCard}
                    />
                ) : !authUser?.googleConnected ? (
                    <div className="h-full flex flex-col justify-center items-center space-y-3">
                        <Unplug className="text-red-500 size-24" />
                        <h1 className="font-semibold">
                            You are not connected to Google. Please connect your account.
                        </h1>
                        <GoogleButton text='Connect Google' onClick={handleConnectGoogle} className="w-full md:w-3/12" />
                    </div>
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        events={calendarEvents}
                        height="auto"
                    />
                )}
            </>
        </div>
    )
}

export default CalendarPage
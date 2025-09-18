import FullCalendar from '@fullcalendar/react';
import { useNavigate } from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid';
import { CreditCard, Unplug } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDispatch, useSelector } from "react-redux";
import FeatureLocked from "@/components/common/FeatureLocked";
import { fetchCalendarEvents } from "@/utils/apis/google.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import CalendarShimmer from '@/components/shimmers/CalendarShimmer';
import DataFetchingError from '@/components/common/DataFetchingError';

const CalendarPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { calendarEvents, loading, error } = useSelector((state: RootState) => state.google);

    const handleUpgradeSubscription = () => {
        navigate('/provider/subscriptions');
    }
    
    const handleMoveToSettings = () => {
        navigate('/provider/settings');
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
                console.log("before provider")
                if (authUser.googleConnected) {
                    dispatch(fetchCalendarEvents());
                }
            }
        } else if (authUser.role === "USER") {
            console.log("before user")
            dispatch(fetchCalendarEvents());
        }
    }, [dispatch, authUser, calendarEvents]);


    if (loading) return <CalendarShimmer />;
    if (error) {
        return (
            <DataFetchingError message={error} />
        )
    }

    if (!canUseCalendar) {
        return (
            <div className="p-4 h-full">
                <FeatureLocked
                    message="Sorry, your current subscription does not include the calendar feature."
                    buttonText="Upgrade Subscription"
                    buttonVariant="outline"
                    onButtonClick={handleUpgradeSubscription}
                    icon={CreditCard}
                />
            </div>
        )
    }

    if (!authUser?.googleConnected) {
        return (
                <FeatureLocked
                    message="You are not connected to Google. You can connect your account to google in settings."
                    buttonText="Settings"
                    buttonVariant="outline"
                    onButtonClick={handleMoveToSettings}
                    icon={Unplug}
                />
        )
    }

    return (
        <div className="p-4 h-full">
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
        </div>
    )
}

export default CalendarPage
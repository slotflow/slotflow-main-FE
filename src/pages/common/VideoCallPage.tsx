import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import GoogleButton from "@/components/form/GoogleButton";
import CommonTable from "@/components/common/CommonTable";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState, useMemo } from "react";
import { fetchCalendarEvents } from "@/utils/apis/google.api";
import FeatureLocked from "@/components/common/FeatureLocked";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { handleConnectGoogle } from "@/utils/helper/googleConnect";
import { Calendar1, CreditCard, Table, Unplug } from "lucide-react";
import { FetchOnlineBookingsResponse } from "@/utils/interface/api/commonApiInterface";
import { OnlineBookingTableColumn } from "@/components/table/tableColumns/OnlineBookingTableColumn";
import { useProviderAppointmentActions } from "@/utils/hooks/providerHooks/useProviderAppointmentActions";
import { providerFetchBookingAppoinments } from "@/utils/apis/provider.api";

const localizer = momentLocalizer(moment);

const VideoCallPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { calendarEvents, loading, error } = useSelector((state: RootState) => state.google);
  const [tab, setTab] = useState<number>(0);

  const handleUpgradeSubscription = () => {
    navigate('/provider/subscriptions');
  }

  const {
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  } = useProviderAppointmentActions();

  const columns = OnlineBookingTableColumn(
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  );

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, [dispatch]);

  const canUseCalendar = useMemo(() => {
    if (!authUser) return false;
    if (authUser.role === "PROVIDER") {
      return ["Professional", "Enterprise"].includes(authUser.providerSubscription ?? "");
    }
    return true;
  }, [authUser]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 h-full">
      <h1 className="text-xl font-bold mb-4">Online Bookings and Schedules</h1>
      <div className="flex space-x-2 my-4">
        <Button
          className="cursor-pointer border-2"
          variant={tab === 0 ? "default" : "outline"}
          onClick={() => setTab(0)}
        >
          <Table className="mr-2" /> Table
        </Button>

        <Button
          className="cursor-pointer border-2"
          variant={tab === 1 ? "default" : "outline"}
          onClick={() => setTab(1)}
        >
          <Calendar1 className="mr-2" /> Google Calendar
        </Button>
      </div>

      {tab === 0 && (
        <CommonTable<FetchOnlineBookingsResponse>
          fetchApiFunction={(params) =>
            providerFetchBookingAppoinments({ ...params, online: true })
          }
          columnsCount={6}
          column={columns}
          queryKey="onlineBookings"
        />
      )}

      {tab === 1 && (
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
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default VideoCallPage;

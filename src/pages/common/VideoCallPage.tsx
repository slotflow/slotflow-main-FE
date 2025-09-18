import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import CommonTable from "@/components/common/CommonTable";
import { userFetchBookings } from "@/utils/apis/user.api";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { providerFetchBookingAppoinments } from "@/utils/apis/provider.api";
import { useProviderAppointmentActions } from "@/utils/hooks/providerHooks/useProviderAppointmentActions";
import { UserOnlineBookingTableColumn } from "@/components/table/tableColumns/UserOnlineBookingsTableColumn";
import { ProviderOnlineBookingTableColumn } from "@/components/table/tableColumns/ProviderOnlineBookingsTableColumn";
import { FetchOnlineBookingsForProviderResponse, FetchOnlineBookingsForUserResponse } from "@/utils/interface/api/commonApiInterface";

const VideoCallPage: React.FC = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);

  const {
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  } = useProviderAppointmentActions();

  const providerColumns = ProviderOnlineBookingTableColumn(
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  );

  const userColumns = UserOnlineBookingTableColumn(
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  );

  return (
    authUser?.role === "PROVIDER" ? (
      <CommonTable<FetchOnlineBookingsForProviderResponse>
        fetchApiFunction={(params) =>
          providerFetchBookingAppoinments({ ...params, online: true })
        }
        columnsCount={6}
        heading="Online Bookings"
        column={providerColumns}
        queryKey="onlineBookings"
      />
    ) : (
      <CommonTable<FetchOnlineBookingsForUserResponse>
        fetchApiFunction={(params) =>
          userFetchBookings({ ...params, online: true })
        }
        columnsCount={6}
        heading="Online Bookings"
        column={userColumns}
        queryKey="onlineBookings"
      />
    )
  );
};

export default VideoCallPage;

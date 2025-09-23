import { userFetchBookings } from "@/utils/apis/user.api";
import CommonTable from "@/components/common/CommonTable";
import { FetchBookingsResponse } from "@/utils/interface/api/commonApiInterface";
import { useUserBookingActions } from "@/utils/hooks/userHooks/useUserBookingActions";
import { UserBookingsTableColumns } from "@/components/table/tableColumns/UserBookingsTableColumn";

const UserBookingsPage = () => {

    const { 
        handleUserCancelBooking, 
        handleUserJoinCall, 
        handleNavigateToBookingDetailPage 
    } = useUserBookingActions();
    const columns = UserBookingsTableColumns(
        handleUserCancelBooking, 
        handleUserJoinCall, 
        handleNavigateToBookingDetailPage
    );

    return (
        <CommonTable<FetchBookingsResponse>
            fetchApiFunction={userFetchBookings}
            queryKey='bookings'
            heading='Booking History'
            column={columns}
            columnsCount={6}
        />
    );
}

export default UserBookingsPage
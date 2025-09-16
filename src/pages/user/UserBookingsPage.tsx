import { userFetchBookings } from "@/utils/apis/user.api";
import CommonTable from "@/components/common/CommonTable";
import { FetchBookingsResponse } from "@/utils/interface/api/commonApiInterface";
import { useUserBookingActions } from "@/utils/hooks/userHooks/useUserBookingActions";
import { UserBookingsTableColumns } from "@/components/table/tableColumns/userBookingsTableColumns";

const UserBookingsPage = () => {

    const { handleUserCancelBooking, handleNavigateToBookingDetailPage } = useUserBookingActions();
    const columns = UserBookingsTableColumns(handleUserCancelBooking, handleNavigateToBookingDetailPage);

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
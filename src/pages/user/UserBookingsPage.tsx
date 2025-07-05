import { userFetchBookings } from "@/utils/apis/user.api";
import CommonTable from "@/components/common/CommonTable";
import { UserFetchBookingsResponse } from "@/utils/interface/api/userApiInterface";
import { userAllBookingsTableColumns } from "@/components/table/tableColumns/userTableColumns";

const UserBookingsPage = () => {
    return (
        <CommonTable<UserFetchBookingsResponse>
            fetchApiFunction={userFetchBookings}
            queryKey='bookings'
            heading='Booking History'
            column={userAllBookingsTableColumns}
            columnsCount={6}
        />
    );
}

export default UserBookingsPage
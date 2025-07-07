import { userFetchBookings } from "@/utils/apis/user.api";
import CommonTable from "@/components/common/CommonTable";
import { FetchBookingsResponse } from "@/utils/interface/api/commonApiInterface";
import { userAllBookingsTableColumns } from "@/components/table/tableColumns/userTableColumns";

const UserBookingsPage = () => {
    return (
        <CommonTable<FetchBookingsResponse>
            fetchApiFunction={userFetchBookings}
            queryKey='bookings'
            heading='Booking History'
            column={userAllBookingsTableColumns}
            columnsCount={6}
        />
    );
}

export default UserBookingsPage
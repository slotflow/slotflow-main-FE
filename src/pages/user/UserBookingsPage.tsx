import { userFetchBookings } from "@/utils/apis/user.api";
import CommonTable from "@/components/common/CommonTable";
import { UserBookingsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { UserFetchBookingsApiResponse } from "@/utils/interface/api/userApiInterface";
import { userAllBookingsTableColumns } from "@/components/table/tableColumns/userTableColumns";

const UserBookingsPage = () => {
    return (
        <CommonTable<UserFetchBookingsApiResponse, UserBookingsTableColumnsProps>
            fetchApiFunction={userFetchBookings}
            queryKey='bookings'
            heading='Booking History'
            column={userAllBookingsTableColumns}
            columnsCount={6}
        />
    );
}

export default UserBookingsPage
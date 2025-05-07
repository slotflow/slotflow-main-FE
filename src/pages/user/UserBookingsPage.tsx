import { userFetchBookings } from "@/utils/apis/user.api";
import CommonTable from "@/components/common/CommonTable";
import { userAllBookingsTableColumns } from "@/components/table/userTableColumns";
import { UserBookingsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { UserFetchBookingsResponseProps } from "@/utils/interface/api/userApiInterface";

const UserBookingsPage = () => {
    return (
        <CommonTable<UserFetchBookingsResponseProps, UserBookingsTableColumnsProps>
            fetchApiFunction={userFetchBookings}
            queryKey='bookings'
            heading='Booking History'
            column={userAllBookingsTableColumns}
            columnsCount={6}
        />
    );
}

export default UserBookingsPage
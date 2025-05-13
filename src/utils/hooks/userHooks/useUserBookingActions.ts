import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { userCancelBooking } from "@/utils/apis/user.api";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { UserBookingsTableColumnsProps } from "@/utils/interface/tableColumnInterface";

interface UseUserBookingActionsCustomHookReturnType {
    handleUserCancelBooking: (bookingId: Booking["_id"]) => void;
}

export const useUserBookingActions = (): UseUserBookingActionsCustomHookReturnType => {

    const queryClient = useQueryClient();

    const handleUserCancelBooking = (bookingId: Booking["_id"]) => {
        userCancelBooking(bookingId)
            .then((res) => {
                queryClient.setQueryData(
                    ["bookings"],
                    (oldData: UserBookingsTableColumnsProps[] | []) => {
                        if (!oldData) return [];
                        return oldData.map((booking) =>
                            booking._id === res.updatedBooking._id ? res.updatedBooking : booking
                        );
                    }
                );
                toast.success(res.message);
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    return { handleUserCancelBooking }
}
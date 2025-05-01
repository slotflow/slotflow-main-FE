import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { UserCancelBooking } from "@/utils/apis/user.api";
import { UserBookingsTableColumnsProps } from "@/utils/interface/tableColumnInterface";

export const useUserBookingActions = () => {
    const queryClient = useQueryClient();

    const handleCancelBooking = (bookingId: string) => {
        UserCancelBooking(bookingId)
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

    return { handleCancelBooking }
}
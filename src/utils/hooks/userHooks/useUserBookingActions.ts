import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { userCancelBooking } from "@/utils/apis/user.api";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";

interface UseUserBookingActionsCustomHookReturnType {
    handleUserCancelBooking: (bookingId: Booking["_id"]) => void;
}

export const useUserBookingActions = (): UseUserBookingActionsCustomHookReturnType => {

    const queryClient = useQueryClient();

    const handleUserCancelBooking = (bookingId: Booking["_id"]) => {
        userCancelBooking(bookingId)
            .then((res) => {
                queryClient.invalidateQueries({ queryKey: ["bookings"] });
                toast.success(res.message);
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    return { handleUserCancelBooking }
}
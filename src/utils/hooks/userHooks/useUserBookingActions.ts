import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { userCancelBooking } from "@/utils/apis/user.api";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";

interface UseUserBookingActionsCustomHookReturnType {
    handleUserCancelBooking: (bookingId: Booking["_id"]) => void;
    handleNavigateToBookingDetailPage: (bookingId: Booking["_id"]) => void;
}

export const useUserBookingActions = (): UseUserBookingActionsCustomHookReturnType => {

    const navigate = useNavigate();
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

    const handleNavigateToBookingDetailPage = (bookingId: Booking["_id"]) => {
        navigate(`/user/bookings/${bookingId}`)
    }

    return { handleUserCancelBooking, handleNavigateToBookingDetailPage }
}
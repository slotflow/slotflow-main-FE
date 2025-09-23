import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { userCancelBooking, userValidateRoomId } from "@/utils/apis/user.api";
import { connectVideoSocket } from "@/utils/apis/video.api";
import { ValidateRoomId } from "@/utils/interface/api/commonApiInterface";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";

interface UseUserBookingActionsCustomHookReturnType {
    handleUserCancelBooking: (bookingId: Booking["_id"]) => void;
    handleUserJoinCall: (data: ValidateRoomId) => void;
    handleNavigateToBookingDetailPage: (bookingId: Booking["_id"]) => void;
}

export const useUserBookingActions = (): UseUserBookingActionsCustomHookReturnType => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();

    const handleUserCancelBooking = (bookingId: Booking["_id"]) => {
        userCancelBooking(bookingId)
            .then((res) => {
                if(res.success) {
                    queryClient.invalidateQueries({ queryKey: ["bookings"] });
                    toast.success(res.message);
                }
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    const handleUserJoinCall = async ({ appointmentId, roomId }: ValidateRoomId) => {
        console.log("User room join validating ")
            await userValidateRoomId({appointmentId, roomId})
            .then((res) => {
                console.log("response :",res);
                if(res.success) {
                    navigate(`/user/video-call-lobby/${roomId}`);
                    dispatch(connectVideoSocket());
                }
            })
            .catch(() => {
                toast.error("Invalid Request, please try again after sometimes.");
            })
        };

    const handleNavigateToBookingDetailPage = (bookingId: Booking["_id"]) => {
        navigate(`/user/bookings/${bookingId}`)
    }

    return { handleUserCancelBooking, handleUserJoinCall, handleNavigateToBookingDetailPage }
}
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUserBookingActions } from "@/utils/hooks/userHooks/useUserBookingActions";
import { UserCancelBookingProps } from "@/utils/interface/userInterface";

export const UserCancelBooking: React.FC<UserCancelBookingProps> = ({ bookingId }) => {

    const { handleCancelBooking } = useUserBookingActions();
    
    const userHandleCancelBooking = () => {
        handleCancelBooking(bookingId);
    }
    
    return (
        <DropdownMenuItem onClick={userHandleCancelBooking}>
            Cancel
        </DropdownMenuItem>
    );
};

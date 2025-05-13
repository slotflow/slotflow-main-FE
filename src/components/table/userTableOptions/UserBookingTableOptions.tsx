import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { useUserBookingActions } from "@/utils/hooks/userHooks/useUserBookingActions";

export type DropDownMenuItemUserCancelBookingComponentProps = {
    bookingId : Booking["_id"];
}

export const DropDownMenuItemUserCancelBooking: React.FC<DropDownMenuItemUserCancelBookingComponentProps> = ({ bookingId }) => {

    const { handleUserCancelBooking } = useUserBookingActions();
    
    const userHandleCancelBooking = () => {
        handleUserCancelBooking(bookingId);
    }
    
    return (
        <DropdownMenuItem onClick={userHandleCancelBooking}>
            Cancel
        </DropdownMenuItem>
    );
};

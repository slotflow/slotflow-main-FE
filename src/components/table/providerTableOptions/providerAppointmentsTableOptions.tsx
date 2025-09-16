import { memo } from "react";
import { toast } from "react-toastify";
import { Check, ReceiptText, VideoIcon, X } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { providerValidateRoomId } from "@/utils/apis/provider.api";
import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";
import { useProviderAppointmentActions } from "@/utils/hooks/providerHooks/useProviderAppointmentActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { connectVideoSocket } from "@/utils/apis/video.api";
import { useNavigate } from "react-router-dom";

interface DropDownMenuItemUpdateAppointmentStatusProps extends ProviderChangeAppointmentStatusRequest {
    text: string;
}

interface DropDownMenuItemJoinCallProps {
    text: string;
    bookingId: string;
    roomId: string;
}

interface DropDownMenuItemDetailsProps {
    text: string;
}

export const DropDownMenuItemUpdateAppointmentStatus: React.FC<DropDownMenuItemUpdateAppointmentStatusProps> = memo(({ appointmentId, appointmentStatus, text }) => {

    const { handleChangeAppointmentStatus } = useProviderAppointmentActions()

    return (
        <DropdownMenuItem
            onClick={() => handleChangeAppointmentStatus({ appointmentId, appointmentStatus })}
            className="flex items-center gap-2"
        >
            {text === "Confirm" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span>{text}</span>
        </DropdownMenuItem>
    )
});

export const DropDownMenuItemJoinCall: React.FC<DropDownMenuItemJoinCallProps> = memo(({ text, bookingId, roomId }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleJoinCall = async (bookingId: string,roomId: string) => {
        await providerValidateRoomId({_id: bookingId, videoCallRoomId: roomId})
        .then((res) => {
            if(res.success) {
                navigate(`/provider/video-call-lobby/${roomId}`);
                dispatch(connectVideoSocket());
            }
        })
        .catch(() => {
            toast.error("Invalid Request, please try again after sometimes.");
        })
    };

    return (
        <DropdownMenuItem
            onClick={() => handleJoinCall(bookingId,roomId)}
            className="flex items-center gap-2"
        >
            <VideoIcon />{text}
        </DropdownMenuItem>
    )
});

export const DropDownMenuItemDetails: React.FC<DropDownMenuItemDetailsProps> = memo(({ text }) => {

    // const { handleChangeAppointmentStatus } = useProviderAppointmentActions()

    return (
        <DropdownMenuItem
            className="flex items-center gap-2"
        >
            <ReceiptText />{text}
        </DropdownMenuItem>
    )
});



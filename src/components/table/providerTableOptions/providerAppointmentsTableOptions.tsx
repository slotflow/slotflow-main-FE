import { memo } from "react";
import { Check, ReceiptText, VideoIcon, X } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";
import { useProviderAppointmentActions } from "@/utils/hooks/providerHooks/useProviderAppointmentActions";

interface DropDownMenuItemUpdateAppointmentStatusProps extends ProviderChangeAppointmentStatusRequest {
    text: string;
}

interface DropDownMenuItemJoinCallProps {
    text: string;
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

export const DropDownMenuItemJoinCall: React.FC<DropDownMenuItemJoinCallProps> = memo(({ text, roomId }) => {

    const handleJoinCall = (roomId: string) => {
        window.open(`/video-call/${roomId}`, "_blank");
    };

    return (
        <DropdownMenuItem
            onClick={() => handleJoinCall(roomId)}
            className="flex items-center gap-2"
        >
            <VideoIcon />{text}
        </DropdownMenuItem>
    )
})

export const DropDownMenuItemDetails: React.FC<DropDownMenuItemDetailsProps> = memo(({ text }) => {

    // const { handleChangeAppointmentStatus } = useProviderAppointmentActions()

    return (
        <DropdownMenuItem
            className="flex items-center gap-2"
        >
            <ReceiptText />{text}
        </DropdownMenuItem>
    )
})



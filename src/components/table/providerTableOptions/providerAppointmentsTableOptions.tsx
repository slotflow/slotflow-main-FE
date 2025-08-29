import { memo } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";
import { useProviderAppointmentActions } from "@/utils/hooks/providerHooks/useProviderAppointmentActions";

interface DropDownMenuItemUpdateAppointmentStatusProps extends ProviderChangeAppointmentStatusRequest {
    text: string;
}

export const DropDownMenuItemUpdateAppointmentStatus: React.FC<DropDownMenuItemUpdateAppointmentStatusProps> = memo(({ appointmentId, appointmentStatus, text }) => {

    const { handleChangeAppointmentStatus } = useProviderAppointmentActions()

    return (
        <DropdownMenuItem onClick={() => handleChangeAppointmentStatus({ appointmentId, appointmentStatus })}>
            {text}
        </DropdownMenuItem>
    )
})
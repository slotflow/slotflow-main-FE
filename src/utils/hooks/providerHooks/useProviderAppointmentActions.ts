import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { providerChangeAppointmentStatus } from "@/utils/apis/provider.api";
import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";

export const useProviderAppointmentActions = () => {
    const queryClient = useQueryClient();

    const handleChangeAppointmentStatus = ({ appointmentId, appointmentStatus }: ProviderChangeAppointmentStatusRequest) => {
        providerChangeAppointmentStatus({ appointmentId, appointmentStatus })
            .then((res) => {
                queryClient.invalidateQueries({ queryKey: ["appointments"] });
                toast.success(res.message);
            })
            .catch(() => {
                toast.error("Please try again");
            });
    }

    return { handleChangeAppointmentStatus }
}
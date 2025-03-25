import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAdminPlanActions } from "@/utils/hooks/useAdminPlanActions";
import { AdminChangePlanStatusRequestPayload } from "@/utils/interface/api/adminPlanApiInterface";

export const ChangePlanBlockStatus: React.FC<AdminChangePlanStatusRequestPayload> = ({ planId, status }) => {
    
    const { handleChangePlanStatus } = useAdminPlanActions();

    const handlePlanBlockStatus = (): void => {
        handleChangePlanStatus(planId, !status);
    }

    return(
        <DropdownMenuItem onClick={handlePlanBlockStatus}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    )
}
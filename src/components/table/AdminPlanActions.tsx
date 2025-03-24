import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAdminPlanActions } from "@/utils/hooks/useAdminPlanActions";
import { ChangePlanBlockStatusProps } from "@/utils/interface/adminInterface";

export const ChangePlanBlockStatus: React.FC<ChangePlanBlockStatusProps> = ({ planId, status }) => {
    
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
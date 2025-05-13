import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { Plan } from "@/utils/interface/entityInterface/planInterface";
import { useAdminPlanActions } from "@/utils/hooks/adminHooks/useAdminPlanActions";

type DropDownItemChangePlanBlockStatusComponentProps = {
    planId: Plan["_id"];
    isBlocked: Plan["isBlocked"];
}

export const DropDownItemChangePlanBlockStatus: React.FC<DropDownItemChangePlanBlockStatusComponentProps> = ({ planId, isBlocked }) => {
    
    const { handleAdminChangePlanStatus } = useAdminPlanActions();

    const handlePlanBlockStatus = (): void => {
        handleAdminChangePlanStatus({planId, isBlocked: !isBlocked});
    }

    return(
        <DropdownMenuItem onClick={handlePlanBlockStatus}>
            {isBlocked ? "Unblock" : "Block"}
        </DropdownMenuItem>
    )
}
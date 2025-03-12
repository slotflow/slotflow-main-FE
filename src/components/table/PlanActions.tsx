import { useAdminPlanActions } from "@/utils/hooks/useAdminPlanActions";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface BlockPlanProps {
    planId: string,
    status: boolean,
}

export const BlockPlan: React.FC<BlockPlanProps> = ({ planId, status }) => {
    
    const { handleChangePlanStatus } = useAdminPlanActions();

    const handlePlanBlockStatus = () => {
        handleChangePlanStatus(planId, !status);
    }

    return(
        <DropdownMenuItem onClick={handlePlanBlockStatus}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    )
}
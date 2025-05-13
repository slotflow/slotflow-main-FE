import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { Service } from "@/utils/interface/entityInterface/appServiceInterface";
import { useAdminServiceActions } from "@/utils/hooks/adminHooks/useAdminServiceActions";

type DropDownItemChangeServiceBlockStatusComponentProps = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}

export const DropDownItemChangeServiceBlockStatus: React.FC<DropDownItemChangeServiceBlockStatusComponentProps> = ({ serviceId, isBlocked }) => {
    
    const { handleAdminChangeServiceStatus } = useAdminServiceActions();

    const handleServiceBlockStatus = () => {
        handleAdminChangeServiceStatus({serviceId, isBlocked: !isBlocked});
    }

    return(
        <DropdownMenuItem onClick={handleServiceBlockStatus}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    )
}
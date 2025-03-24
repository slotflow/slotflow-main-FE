import { DropdownMenuItem } from "../ui/dropdown-menu";
import { ChangeServiceBlockStatusProps } from "@/utils/interface/adminInterface";
import { useAdminServiceActions } from "@/utils/hooks/useAdminServiceActions";

export const ChangeServiceBlockStatus: React.FC<ChangeServiceBlockStatusProps> = ({ serviceId, status }) => {
    
    const { handleChangeServiceStatus } = useAdminServiceActions();

    const handleServiceBlockStatus = () => {
        handleChangeServiceStatus(serviceId, !status);
    }

    return(
        <DropdownMenuItem onClick={handleServiceBlockStatus}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    )
}
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAdminServiceActions } from "@/utils/hooks/useAdminServiceActions";

interface BlockServiceProps {
    serviceId: string,
    status: boolean,
}

export const BlockService: React.FC<BlockServiceProps> = ({ serviceId, status }) => {
    
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
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { ChangeUserStatusProps } from "@/utils/interface/adminInterface";
import { useAdminUserActions } from "@/utils/hooks/useAdminUserActions";

export const ChangeUserStatus: React.FC<ChangeUserStatusProps> = ({ userId, status }) => {
    const { handleChangeUserBlockStatus } = useAdminUserActions();
    
    const handleStatusChangeClick = () => {
        handleChangeUserBlockStatus(userId, !status)
    }
    
    return (
        <DropdownMenuItem onClick={handleStatusChangeClick}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    );
};

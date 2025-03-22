import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAdminUserActions } from "@/utils/hooks/useAdminUserActions";

interface ChangeUserStatusProps {
    userId: string;
    status: boolean;
}

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

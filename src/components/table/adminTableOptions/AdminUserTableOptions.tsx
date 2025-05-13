import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { User } from "@/utils/interface/entityInterface/userInterface";
import { useAdminUserActions } from "@/utils/hooks/adminHooks/useAdminUserActions";

type DropDownItemChangeUserStatusComponentProps = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}

export const DropDownItemChangeUserStatus: React.FC<DropDownItemChangeUserStatusComponentProps> = ({ userId, isBlocked }) => {
    const { handleAdminChangeUserBlockStatus } = useAdminUserActions();
    
    const handleStatusChangeClick = () => {
        handleAdminChangeUserBlockStatus({userId, isBlocked :!isBlocked});
    }
    
    return (
        <DropdownMenuItem onClick={handleStatusChangeClick}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    );
};

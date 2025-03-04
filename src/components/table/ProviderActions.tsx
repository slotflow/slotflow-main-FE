import { useProviderActions } from "@/utils/hooks/useAdminActions";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface ApproveProviderItemProps {
    providerId: string;
}

interface ChangeProviderStatusProps {
    providerId: string;
    status: boolean;
}

export const ApproveProvider: React.FC<ApproveProviderItemProps> = ({ providerId }) => {
    const { handleApprove } = useProviderActions();
    const hanldeApproveClick = () => {
        handleApprove(providerId);
    }
    
    return (
        <DropdownMenuItem onClick={hanldeApproveClick}>
            Approve
        </DropdownMenuItem>
    );
};

export const ChangeProviderStatus: React.FC<ChangeProviderStatusProps> = ({ providerId, status }) => {
    const { hanldeChangeStatus } = useProviderActions();
    
    const handleStatusChangeClick = () => {
        hanldeChangeStatus(providerId, !status)
    }
    
    return (
        <DropdownMenuItem onClick={handleStatusChangeClick}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    );
};

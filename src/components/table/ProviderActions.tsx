import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAdminProviderActions } from "@/utils/hooks/useAdminProviderActions";

interface ApproveProviderItemProps {
    providerId: string;
}

interface ChangeProviderStatusProps {
    providerId: string;
    status: boolean;
}

export const ApproveProvider: React.FC<ApproveProviderItemProps> = ({ providerId }) => {
    const { handleApproveProvider } = useAdminProviderActions();
    const hanldeApproveClick = () => {
        handleApproveProvider(providerId);
    }
    
    return (
        <DropdownMenuItem onClick={hanldeApproveClick}>
            Approve
        </DropdownMenuItem>
    );
};

export const ChangeProviderStatus: React.FC<ChangeProviderStatusProps> = ({ providerId, status }) => {
    const { hanldeChangeProviderBlockStatus } = useAdminProviderActions();
    
    const handleStatusChangeClick = () => {
        hanldeChangeProviderBlockStatus(providerId, !status)
    }
    
    return (
        <DropdownMenuItem onClick={handleStatusChangeClick}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    );
};

import { useProviderActions } from "@/utils/hooks/useAdminActions";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface ApproveProviderItemProps {
    providerId: string;
    status?: boolean;    
}

export const ApproveProvider: React.FC<ApproveProviderItemProps> = ({ providerId }) => {
    const { handleApprove } = useProviderActions();
    const hanldeApproveConfirmation = () => {
        handleApprove(providerId);
    }
    
    return (
        <DropdownMenuItem onClick={hanldeApproveConfirmation}>
            Approve
        </DropdownMenuItem>
    );
};

export const ChangeProviderStatus: React.FC<ApproveProviderItemProps> = ({ providerId, status }) => {
    const { hanldeChngeStatus } = useProviderActions();
    
    const hanldeApproveConfirmation = () => {
        hanldeChngeStatus(providerId, !status)
    }
    
    return (
        <DropdownMenuItem onClick={hanldeApproveConfirmation}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    );
};

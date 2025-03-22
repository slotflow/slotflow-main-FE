import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAdminProviderActions } from "@/utils/hooks/useAdminProviderActions";
import { memo } from "react";

interface ProviderCommonProps {
    providerId: string;
}

interface ChangeProviderStatusProps {
    providerId: string;
    status: boolean;
}

export const ApproveProvider: React.FC<ProviderCommonProps> = memo(({ providerId }) => {
    const { handleApproveProvider } = useAdminProviderActions();
    const hanldeApproveClick = () => {
        handleApproveProvider(providerId);
    }
    
    return (
        <DropdownMenuItem onClick={hanldeApproveClick}>
            Approve
        </DropdownMenuItem>
    );
});

export const ChangeProviderStatus: React.FC<ChangeProviderStatusProps> = memo(({ providerId, status }) => {
    const { hanldeChangeProviderBlockStatus } = useAdminProviderActions();
    
    const handleStatusChangeClick = () => {
        hanldeChangeProviderBlockStatus(providerId, !status)
    }
    
    return (
        <DropdownMenuItem onClick={handleStatusChangeClick}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    );
});

export const GetProviderDetailPage: React.FC<ProviderCommonProps> = memo(({ providerId }) => {
    const navigate = useNavigate();

    const handleGetProviderDetailPage = () => {
        navigate(`/admin/service-provider/${providerId}`)
    }

    return(
        <DropdownMenuItem onClick={handleGetProviderDetailPage}>
            Details
        </DropdownMenuItem>
    )
})

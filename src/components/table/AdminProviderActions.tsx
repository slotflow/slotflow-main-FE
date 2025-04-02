import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useAdminProviderActions } from "@/utils/hooks/useAdminProviderActions";
import { ChangeProviderBlockStatusProps, ChangeProviderTrustTagProps, ProviderCommonProps } from "@/utils/interface/adminInterface";

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

export const ChangeProviderBlockStatus: React.FC<ChangeProviderBlockStatusProps> = memo(({ providerId, status }) => {
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

export const ChangeProviderTrustTag: React.FC<ChangeProviderTrustTagProps> = memo(({ providerId, trustedBySlotflow }) => {
    const { hanldeProviderTrustTag } = useAdminProviderActions();
    
    const handleProviderTrustTagChangeClick = () => {
        hanldeProviderTrustTag(providerId, !trustedBySlotflow)
    }
    
    return (
        <DropdownMenuItem onClick={handleProviderTrustTagChangeClick}>
            {trustedBySlotflow ? "Remove Tag" : "Give Tag"}
        </DropdownMenuItem>
    );
});

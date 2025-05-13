import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { Provider } from "@/utils/interface/entityInterface/providerInterface";
import { useAdminProviderActions } from "@/utils/hooks/adminHooks/useAdminProviderActions";

type DropDownItemApproveProviderComponentProps = {
    providerId : Provider["_id"];
}

type DropDownItemChangeProviderBlockStatusComponentProps = {
    providerId: Provider["_id"];
    isBlocked: Provider["isBlocked"];
}

type DropDownItemGetProviderDetailPageComponentProps = {
    providerId : Provider["_id"];
}

type DropDownItemChangeProviderTrustTagComponentProps = {
    providerId: Provider["_id"];
    trustedBySlotflow: Provider["trustedBySlotflow"];
}

export const DropDownItemApproveProvider: React.FC<DropDownItemApproveProviderComponentProps> = memo(({ providerId }) => {
    const { handleAdminApproveProvider } = useAdminProviderActions();
    const hanldeApproveClick = () => {
        handleAdminApproveProvider({providerId});
    }
    
    return (
        <DropdownMenuItem onClick={hanldeApproveClick}>
            Approve
        </DropdownMenuItem>
    );
});

export const DropDownItemChangeProviderBlockStatus: React.FC<DropDownItemChangeProviderBlockStatusComponentProps> = memo(({ providerId, isBlocked }) => {
    const { hanldeAdminChangeProviderBlockStatus } = useAdminProviderActions();
    
    const handleStatusChangeClick = () => {
        hanldeAdminChangeProviderBlockStatus({providerId, isBlocked: !isBlocked})
    }
    
    return (
        <DropdownMenuItem onClick={handleStatusChangeClick}>
            {isBlocked ? "Unblock" : "Block"}
        </DropdownMenuItem>
    );
});

export const DropDownItemGetProviderDetailPage: React.FC<DropDownItemGetProviderDetailPageComponentProps> = memo(({ providerId }) => {
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

export const DropDownItemChangeProviderTrustTag: React.FC<DropDownItemChangeProviderTrustTagComponentProps> = memo(({ providerId, trustedBySlotflow }) => {
    const { hanldeAdminChangeProviderSlotflowTrustTag } = useAdminProviderActions();
    
    const handleProviderTrustTagChangeClick = () => {
        hanldeAdminChangeProviderSlotflowTrustTag({providerId, trustedBySlotflow: !trustedBySlotflow})
    }
    
    return (
        <DropdownMenuItem onClick={handleProviderTrustTagChangeClick}>
            {trustedBySlotflow ? "Remove Tag" : "Give Tag"}
        </DropdownMenuItem>
    );
});

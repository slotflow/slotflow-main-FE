import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";

type DropDownMenuItemGetSubscriptionDetailsComponentProps = {
    subscriptionId: Subscription["_id"];
}

export const DropDownMenuItemGetSubscriptionDetails: React.FC<DropDownMenuItemGetSubscriptionDetailsComponentProps> = memo(({ subscriptionId }) => {
    const navigate = useNavigate();

    const handleAdminGetProviderDetailPage = () => {
        navigate(`/admin/subscription/${subscriptionId}`)
    }

    return(
        <DropdownMenuItem onClick={handleAdminGetProviderDetailPage}>
            Details
        </DropdownMenuItem>
    )
})
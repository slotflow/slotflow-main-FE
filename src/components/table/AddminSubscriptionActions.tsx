import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export const GetSubscriptionDetails: React.FC<{subscriptionId: string}> = memo(({ subscriptionId }) => {
    const navigate = useNavigate();

    const handleGetProviderDetailPage = () => {
        navigate(`/admin/subscription/${subscriptionId}`)
    }

    return(
        <DropdownMenuItem onClick={handleGetProviderDetailPage}>
            Details
        </DropdownMenuItem>
    )
})
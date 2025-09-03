import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";

type DropDownMenuItemGetSubscriptionDetailsComponentProps = {
    subscriptionId: Subscription["_id"];
}

export const DropDownMenuItemGetSubscriptionDetails: React.FC<DropDownMenuItemGetSubscriptionDetailsComponentProps> = memo(({ subscriptionId }) => {
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleAdminGetProviderDetailPage = () => {
        if(authUser?.role === "ADMIN") {
            navigate(`/admin/subscription/${subscriptionId}`)
        } else if (authUser?.role === "PROVIDER") {
            navigate(`/provider/subscription/${subscriptionId}`)
        }
    }

    return(
        <DropdownMenuItem onClick={handleAdminGetProviderDetailPage}>
            Details
        </DropdownMenuItem>
    )
})
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";

interface UseCommonHookInterface {
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void;
}
export const useCommonHook = (): UseCommonHookInterface => {

    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const handleAdminGetProviderDetailPage = (subscriptionId: Subscription["_id"]) => {
        if (authUser?.role === "ADMIN") {
            navigate(`/admin/subscription/${subscriptionId}`)
        } else if (authUser?.role === "PROVIDER") {
            navigate(`/provider/subscription/${subscriptionId}`)
        }
    }

    return { handleAdminGetProviderDetailPage }
}
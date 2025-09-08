import SubscriptionDetailViewPage from "../common/SubscriptionDetailViewPage";
import { adminFetchSubscriptionDetails } from "@/utils/apis/adminSubscription.api";

const AdminSubcriptionDetailedViewPage = () => {

    return (
        <SubscriptionDetailViewPage queryFunction={adminFetchSubscriptionDetails} />
    )
}

export default AdminSubcriptionDetailedViewPage
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import CommonButton from "@/components/common/CommonButton";
import ProviderPlanList from "@/components/provider/ProviderPlanList";
import CommonPaymentSelection from "@/components/common/CommonPaymentSelection";
import ProviderFreeSubscription from "@/components/provider/ProviderFreeSubscription";
import ProviderSubscriptionHistory from "@/components/provider/ProviderSubscriptionHistory";

const ProviderSubscriptionPage = () => {

    const [showPlans, setShowPlans] = useState<boolean>(false);
    const { planId, planDuration, isTrialPlan, paymentSelectionOpen } = useSelector((store: RootState) => store.provider);

    return (
        <div className="">
            <ProviderSubscriptionHistory />
            {paymentSelectionOpen && planId && planDuration && (
                <CommonPaymentSelection
                    data={{
                        planId: planId,
                        planDuration: planDuration,
                    }}
                    isProviderSubscription
                />
            )}

            <CommonButton onClick={() => setShowPlans(!showPlans)} text={showPlans ? "Hide Plans" : "Show Plans"} />
            <ProviderPlanList
                showPlans={showPlans}
            />

            {isTrialPlan && paymentSelectionOpen && (
                <ProviderFreeSubscription />
            )}
        </div>
    );
};

export default ProviderSubscriptionPage;

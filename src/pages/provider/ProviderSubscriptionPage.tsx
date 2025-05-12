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
    const [openPayment, setOpenPayment] = useState<boolean>(false);

    const { planId, planDuration, isTrialPlan, paymentSelectionOpen } = useSelector((state: RootState) => state.provider);

    console.log("Plan ID:", planId);
    console.log("Plan Duration:", planDuration);
    console.log("Is Trial Plan:", isTrialPlan);
    console.log("Payment Selection Open:", paymentSelectionOpen);

    return (
        <>
            <CommonButton onClick={() => setShowPlans(!showPlans)} text={showPlans ? "Hide Plans" : "Show Plans"} />
            <ProviderPlanList
                showPlans={showPlans}
            />
            <ProviderSubscriptionHistory />
            {openPayment && planId && planDuration && (
                <CommonPaymentSelection
                    setOpenPayment={setOpenPayment}
                    data={{
                        planId: planId,
                        planDuration: planDuration,
                    }}
                    isProviderSubscription
                />
            )}

            {isTrialPlan && paymentSelectionOpen && (
                <ProviderFreeSubscription />
            )}
        </>
    );
};

export default ProviderSubscriptionPage;

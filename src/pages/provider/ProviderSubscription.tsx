import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import PlanList from "@/components/provider/PlanList";
import CommonButton from "@/components/common/CommonButton";
import PaymentSelection from "@/components/provider/PaymentSelection";
import SubscriptionHistory from "@/components/provider/SubscriptionHistory";
import { setPaymentSelectionPage, setSubscribingData } from "@/utils/redux/slices/providerSlice";

const ProviderSubscription = () => {
    const dispatch = useDispatch<AppDispatch>();
    const paymentSelectionRef = useRef<HTMLDivElement | null>(null);
    const plansRef = useRef<HTMLDivElement | null>(null);
    const [showPlans, setShowPlans] = useState<boolean>(false);

    const storeSubscribingData = (planId: string, planPrice: number) => {
        dispatch(setSubscribingData({planId, planPrice}));
        dispatch(setPaymentSelectionPage(true));
    };

    return (
        <div>
            <div className="px-6">
                <CommonButton onClick={() => setShowPlans(!showPlans)} text={showPlans ? "Hide Plans" : "Show Plans"} />
            </div>
            <PlanList storeSubscribingData={storeSubscribingData} showPlans={showPlans} plansRef={plansRef as React.RefObject<HTMLDivElement>} />
            <SubscriptionHistory />
            <PaymentSelection paymentSelectionRef={paymentSelectionRef as React.RefObject<HTMLDivElement>} />
        </div>
    );
};

export default ProviderSubscription;

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
        dispatch(setSubscribingData({ planId, planPrice }));
        dispatch(setPaymentSelectionPage(true));
    };

    return (
        <>
            <CommonButton onClick={() => setShowPlans(!showPlans)} text={showPlans ? "Hide Plans" : "Show Plans"} />
            <PlanList storeSubscribingData={storeSubscribingData} showPlans={showPlans} plansRef={plansRef as React.RefObject<HTMLDivElement>} />
            <SubscriptionHistory />
            <PaymentSelection paymentSelectionRef={paymentSelectionRef as React.RefObject<HTMLDivElement>} />
        </>
    );
};

export default ProviderSubscription;

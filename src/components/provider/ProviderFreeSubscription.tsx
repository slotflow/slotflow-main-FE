import { useState } from "react";
import { toast } from "react-toastify";
import { X, Loader, Coins } from "lucide-react";
import { RootState } from "@/utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { providerSubscribeToTrialPlan } from "@/utils/apis/provider.api";
import { setPaymentSelectionPage, setSubscriptionIsTrailPlan } from "@/utils/redux/slices/providerSlice";

const ProviderFreeSubscription = () => {

    const dispatch = useDispatch();
    const { paymentSelectionOpen } = useSelector((state: RootState) => state.provider);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handlePaymentSelectionClose = () => {
        dispatch(setPaymentSelectionPage(false));
        dispatch(setSubscriptionIsTrailPlan(false));
    };

    const makeTrialubscription = async () => {
        setPaymentLoading(true);
        try {
            const res = await providerSubscribeToTrialPlan();
            toast.success(res.message);
            handlePaymentSelectionClose();
        } catch {
            setPaymentLoading(false);
        } finally {
            setPaymentLoading(false);
        }
    }

    return paymentSelectionOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
            {!paymentLoading ? (
                <div className="w-3/12 rounded-lg shadow-lg border p-4 bg-[var(--background)]" >
                    <X className="cursor-pointer ml-auto" onClick={handlePaymentSelectionClose} />
                    <div className="py-6 space-y-4">
                        <button className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]" onClick={makeTrialubscription}>
                            <Coins className="w-8 h-8" />
                            <h6 className="font-bold italic">Enter To Trial Plan</h6>
                        </button>
                    </div>
                </div>
            ) : (
                <Loader className="w-10 h-10 animate-spin" />
            )}
        </div>
    );
};

export default ProviderFreeSubscription;

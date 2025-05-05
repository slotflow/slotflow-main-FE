import { useState } from "react";
import { toast } from "react-toastify";
import { X, Loader, Coins } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { planDurations } from "@/utils/constants";
import { RootState } from "@/utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import SelectFiledWithLabel from "@/components/form/SelectFiledWithLabel";
import { PaymentSelectionProps } from "@/utils/interface/providerInterface";
import { setPaymentSelectionPage } from "@/utils/redux/slices/providerSlice";
import { subscribeToPlan, subscribeToTrialPlan } from "@/utils/apis/provider.api";

const PaymentSelection: React.FC<PaymentSelectionProps> = ({ paymentSelectionRef }) => {
    const dispatch = useDispatch();
    const { paymentSelectionOpen, planId, planPrice } = useSelector((state: RootState) => state.provider);
    const [selectedPlanDuration, setSelectedPlanDuration] = useState(planDurations[0].durationName);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlanDuration(event.target.value);
    };

    const handlePaymentSelectionClose = () => {
        dispatch(setPaymentSelectionPage(false));
    };

    const makeStripePayment = async () => {
        if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
            toast.error("Stripe key is missing!");
            return;
        }

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        if (!stripe) {
            toast.error("Stripe failed to load!");
            return;
        }

        if (!planId) {
            toast.error("Invalid plan selected.");
            return;
        }

        const data = { planId, planDuration: selectedPlanDuration };

        try {
            setPaymentLoading(true);
            const { sessionId } = await subscribeToPlan(data);
            if (!sessionId) {
                toast.error("Failed to create checkout session.");
                setPaymentLoading(false);
                return;
            }

            setPaymentLoading(false);
            dispatch(setPaymentSelectionPage(false));
            const result = await stripe.redirectToCheckout({ sessionId });

            if (result?.error) {
                toast.error(result.error.message);
            }
        } catch {
            toast.error("An error occurred during payment.");
            setPaymentLoading(false);
        }
    };

    const makeTrialubscription = async () => {
        setPaymentLoading(true);
        try{
            const res = await subscribeToTrialPlan();
            toast.success(res.message)
        }catch {
            setPaymentLoading(false);
        } finally {
            setPaymentLoading(false);
        }
    }

    return paymentSelectionOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
            {!paymentLoading ? (
                <div className="w-3/12 rounded-lg shadow-lg border p-4 bg-[var(--background)]" ref={paymentSelectionRef}>
                    <X className="cursor-pointer ml-auto" onClick={handlePaymentSelectionClose} />
                    <div className="py-6 space-y-4">
                        {planPrice !== 0 ? (
                            <>
                                <h2 className="text-lg font-bold mb-4 text-center">Choose Payment Gateway</h2>
                                <SelectFiledWithLabel
                                    label="Select Plan Duration"
                                    id="planDuration"
                                    value={selectedPlanDuration}
                                    onChange={handleDayChange}
                                    options={planDurations.map(plan => plan.durationName)}
                                    required
                                />
                                <button className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]" onClick={makeStripePayment}>
                                    <img src="/images/Stripe.jpeg" alt="Stripe" className="w-8 h-8" />
                                    <h6 className="font-bold italic text-[#635bff]">Stripe</h6>
                                </button>
                                <button className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]" onClick={makeStripePayment}>
                                    <img src="/images/Paypal.png" alt="Stripe" className="w-8 h-8" />
                                    <h6 className="font-bold italic text-[#]"><span className="text-[#002991]">Pay</span><span className="text-[#60cdff]">Pal</span></h6>
                                </button>
                                <button className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]" onClick={makeStripePayment}>
                                    <img src="/images/Razorpay.png" alt="Stripe" className="w-8 h-8" />
                                    <h6 className="font-bold italic text-[#072654]">Razorpay</h6>
                                </button>
                            </>
                        ) : (
                                <button className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]" onClick={makeTrialubscription}>
                                    <Coins className="w-8 h-8" />
                                    <h6 className="font-bold italic">Enter To Trial Plan</h6>
                                </button>
                        )}
                    </div>
                </div>
            ) : (
                <Loader className="w-10 h-10 animate-spin" />
            )}
        </div>
    );
};

export default PaymentSelection;

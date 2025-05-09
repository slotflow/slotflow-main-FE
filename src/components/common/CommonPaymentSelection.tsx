import { useState } from 'react';
import { toast } from 'react-toastify';
import { Loader, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { userBookAnAppointment } from '@/utils/apis/user.api';
import { subscribeToPlan, subscribeToTrialPlan } from '@/utils/apis/provider.api';

interface UserBookinAppointmentDataProps {
    providerId: string;
    slotId: string;
    date: Date;
    selectedServiceMode: string;
}

interface ProviderSubscriptionDataProps {
    planId: string;
    planDuration: string;
    isTrialPlan: boolean;
}

interface PaymentSelecionComponentPropst {
    setOpenPayment: (data: boolean) => void;
    data: UserBookinAppointmentDataProps | ProviderSubscriptionDataProps;
    // sessionCreationFunction: (data : UserBookinAppointmentDataProps | ProviderSubscriptionDataProps) => Promise<{ success: boolean, message: string }>
    isAppointmentBooking?: boolean;
    isProviderSubscription?: boolean;
}

const CommonPaymentSelection: React.FC<PaymentSelecionComponentPropst> = ({
    setOpenPayment,
    data,
    isAppointmentBooking,
    isProviderSubscription,
}) => {

    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

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

        if (isAppointmentBooking) {
            const infoData = data as UserBookinAppointmentDataProps;
            console.log("slotId : ",infoData.slotId);
            console.log("providerId : ",infoData.providerId);
            console.log("selectedServiceMode : ",infoData.selectedServiceMode);
            console.log("date : ",infoData.date);
            // return;
            if (!infoData.slotId || !infoData.providerId || !infoData.selectedServiceMode || !infoData.date) {
                toast.error("Something went wrong.");
                return;
            }
        }

        if (isProviderSubscription) {
            const infoData = data as ProviderSubscriptionDataProps;
            if (!infoData.isTrialPlan) {
                if (!infoData.planDuration || !infoData.planId) {
                    toast.error("Something went wrong.");
                    return;
                }
            }
        }

        try {
            setPaymentLoading(true);
            let sessionId: string = "";
            if (isAppointmentBooking) {
                const infoData = data as UserBookinAppointmentDataProps;
                const sessionData = await userBookAnAppointment(infoData);
                console.log("sessionData : ",sessionData);
                sessionId = sessionData.sessionId
                console.log("sessionId : ",sessionId);
            } else if (isProviderSubscription) {
                const infoData = data as ProviderSubscriptionDataProps;
                if (infoData.isTrialPlan) {
                    const res = await subscribeToTrialPlan();
                    toast.success(res.message)
                }
                const sessionData = await subscribeToPlan(infoData);
                sessionId = sessionData.sessionId;
            }

            if (!sessionId || !sessionId.trim()) {
                toast.error("Failed to create checkout session.");
                setPaymentLoading(false);
                return;
            }

            setPaymentLoading(false);
            setOpenPayment(false);
            const result = await stripe.redirectToCheckout({ sessionId });

            if (result?.error) {
                toast.error(result.error.message);
            }
        } catch {
            toast.error("An error occurred during payment.");
            setPaymentLoading(false);
        }
    }



    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
            {!paymentLoading ? (
                <div className="w-3/12 rounded-lg shadow-lg border p-4 bg-[var(--background)]">
                    <X className="cursor-pointer ml-auto" onClick={() => { setOpenPayment(false) }} />
                    <div className="py-6 space-y-4">
                        <h2 className="text-lg font-bold mb-4 text-center">Choose Payment Gateway</h2>
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

                    </div>
                </div>
            ) : (
                <Loader className="w-10 h-10 animate-spin" />
            )}
        </div>
    )
}

export default CommonPaymentSelection
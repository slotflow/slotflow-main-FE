import { toast } from 'react-toastify';
import { Loader, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import paypalLogo from '../../assets/iconImages/Paypal.png';
import stripeLogo from '../../assets/iconImages/Stripe.jpeg';
import { userBookAnAppointment } from '@/utils/apis/user.api';
import razorpayLogo from '../../assets/iconImages/Razorpay.png';
import { providerSubscribeToPlan } from '@/utils/apis/provider.api';
import { Provider } from '@/utils/interface/entityInterface/providerInterface';
import { setPaymentSelectionPage, setSubscriptionIsTrailPlan, setSubscriptionPlanDuration, setSubscriptionPlanId } from '@/utils/redux/slices/providerSlice';

type UserBookinAppointmentDataProps = {
    providerId: Provider["_id"]
    slotId: string;
    date: Date;
    selectedServiceMode: string;
}

interface ProviderSubscriptionDataProps {
    planId: string;
    planDuration: string;
}

interface PaymentSelecionComponentPropst {
    setOpenPayment?: (data: boolean) => void;
    data: UserBookinAppointmentDataProps | ProviderSubscriptionDataProps;
    isAppointmentBooking?: boolean;
    isProviderSubscription?: boolean;
}

const CommonPaymentSelection: React.FC<PaymentSelecionComponentPropst> = ({
    setOpenPayment,
    data,
    isAppointmentBooking,
    isProviderSubscription,
}) => {


    const dispatch = useDispatch();
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

    const makeStripePayment = useCallback(async () => {
        if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
            toast.error("Stripe key is missing!");
            return;
        }

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        if (!stripe) {
            toast.error("Stripe failed to load!");
            return;
        }

        try {
            if (isAppointmentBooking) {
                const infoData = data as UserBookinAppointmentDataProps;
                if (!infoData.slotId || !infoData.providerId || !infoData.selectedServiceMode || !infoData.date) {
                    toast.error("Incomplete booking details.");
                    return;
                }
            }

            if (isProviderSubscription) {
                const infoData = data as ProviderSubscriptionDataProps;
                if (!infoData.planDuration || !infoData.planId) {
                    toast.error("Subscription details are missing.");
                    return;
                }
            }

            setPaymentLoading(true);
            let sessionId = "";

            if (isAppointmentBooking) {
                const infoData = data as UserBookinAppointmentDataProps;
                const response = await userBookAnAppointment(infoData);
                sessionId = response.data;
            } else if (isProviderSubscription) {
                const infoData = data as ProviderSubscriptionDataProps;
                const response = await providerSubscribeToPlan(infoData);
                sessionId = response.data;
            }

            if (!sessionId?.trim()) {
                toast.error("Failed to create checkout session.");
                return;
            }

            dispatch(setPaymentSelectionPage(false));
            const result = await stripe.redirectToCheckout({ sessionId });
            if (result?.error) {
                toast.error(result.error.message);
            }
        } catch {
            toast.error("Something went wrong during payment.");
        } finally {
            setPaymentLoading(false);
            dispatch(setSubscriptionPlanId(null));
            dispatch(setSubscriptionPlanDuration(null));
            dispatch(setSubscriptionIsTrailPlan(false));
        }
    }, [data, isAppointmentBooking, isProviderSubscription, dispatch]);


    const paymentGateways = [
        {
            name: "Stripe",
            img: stripeLogo,
            text: <h6 className="font-bold italic text-[#635bff]">Stripe</h6>,
            onClick: makeStripePayment,
        },
        {
            name: "PayPal",
            img: paypalLogo,
            text: (
                <h6 className="font-bold italic space-x-1">
                    <span className="text-[#002991]">Pay</span>
                    <span className="text-[#60cdff]">Pal</span>
                </h6>
            ),
            onClick: makeStripePayment,
        },
        {
            name: "Razorpay",
            img: razorpayLogo,
            text: <h6 className="font-bold italic text-[#072654]">Razorpay</h6>,
            onClick: makeStripePayment,
        },
    ];



    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
            {!paymentLoading ? (
                <div className="w-full max-w-sm rounded-lg shadow-lg border p-4 bg-[var(--background)]">
                    <X
                        className="cursor-pointer ml-auto"
                        onClick={() => {
                            dispatch(setPaymentSelectionPage(false));
                            if (setOpenPayment)
                                setOpenPayment(false);
                        }}
                    />
                    <div className="py-6 space-y-4">
                        <h2 className="text-lg font-bold mb-4 text-center">Choose Payment Gateway</h2>
                        {paymentGateways.map((gateway, index) => (
                            <button
                                key={index}
                                onClick={gateway.onClick}
                                className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]"
                            >
                                <img src={gateway.img} alt={gateway.name} className="w-8 h-8" />
                                {gateway.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <Loader className="w-10 h-10 animate-spin text-white" />
            )}
        </div>
    )
}

export default CommonPaymentSelection
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import { userSubscriptionColumns } from "@/components/table/columns";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import DataFetchingError from "@/components/common/DataFetchingError";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProviderPlans, fetchProviderSubscriptions, subscribeToPlan } from "@/utils/apis/provider.api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { setPaymentSelectionPage, setSubscribingData } from "@/utils/redux/slices/providerSlice";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CommonButton from "@/components/common/CommonButton";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "react-toastify";
import SelectFiledWithLabel from "@/components/form/SelectFiledWithLabel";

const planDurations: { durationName: string; durationMonth: number }[] = [
    { durationName: "1 Month", durationMonth: 1 },
    { durationName: "3 Months", durationMonth: 3 },
    { durationName: "6 Months", durationMonth: 6 },
    { durationName: "12 Months", durationMonth: 12 }
];

const ProviderSubscription = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { paymentSelectionOpen, planId } = useSelector((store: RootState) => store.provider);
    const paymentSelectionRef = useRef(null);
    const plansRef = useRef(null);
    const [showPlans, setShowPlans] = useState<boolean>(true);

    const [selectedPlanDuration, setSelectedPlanDuration] = useState(planDurations[0].durationName);

    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedPlanDuration(selectedValue);
    };

    useEffect(() => {
        if (paymentSelectionOpen && paymentSelectionRef.current) {
            gsap.fromTo(paymentSelectionRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [paymentSelectionOpen]);

    useEffect(() => {
        if (showPlans) {
            gsap.fromTo(plansRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            );
        } else {
            gsap.to(plansRef.current,
                { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in" });
        }
    }, [showPlans]);

    const { data: plansData,
        isLoading: isPlansLoading,
        isError: isPlansError,
        error: plansError } = useQuery({
            queryKey: ["plans"],
            queryFn: () => fetchProviderPlans()
        })

    const { data: subscriptionData,
        isLoading: isSubscriptionLoading,
        isError: isSubscriptionError,
        error: subscriptionsError } = useQuery({
            queryKey: ["plans"],
            queryFn: () => fetchProviderSubscriptions()
        })

    const storeSubscribingData = (planId: string) => {
        dispatch(setSubscribingData(planId));
        dispatch(setPaymentSelectionPage(true));
    }

    const handlePaymentSelectionClose = () => {
        dispatch(setSubscribingData(null));
        dispatch(setPaymentSelectionPage(false));
    }

    const makePayment = async () => {
        if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
            toast.error("Stripe key is missing!");
            return;
        }
    
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        if (!stripe) {
            toast.error("Stripe failed to load!");
            return;
        }
    
        // Ensure planId is valid
        if (!planId) {
            toast.error("Invalid plan selected.");
            return;
        }
    
        // Prepare data
        const data = {
            planId,
            planDuration: selectedPlanDuration,
        };
    
        try {
            // Await the session ID response
            const {sessionId} = await subscribeToPlan(data);
    
            if (!sessionId) {
                toast.error("Failed to create checkout session.");
                return;
            }
    
            // Redirect to Stripe checkout
            const result = await stripe.redirectToCheckout({sessionId});
    
            if (result?.error) {
                toast.error(result.error.message);
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("An error occurred during payment.");
        }
    };



    return (
        <>
            <div>
                <div className="px-6">
                    <CommonButton onClick={() => setShowPlans(!showPlans)} text={showPlans ? "Hide Plans" : "Show Plans"} />
                </div>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 ${!showPlans && "hidden"}`} ref={plansRef}>
                    {isPlansLoading ? (
                        <p>Loading</p>
                    ) : isPlansError ? (
                        <p>Error {plansError.message}</p>
                    ) : plansData && (
                        plansData.map((plan) => (
                            <Card key={plan._id} className="p-4 border rounded-2xl shadow-sm flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">{plan.planName}</CardTitle>
                                    <p className="text-xl font-medium">{plan.price === 0 ? "FREE" : "₹ " + plan.price}</p>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-2 text-md">
                                        {plan.features.map((feature, i: number) => (
                                            <li key={i}>&#8226; {feature}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-4 text-sm">{plan.description}</p>
                                </CardContent>
                                <div className="mt-auto">
                                    <Button className="w-full cursor-pointer" onClick={() => storeSubscribingData(plan._id)}>Choose Plan</Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Your subscription history</h2>
                    <div className='flex'>
                        <div className='w-full'>
                            {isSubscriptionError ? (
                                <DataFetchingError message={subscriptionsError.message} />
                            ) : isSubscriptionLoading ? (
                                <>
                                    <ShimmerTableTop />
                                    <ShimmerTable />
                                </>
                            ) : subscriptionData ? (
                                <DataTable columns={userSubscriptionColumns} data={subscriptionData} />
                            ) : (
                                <DataFetchingError message={"No data found"} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {paymentSelectionOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
                    <div className="w-3/12 rounded-lg shadow-lg bg-[var(--background)] border border-[var-[boxBorder]] p-4" ref={paymentSelectionRef}>
                        <X className="cursor-pointer ml-auto" onClick={handlePaymentSelectionClose} />
                        <div className="py-6">
                            <h2 className="text-lg font-bold mb-4 text-center">Choose Payment Gateway</h2>
                            <div className="space-y-6">
                                <SelectFiledWithLabel
                                    label="Select plan duration"
                                    id="planDuration"
                                    value={selectedPlanDuration}
                                    onChange={handleDayChange}
                                    options={planDurations.map(plan => plan.durationName)}
                                    required={true}
                                />
                                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-white/80  rounded-md shadow cursor-pointer hover:bg-gray-100" onClick={makePayment}>
                                    <img src="/images/Stripe.jpeg" alt="Stripe" className="w-8 h-8" />
                                    <h6 className="font-bold italic text-[#635bff]">Stripe</h6>
                                </button>

                                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-white/80 rounded-md shadow cursor-pointer hover:bg-gray-100">
                                    <img src="/images/Paypal.png" alt="PayPal" className="w-8 h-8" />
                                    <h6 className="font-bold italic"><span className="text-[#002991]">Pay</span><span className="text-[#60cdff]">pal</span></h6>
                                </button>

                                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-white/80 rounded-md shadow cursor-pointer hover:bg-gray-100">
                                    <img src="/images/Razorpay.png" alt="Razorpay" className="w-8 h-8" />
                                    <h6 className="text-[#072654] font-bold italic">Razorpay</h6>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProviderSubscription
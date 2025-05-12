import { useState } from 'react';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { planDurations } from '@/utils/constants';
import { Plan } from '@/utils/interface/planInterface';
import SelectFiledWithLabel from '../form/SelectFiledWithLabel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { setPaymentSelectionPage, setSubscriptionIsTrailPlan, setSubscriptionPlanDuration, setSubscriptionPlanId } from '@/utils/redux/slices/providerSlice';
import { toast } from 'react-toastify';

type CardProps = Pick<Plan, "_id" | "planName" | "description" | "features" | "price">;
export interface ProviderPlanCardProps {
    plan: CardProps;
    isTrial?: boolean
}

const ProviderPlanCard: React.FC<ProviderPlanCardProps> = ({ plan, isTrial }) => {

    const dispatch = useDispatch();
    const [selectedPlanDuration, setSelectedPlanDuration] = useState<string>("");

    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlanDuration(event.target.value);
        dispatch(setSubscriptionPlanDuration(event.target.value));
    };

    const handleGoToPayment = () => {
        if(!selectedPlanDuration || !selectedPlanDuration.trim()) {
            toast.warning("Please select an plan duration");
            return;
        }
        dispatch(setSubscriptionIsTrailPlan(isTrial));
        dispatch(setSubscriptionPlanId(plan?._id));
        dispatch(setPaymentSelectionPage(true));
    }

    return (
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
            {!isTrial && (
                <SelectFiledWithLabel
                    label="Select Plan Duration"
                    id="planDuration"
                    value={selectedPlanDuration}
                    onChange={handleDayChange}
                    options={planDurations.map(plan => plan.durationName)}
                    required
                />
            )}
            <div className="mt-auto">
                <Button className="w-full cursor-pointer" onClick={handleGoToPayment}
                >Choose Plan</Button>
            </div>
        </Card>
    )
}

export default ProviderPlanCard
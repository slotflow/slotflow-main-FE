import { Button } from '../ui/button';
import { PlanCardProps } from '@/utils/interface/providerInterface';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const PlanCard: React.FC<PlanCardProps> = ({ plan, storeSubscribingData }) => {
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
            <div className="mt-auto">
                <Button className="w-full cursor-pointer" onClick={() => storeSubscribingData(plan._id)}>Choose Plan</Button>
            </div>
        </Card>
    )
}

export default PlanCard
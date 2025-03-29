import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchProviderPlans } from "@/utils/apis/provider.api";

const ProviderSubscription = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["plans"],
        queryFn: () => fetchProviderPlans()
    })

    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {isLoading ? (
                    <p>Loading</p>
                ) : isError ? (
                    <p>Error {error.message}</p>
                ) : data && (
                    data.map((plan, index) => (
                        <Card key={index} className="p-4 border rounded-2xl shadow-sm flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{plan.planName}</CardTitle>
                                <p className="text-xl font-medium">{plan.price === 0 ? "FREE" : plan.price}</p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-2 text-md">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>&#8226; {feature}</li>
                                    ))}
                                </ul>
                                <p className="mt-4 text-sm">{plan.description}</p>
                            </CardContent>
                            <div className="mt-auto">
                                <Button className="w-full cursor-pointer">Choose Plan</Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default ProviderSubscription
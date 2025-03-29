import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchProviderPlans } from "@/utils/apis/provider.api";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import { DataTable } from "@/components/table/data-table";
import DataFetchingError from "@/components/common/DataFetchingError";

const ProviderSubscription = () => {

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
            queryFn: () => fetchProviderPlans()
        })



    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {isPlansLoading ? (
                    <p>Loading</p>
                ) : isPlansError ? (
                    <p>Error {plansError.message}</p>
                ) : plansData && (
                    plansData.map((plan) => (
                        <Card key={plan._id} className="p-4 border rounded-2xl shadow-sm flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{plan.planName}</CardTitle>
                                <p className="text-xl font-medium">{plan.price === 0 ? "FREE" : plan.price}</p>
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
                                <Button className="w-full cursor-pointer">Choose Plan</Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Your subscription history</h2>
                <div className='flex'>
                    <div className='w-8/12'>
                        {isSubscriptionError ? (
                            <DataFetchingError message={subscriptionsError.message} />
                        ) : isSubscriptionLoading ? (
                            <>
                                <ShimmerTableTop />
                                <ShimmerTable />
                            </>
                        ) : subscriptionData ? (
                            <DataTable columns={[]} data={subscriptionData} />
                        ) : (
                            <DataFetchingError message={"No data found"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProviderSubscription